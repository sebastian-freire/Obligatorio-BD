from flask import Blueprint, request, jsonify
from db import get_connection

login_bp = Blueprint('login', __name__)

@login_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        correo = data.get("correo")
        contrasena = data.get("contrasena")
        
        conn = get_connection()
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

@login_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        correo = data.get("correo")
        contrasena = data.get("contrasena")
        es_administrador = data.get("es_administrador", False)
        
        conn = get_connection()
        cursor = conn.cursor()
        
        cursor.execute("INSERT INTO login (correo, contrasena, es_administrador) VALUES (%s, %s, %s)", 
                      (correo, contrasena, es_administrador))
        conn.commit()
        
        return jsonify({"message": "Usuario registrado exitosamente"}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()
