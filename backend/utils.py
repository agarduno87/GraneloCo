# backend/utils.py
from passlib.context import CryptContext

# Configuración PassLib
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

MAX_BCRYPT_LEN = 72

def hash_password(password: str) -> str:
    """
    Hashea la contraseña truncándola a 72 bytes (limite bcrypt).
    """
    truncated = password.encode("utf-8")[:MAX_BCRYPT_LEN]
    return pwd_context.hash(truncated)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    truncated = plain_password.encode("utf-8")[:MAX_BCRYPT_LEN]
    return pwd_context.verify(truncated, hashed_password)
