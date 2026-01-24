from sqlalchemy.orm import Session
from models import Producto
from schemas import ProductoCreate, ProductoUpdate


def get_productos(db: Session):
    return db.query(Producto).all()


def get_producto(db: Session, producto_id: int):
    return db.query(Producto).filter(Producto.id == producto_id).first()


def create_producto(db: Session, data: ProductoCreate):
    producto = Producto(**data.dict())
    db.add(producto)
    db.commit()
    db.refresh(producto)
    return producto


def update_producto(db: Session, producto_id: int, data: ProductoUpdate):
    producto = get_producto(db, producto_id)
    if not producto:
        return None

    for key, value in data.dict(exclude_unset=True).items():
        setattr(producto, key, value)

    db.commit()
    db.refresh(producto)
    return producto


def delete_producto(db: Session, producto_id: int):
    producto = get_producto(db, producto_id)
    if not producto:
        return False

    db.delete(producto)
    db.commit()
    return True
