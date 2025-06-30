from functools import wraps
from flask import request, jsonify
from db import get_auth_connection

def require_login(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        correo = request.headers.get("X-User-Email")
        if not correo:
            return jsonify({"error": "No autorizado, falta correo"}), 401
        conn = get_auth_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT correo FROM login WHERE correo=%s", (correo,))
        user = cursor.fetchone()
        conn.close()
        if not user:
            return jsonify({"error": "Usuario no válido"}), 401
        return f(*args, **kwargs)
    return decorated

def require_admin(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        correo = request.headers.get("X-User-Email")
        if not correo:
            return jsonify({"error": "No autorizado, falta correo"}), 401
        conn = get_auth_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT es_administrador FROM login WHERE correo=%s", (correo,))
        user = cursor.fetchone()
        conn.close()
        if not user or not user[0]:
            return jsonify({"error": "Solo administradores"}), 403
        return f(*args, **kwargs)
    return decorated