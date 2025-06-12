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
#Proveedores (Únicamente por los usuario administradores)-------------------------------------
#Insumos--------------------------------------------------------------------------------------

#Direcciones----------------------------------------------------------------------------------
#Traer todas las direcciones de un cliente
#Eliminar una direccion
#Agregar una direccion a un cliente

#Clientes ------------------------------------------------------------------------------------
#Traer todos los clientes----------------------------
@app.route("/clientes", methods=["GET"])
def obtener_clientes():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM clientes")
    clientes = cursor.fetchall()
    conn.close()
    return jsonify(clientes)

#Traer un cliente especifico------------------------
@app.route("/clientes/<int:id>", methods=["GET"])
def obtener_cliente(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM clientes WHERE id = %s", (id,))
        cliente = cursor.fetchone()
        conn.close()

        if cliente:
            return jsonify(cliente)
        else:
            return jsonify({"error": "Cliente no encontrado"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#Crear un nuevo cliente-----------------------------------
@app.route("/clientes", methods=["POST"])
def agregar_cliente():
    try:
        data = request.get_json()
        nombre = data.get("nombre")
        telefono = data.get("telefono")
        correo = data.get("correo")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO clientes (nombre, telefono, correo) VALUES (%s, %s, %s)",
            (id, nombre, telefono, correo)
        )
        conn.commit()
        conn.close()

        return jsonify({"mensaje": "Cliente agregado"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#Modificar un cliente exsistente---------------------------------------
@app.route("/clientes/<int:id>", methods=["PATCH"])
def modificar_cliente(id):
    data = request.json
    campos = []
    valores = []

    if "nombre" in data:
        campos.append("nombre=%s")
        valores.append(data["nombre"])
    if "telefono" in data:
        campos.append("telefono=%s")
        valores.append(data["telefono"])
    if "correo" in data:
        campos.append("correo=%s")
        valores.append(data["correo"])

    if not campos:
        return jsonify({"mensaje": "No se enviaron campos para actualizar"}), 400

    valores.append(id)
    query = f"UPDATE clientes SET {', '.join(campos)} WHERE id=%s"

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(query, valores) #Linea peleadora, esta es la que remplaza los %s por los valores en orden
    conn.commit()
    conn.close()

    return jsonify({"mensaje": "Cliente modificado"}), 200

#Eliminar un cliente---------------------------------------------------------
@app.route("/clientes/<id>", methods=["DELETE"])
def eliminar_cliente(id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM clientes WHERE id = %s", (id,))
        conn.commit()
        conn.close()

        return jsonify({"mensaje": "Cliente eliminado"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#Máquinas (Únicamente por los usuario administradores)---------------------------------------------
#Técnicos (Únicamente por los usuario administradores)---------------------------------------------
#Mantenimientos------------------------------------------------------------------------------------


if __name__ == "__main__":
    app.run()