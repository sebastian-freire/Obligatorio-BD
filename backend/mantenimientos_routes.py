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
        data = request.get_json()
        ci_tecnico = data.get('ci_tecnico')
        id_maquina = data.get('id_maquina')
        
        conn = get_connection()
        cursor = conn.cursor()
        
        # Verificar si el técnico existe
        cursor.execute("SELECT ci FROM tecnicos WHERE ci = %s", (ci_tecnico,))
        if not cursor.fetchone():
            return jsonify({"error": "El técnico con CI {} no existe".format(ci_tecnico)}), 400
            
        # Verificar si la máquina existe
        cursor.execute("SELECT id FROM maquinas WHERE id = %s", (id_maquina,))
        if not cursor.fetchone():
            return jsonify({"error": "La máquina con ID {} no existe".format(id_maquina)}), 400
            
        # Insertar mantenimiento
        cursor.execute("""
            INSERT INTO mantenimientos (id_maquina, ci_tecnico, tipo, fecha, observaciones)
            VALUES (%s, %s, %s, %s, %s)
        """, (id_maquina, ci_tecnico, data['tipo'], data['fecha'], data['observaciones']))
        
        conn.commit()
        return jsonify({"message": "Mantenimiento creado exitosamente"}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

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

@mantenimientos_bp.route("/mantenimientos/<int:id>", methods=["GET"])
def obtener_mantenimiento(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM mantenimientos WHERE id = %s", (id,))
        mantenimiento = cursor.fetchone()
        conn.close()
        if mantenimiento:
            return jsonify(mantenimiento)
        else:
            return jsonify({"error": "Mantenimiento no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
