# backend/auth.py
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from models import Usuario
from database import get_db

# -----------------------
# CONFIG
# -----------------------
SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# -----------------------
# PASSWORDS
# -----------------------
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# -----------------------
# AUTHENTICATION
# -----------------------
def authenticate_user(db: Session, username: str, password: str):
    """
    Verifica que el usuario exista y que la contraseña sea correcta.
    Retorna el usuario si es válido, sino None.
    """
    user = db.query(Usuario).filter(Usuario.correo == username).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

# -----------------------
# JWT
# -----------------------
def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Decodifica el token JWT y retorna el usuario completo.
    Lanza excepción si el token es inválido o expirado.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token inválido o expirado",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        correo: str | None = payload.get("sub")
        if correo is None:
            raise credentials_exception

        user = db.query(Usuario).filter(Usuario.correo == correo).first()
        if not user:
            raise credentials_exception

        return user  # devuelve objeto Usuario completo
    except JWTError:
        raise credentials_exception
