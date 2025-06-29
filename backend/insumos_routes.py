from flask import Blueprint, jsonify, request
from db import get_connection

insumos_bp = Blueprint('insumos', __name__)

@insumos_bp.route("/insumos", methods=["GET"])
def obtener_insumos():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM insumos")
        insumos = cursor.fetchall()
        conn.close()
        return jsonify(insumos)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@insumos_bp.route("/insumos", methods=["POST"])
def crear_insumo():
    try:
        data = request.json
        descripcion = data.get("descripcion")
        tipo = data.get("tipo")
        precio_unitario = data.get("precio_unitario")
        id_proveedor = data.get("id_proveedor")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO insumos (descripcion, tipo, precio_unitario, id_proveedor) VALUES (%s, %s, %s, %s)",
            (descripcion, tipo, precio_unitario, id_proveedor)
        )
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Insumo creado"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@insumos_bp.route("/insumos/<int:id>", methods=["PATCH"])
def modificar_insumo(id):
    try:
        data = request.json
        campos = []
        valores = []
        if "descripcion" in data:
            campos.append("descripcion=%s")
            valores.append(data["descripcion"])
        if "tipo" in data:
            campos.append("tipo=%s")
            valores.append(data["tipo"])
        if "precio_unitario" in data:
            campos.append("precio_unitario=%s")
            valores.append(data["precio_unitario"])
        if "id_proveedor" in data:
            campos.append("id_proveedor=%s")
            valores.append(data["id_proveedor"])
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
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@insumos_bp.route("/insumos/<int:id>", methods=["DELETE"])
def eliminar_insumo(id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM insumos WHERE id = %s", (id,))
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Insumo eliminado"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@insumos_bp.route("/insumos/<int:id>", methods=["GET"])
def obtener_insumo(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM insumos WHERE id = %s", (id,))
        insumo = cursor.fetchone()
        conn.close()
        if insumo:
            return jsonify(insumo)
        else:
            return jsonify({"error": "Insumo no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
