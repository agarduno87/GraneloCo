from sqlalchemy.orm import Session
from .models import Cliente
from .schemas import ClienteCreate, ClienteRead
from . import models, schemas, clientes
from .database import SessionLocal

def read_clientes():
    db = SessionLocal()
    clientes = db.query(Cliente).all()
    db.close()
    return clientes

def read_productos(db: Session):
    return db.query(models.Producto).all()  # asumiendo que tienes un modelo Producto

def read_clientes(db: Session):
    return db.query(models.Cliente).all()

def get_clientes(db: Session):
    return db.query(models.Cliente).all()

def create_cliente(db: Session, cliente: schemas.ClienteCreate):
    db_cliente = models.Cliente(
        nombre=cliente.nombre,
        correo=cliente.correo
    )
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente
