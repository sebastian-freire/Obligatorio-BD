from flask import Blueprint, jsonify, request
from db import get_connection

mantenimientos_bp = Blueprint('mantenimientos', __name__)

@mantenimientos_bp.route("/mantenimientos", methods=["GET"])
def obtener_mantenimientos():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM mantenimientos")
        mantenimientos = cursor.fetchall()
        conn.close()
        return jsonify(mantenimientos)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@mantenimientos_bp.route("/mantenimientos", methods=["POST"])
def crear_mantenimiento():
    try:
        data = request.json
        id_maquina = data.get("id_maquina")
        ci_tecnico = data.get("ci_tecnico")
        tipo = data.get("tipo")
        fecha = data.get("fecha")
        observaciones = data.get("observaciones")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO mantenimientos (id_maquina, ci_tecnico, tipo, fecha, observaciones) VALUES (%s, %s, %s, %s, %s)",
            (id_maquina, ci_tecnico, tipo, fecha, observaciones)
        )
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Mantenimiento creado"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@mantenimientos_bp.route("/mantenimientos/<int:id>", methods=["PATCH"])
def modificar_mantenimiento(id):
    try:
        data = request.json
        campos = []
        valores = []
        if "id_maquina" in data:
            campos.append("id_maquina=%s")
            valores.append(data["id_maquina"])
        if "ci_tecnico" in data:
            campos.append("ci_tecnico=%s")
            valores.append(data["ci_tecnico"])
        if "tipo" in data:
            campos.append("tipo=%s")
            valores.append(data["tipo"])
        if "fecha" in data:
            campos.append("fecha=%s")
            valores.append(data["fecha"])
        if "observaciones" in data:
            campos.append("observaciones=%s")
            valores.append(data["observaciones"])
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
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@mantenimientos_bp.route("/mantenimientos/<int:id>", methods=["DELETE"])
def eliminar_mantenimiento(id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM mantenimientos WHERE id = %s", (id,))
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Mantenimiento eliminado"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
