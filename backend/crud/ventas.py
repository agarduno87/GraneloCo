from sqlalchemy.orm import Session
from .. models import Venta, VentaItem, Producto
from .. schemas import VentaCreate, VentaItemCreate
from .. import models, schemas
from backend.crud import ventas as crud_ventas

def read_ventas(db: Session):
    return db.query(models.Venta).all()  # asumiendo que tienes un modelo Venta

def crear_venta(db: Session, venta: VentaCreate):
    subtotal = 0.0
    items_out = []

    for item in venta.items:
        producto = db.query(Producto).filter(Producto.id == item.producto_id).first()
        if not producto:
            raise ValueError(f"Producto ID {item.producto_id} no existe")
        if producto.stock_kg < item.cantidad_kg:
            raise ValueError(f"Stock insuficiente para {producto.nombre}")
        
        precio_unitario = producto.precio_kg
        subtotal += precio_unitario * item.cantidad_kg

        # Descontar stock
        producto.stock_kg -= item.cantidad_kg
        db.add(producto)
        
        items_out.append(
            VentaItem(
                producto_id=producto.id,
                cantidad_kg=item.cantidad_kg,
                precio_unitario=precio_unitario
            )
        )

    impuestos = round(subtotal * 0.16, 2)
    total = subtotal + impuestos

    db_venta = Venta(
        cliente_id=venta.cliente_id,
        subtotal=subtotal,
        impuestos=impuestos,
        total=total,
        items=items_out
    )

    db.add(db_venta)
    db.commit()
    db.refresh(db_venta)
    return db_venta
