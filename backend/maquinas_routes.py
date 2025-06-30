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
        
        return jsonify(maquinas), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()
    
@maquinas_bp.route("/maquinas/<int:id>", methods=["GET"])
@require_admin
def obtener_maquina(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM maquinas WHERE id = %s", (id,))
        maquina = cursor.fetchone()
        
        if maquina:
            return jsonify(maquina), 200
        else:
            return jsonify({"error": "Máquina no encontrada"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()
    
@maquinas_bp.route("/maquinas/cliente/<int:id>", methods=["GET"])
@require_admin
def obtener_maquinas_cliente(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM maquinas WHERE id_cliente = %s", (id,))
        maquinas = cursor.fetchall()
        
        return jsonify(maquinas), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@maquinas_bp.route("/maquinas", methods=["POST"])
@require_admin
def crear_maquina():
    try:
        data = request.get_json()
        conn = get_connection()
        cursor = conn.cursor()
        
        # Validar foreign key
        if 'id_cliente' in data:
            cursor.execute("SELECT id FROM clientes WHERE id = %s", (data['id_cliente'],))
            if not cursor.fetchone():
                return jsonify({"error": "El cliente con ID {} no existe".format(data['id_cliente'])}), 400
        
        cursor.execute(
            "INSERT INTO maquinas (modelo, id_cliente, ubicacion_maquina, costo_alquiler_mensual) VALUES (%s, %s, %s, %s)",
            (data.get("modelo"), data.get("id_cliente"), data.get("ubicacion_maquina"), data.get("costo_alquiler_mensual"))
        )
        conn.commit()
        
        return jsonify({"message": "Máquina creada exitosamente"}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@maquinas_bp.route("/maquinas/<int:id>", methods=["PATCH"])
@require_admin
def modificar_maquina(id):
    try:
        data = request.get_json()
        conn = get_connection()
        cursor = conn.cursor()
        
        # Verificar que la máquina existe
        cursor.execute("SELECT id FROM maquinas WHERE id = %s", (id,))
        if not cursor.fetchone():
            return jsonify({"error": "Máquina no encontrada"}), 404
        
        # Validar foreign key
        if 'id_cliente' in data:
            cursor.execute("SELECT id FROM clientes WHERE id = %s", (data['id_cliente'],))
            if not cursor.fetchone():
                return jsonify({"error": "El cliente con ID {} no existe".format(data['id_cliente'])}), 400
        
        # Construir query dinámicamente
        campos = []
        valores = []
        campos_permitidos = ["modelo", "id_cliente", "ubicacion_maquina", "costo_alquiler_mensual"]
        
        for campo in campos_permitidos:
            if campo in data:
                campos.append(f"{campo}=%s")
                valores.append(data[campo])
        
        if not campos:
            return jsonify({"error": "No se enviaron campos válidos para actualizar"}), 400
        
        # Ejecutar actualización
        valores.append(id)
        query = f"UPDATE maquinas SET {', '.join(campos)} WHERE id=%s"
        cursor.execute(query, valores)
        conn.commit()
        
        return jsonify({"message": "Máquina modificada exitosamente"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@maquinas_bp.route("/maquinas/<int:id>", methods=["DELETE"])
@require_admin
def eliminar_maquina(id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        # Eliminar máquina
        cursor.execute("DELETE FROM maquinas WHERE id = %s", (id,))
        conn.commit()
        
        return jsonify({"message": "Máquina eliminada exitosamente"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()
