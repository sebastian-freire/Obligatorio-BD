from flask import Blueprint, jsonify, request
from db import get_connection
from auth import require_admin

proveedores_bp = Blueprint('proveedores', __name__)

@proveedores_bp.route("/proveedores", methods=["GET"])
@require_admin
def obtener_proveedores():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM proveedores")
        proveedores = cursor.fetchall()
        
        return jsonify(proveedores), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@proveedores_bp.route("/proveedores/<int:id>", methods=["GET"])
@require_admin
def obtener_proveedor(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM proveedores WHERE id = %s", (id,))
        proveedor = cursor.fetchone()
        
        if proveedor:
            return jsonify(proveedor), 200
        else:
            return jsonify({"error": "Proveedor no encontrado"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@proveedores_bp.route("/proveedores", methods=["POST"])
@require_admin
def crear_proveedor():
    try:
        data = request.get_json()
        conn = get_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            "INSERT INTO proveedores (nombre, contacto) VALUES (%s, %s)",
            (data['nombre'], data.get('contacto', ''))
        )
        
        conn.commit()
        return jsonify({"message": "Proveedor creado exitosamente"}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@proveedores_bp.route("/proveedores/<int:id>", methods=["PATCH"])
@require_admin
def modificar_proveedor(id):
    try:
        data = request.get_json()
        conn = get_connection()
        cursor = conn.cursor()
        
        # Verificar que el proveedor existe
        cursor.execute("SELECT id FROM proveedores WHERE id = %s", (id,))
        if not cursor.fetchone():
            return jsonify({"error": "Proveedor no encontrado"}), 404
        
        # Construir query dinámicamente
        campos = []
        valores = []
        campos_permitidos = ["nombre", "contacto"]
        
        for campo in campos_permitidos:
            if campo in data:
                campos.append(f"{campo}=%s")
                valores.append(data[campo])
        
        if not campos:
            return jsonify({"error": "No se enviaron campos válidos para actualizar"}), 400
        
        valores.append(id)
        query = f"UPDATE proveedores SET {', '.join(campos)} WHERE id=%s"
        cursor.execute(query, valores)
        
        conn.commit()
        return jsonify({"message": "Proveedor modificado exitosamente"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@proveedores_bp.route("/proveedores/<int:id>", methods=["DELETE"])
@require_admin
def eliminar_proveedor(id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM proveedores WHERE id = %s", (id,))
        
        if cursor.rowcount == 0:
            return jsonify({"error": "Proveedor no encontrado"}), 404
            
        conn.commit()
        return jsonify({"message": "Proveedor eliminado exitosamente"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()
