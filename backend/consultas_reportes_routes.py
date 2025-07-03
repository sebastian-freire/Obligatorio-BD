from flask import Blueprint, jsonify, request
from db import get_user_connection
from auth import require_login, require_admin

consultas_reportes_bp = Blueprint('consultas_reportes', __name__)

@consultas_reportes_bp.route("/cobro_mensual_cliente", methods=["GET"])
@require_login
def cobro_mensual_cliente():
    try:
        conn = get_user_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('''
            SELECT 
                maquinas.id_cliente, 
                COALESCE(SUM(registro_consumo.cantidad_usada * insumos.precio_unitario), 0) AS cuenta_insumos, 
                SUM(maquinas.costo_alquiler_mensual) AS cuenta_alquiler,
                COALESCE(SUM(registro_consumo.cantidad_usada * insumos.precio_unitario), 0) + SUM(maquinas.costo_alquiler_mensual) AS total_mensual
            FROM maquinas
            LEFT JOIN registro_consumo ON maquinas.id = registro_consumo.id_maquina 
                AND MONTH(registro_consumo.fecha) = MONTH(CURDATE()) 
                AND YEAR(registro_consumo.fecha) = YEAR(CURDATE())
            LEFT JOIN insumos ON registro_consumo.id_insumo = insumos.id
            GROUP BY maquinas.id_cliente
        ''')
        clientes = cursor.fetchall()
        
        return jsonify(clientes), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()
    
@consultas_reportes_bp.route("/insumos_costo_total", methods=["GET"])
@require_login
def insumos_costo_total():
    try:
        conn = get_user_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('''
            SELECT insumos.id, descripcion, SUM(cantidad_usada) AS cantidadTotal, precio_unitario,
                SUM(cantidad_usada * precio_unitario) AS costoTotal
            FROM insumos
            JOIN registro_consumo ON insumos.id = registro_consumo.id_insumo
            GROUP BY insumos.id, descripcion, precio_unitario
            ORDER BY costoTotal DESC LIMIT 4;
        ''')
        insumos = cursor.fetchall()
        
        return jsonify(insumos), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()
    
@consultas_reportes_bp.route("/insumos_cantidad_total", methods=["GET"])
@require_login
def insumos_cantidad_total():
    try:
        conn = get_user_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('''
            SELECT insumos.id, descripcion, SUM(cantidad_usada) AS cantidadTotal, precio_unitario,
                SUM(cantidad_usada * precio_unitario) AS costoTotal
            FROM insumos
            JOIN registro_consumo ON insumos.id = registro_consumo.id_insumo
            GROUP BY insumos.id, descripcion, precio_unitario
            ORDER BY cantidadTotal DESC LIMIT 4;
        ''')
        insumos = cursor.fetchall()
        
        return jsonify(insumos), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@consultas_reportes_bp.route("/tecnicos_mas_mantenimientos", methods=["GET"])
@require_admin
def tecnicos_mas_mantenimientos():
    try:
        conn = get_user_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('''
            SELECT nombre, apellido, telefono, COUNT(*) AS cantidadMantenimientos
            FROM tecnicos
            JOIN mantenimientos ON tecnicos.ci = mantenimientos.ci_tecnico
            GROUP BY nombre, apellido, telefono
            ORDER BY cantidadMantenimientos DESC LIMIT 4;
        ''')
        tecnicos = cursor.fetchall()
        
        return jsonify(tecnicos), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()
    
@consultas_reportes_bp.route("/clientes_mas_maquinas", methods=["GET"])
@require_login
def clientes_mas_maquinas():
    try:
        conn = get_user_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('''
            SELECT clientes.id, clientes.nombre, COUNT(maquinas.id) AS total_maquinas
            FROM clientes
            JOIN maquinas ON clientes.id = maquinas.id_cliente
            GROUP BY clientes.id, clientes.nombre
            ORDER BY total_maquinas DESC LIMIT 4;
        ''')
        clientes = cursor.fetchall()
        
        return jsonify(clientes), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()