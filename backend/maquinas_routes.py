from flask import Blueprint, jsonify, request
from db import get_connection

maquinas_bp = Blueprint('maquinas', __name__)

@maquinas_bp.route("/maquinas", methods=["GET"])
def obtener_maquinas():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM maquinas")
    maquinas = cursor.fetchall()
    conn.close()
    return jsonify(maquinas)

@maquinas_bp.route("/maquinas", methods=["POST"])
def crear_maquina():
    data = request.json
    modelo = data.get("modelo")
    id_cliente = data.get("id_cliente")
    ubicacion_cliente = data.get("ubicacion_cliente")
    costo_alquiler_mensual = data.get("costo_alquiler_mensual")
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO maquinas (modelo, id_cliente, ubicacion_cliente, costo_alquiler_mensual) VALUES (%s, %s, %s, %s)",
        (modelo, id_cliente, ubicacion_cliente, costo_alquiler_mensual)
    )
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Máquina creada"}), 201

@maquinas_bp.route("/maquinas/<int:id>", methods=["PATCH"])
def modificar_maquina(id):
    data = request.json
    campos = []
    valores = []
    if "modelo" in data:
        campos.append("modelo=%s")
        valores.append(data["modelo"])
    if "id_cliente" in data:
        campos.append("id_cliente=%s")
        valores.append(data["id_cliente"])
    if "ubicacion_cliente" in data:
        campos.append("ubicacion_cliente=%s")
        valores.append(data["ubicacion_cliente"])
    if "costo_alquiler_mensual" in data:
        campos.append("costo_alquiler_mensual=%s")
        valores.append(data["costo_alquiler_mensual"])
    if not campos:
        return jsonify({"mensaje": "No se enviaron campos para actualizar"}), 400
    valores.append(id)
    query = f"UPDATE maquinas SET {', '.join(campos)} WHERE id=%s"
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(query, valores)
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Máquina modificada"}), 200

@maquinas_bp.route("/maquinas/<int:id>", methods=["DELETE"])
def eliminar_maquina(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM maquinas WHERE id = %s", (id,))
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Máquina eliminada"}), 200
