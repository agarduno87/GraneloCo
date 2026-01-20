# ventas_routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from database import get_db
from auth import get_current_user
from models import Venta, VentaItem, Producto
from schemas import VentaCreate, VentaOut, VentaItemCreate, VentaItemOut

router = APIRouter(prefix="/ventas", tags=["ventas"])

# ---------------------------
# Obtener todas las ventas
# ---------------------------
@router.get("", response_model=List[VentaOut])
def obtener_ventas(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(Venta).all()

# ---------------------------
# Crear venta
# ---------------------------
@router.post("", response_model=VentaOut)
def crear_venta(
    venta: VentaCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    nueva_venta = Venta(
        cliente_id=venta.cliente_id,
        subtotal=venta.subtotal,
        impuestos=venta.impuestos,
        total=venta.total
    )
    db.add(nueva_venta)
    db.commit()
    db.refresh(nueva_venta)

    for item in venta.items:
        nuevo_item = VentaItem(
            venta_id=nueva_venta.id,
            producto_id=item.producto_id,
            cantidad_kg=item.cantidad_kg,
            precio_unitario=item.precio_unitario
        )
        db.add(nuevo_item)
    db.commit()
    db.refresh(nueva_venta)

    return nueva_venta

# ---------------------------
# Estadísticas de ventas
# ---------------------------
@router.get("/stats")
def obtener_estadisticas(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    total_ventas = db.query(func.count(Venta.id)).scalar()
    total_ingresos = db.query(func.sum(Venta.total)).scalar() or 0
    return {"total_ventas": total_ventas, "total_ingresos": total_ingresos}
