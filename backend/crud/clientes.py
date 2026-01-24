from sqlalchemy.orm import Session
from . import models, schemas, clientes

def read_clientes(db: Session):
    return db.query(models.Cliente).all()  # asumiendo que tienes un modelo Cliente

def read_productos(db: Session):
    return db.query(models.Producto).all()  # asumiendo que tienes un modelo Producto

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
