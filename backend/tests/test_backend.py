import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

productos_test = [
    {"nombre":"Cafe","precio_venta":20,"cantidad":1,"iva":0.16,"ieps":0},
    {"nombre":"Azucar","precio_venta":15,"cantidad":3,"iva":0.16,"ieps":0},
    {"nombre":"Refresco","precio_venta":18,"cantidad":5,"iva":0.16,"ieps":0.08},
    {"nombre":"Leche","precio_venta":12,"cantidad":2,"iva":0.16,"ieps":0},
    {"nombre":"Pan","precio_venta":10,"cantidad":10,"iva":0.16,"ieps":0}
]

@pytest.mark.parametrize("items", [
    [productos_test[0]],
    [productos_test[1]],
    [productos_test[2]],
    [productos_test[3]],
    [productos_test[4]],
    productos_test[:2],
    productos_test[:3],
    productos_test[:4],
    productos_test[:5],
    productos_test + [{"nombre":"ProductoExtra","precio_venta":5,"cantidad":1,"iva":0,"ieps":0}],
    [{"nombre":"Cafe","precio_venta":20,"cantidad":0,"iva":0.16,"ieps":0}],
    [{"nombre":"Cafe","precio_venta":20,"cantidad":-1,"iva":0.16,"ieps":0}],
    [{"nombre":"Cafe","precio_venta":0,"cantidad":1,"iva":0,"ieps":0}],
    [{"nombre":"Azucar","precio_venta":15,"cantidad":100,"iva":0.16,"ieps":0}],
    [{"nombre":"Refresco","precio_venta":18,"cantidad":2,"iva":0.16,"ieps":0.08}],
    [{"nombre":"Leche","precio_venta":12,"cantidad":3,"iva":0.16,"ieps":0}],
    [{"nombre":"Pan","precio_venta":10,"cantidad":5,"iva":0.16,"ieps":0}],
    [{"nombre":"Cafe","precio_venta":20,"cantidad":1,"iva":0.16,"ieps":0},{"nombre":"Pan","precio_venta":10,"cantidad":2,"iva":0.16,"ieps":0}],
    [{"nombre":"Azucar","precio_venta":15,"cantidad":3,"iva":0.16,"ieps":0},{"nombre":"Leche","precio_venta":12,"cantidad":1,"iva":0.16,"ieps":0}],
    productos_test
])
def test_ventas(items):
    response = client.post("/ventas", json=items)
    assert response.status_code == 200
    data = response.json()
    assert "totales" in data
    assert data["totales"]["total"] >= 0
