from flask import Blueprint, request, jsonify
from db import get_auth_connection

login_bp = Blueprint('login', __name__)

@login_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        correo = data.get("correo")
        contrasena = data.get("contrasena")

        conn = get_auth_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT correo, es_administrador FROM login WHERE correo=%s AND contrasena=%s", (correo, contrasena))
        user = cursor.fetchone()
        
        if user:
            return jsonify({"success": True, "user": user}), 200
        else:
            return jsonify({"error": "Credenciales incorrectas"}), 401
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()