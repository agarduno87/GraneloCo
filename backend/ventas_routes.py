from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import get_db
from .models import Venta, Producto
from .schemas import VentaCreate, VentaOut

router = APIRouter(prefix="/ventas", tags=["Ventas"])

@router.get("/")
def read_ventas():
    return crud_ventas.get_ventas()

@router.get("/", response_model=list[VentaOut])
def listar_ventas(db: Session = Depends(get_db)):
    return db.query(Venta).all()

@router.post("/", response_model=VentaOut)
def crear_venta(data: VentaCreate, db: Session = Depends(get_db)):
    producto = db.query(Producto).filter(Producto.id == data.producto_id).first()

    if not producto or producto.stock < data.cantidad:
        raise HTTPException(status_code=400, detail="Stock insuficiente")

    producto.stock -= data.cantidad
    total = data.cantidad * producto.precio

    venta = Venta(
        cliente_id=data.cliente_id,
        producto_id=data.producto_id,
        cantidad=data.cantidad,
        total=total
    )

    db.add(venta)
    db.commit()
    db.refresh(venta)
    return venta
