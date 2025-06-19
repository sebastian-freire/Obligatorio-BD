from flask import Blueprint, jsonify, request
from db import get_connection

registro_consumo_bp = Blueprint('registro_consumo', __name__)

@registro_consumo_bp.route("/registro_consumo", methods=["GET"])
def obtener_registros_consumo():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM regitro_consumo")
        registros = cursor.fetchall()
        conn.close()
        return jsonify(registros)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@registro_consumo_bp.route("/registro_consumo", methods=["POST"])
def registrar_consumo():
    try:
        data = request.json
        id_maquina = data.get("id_maquina")
        id_insumo = data.get("id_insumo")
        fecha = data.get("fecha")
        cantidad_usada = data.get("cantidad_usada")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO regitro_consumo (id_maquina, id_insumo, fecha, cantidad_usada) VALUES (%s, %s, %s, %s)",
            (id_maquina, id_insumo, fecha, cantidad_usada)
        )
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Consumo registrado"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@registro_consumo_bp.route("/registro_consumo/<int:id>", methods=["PATCH"])
def modificar_consumo(id):
    try:
        data = request.json
        campos = []
        valores = []
        if "id_maquina" in data:
            campos.append("id_maquina=%s")
            valores.append(data["id_maquina"])
        if "id_insumo" in data:
            campos.append("id_insumo=%s")
            valores.append(data["id_insumo"])
        if "fecha" in data:
            campos.append("fecha=%s")
            valores.append(data["fecha"])
        if "cantidad_usada" in data:
            campos.append("cantidad_usada=%s")
            valores.append(data["cantidad_usada"])
        if not campos:
            return jsonify({"mensaje": "No se enviaron campos para actualizar"}), 400
        valores.append(id)
        query = f"UPDATE regitro_consumo SET {', '.join(campos)} WHERE id=%s"
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(query, valores)
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Registro de consumo modificado"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@registro_consumo_bp.route("/registro_consumo/<int:id>", methods=["DELETE"])
def eliminar_consumo(id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM regitro_consumo WHERE id = %s", (id,))
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Registro de consumo eliminado"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
