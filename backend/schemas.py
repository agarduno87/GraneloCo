from pydantic import BaseModel

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

class ProductoOut(ProductoBase):
    id: int
    class Config:
        from_attributes = True

# -------- VENTAS --------
class VentaBase(BaseModel):
    cliente_id: int
    total: float

class VentaOut(VentaBase):
    id: int
    class Config:
        from_attributes = True
