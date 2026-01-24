from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from . import models

from backend.database import get_db
from models import Producto
from schemas import ProductoCreate, ProductoOut
from backend import models, schemas
router = APIRouter(prefix="/productos", tags=["Productos"])

@router.get("/", response_model=list[ProductoOut])
def listar_productos(db: Session = Depends(get_db)):
    return db.query(Producto).all()

@router.post("/", response_model=ProductoOut)
def crear_producto(data: ProductoCreate, db: Session = Depends(get_db)):
    producto = Producto(**data.dict())
    db.add(producto)
    db.commit()
    db.refresh(producto)
    return producto
