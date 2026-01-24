from sqlalchemy.orm import Session
from models import Venta, VentaItem, Producto
from schemas import VentaCreate

def get_ventas(db: Session):
    return db.query(Venta).all()


def crear_venta(db: Session, venta: VentaCreate):
    subtotal = 0
    items_db = []

    for item in venta.items:
        producto = db.query(Producto).filter(Producto.id == item.producto_id).first()
        if not producto:
            raise ValueError("Producto no existe")

        if producto.stock < item.cantidad:
            raise ValueError("Stock insuficiente")

        producto.stock -= item.cantidad
        precio_unitario = producto.precio
        subtotal += precio_unitario * item.cantidad

        items_db.append(
            VentaItem(
                producto_id=producto.id,
                cantidad=item.cantidad,
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
        items=items_db
    )

    db.add(db_venta)
    db.commit()
    db.refresh(db_venta)
    return db_venta
