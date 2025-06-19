from flask import Blueprint, jsonify, request
from db import get_connection

tecnicos_bp = Blueprint('tecnicos', __name__)

@tecnicos_bp.route("/tecnicos", methods=["GET"])
def obtener_tecnicos():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM tecnicos")
        tecnicos = cursor.fetchall()
        conn.close()
        return jsonify(tecnicos)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@tecnicos_bp.route("/tecnicos", methods=["POST"])
def crear_tecnico():
    try:
        data = request.json
        ci = data.get("ci")
        nombre = data.get("nombre")
        apellido = data.get("apellido")
        telefono = data.get("telefono")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO tecnicos (ci, nombre, apellido, telefono) VALUES (%s, %s, %s, %s)",
            (ci, nombre, apellido, telefono)
        )
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Técnico creado"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@tecnicos_bp.route("/tecnicos/<ci>", methods=["PATCH"])
def modificar_tecnico(ci):
    try:
        data = request.json
        campos = []
        valores = []
        if "nombre" in data:
            campos.append("nombre=%s")
            valores.append(data["nombre"])
        if "apellido" in data:
            campos.append("apellido=%s")
            valores.append(data["apellido"])
        if "telefono" in data:
            campos.append("telefono=%s")
            valores.append(data["telefono"])
        if not campos:
            return jsonify({"mensaje": "No se enviaron campos para actualizar"}), 400
        valores.append(ci)
        query = f"UPDATE tecnicos SET {', '.join(campos)} WHERE ci=%s"
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(query, valores)
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Técnico modificado"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@tecnicos_bp.route("/tecnicos/<ci>", methods=["DELETE"])
def eliminar_tecnico(ci):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM tecnicos WHERE ci = %s", (ci,))
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Técnico eliminado"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
