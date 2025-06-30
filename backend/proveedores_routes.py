from flask import Blueprint, jsonify, request
from db import get_connection
from auth import require_admin

proveedores_bp = Blueprint('proveedores', __name__)

# Traer todos los proveedores
@proveedores_bp.route("/proveedores", methods=["GET"])
@require_admin
def obtener_proveedores():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM proveedores")
        proveedores = cursor.fetchall()
        conn.close()
        return jsonify(proveedores)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Obtener un proveedor específico por ID
@proveedores_bp.route("/proveedores/<int:id>", methods=["GET"])
@require_admin
def obtener_proveedor(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM proveedores WHERE id = %s", (id,))
        proveedor = cursor.fetchone()
        conn.close()
        if proveedor:
            return jsonify(proveedor)
        else:
            return jsonify({"error": "Proveedor no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Crear un nuevo proveedor
@proveedores_bp.route("/proveedores", methods=["POST"])
@require_admin
def crear_proveedor():
    try:
        data = request.json
        nombre = data.get("nombre")
        contacto = data.get("contacto")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO proveedores (nombre, contacto) VALUES (%s, %s)",
            (nombre, contacto)
        )
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Proveedor creado"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Modificar un proveedor
@proveedores_bp.route("/proveedores/<int:id>", methods=["PATCH"])
@require_admin
def modificar_proveedor(id):
    try:
        data = request.json
        campos = []
        valores = []
        if "nombre" in data:
            campos.append("nombre=%s")
            valores.append(data["nombre"])
        if "contacto" in data:
            campos.append("contacto=%s")
            valores.append(data["contacto"])
        if not campos:
            return jsonify({"mensaje": "No se enviaron campos para actualizar"}), 400
        valores.append(id)
        query = f"UPDATE proveedores SET {', '.join(campos)} WHERE id=%s"
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(query, valores)
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Proveedor modificado"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Eliminar un proveedor
@proveedores_bp.route("/proveedores/<int:id>", methods=["DELETE"])
@require_admin
def eliminar_proveedor(id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM proveedores WHERE id = %s", (id,))
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Proveedor eliminado"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
