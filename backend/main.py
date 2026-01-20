from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import init_db
from auth_routes import router as auth_router
from clientes_routes import router as clientes_router
from ventas_routes import router as ventas_router
from crud.productos import router as productos_router

app = FastAPI(title="GraneloCo API")

# -----------------------
# CORS
# -----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# INIT DB
# -----------------------
init_db()

# -----------------------
# ROUTERS
# -----------------------
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(clientes_router, prefix="/clientes", tags=["Clientes"])
app.include_router(productos_router, prefix="/productos", tags=["Productos"])
app.include_router(ventas_router, prefix="/ventas", tags=["Ventas"])
