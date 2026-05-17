

# import os
# import json
# import base64

# from fastapi import APIRouter, Request, Response, HTTPException
# from fastapi.responses import FileResponse
# from sqlalchemy import text

# from database import readonly_engine

# router = APIRouter(prefix="/challenge", tags=["Challenges"])


# # ── Helpers ───────────────────────────────────────────────────────────────────

# FLAG2 = base64.b64encode(b"CTF{c00k13_m0nst3r_found_m3}").decode()

# def _decode_jwt_part(part: str) -> dict:
#     part += "=" * (-len(part) % 4)
#     return json.loads(base64.urlsafe_b64decode(part))


# # ── Challenge 2 — Cookie ──────────────────────────────────────────────────────

# @router.get("/2")
# def cookie_challenge(response: Response):
#     response.set_cookie(key="portal_session", value=FLAG2, httponly=False, samesite="lax")
#     return {"message": "Session initialized"}


# # ── Challenge 5 — Header Inspection ──────────────────────────────────────────

# @router.get("/5")
# def header_challenge(response: Response):
#     response.headers["X-Secret-Flag"] = "CTF{h34d3r_sniff3r_pr0}"
#     response.headers["X-Powered-By"]  = "CorpNet Secure Gateway"
#     return {"status": "ok"}


# # ── Challenge 6 — JWT None Algorithm ─────────────────────────────────────────

# @router.post("/6/verify")
# async def jwt_challenge(request: Request):
#     auth = request.headers.get("Authorization", "")
#     token = auth.replace("Bearer ", "").strip()

#     if not token:
#         return {"error": "Missing token"}

#     try:
#         parts = token.split(".")
#         if len(parts) != 3:
#             return {"error": "Invalid JWT format"}

#         header  = _decode_jwt_part(parts[0])
#         payload = _decode_jwt_part(parts[1])

#         if header.get("alg", "").lower() == "none" and payload.get("role") == "admin":
#             return {"status": "ACCESS GRANTED", "flag": "CTF{jwt_n0n3_4lg_byp4ss3d}"}

#         return {"error": "Access denied"}

#     except Exception as e:
#         return {"error": str(e)}


# # ── Challenge 7 — Steganography ───────────────────────────────────────────────

# @router.get("/7/image")
# def stego_image():
#     path = os.path.normpath(
#         os.path.join(os.path.dirname(__file__), "../static/stego_image.png")
#     )
#     if not os.path.exists(path):
#         raise HTTPException(status_code=503, detail="Image unavailable")
#     return FileResponse(path, media_type="image/png", filename="challenge7.png")


# # ── Challenge 8 — IDOR ───────────────────────────────────────────────────────

# @router.get("/8/documents/{doc_id}")
# async def idor_challenge(doc_id: int):
#     try:
#         async with readonly_engine.connect() as conn:
#             result = await conn.execute(
#                 text("SELECT id, classification, content, author FROM documents WHERE id = :id"),
#                 {"id": doc_id}
#             )
#             doc = result.fetchone()

#         if not doc:
#             return {"error": "Document not found"}

#         return {"id": doc[0], "classification": doc[1], "content": doc[2], "author": doc[3]}

#     except Exception as e:
#         return {"error": str(e)}


# # ── Challenge 9 — SQL Injection ───────────────────────────────────────────────

# @router.get("/9/search")
# async def sqli_challenge(q: str = ""):
#     if not q:
#         return {"results": [], "hint": "Search employee name"}

#     try:
#         async with readonly_engine.connect() as conn:
#             # intentionally vulnerable — do not fix
#             query = f"SELECT name, department FROM employees WHERE name ILIKE '%{q}%'"
#             result = await conn.execute(text(query))
#             rows = result.fetchall()

#         return {
#             "query": query,
#             "results": [{"name": str(r[0]), "department": str(r[1])} for r in rows]
#         }

#     except Exception as e:
#         return {"error": str(e)}


# # ── Classified Route ──────────────────────────────────────────────────────────

# @router.get("/classified/flag")
# def hidden_route_flag():
#     return {
#         "message": "Restricted resource accessed",
#         "flag": "CTF{r0b0ts_t0ld_m3_th3_w4y}"
#     }










"""
routes/challenges.py
"""

import os
import json
import base64

from fastapi import APIRouter, Request, Response, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy import text
from slowapi import Limiter
from slowapi.util import get_remote_address

from database import readonly_engine

router  = APIRouter(prefix="/challenge", tags=["Challenges"])
limiter = Limiter(key_func=get_remote_address)


# ── Helpers ───────────────────────────────────────────────────────────────────

FLAG2 = base64.b64encode(b"CTF{c00k13_m0nst3r_found_m3}").decode()

def _decode_jwt_part(part: str) -> dict:
    part += "=" * (-len(part) % 4)
    return json.loads(base64.urlsafe_b64decode(part))


# ── Challenge 2 — Cookie ──────────────────────────────────────────────────────

@router.get("/2")
@limiter.limit("60/minute")
def cookie_challenge(request: Request, response: Response):
    response.set_cookie(key="portal_session", value=FLAG2, httponly=False, samesite="lax")
    return {"message": "Session initialized"}


# ── Challenge 5 — Header Inspection ──────────────────────────────────────────

@router.get("/5")
@limiter.limit("60/minute")
def header_challenge(request: Request, response: Response):
    response.headers["X-Secret-Flag"] = "CTF{h34d3r_sniff3r_pr0}"
    response.headers["X-Powered-By"]  = "CorpNet Secure Gateway"
    return {"status": "ok"}


# ── Challenge 6 — JWT None Algorithm ─────────────────────────────────────────

@router.post("/6/verify")
@limiter.limit("30/minute")
async def jwt_challenge(request: Request):
    auth  = request.headers.get("Authorization", "")
    token = auth.replace("Bearer ", "").strip()

    if not token:
        return {"error": "Missing token"}

    try:
        parts = token.split(".")
        if len(parts) != 3:
            return {"error": "Invalid JWT format"}

        header  = _decode_jwt_part(parts[0])
        payload = _decode_jwt_part(parts[1])

        if header.get("alg", "").lower() == "none" and payload.get("role") == "admin":
            return {"status": "ACCESS GRANTED", "flag": "CTF{jwt_n0n3_4lg_byp4ss3d}"}

        return {"error": "Access denied"}

    except Exception as e:
        return {"error": str(e)}


# ── Challenge 7 — Steganography ───────────────────────────────────────────────

@router.get("/7/image")
@limiter.limit("20/minute")
def stego_image(request: Request):
    path = os.path.normpath(
        os.path.join(os.path.dirname(__file__), "../static/stego_image.png")
    )
    if not os.path.exists(path):
        raise HTTPException(status_code=503, detail="Image unavailable")
    return FileResponse(path, media_type="image/png", filename="challenge7.png")


# ── Challenge 8 — IDOR ───────────────────────────────────────────────────────

@router.get("/8/documents/{doc_id}")
@limiter.limit("60/minute")
async def idor_challenge(request: Request, doc_id: int):
    try:
        async with readonly_engine.connect() as conn:
            result = await conn.execute(
                text("SELECT id, classification, content, author FROM documents WHERE id = :id"),
                {"id": doc_id}
            )
            doc = result.fetchone()

        if not doc:
            return {"error": "Document not found"}

        return {"id": doc[0], "classification": doc[1], "content": doc[2], "author": doc[3]}

    except Exception as e:
        return {"error": str(e)}


# ── Challenge 9 — SQL Injection ───────────────────────────────────────────────

@router.get("/9/search")
@limiter.limit("30/minute")
async def sqli_challenge(request: Request, q: str = ""):
    if not q:
        return {"results": [], "hint": "Search employee name"}

    try:
        async with readonly_engine.connect() as conn:
            # intentionally vulnerable — do not fix
            query  = f"SELECT name, department FROM employees WHERE name ILIKE '%{q}%'"
            result = await conn.execute(text(query))
            rows   = result.fetchall()

        return {
            "query": query,
            "results": [{"name": str(r[0]), "department": str(r[1])} for r in rows]
        }

    except Exception as e:
        return {"error": str(e)}


# ── Classified Route ──────────────────────────────────────────────────────────

@router.get("/classified/flag")
@limiter.limit("30/minute")
def hidden_route_flag(request: Request):
    return {
        "message": "Restricted resource accessed",
        "flag": "CTF{r0b0ts_t0ld_m3_th3_w4y}"
    }
