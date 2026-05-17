
import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base


load_dotenv()



DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://ctf_user:ctf_pass@localhost:5432/ctfdb"
)

READONLY_DATABASE_URL = os.getenv(
    "READONLY_DATABASE_URL",
    DATABASE_URL
)



if DATABASE_URL.startswith("postgres://"):

    DATABASE_URL = DATABASE_URL.replace(
        "postgres://",
        "postgresql+asyncpg://",
        1
    )

if READONLY_DATABASE_URL.startswith("postgres://"):

    READONLY_DATABASE_URL = READONLY_DATABASE_URL.replace(
        "postgres://",
        "postgresql+asyncpg://",
        1
    )



engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
    pool_size=20,
    max_overflow=40
)

readonly_engine = create_async_engine(
    READONLY_DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20
)




AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    autoflush=False,
    expire_on_commit=False
)

ReadOnlySessionLocal = async_sessionmaker(
    bind=readonly_engine,
    class_=AsyncSession,
    autoflush=False,
    expire_on_commit=False
)



Base = declarative_base()


async def get_db():

    async with AsyncSessionLocal() as db:

        yield db


async def get_readonly_db():

    async with ReadOnlySessionLocal() as db:

        yield db