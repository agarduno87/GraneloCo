from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from auth_routes import router as auth_router
from clientes_routes import router as clientes_router
from ventas_routes import router as ventas_router
from crud.productos import router as productos_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="GraneloCo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(clientes_router)
app.include_router(productos_router)
app.include_router(ventas_router)

@app.get("/")
def root():
    return {"status": "Backend OK"}
