from flask import Blueprint, jsonify, request
from db import get_connection
from auth import require_admin

tecnicos_bp = Blueprint('tecnicos', __name__)

@tecnicos_bp.route("/tecnicos", methods=["GET"])
@require_admin
def obtener_tecnicos():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM tecnicos")
        tecnicos = cursor.fetchall()
        
        return jsonify(tecnicos), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@tecnicos_bp.route("/tecnicos/<ci>", methods=["GET"])
@require_admin
def obtener_tecnico(ci):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM tecnicos WHERE ci = %s", (ci,))
        tecnico = cursor.fetchone()
        
        if tecnico:
            return jsonify(tecnico), 200
        else:
            return jsonify({"error": "Técnico no encontrado"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@tecnicos_bp.route("/tecnicos", methods=["POST"])
@require_admin
def crear_tecnico():
    try:
        data = request.get_json()
        conn = get_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            "INSERT INTO tecnicos (ci, nombre, apellido, telefono) VALUES (%s, %s, %s, %s)",
            (data['ci'], data['nombre'], data['apellido'], data.get('telefono', ''))
        )
        
        conn.commit()
        return jsonify({"message": "Técnico creado exitosamente"}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@tecnicos_bp.route("/tecnicos/<ci>", methods=["PATCH"])
@require_admin
def modificar_tecnico(ci):
    try:
        data = request.get_json()
        conn = get_connection()
        cursor = conn.cursor()
        
        # Verificar que el técnico existe
        cursor.execute("SELECT ci FROM tecnicos WHERE ci = %s", (ci,))
        if not cursor.fetchone():
            return jsonify({"error": "Técnico no encontrado"}), 404
        
        # Construir query dinámicamente
        campos = []
        valores = []
        campos_permitidos = ["nombre", "apellido", "telefono"]
        
        for campo in campos_permitidos:
            if campo in data:
                campos.append(f"{campo}=%s")
                valores.append(data[campo])
        
        if not campos:
            return jsonify({"error": "No se enviaron campos válidos para actualizar"}), 400
        
        valores.append(ci)
        query = f"UPDATE tecnicos SET {', '.join(campos)} WHERE ci=%s"
        cursor.execute(query, valores)
        
        conn.commit()
        return jsonify({"message": "Técnico modificado exitosamente"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@tecnicos_bp.route("/tecnicos/<ci>", methods=["DELETE"])
@require_admin
def eliminar_tecnico(ci):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM tecnicos WHERE ci = %s", (ci,))
        
        if cursor.rowcount == 0:
            return jsonify({"error": "Técnico no encontrado"}), 404
            
        conn.commit()
        return jsonify({"message": "Técnico eliminado exitosamente"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()
