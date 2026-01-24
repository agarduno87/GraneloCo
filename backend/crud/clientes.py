from sqlalchemy.orm import Session
from models import Cliente
from schemas import ClienteCreate


def get_clientes(db: Session):
    return db.query(Cliente).all()


def create_cliente(db: Session, cliente: ClienteCreate):
    db_cliente = Cliente(
        nombre=cliente.nombre,
        email=cliente.email,
        telefono=cliente.telefono
    )
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente
