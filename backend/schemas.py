from pydantic import BaseModel
from datetime import datetime

class ClienteBase(BaseModel):
    nombre: str
    email: str | None = None

class ClienteCreate(ClienteBase):
    pass

class ClienteOut(ClienteBase):
    id: int

    class Config:
        from_attributes = True


class ProductoBase(BaseModel):
    nombre: str
    precio: float
    stock: float

class ProductoCreate(ProductoBase):
    pass

class ProductoOut(ProductoBase):
    id: int

    class Config:
        from_attributes = True


class VentaCreate(BaseModel):
    cliente_id: int
    producto_id: int
    cantidad: float

class VentaOut(BaseModel):
    id: int
    total: float
    fecha: datetime

    class Config:
        from_attributes = True
