# clientes_routes.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from auth import get_current_user
from models import Cliente
from schemas import ClienteOut

router = APIRouter(prefix="/clientes", tags=["clientes"])

@router.get("", response_model=list[ClienteOut])
def obtener_clientes(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(Cliente).all()
