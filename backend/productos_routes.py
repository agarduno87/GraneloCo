from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import ProductoCreate, ProductoUpdate, ProductoRead, ProductoBase, ProductoOut
from crud import productos as Producto
from backend.crud.productos import get_productos
from backend.crud.productos import create_producto



router = APIRouter(
    prefix="/productos",
    tags=["productos"]
)

@router.get("/", response_model=list[ProductoOut])
def listar(db: Session = Depends(get_db)):
    return get_productos(db)

@router.post("/", response_model=ProductoOut)
def crear(data: ProductoBase, db: Session = Depends(get_db)):
    return create_producto(db, data.nombre, data.precio)

@router.post("/", response_model=ProductoRead)
def crear_producto(producto: ProductoCreate, db: Session = Depends(get_db)):
    return Producto.create_producto(db, producto)

@router.get("/", response_model=list[ProductoRead])
def listar_productos(db: Session = Depends(get_db)):
    return Producto.get_productos(db)

@router.get("/{producto_id}", response_model=ProductoRead)
def obtener_producto(producto_id: int, db: Session = Depends(get_db)):
    producto = Producto.get_producto(db, producto_id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto

@router.put("/{producto_id}", response_model=ProductoRead)
def actualizar_producto(producto_id: int, producto: ProductoUpdate, db: Session = Depends(get_db)):
    producto_actualizado = Producto.update_producto(db, producto_id, producto)
    if not producto_actualizado:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto_actualizado

@router.delete("/{producto_id}")
def eliminar_producto(producto_id: int, db: Session = Depends(get_db)):
    if not Producto.delete_producto(db, producto_id):
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"detalle": "Producto eliminado"}
