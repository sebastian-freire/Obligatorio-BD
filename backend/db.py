import mysql.connector

def get_admin_connection():
    return mysql.connector.connect(
        host="localhost",
        user="admin_user",
        password="admin_password",
        database="cafesmarloy"
    )

def get_user_connection():
    return mysql.connector.connect(
        host="localhost",
        user="user_user",
        password="user_password",
        database="cafesmarloy"
    )

def get_auth_connection():
    return mysql.connector.connect(
        host="localhost",
        user="auth_user",
        password="auth_password",
        database="cafesmarloy"
    )
