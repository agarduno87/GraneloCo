# schemas.py
from pydantic import BaseModel
from typing import Optional, List
from datetime import date

# -------------------
# PRODUCTOS
# -------------------
class ProductoBase(BaseModel):
    nombre: str
    precio: float
    stock: int

class ProductoCreate(ProductoBase):
    pass

class ProductoUpdate(BaseModel):
    nombre: Optional[str] = None
    precio: Optional[float] = None
    stock: Optional[int] = None

class Producto(ProductoBase):
    id: int

    class Config:
        orm_mode = True

# -------------------
# CLIENTES
# -------------------
class ClienteBase(BaseModel):
    nombre: str
    email: str
    telefono: Optional[str] = None

class ClienteCreate(ClienteBase):
    pass

class ClienteUpdate(BaseModel):
    nombre: Optional[str] = None
    email: Optional[str] = None
    telefono: Optional[str] = None

# Esta es la clase que tus routers llaman ClienteOut
class ClienteOut(ClienteBase):
    id: int

    class Config:
        orm_mode = True

# -------------------
# VENTAS
# -------------------
class VentaBase(BaseModel):
    cliente_id: int
    fecha: Optional[date] = None

class VentaCreate(VentaBase):
    productos_ids: List[int]

class VentaUpdate(BaseModel):
    cliente_id: Optional[int] = None
    fecha: Optional[date] = None
    productos_ids: Optional[List[int]] = None

class Venta(VentaBase):
    id: int
    productos: List[Producto] = []

    class Config:
        orm_mode = True

