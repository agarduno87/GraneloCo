# productos_routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .crud import productos as crud_productos
from .schemas import ProductoCreate, ProductoUpdate, Producto
from .database import get_db

router = APIRouter(
    prefix="/productos",
    tags=["productos"]
)

@router.post("/", response_model=Producto)
def crear_producto(producto: ProductoCreate, db: Session = Depends(get_db)):
    return crud_productos.create_producto(db, producto)

@router.get("/")
def read_productos():
    return crud_productos.get_productos()

@router.get("/", response_model=list[Producto])
def listar_productos(db: Session = Depends(get_db)):
    return crud_productos.get_productos(db)

@router.get("/{producto_id}", response_model=Producto)
def obtener_producto(producto_id: int, db: Session = Depends(get_db)):
    db_producto = crud_productos.get_producto(db, producto_id)
    if not db_producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return db_producto

@router.put("/{producto_id}", response_model=Producto)
def actualizar_producto(producto_id: int, producto: ProductoUpdate, db: Session = Depends(get_db)):
    db_producto = crud_productos.update_producto(db, producto_id, producto)
    if not db_producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return db_producto

@router.delete("/{producto_id}")
def eliminar_producto(producto_id: int, db: Session = Depends(get_db)):
    success = crud_productos.delete_producto(db, producto_id)
    if not success:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"detalle": "Producto eliminado"}
