from flask import Blueprint, jsonify, request
from db import get_connection

registro_consumo_bp = Blueprint('registro_consumo', __name__)

@registro_consumo_bp.route("/registro_consumo", methods=["GET"])
def obtener_registros_consumo():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM registro_consumo")
        registros = cursor.fetchall()
        
        return jsonify(registros), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@registro_consumo_bp.route("/registro_consumo/<int:id>", methods=["GET"])
def obtener_registro_consumo(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM registro_consumo WHERE id = %s", (id,))
        registro = cursor.fetchone()
        
        if registro:
            return jsonify(registro), 200
        else:
            return jsonify({"error": "Registro de consumo no encontrado"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@registro_consumo_bp.route("/registro_consumo", methods=["POST"])
def registrar_consumo():
    try:
        data = request.get_json()
        conn = get_connection()
        cursor = conn.cursor()
        
        # Validar foreign keys
        if 'id_maquina' in data:
            cursor.execute("SELECT id FROM maquinas WHERE id = %s", (data['id_maquina'],))
            if not cursor.fetchone():
                return jsonify({"error": "La máquina con ID {} no existe".format(data['id_maquina'])}), 400
                
        if 'id_insumo' in data:
            cursor.execute("SELECT id FROM insumos WHERE id = %s", (data['id_insumo'],))
            if not cursor.fetchone():
                return jsonify({"error": "El insumo con ID {} no existe".format(data['id_insumo'])}), 400
        
        cursor.execute(
            "INSERT INTO registro_consumo (id_maquina, id_insumo, fecha, cantidad_usada) VALUES (%s, %s, %s, %s)",
            (data['id_maquina'], data['id_insumo'], data['fecha'], data['cantidad_usada'])
        )
        
        conn.commit()
        return jsonify({"message": "Consumo registrado exitosamente"}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@registro_consumo_bp.route("/registro_consumo/<int:id>", methods=["PATCH"])
def modificar_consumo(id):
    try:
        data = request.get_json()
        conn = get_connection()
        cursor = conn.cursor()
        
        # Verificar que el registro existe
        cursor.execute("SELECT id FROM registro_consumo WHERE id = %s", (id,))
        if not cursor.fetchone():
            return jsonify({"error": "Registro de consumo no encontrado"}), 404
        
        # Validar foreign keys
        if 'id_maquina' in data:
            cursor.execute("SELECT id FROM maquinas WHERE id = %s", (data['id_maquina'],))
            if not cursor.fetchone():
                return jsonify({"error": "La máquina con ID {} no existe".format(data['id_maquina'])}), 400
                
        if 'id_insumo' in data:
            cursor.execute("SELECT id FROM insumos WHERE id = %s", (data['id_insumo'],))
            if not cursor.fetchone():
                return jsonify({"error": "El insumo con ID {} no existe".format(data['id_insumo'])}), 400
        
        # Construir query dinámicamente
        campos = []
        valores = []
        campos_permitidos = ["id_maquina", "id_insumo", "fecha", "cantidad_usada"]
        
        for campo in campos_permitidos:
            if campo in data:
                campos.append(f"{campo}=%s")
                valores.append(data[campo])
        
        if not campos:
            return jsonify({"error": "No se enviaron campos válidos para actualizar"}), 400
        
        valores.append(id)
        query = f"UPDATE registro_consumo SET {', '.join(campos)} WHERE id=%s"
        cursor.execute(query, valores)
        
        conn.commit()
        return jsonify({"message": "Registro de consumo modificado exitosamente"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@registro_consumo_bp.route("/registro_consumo/<int:id>", methods=["DELETE"])
def eliminar_consumo(id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM registro_consumo WHERE id = %s", (id,))
        
        if cursor.rowcount == 0:
            return jsonify({"error": "Registro de consumo no encontrado"}), 404
            
        conn.commit()
        return jsonify({"message": "Registro de consumo eliminado exitosamente"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()
