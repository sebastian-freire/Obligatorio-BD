from flask import Blueprint, jsonify, request
from db import get_connection
from auth import require_admin 

maquinas_bp = Blueprint('maquinas', __name__)

@maquinas_bp.route("/maquinas", methods=["GET"])
@require_admin
def obtener_maquinas():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM maquinas")
        maquinas = cursor.fetchall()
        conn.close()
        return jsonify(maquinas)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@maquinas_bp.route("/maquinas/<int:id>", methods=["GET"])
@require_admin
def obtener_maquina():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM maquinas WHERE id = %s", (id,))
        maquinas = cursor.fetchall()
        conn.close()
        return jsonify(maquinas)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@maquinas_bp.route("/maquinas/cliente/<int:id>", methods=["GET"])
@require_admin
def obtener_maquinas_cliente():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM maquinas WHERE id_cliente = %s", (id))
        maquinas = cursor.fetchall()
        conn.close()
        return jsonify(maquinas)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@maquinas_bp.route("/maquinas", methods=["POST"])
@require_admin
def crear_maquina():
    try:
        data = request.json
        modelo = data.get("modelo")
        id_cliente = data.get("id_cliente")
        ubicacion_maquina = data.get("ubicacion_maquina")
        costo_alquiler_mensual = data.get("costo_alquiler_mensual")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO maquinas (modelo, id_cliente, ubicacion_maquina, costo_alquiler_mensual) VALUES (%s, %s, %s, %s)",
            (modelo, id_cliente, ubicacion_maquina, costo_alquiler_mensual)
        )
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Máquina creada"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@maquinas_bp.route("/maquinas/<int:id>", methods=["PATCH"])
@require_admin
def modificar_maquina(id):
    try:
        data = request.json
        campos = []
        valores = []
        if "modelo" in data:
            campos.append("modelo=%s")
            valores.append(data["modelo"])
        if "id_cliente" in data:
            campos.append("id_cliente=%s")
            valores.append(data["id_cliente"])
        if "ubicacion_maquina" in data:
            campos.append("ubicacion_maquina=%s")
            valores.append(data["ubicacion_maquina"])
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
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@maquinas_bp.route("/maquinas/<int:id>", methods=["DELETE"])
@require_admin
def eliminar_maquina(id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM maquinas WHERE id = %s", (id,))
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Máquina eliminada"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
