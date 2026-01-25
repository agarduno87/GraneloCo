from sqlalchemy.orm import Session
from models import Cliente
from schemas import ClienteBase


def get_clientes(db: Session):
    return db.query(Cliente).all()


def create_cliente(db: Session, nombre: str):
    cliente = Cliente(nombre=nombre)
    db.add(cliente)
    db.commit()
    db.refresh(cliente)
    return cliente
