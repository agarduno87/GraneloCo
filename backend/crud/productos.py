# crud/productos.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from auth import get_current_user
from models import Producto
from schemas import ProductoCreate, ProductoOut

router = APIRouter(prefix="/productos", tags=["productos"])

@router.get("", response_model=List[ProductoOut])
def obtener_productos(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(Producto).all()

@router.post("", response_model=ProductoOut)
def crear_producto(
    producto: ProductoCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    existing = db.query(Producto).filter(Producto.nombre == producto.nombre).first()
    if existing:
        raise HTTPException(status_code=400, detail="El producto ya existe")

    nuevo = Producto(
        nombre=producto.nombre,
        precio_kg=producto.precio_kg,
        stock_kg=producto.stock_kg,
        unidad="kg"  # siempre kg, como en tu proyecto
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo
