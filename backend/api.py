from flask import Flask
from flask_cors import CORS
from clientes_routes import clientes_bp
from proveedores_routes import proveedores_bp
from insumos_routes import insumos_bp
from maquinas_routes import maquinas_bp
from tecnicos_routes import tecnicos_bp
from mantenimientos_routes import mantenimientos_bp
from login_routes import login_bp
from consultas_reportes_routes import consultas_reportes_bp

app = Flask(__name__)
CORS(app) 

app.register_blueprint(clientes_bp)
app.register_blueprint(proveedores_bp)
app.register_blueprint(insumos_bp)
app.register_blueprint(maquinas_bp)
app.register_blueprint(tecnicos_bp)
app.register_blueprint(mantenimientos_bp)
app.register_blueprint(consultas_reportes_bp)
app.register_blueprint(login_bp)

if __name__ == "__main__":
    app.run()
