from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Venta
from schemas import VentaCreate

router = APIRouter(prefix="/ventas", tags=["Ventas"])

@router.get("/")
def get_ventas(db: Session = Depends(get_db)):
    return db.query(Venta).all()

@router.post("/")
def create_venta(venta: VentaCreate, db: Session = Depends(get_db)):
    nueva = Venta(**venta.dict())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva
