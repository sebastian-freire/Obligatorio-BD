from flask import Blueprint, jsonify, request
from db import get_connection

mantenimientos_bp = Blueprint('mantenimientos', __name__)

@mantenimientos_bp.route("/mantenimientos", methods=["GET"])
def obtener_mantenimientos():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM mantenimientos")
    mantenimientos = cursor.fetchall()
    conn.close()
    return jsonify(mantenimientos)

@mantenimientos_bp.route("/mantenimientos", methods=["POST"])
def crear_mantenimiento():
    data = request.json
    descripcion = data.get("descripcion")
    fecha = data.get("fecha")
    maquina_id = data.get("maquina_id")
    tecnico_id = data.get("tecnico_id")
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO mantenimientos (descripcion, fecha, maquina_id, tecnico_id) VALUES (%s, %s, %s, %s)",
        (descripcion, fecha, maquina_id, tecnico_id)
    )
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Mantenimiento creado"}), 201

@mantenimientos_bp.route("/mantenimientos/<int:id>", methods=["PATCH"])
def modificar_mantenimiento(id):
    data = request.json
    campos = []
    valores = []
    if "descripcion" in data:
        campos.append("descripcion=%s")
        valores.append(data["descripcion"])
    if "fecha" in data:
        campos.append("fecha=%s")
        valores.append(data["fecha"])
    if "maquina_id" in data:
        campos.append("maquina_id=%s")
        valores.append(data["maquina_id"])
    if "tecnico_id" in data:
        campos.append("tecnico_id=%s")
        valores.append(data["tecnico_id"])
    if not campos:
        return jsonify({"mensaje": "No se enviaron campos para actualizar"}), 400
    valores.append(id)
    query = f"UPDATE mantenimientos SET {', '.join(campos)} WHERE id=%s"
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(query, valores)
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Mantenimiento modificado"}), 200

@mantenimientos_bp.route("/mantenimientos/<int:id>", methods=["DELETE"])
def eliminar_mantenimiento(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM mantenimientos WHERE id = %s", (id,))
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Mantenimiento eliminado"}), 200
