from flask import Blueprint, jsonify, request
from db import get_connection

tecnicos_bp = Blueprint('tecnicos', __name__)

@tecnicos_bp.route("/tecnicos", methods=["GET"])
def obtener_tecnicos():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tecnicos")
    tecnicos = cursor.fetchall()
    conn.close()
    return jsonify(tecnicos)

@tecnicos_bp.route("/tecnicos", methods=["POST"])
def crear_tecnico():
    data = request.json
    nombre = data.get("nombre")
    especialidad = data.get("especialidad")
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO tecnicos (nombre, especialidad) VALUES (%s, %s)",
        (nombre, especialidad)
    )
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Técnico creado"}), 201

@tecnicos_bp.route("/tecnicos/<int:id>", methods=["PATCH"])
def modificar_tecnico(id):
    data = request.json
    campos = []
    valores = []
    if "nombre" in data:
        campos.append("nombre=%s")
        valores.append(data["nombre"])
    if "especialidad" in data:
        campos.append("especialidad=%s")
        valores.append(data["especialidad"])
    if not campos:
        return jsonify({"mensaje": "No se enviaron campos para actualizar"}), 400
    valores.append(id)
    query = f"UPDATE tecnicos SET {', '.join(campos)} WHERE id=%s"
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(query, valores)
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Técnico modificado"}), 200

@tecnicos_bp.route("/tecnicos/<int:id>", methods=["DELETE"])
def eliminar_tecnico(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tecnicos WHERE id = %s", (id,))
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Técnico eliminado"}), 200
