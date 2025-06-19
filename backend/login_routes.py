from flask import Blueprint, request, jsonify
from db import get_connection

login_bp = Blueprint('login', __name__)

# Iniciar sesión
@login_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    correo = data.get("correo")
    contrasena = data.get("contrasena")
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT correo, es_administrador FROM login WHERE correo=%s AND contrasena=%s", (correo, contrasena))
    user = cursor.fetchone()
    conn.close()
    if user:
        return jsonify({"success": True, "user": user})
    else:
        return jsonify({"success": False, "message": "Credenciales incorrectas"}), 401

# Registrar usuario (opcional)
@login_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    correo = data.get("correo")
    contrasena = data.get("contrasena")
    es_administrador = data.get("es_administrador", False)
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO login (correo, contrasena, es_administrador) VALUES (%s, %s, %s)", (correo, contrasena, es_administrador))
        conn.commit()
        return jsonify({"success": True, "message": "Usuario registrado"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400
    finally:
        conn.close()
