from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from backend.models import Base
from backend.auth_routes import router as auth_router
from backend.clientes_routes import router as clientes_router
from backend.productos_routes import router as productos_router
from backend.ventas_routes import router as ventas_router
from backend.seed_runner import run_seed

# Crear tablas
Base.metadata.create_all(bind=engine)

# App
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers existentes
app.include_router(auth_router)
app.include_router(clientes_router)
app.include_router(productos_router)
app.include_router(ventas_router)

# Seed automático
run_seed()

# Root
@app.get("/")
def root():
    return {"msg":"Backend corriendo correctamente"}
