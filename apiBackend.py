from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="admin52560420",
        database="cafesmarloy"
    )

app = Flask(__name__)
CORS(app) 

# 1. ABM (Alta, Baja, Modificación) de:
# ○ Proveedores (Únicamente por los usuario administradores)
# ○ Insumos
# ○ Clientes
@app.route("/clientes", methods=["GET"])
def obtener_clientes():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM clientes")
    clientes = cursor.fetchall()
    conn.close()
    return jsonify(clientes)

@app.route("/clientes", methods=["POST"])
def agregar_cliente():
    data = request.json()
    id = data.get("id") 
    nombre = data.get("nombre")
    telefono = data.get("telefono")
    correo = data.get("correo")

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO clientes (id, nombre, telefono, correo) VALUES (%s, %s, %s, %s)",
        (id, nombre, telefono, correo)
    )
    conn.commit()
    conn.close()

    return jsonify({"mensaje": "Cliente agregado"}), 201
# ○ Máquinas (Únicamente por los usuario administradores)
# ○ Técnicos (Únicamente por los usuario administradores)
# ○ Mantenimientos


if __name__ == "__main__":
    app.run()