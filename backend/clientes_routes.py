from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Cliente
from schemas import ClienteCreate

router = APIRouter(prefix="/clientes", tags=["Clientes"])

@router.get("/")
def get_clientes(db: Session = Depends(get_db)):
    return db.query(Cliente).all()

@router.post("/")
def create_cliente(cliente: ClienteCreate, db: Session = Depends(get_db)):
    nuevo = Cliente(**cliente.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo
