# clientes_routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import clientes as crud_clientes
from schemas import ClienteCreate, ClienteOut
from database import get_db

router = APIRouter(
    prefix="/clientes",
    tags=["clientes"]
)

@router.get("/", response_model=list[ClienteOut])
def listar(db: Session = Depends(get_db)):
    return get_clientes(db)

@router.post("/", response_model=ClienteOut)
def crear(data: ClienteCreate, db: Session = Depends(get_db)):
    return crud_clientes.create_cliente(db, data.nombre)



@router.get("/{cliente_id}", response_model=ClienteOut)
def obtener_cliente(cliente_id: int, db: Session = Depends(get_db)):
    cliente = crud_clientes.get_cliente(db, cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente


# @router.put("/{cliente_id}", response_model=ClienteRead)
# def actualizar_cliente(cliente_id: int, cliente: ClienteUpdate, db: Session = Depends(get_db)):
#    db_cliente = crud_clientes.update_cliente(db, cliente_id, cliente)
#    if not db_cliente:
#        raise HTTPException(status_code=404, detail="Cliente no encontrado")
#    return db_cliente

@router.delete("/{cliente_id}")
def eliminar_cliente(cliente_id: int, db: Session = Depends(get_db)):
    success = crud_clientes.delete_cliente(db, cliente_id)
    if not success:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return {"detalle": "Cliente eliminado"}
