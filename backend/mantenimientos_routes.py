from flask import Blueprint, jsonify, request
from db import get_user_connection
from auth import require_login

mantenimientos_bp = Blueprint('mantenimientos', __name__)

@mantenimientos_bp.route("/mantenimientos", methods=["GET"])
@require_login
def obtener_mantenimientos():
    try:
        conn = get_user_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM mantenimientos")
        mantenimientos = cursor.fetchall()
        
        return jsonify(mantenimientos), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@mantenimientos_bp.route("/mantenimientos", methods=["POST"])
@require_login
def crear_mantenimiento():
    try:
        data = request.get_json()
        conn = get_user_connection()
        cursor = conn.cursor()
        
        # 1. Validar foreign keys
        if 'ci_tecnico' in data:
            cursor.execute("SELECT ci FROM tecnicos WHERE ci = %s", (data['ci_tecnico'],))
            if not cursor.fetchone():
                return jsonify({"error": "El técnico con CI {} no existe".format(data['ci_tecnico'])}), 400
            
        if 'id_maquina' in data:
            cursor.execute("SELECT id FROM maquinas WHERE id = %s", (data['id_maquina'],))
            if not cursor.fetchone():
                return jsonify({"error": "La máquina con ID {} no existe".format(data['id_maquina'])}), 400
            
        # 2. Insertar mantenimiento
        cursor.execute("""
            INSERT INTO mantenimientos (id_maquina, ci_tecnico, tipo, fecha, observaciones)
            VALUES (%s, %s, %s, %s, %s)
        """, (data['id_maquina'], data['ci_tecnico'], data['tipo'], data['fecha'], data.get('observaciones', '')))
        
        conn.commit()
        return jsonify({"message": "Mantenimiento creado exitosamente"}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@mantenimientos_bp.route("/mantenimientos/<int:id>", methods=["PATCH"])
@require_login
def modificar_mantenimiento(id):
    try:
        data = request.get_json()
        conn = get_user_connection()
        cursor = conn.cursor()
        
        # 1. Verificar que el mantenimiento existe
        cursor.execute("SELECT id FROM mantenimientos WHERE id = %s", (id,))
        if not cursor.fetchone():
            return jsonify({"error": "Mantenimiento no encontrado"}), 404
        
        # 2. Validar foreign keys
        if 'ci_tecnico' in data:
            cursor.execute("SELECT ci FROM tecnicos WHERE ci = %s", (data['ci_tecnico'],))
            if not cursor.fetchone():
                return jsonify({"error": "El técnico con CI {} no existe".format(data['ci_tecnico'])}), 400
                
        if 'id_maquina' in data:
            cursor.execute("SELECT id FROM maquinas WHERE id = %s", (data['id_maquina'],))
            if not cursor.fetchone():
                return jsonify({"error": "La máquina con ID {} no existe".format(data['id_maquina'])}), 400
        
        # 3. Construir query dinámicamente
        campos = []
        valores = []
        campos_permitidos = ["id_maquina", "ci_tecnico", "tipo", "fecha", "observaciones"]
        
        for campo in campos_permitidos:
            if campo in data:
                campos.append(f"{campo}=%s")
                valores.append(data[campo])
        
        if not campos:
            return jsonify({"error": "No se enviaron campos válidos para actualizar"}), 400
        
        # 4. Ejecutar actualización
        valores.append(id)
        query = f"UPDATE mantenimientos SET {', '.join(campos)} WHERE id=%s"
        cursor.execute(query, valores)
        
        conn.commit()
        return jsonify({"message": "Mantenimiento modificado exitosamente"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@mantenimientos_bp.route("/mantenimientos/<int:id>", methods=["DELETE"])
@require_login
def eliminar_mantenimiento(id):
    try:
        conn = get_user_connection()
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM mantenimientos WHERE id = %s", (id,))
        
        if cursor.rowcount == 0:
            return jsonify({"error": "Mantenimiento no encontrado"}), 404
            
        conn.commit()
        return jsonify({"message": "Mantenimiento eliminado exitosamente"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@mantenimientos_bp.route("/mantenimientos/<int:id>", methods=["GET"])
@require_login
def obtener_mantenimiento(id):
    try:
        conn = get_user_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM mantenimientos WHERE id = %s", (id,))
        mantenimiento = cursor.fetchone()
        
        if mantenimiento:
            return jsonify(mantenimiento), 200
        else:
            return jsonify({"error": "Mantenimiento no encontrado"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()
