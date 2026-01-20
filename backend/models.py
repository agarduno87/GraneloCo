from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    user = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)


class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    correo = Column(String, unique=True, nullable=False)
    telefono = Column(String)
    direccion = Column(String)


class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    precio_kg = Column(Float, nullable=False)
    stock_kg = Column(Float, nullable=False, default=0.0)
    unidad = Column(String, default="kg")


class Venta(Base):
    __tablename__ = "ventas"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("clientes.id"), nullable=False)
    subtotal = Column(Float, nullable=False)
    impuestos = Column(Float, nullable=False)
    total = Column(Float, nullable=False)

    cliente = relationship("Cliente")
    items = relationship(
        "VentaItem",
        back_populates="venta",
        cascade="all, delete-orphan"
    )


class VentaItem(Base):
    __tablename__ = "venta_items"

    id = Column(Integer, primary_key=True, index=True)
    venta_id = Column(Integer, ForeignKey("ventas.id"))
    producto_id = Column(Integer, ForeignKey("productos.id"))

    cantidad_kg = Column(Float, nullable=False)
    precio_unitario = Column(Float, nullable=False)

    venta = relationship("Venta", back_populates="items")
    producto = relationship("Producto")
