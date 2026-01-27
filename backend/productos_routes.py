from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Producto
from schemas import ProductoCreate

router = APIRouter(prefix="/productos", tags=["Productos"])

@router.get("/")
def get_productos(db: Session = Depends(get_db)):
    return db.query(Producto).all()

@router.post("/")
def create_producto(producto: ProductoCreate, db: Session = Depends(get_db)):
    nuevo = Producto(**producto.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo
