from pydantic import BaseModel
from typing import Optional, List
from datetime import date

# -------- PRODUCTOS --------
class ProductoRead(BaseModel):
    id: int
    nombre: str
    precio: float
    stock: float

    class Config:
        from_attributes = True


# -------- CLIENTES --------
class ClienteRead(BaseModel):
    id: int
    nombre: str
    email: str | None = None

    class Config:
        from_attributes = True


# -------- VENTAS --------
class VentaItemCreate(BaseModel):
    producto_id: int
    cantidad: float


class VentaItemRead(BaseModel):
    producto: ProductoRead
    cantidad: float
    precio_unitario: float

    class Config:
        from_attributes = True


class VentaCreate(BaseModel):
    cliente_id: int
    items: List[VentaItemCreate]


class VentaRead(BaseModel):
    id: int
    cliente: ClienteRead
    subtotal: float
    impuestos: float
    total: float
    fecha: date
    items: List[VentaItemRead]

    class Config:
        from_attributes = True
