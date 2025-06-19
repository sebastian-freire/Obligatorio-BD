from flask import Blueprint, jsonify, request
from db import get_connection

proveedores_bp = Blueprint('proveedores', __name__)

# Traer todos los proveedores
@proveedores_bp.route("/proveedores", methods=["GET"])
def obtener_proveedores():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM proveedores")
    proveedores = cursor.fetchall()
    conn.close()
    return jsonify(proveedores)

# Crear un nuevo proveedor
@proveedores_bp.route("/proveedores", methods=["POST"])
def crear_proveedor():
    data = request.json
    nombre = data.get("nombre")
    telefono = data.get("telefono")
    correo = data.get("correo")
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO proveedores (nombre, telefono, correo) VALUES (%s, %s, %s)",
        (nombre, telefono, correo)
    )
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Proveedor creado"}), 201

# Modificar un proveedor
@proveedores_bp.route("/proveedores/<int:id>", methods=["PATCH"])
def modificar_proveedor(id):
    data = request.json
    campos = []
    valores = []
    if "nombre" in data:
        campos.append("nombre=%s")
        valores.append(data["nombre"])
    if "telefono" in data:
        campos.append("telefono=%s")
        valores.append(data["telefono"])
    if "correo" in data:
        campos.append("correo=%s")
        valores.append(data["correo"])
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

# Eliminar un proveedor
@proveedores_bp.route("/proveedores/<int:id>", methods=["DELETE"])
def eliminar_proveedor(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM proveedores WHERE id = %s", (id,))
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Proveedor eliminado"}), 200
