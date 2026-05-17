

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from sqlalchemy import text
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from database import engine, Base, AsyncSessionLocal
from routes.challenges import router as challenges_router
from routes.session import router as session_router

load_dotenv()


# ── Rate Limiter ──────────────────────────────────────────────────────────────

limiter = Limiter(key_func=get_remote_address)


# ── Startup helpers ───────────────────────────────────────────────────────────

async def create_tables() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def seed_data() -> None:
    async with AsyncSessionLocal() as db:
        try:
            result = await db.execute(text("SELECT COUNT(*) FROM notes WHERE id = 1"))
            if not result.scalar():
                await db.execute(text("""
                    INSERT INTO notes (id, owner, content)
                    VALUES (1, 'admin', 'CONFIDENTIAL: CTF{1d0r_4cc3ss_c0ntr0l_byp4ss}')
                """))
                await db.execute(text("SELECT setval('notes_id_seq', 100, false)"))
                await db.commit()

            result = await db.execute(text("SELECT COUNT(*) FROM searchable_users"))
            if not result.scalar():
                await db.execute(text("""
                    INSERT INTO searchable_users (username, role) VALUES
                    ('alice', 'user'), ('bob', 'user'), ('carol', 'user'),
                    ('dave', 'moderator'), ('eve', 'user')
                """))
                await db.commit()

            result = await db.execute(text("SELECT COUNT(*) FROM secret_flags"))
            if not result.scalar():
                await db.execute(text("""
                    INSERT INTO secret_flags (flag)
                    VALUES ('CTF{union_s3l3ct_ftw_sql1_m4st3r}')
                """))
                await db.commit()

        except Exception as e:
            print(f"[seed] error: {e}")
            await db.rollback()


async def generate_stego() -> None:
    stego_path = os.path.join(os.path.dirname(__file__), "static", "stego_image.png")
    if not os.path.exists(stego_path):
        try:
            import generate_stego
            print("[startup] stego image generated")
        except Exception as e:
            print(f"[startup] stego generation failed: {e}")


# ── Lifespan ──────────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    await seed_data()
    await generate_stego()
    yield


# ── App ───────────────────────────────────────────────────────────────────────

app = FastAPI(
    lifespan=lifespan,
    title="CTF Platform",
    version="1.0.0",
    description="CollegeNet CTF — web security challenge platform.",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Secret-Flag", "X-Hint"],
)

app.include_router(challenges_router, prefix="/api")
app.include_router(session_router,    prefix="/api")


@app.get("/")
async def root():
    return {"status": "CTF Platform online"}
