from fastapi import APIRouter


router = APIRouter(
    tags=["Session"]
)


@router.get("/ping")
def ping():

    return {
        "status": "CTF platform online"
    }