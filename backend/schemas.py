from pydantic import BaseModel
from typing import List, Optional

# -------- AUTH --------
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UsuarioLogin(BaseModel):
    username: str
    password: str


# -------- CLIENTES --------
class ClienteBase(BaseModel):
    nombre: str

class ClienteCreate(ClienteBase):
    pass

class ClienteOut(ClienteBase):
    id: int

    class Config:
        from_attributes = True


# -------- PRODUCTOS --------
class ProductoBase(BaseModel):
    nombre: str
    precio: float

class ProductoCreate(ProductoBase):
    pass

class ProductoUpdate(BaseModel):
    nombre: Optional[str] = None
    precio: Optional[float] = None
    stock: Optional[int] = None

class ProductoRead(ProductoBase):
    id: int
    stock: int

    class Config:
        from_attributes = True

class ProductoOut(ProductoRead):
    pass


# -------- VENTAS --------
class VentaItemCreate(BaseModel):
    producto_id: int
    cantidad: int

class VentaCreate(BaseModel):
    cliente_id: int
    items: List[VentaItemCreate]

class VentaRead(BaseModel):
    id: int
    cliente_id: int
    subtotal: float
    impuestos: float
    total: float

    class Config:
        from_attributes = True
