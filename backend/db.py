import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="admin52560420",
        database="cafesmarloy"
    )