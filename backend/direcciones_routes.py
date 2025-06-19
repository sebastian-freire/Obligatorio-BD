from flask import Blueprint, jsonify, request
from db import get_connection

direcciones_bp = Blueprint('direcciones', __name__)

# Obtener todas las direcciones
@direcciones_bp.route("/direcciones", methods=["GET"])
def obtener_direcciones():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM direcciones")
    direcciones = cursor.fetchall()
    conn.close()
    return jsonify(direcciones)

# Crear una nueva dirección
@direcciones_bp.route("/direcciones", methods=["POST"])
def crear_direccion():
    data = request.json
    id_cliente = data.get("id_cliente")
    direccion = data.get("direccion")
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO direcciones (id_cliente, direccion) VALUES (%s, %s)",
        (id_cliente, direccion)
    )
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Dirección creada"}), 201

# Modificar una dirección (solo la dirección, ya que id_cliente es parte de la PK)
@direcciones_bp.route("/direcciones", methods=["PATCH"])
def modificar_direccion():
    data = request.json
    id_cliente = data.get("id_cliente")
    direccion_actual = data.get("direccion_actual")
    direccion_nueva = data.get("direccion_nueva")
    if not id_cliente or not direccion_actual or not direccion_nueva:
        return jsonify({"mensaje": "Faltan datos para actualizar"}), 400
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE direcciones SET direccion=%s WHERE id_cliente=%s AND direccion=%s",
        (direccion_nueva, id_cliente, direccion_actual)
    )
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Dirección modificada"}), 200

# Eliminar una dirección
@direcciones_bp.route("/direcciones", methods=["DELETE"])
def eliminar_direccion():
    data = request.json
    id_cliente = data.get("id_cliente")
    direccion = data.get("direccion")
    if not id_cliente or not direccion:
        return jsonify({"mensaje": "Faltan datos para eliminar"}), 400
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "DELETE FROM direcciones WHERE id_cliente = %s AND direccion = %s",
        (id_cliente, direccion)
    )
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Dirección eliminada"}), 200
