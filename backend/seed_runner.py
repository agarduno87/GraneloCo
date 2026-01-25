from database import SessionLocal
from models import Usuario
from auth import hash_password

def run_seed():
    """
    Crea un usuario admin por defecto si no existe
    """
    db = SessionLocal()
    exists = db.query(Usuario).filter(Usuario.username == "admin").first()
    if not exists:
        admin = Usuario(
            username="Granel",
            password=hash_password("Agarduno_87")
        )
        db.add(admin)
        db.commit()
        print("✔ Usuario admin creado")
    else:
        print("ℹ Usuario admin ya existe")
    db.close()
