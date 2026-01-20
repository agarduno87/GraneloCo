# auth_routes.py
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
from auth import authenticate_user, create_access_token
from schemas import UsuarioOut

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=UsuarioOut)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos")
    token = create_access_token({"sub": user.correo})
    return {"id": user.id, "nombre": user.nombre, "correo": user.correo, "token": token}
