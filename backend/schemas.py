# schemas.py
from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional, List

# -------------------
# CLIENTES
# -------------------
class ClienteBase(BaseModel):
    nombre: str
    correo: EmailStr

class ClienteCreate(ClienteBase):
    pass

class ClienteOut(ClienteBase):
    id: int

# -------------------
# USUARIOS / AUTH
# -------------------
class UsuarioBase(BaseModel):
    nombre: str
    correo: EmailStr

class UsuarioCreate(UsuarioBase):
    password: str

class UsuarioOut(UsuarioBase):
    id: int
    token: Optional[str] = None  # para login

class UsuarioLogin(BaseModel):
    correo: EmailStr
    password: str

# -------------------
# PRODUCTOS
# -------------------
class ProductoBase(BaseModel):
    nombre: str
    precio_kg: float
    stock_kg: float
    unidad: Optional[str] = "kg"

class ProductoCreate(ProductoBase):
    pass

class ProductoOut(ProductoBase):
    id: int

# -------------------
# VENTAS / VENTA ITEMS
# -------------------
class VentaItemBase(BaseModel):
    producto_id: int
    cantidad_kg: float
    precio_unitario: float

class VentaItemCreate(VentaItemBase):
    pass

class VentaItemOut(VentaItemBase):
    id: int

class VentaBase(BaseModel):
    cliente_id: int
    subtotal: float
    impuestos: float
    total: float

class VentaCreate(VentaBase):
    items: List[VentaItemCreate]

class VentaOut(VentaBase):
    id: int
    items: List[VentaItemOut] = []
