from flask import Blueprint, jsonify, request
from db import get_connection

insumos_bp = Blueprint('insumos', __name__)

@insumos_bp.route("/insumos", methods=["GET"])
def obtener_insumos():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM insumos")
    insumos = cursor.fetchall()
    conn.close()
    return jsonify(insumos)

@insumos_bp.route("/insumos", methods=["POST"])
def crear_insumo():
    data = request.json
    nombre = data.get("nombre")
    cantidad = data.get("cantidad")
    proveedor_id = data.get("proveedor_id")
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO insumos (nombre, cantidad, proveedor_id) VALUES (%s, %s, %s)",
        (nombre, cantidad, proveedor_id)
    )
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Insumo creado"}), 201

@insumos_bp.route("/insumos/<int:id>", methods=["PATCH"])
def modificar_insumo(id):
    data = request.json
    campos = []
    valores = []
    if "nombre" in data:
        campos.append("nombre=%s")
        valores.append(data["nombre"])
    if "cantidad" in data:
        campos.append("cantidad=%s")
        valores.append(data["cantidad"])
    if "proveedor_id" in data:
        campos.append("proveedor_id=%s")
        valores.append(data["proveedor_id"])
    if not campos:
        return jsonify({"mensaje": "No se enviaron campos para actualizar"}), 400
    valores.append(id)
    query = f"UPDATE insumos SET {', '.join(campos)} WHERE id=%s"
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(query, valores)
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Insumo modificado"}), 200

@insumos_bp.route("/insumos/<int:id>", methods=["DELETE"])
def eliminar_insumo(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM insumos WHERE id = %s", (id,))
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Insumo eliminado"}), 200
