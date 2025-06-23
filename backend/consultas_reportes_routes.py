from flask import Blueprint, jsonify, request
from db import get_connection

consultas_reportes_bp = Blueprint('consultas_reportes', __name__)

# Cobro mensual por cliente (suma de insumos y alquiler)
@consultas_reportes_bp.route("/cobro_mensual_cliente", methods=["GET"])
def cobro_mensual_cliente():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('''
            SELECT 
                maquinas.id_cliente, 
                SUM((registro_consumo.cantidad_usada * insumos.precio_unitario) + maquinas.costo_alquiler_mensual) AS total_mensual
            FROM maquinas
            JOIN registro_consumo ON maquinas.id = registro_consumo.id_maquina
            JOIN insumos ON registro_consumo.id_insumo = insumos.id
            GROUP BY maquinas.id_cliente
        ''')
        clientes = cursor.fetchall()
        conn.close()
        return jsonify(clientes)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Costo de insumos usados por cliente
@consultas_reportes_bp.route("/insumos_costo_total", methods=["GET"])
def insumos_costo_total():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('''
            SELECT insumos.id, descripcion, SUM(cantidad_usada * precio_unitario) AS costoTotal
            FROM insumos
            JOIN registro_consumo ON insumos.id = registro_consumo.id_insumo
            GROUP BY insumos.id, descripcion
            ORDER BY costoTotal DESC LIMIT   4;
        ''')
        insumos = cursor.fetchall()
        conn.close()
        return jsonify(insumos)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Cantidad de insumos usados por cliente
@consultas_reportes_bp.route("/insumos_cantidad_total", methods=["GET"])
def insumos_cantidad_total():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('''
            SELECT insumos.id, descripcion, SUM(cantidad_usada) AS cantidadTotal
            FROM insumos
            JOIN registro_consumo ON insumos.id = registro_consumo.id_insumo
            GROUP BY insumos.id, descripcion
            ORDER BY cantidadTotal DESC LIMIT 4;
        ''')
        insumos = cursor.fetchall()
        conn.close()
        return jsonify(insumos)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Tecnnicos con más mantenimientos
@consultas_reportes_bp.route("/tecnicos_mas_mantenimientos", methods=["GET"])
def tecnicos_mas_mantenimientos():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('''
            SELECT nombre, apellido, telefono, COUNT(*) AS cantidadMantenimientos
            FROM tecnicos
            JOIN mantenimientos ON tecnicos.ci = mantenimientos.ci_tecnico
            GROUP BY nombre, apellido, telefono
            ORDER BY cantidadMantenimientos DESC LIMIT 4;
        ''')
        tecnicos = cursor.fetchall()
        conn.close()
        return jsonify(tecnicos)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Clientes con mas maquinas
@consultas_reportes_bp.route("/clientes_mas_maquinas", methods=["GET"])
def clientes_mas_maquinas():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('''
            SELECT clientes.id, clientes.nombre, COUNT(maquinas.id) AS total_maquinas
            FROM clientes
            JOIN maquinas ON clientes.id = maquinas.id_cliente
            GROUP BY clientes.id, clientes.nombre
            ORDER BY total_maquinas DESC LIMIT 4;
        ''')
        clientes = cursor.fetchall()
        conn.close()
        return jsonify(clientes)
    except Exception as e:
        return jsonify({"error": str(e)}), 500