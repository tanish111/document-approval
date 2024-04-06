import mysql.connector
from flask import Flask, jsonify, request

# Function to establish connection to MySQL Server
def create_connection():
    server = 'localhost'
    database = 'ASCII'
    username = 'root'
    password = 'root1234'
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
        return jsonify(results), 200
        
    except mysql.connector.Error as e:
        return jsonify({'error': f"Error connecting to MySQL Server: {e}"}), 500
    
    
def get_name(conn, psrn):
    try:
        # Establish connection to MySQL Server if not already connected
        if not conn.is_connected():
            conn = create_connection()
        cursor = conn.cursor()
        
        # Execute the query
        sql = "SELECT Name FROM User_details WHERE PSRN = %s"
        val = (psrn,)
        cursor.execute(sql, val)        
        results = cursor.fetchall()

        # Close cursor
        cursor.close()

        # Check if the result is empty
        if not results:
            return jsonify({'error': 'psrn not found'}), 404

        # Return PSRN
        return jsonify(results[0][0]), 200
        
    except mysql.connector.Error as e:
        return jsonify({'error': f"Error connecting to MySQL Server: {e}"}), 500
    

def get_name_designation(conn, psrn):
    try:
        # Establish connection to MySQL Server if not already connected
        if not conn.is_connected():
            conn = create_connection()
        cursor = conn.cursor()
        
        # Execute the query
        sql = "SELECT u.name,u.designation from User_Details u where u.psrn = %s"
        val = (psrn,)
        cursor.execute(sql, val)        
        results = cursor.fetchall()

        # Close cursor
        cursor.close()

        # Check if the result is empty
        if not results:
            return jsonify({'error': 'psrn not found'}), 404

        # Return PSRN
        return jsonify(results), 200
    
    except mysql.connector.Error as e:
        return jsonify({'error': f"Error connecting to MySQL Server: {e}"}), 500
    

def get_ProjTitle_AgencyName(conn, psrn):
    try:
        # Establish connection to MySQL Server if not already connected
        if not conn.is_connected():
            conn = create_connection()
        cursor = conn.cursor()
        
        # Execute the query
        sql = "select p.ProjTitle,p.AgencyName from Projects p inner join NFABILLSR n on p.ProjID=n.Proj_ID and p.psrn = %s"
        val = (psrn,)
        cursor.execute(sql, val)        
        results = cursor.fetchall()

        # Close cursor
        cursor.close()

        # Check if the result is empty
        if not results:
            return jsonify({'error': 'psrn not found'}), 404

        # Return PSRN
        return jsonify(results), 200
    
    except mysql.connector.Error as e:
        return jsonify({'error': f"Error connecting to MySQL Server: {e}"}), 500
    

def get_something(conn, psrn,projid):
    try:
        # Establish connection to MySQL Server if not already connected
        if not conn.is_connected():
            conn = create_connection()
        cursor = conn.cursor()
        
        # Execute the query
        sql = " select pl.SINum,pl.PartyName,pl.PONum,pl.BillNum,pl.BillAmt,pl.Advance from Proj_List pl inner join nfabillsr n on n.requestid=pl.requestid where n.psrn=%s and proj_id= %s"
        val = (psrn,projid,)
        cursor.execute(sql, val)        
        results = cursor.fetchall()

        # Close cursor
        cursor.close()

        # Check if the result is empty
        if not results:
            return jsonify({'error': 'psrn not found'}), 404

        # Return PSRN
        return jsonify(results), 200
    
    except mysql.connector.Error as e:
        return jsonify({'error': f"Error connecting to MySQL Server: {e}"}), 500


def get_nfadet(conn, psrn,panum,itemid):
    try:
        # Establish connection to MySQL Server if not already connected
        if not conn.is_connected():
            conn = create_connection()
        cursor = conn.cursor()
        
        # Execute the query
        sql = "SELECT ItemID, ItemDesc, InvoiceNum, Date1, ConferenceAmt, OtherAmt FROM NFAPA_List WHERE PSRN = %s AND PANum = %s AND ItemID = %s"
        val = (psrn,panum,itemid,)
        cursor.execute(sql, val)        
        results = cursor.fetchall()

        # Close cursor
        cursor.close()

        # Check if the result is empty
        if not results:
            return jsonify({'error': 'psrn not found'}), 404

        # Return PSRN
        return jsonify(results), 200
    
    except mysql.connector.Error as e:
        return jsonify({'error': f"Error connecting to MySQL Server: {e}"}), 500
