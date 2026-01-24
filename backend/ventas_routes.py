from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import ventas as crud_ventas
from database import get_db
from schemas import VentaCreate, VentaRead

router = APIRouter(prefix="/ventas", tags=["Ventas"])

@router.get("/", response_model=list[VentaRead])
def listar_ventas(db: Session = Depends(get_db)):
    return crud_ventas.get_ventas(db)

@router.post("/", response_model=VentaRead)
def crear_venta(data: VentaCreate, db: Session = Depends(get_db)):
    try:
        return crud_ventas.crear_venta(db, data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
