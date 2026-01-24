from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from .auth import create_access_token
from .database import get_db
from .models import Usuario

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Esto es un ejemplo, normalmente validarías contra la DB
    if form_data.username == "Granel" and form_data.password == "Agarduno_87":
        access_token = create_access_token({"sub": form_data.username})
        return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(status_code=400, detail="Usuario o contraseña incorrectos")
