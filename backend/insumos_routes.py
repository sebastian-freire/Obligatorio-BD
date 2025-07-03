from flask import Blueprint, jsonify, request
from db import get_user_connection
from auth import require_login

insumos_bp = Blueprint('insumos', __name__)

@insumos_bp.route("/insumos", methods=["GET"])
@require_login
def obtener_insumos():
    try:
        conn = get_user_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM insumos")
        insumos = cursor.fetchall()
        
        return jsonify(insumos), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@insumos_bp.route("/insumos", methods=["POST"])
@require_login
def crear_insumo():
    try:
        data = request.get_json()
        
        conn = get_user_connection()
        cursor = conn.cursor()
        
        # Validar foreign key
        if 'id_proveedor' in data:
            cursor.execute("SELECT id FROM proveedores WHERE id = %s", (data['id_proveedor'],))
            if not cursor.fetchone():
                return jsonify({"error": "El proveedor con ID {} no existe".format(data['id_proveedor'])}), 400
        
        cursor.execute(
            "INSERT INTO insumos (descripcion, tipo, precio_unitario, id_proveedor) VALUES (%s, %s, %s, %s)",
            (data.get("descripcion"), data.get("tipo"), data.get("precio_unitario"), data.get("id_proveedor"))
        )
        conn.commit()
        
        return jsonify({"message": "Insumo creado exitosamente"}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@insumos_bp.route("/insumos/<int:id>", methods=["PATCH"])
@require_login
def modificar_insumo(id):
    try:
        data = request.get_json()
        
        conn = get_user_connection()
        cursor = conn.cursor()
        
        # Verificar que el insumo existe
        cursor.execute("SELECT id FROM insumos WHERE id = %s", (id,))
        if not cursor.fetchone():
            return jsonify({"error": "Insumo no encontrado"}), 404
        
        # Validar foreign key
        if 'id_proveedor' in data:
            cursor.execute("SELECT id FROM proveedores WHERE id = %s", (data['id_proveedor'],))
            if not cursor.fetchone():
                return jsonify({"error": "El proveedor con ID {} no existe".format(data['id_proveedor'])}), 400
        
        # Construir query dinámicamente
        campos = []
        valores = []
        campos_permitidos = ["descripcion", "tipo", "precio_unitario", "id_proveedor"]
        
        for campo in campos_permitidos:
            if campo in data:
                campos.append(f"{campo}=%s")
                valores.append(data[campo])
        
        if not campos:
            return jsonify({"error": "No se enviaron campos válidos para actualizar"}), 400
        
        # Ejecutar actualización
        valores.append(id)
        query = f"UPDATE insumos SET {', '.join(campos)} WHERE id=%s"
        cursor.execute(query, valores)
        conn.commit()
        
        return jsonify({"message": "Insumo modificado exitosamente"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@insumos_bp.route("/insumos/<int:id>", methods=["DELETE"])
@require_login
def eliminar_insumo(id):
    try:
        conn = get_user_connection()
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM insumos WHERE id = %s", (id,))
        
        if cursor.rowcount == 0:
            return jsonify({"error": "Insumo no encontrado"}), 404
            
        conn.commit()
        return jsonify({"message": "Insumo eliminado exitosamente"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@insumos_bp.route("/insumos/<int:id>", methods=["GET"])
@require_login
def obtener_insumo(id):
    try:
        conn = get_user_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM insumos WHERE id = %s", (id,))
        insumo = cursor.fetchone()
        
        if insumo:
            return jsonify(insumo), 200
        else:
            return jsonify({"error": "Insumo no encontrado"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()
