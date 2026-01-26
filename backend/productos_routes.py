from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import ProductoCreate, ProductoUpdate, ProductoOut
from crud import productos as crud_productos

router = APIRouter(
    prefix="/productos",
    tags=["productos"]
)

@router.get("/", response_model=list[ProductoOut])
def listar_productos(db: Session = Depends(get_db)):
    return crud_productos.get_productos(db)

@router.post("/", response_model=ProductoOut)
def crear_producto(
    data: ProductoCreate,
    db: Session = Depends(get_db)
):
    return crud_productos.create_producto(
        db=db,
        nombre=data.nombre,
        precio=data.precio
    )

@router.get("/{producto_id}", response_model=ProductoOut)
def obtener_producto(
    producto_id: int,
    db: Session = Depends(get_db)
):
    producto = crud_productos.get_producto(db, producto_id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto

@router.put("/{producto_id}", response_model=ProductoOut)
def actualizar_producto(
    producto_id: int,
    data: ProductoUpdate,
    db: Session = Depends(get_db)
):
    producto = crud_productos.update_producto(db, producto_id, data)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto

@router.delete("/{producto_id}")
def eliminar_producto(
    producto_id: int,
    db: Session = Depends(get_db)
):
    if not crud_productos.delete_producto(db, producto_id):
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"detalle": "Producto eliminado"}
