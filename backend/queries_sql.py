import mysql.connector
from flask import Flask, jsonify, request

# Function to establish connection to MySQL Server
def create_connection():
    server = 'localhost'
    database = 'ASCII'
    username = 'root'
    password = 'Tanish1234'
    try:
        conn = mysql.connector.connect(host=server, database=database, user=username, password=password)
        return conn
    except mysql.connector.Error as e:
        error_message = {'error': str(e)}
        return jsonify(error_message), 500
def get_psrn(conn, email):
    try:
        # Establish connection to MySQL Server if not already connected
        if not conn.is_connected():
            conn = create_connection()
        cursor = conn.cursor()
        
        # Execute the query
        sql = "SELECT PSRN FROM User_email WHERE email = %s"
        val = (email,)
        cursor.execute(sql, val)        
        results = cursor.fetchall()

        # Close cursor
        cursor.close()

        # Check if the result is empty
        if not results:
            return jsonify({'error': 'Email not found'}), 404

        # Return PSRN
        return jsonify(results[0][0]), 200
        
    except mysql.connector.Error as e:
        return jsonify({'error': f"Error connecting to MySQL Server: {e}"}), 500
