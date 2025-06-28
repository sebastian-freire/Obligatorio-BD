from flask import Blueprint, jsonify, request
from db import get_connection

clientes_bp = Blueprint('clientes', __name__)

# Traer todos los clientes
@clientes_bp.route("/clientes", methods=["GET"])
def obtener_clientes():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM clientes")
    clientes = cursor.fetchall()
    conn.close()
    return jsonify(clientes)

# Traer un cliente específico
@clientes_bp.route("/clientes/<int:id>", methods=["GET"])
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

# Crear un nuevo cliente
@clientes_bp.route("/clientes", methods=["POST"])
def agregar_cliente():
    try:
        data = request.get_json()
        nombre = data.get("nombre")
        telefono = data.get("telefono")
        correo = data.get("correo")
        direccion = data.get("direccion")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO clientes (nombre, telefono, correo, direccion) VALUES (%s, %s, %s, %s)",
            (nombre, telefono, correo, direccion)
        )
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Cliente agregado"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Modificar un cliente existente
@clientes_bp.route("/clientes/<int:id>", methods=["PATCH"])
def modificar_cliente(id):
    try:
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
        if "direccion" in data:
            campos.append("direccion=%s")
            valores.append(data["direccion"])
        if not campos:
            return jsonify({"mensaje": "No se enviaron campos para actualizar"}), 400
        valores.append(id)
        query = f"UPDATE clientes SET {', '.join(campos)} WHERE id=%s"
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(query, valores)
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Cliente modificado"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Eliminar un cliente
@clientes_bp.route("/clientes/<int:id>", methods=["DELETE"])
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