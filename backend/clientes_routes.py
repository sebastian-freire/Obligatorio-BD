from flask import Blueprint, jsonify, request
from db import get_connection

clientes_bp = Blueprint('clientes', __name__)

# Traer todos los clientes
@clientes_bp.route("/clientes", methods=["GET"])
def obtener_clientes():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM clientes")
        clientes = cursor.fetchall()
        
        return jsonify(clientes), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

# Traer un cliente específico
@clientes_bp.route("/clientes/<int:id>", methods=["GET"])
def obtener_cliente(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM clientes WHERE id = %s", (id,))
        cliente = cursor.fetchone()
        
        if cliente:
            return jsonify(cliente), 200
        else:
            return jsonify({"error": "Cliente no encontrado"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

# Crear un nuevo cliente
@clientes_bp.route("/clientes", methods=["POST"])
def agregar_cliente():
    try:
        data = request.get_json()
        
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO clientes (nombre, telefono, correo, direccion) VALUES (%s, %s, %s, %s)",
            (data.get("nombre"), data.get("telefono"), data.get("correo"), data.get("direccion"))
        )
        conn.commit()
        
        return jsonify({"message": "Cliente creado exitosamente"}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

# Modificar un cliente existente
@clientes_bp.route("/clientes/<int:id>", methods=["PATCH"])
def modificar_cliente(id):
    try:
        data = request.get_json()
        
        conn = get_connection()
        cursor = conn.cursor()
        
        # Verificar que el cliente existe
        cursor.execute("SELECT id FROM clientes WHERE id = %s", (id,))
        if not cursor.fetchone():
            return jsonify({"error": "Cliente no encontrado"}), 404
        
        # Construir query dinámicamente
        campos = []
        valores = []
        campos_permitidos = ["nombre", "telefono", "correo", "direccion"]
        
        for campo in campos_permitidos:
            if campo in data:
                campos.append(f"{campo}=%s")
                valores.append(data[campo])
        
        if not campos:
            return jsonify({"error": "No se enviaron campos válidos para actualizar"}), 400
        
        # Ejecutar actualización
        valores.append(id)
        query = f"UPDATE clientes SET {', '.join(campos)} WHERE id=%s"
        cursor.execute(query, valores)
        conn.commit()
        
        return jsonify({"message": "Cliente modificado exitosamente"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

# Eliminar un cliente
@clientes_bp.route("/clientes/<int:id>", methods=["DELETE"])
def eliminar_cliente(id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM clientes WHERE id = %s", (id,))
        
        if cursor.rowcount == 0:
            return jsonify({"error": "Cliente no encontrado"}), 404
            
        conn.commit()
        return jsonify({"message": "Cliente eliminado exitosamente"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()