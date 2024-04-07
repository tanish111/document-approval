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
    
    
def get_padetails(conn, psrn):
    try:
        # Establish connection to MySQL Server if not already connected
        if not conn.is_connected():
            conn = create_connection()
        cursor = conn.cursor()
        
        # Execute the query
        sql = "SELECT * FROM NFAPA WHERE PSRN = %s and Submit_status = TRUE"
        val = (psrn,)
        cursor.execute(sql, val)        
        results = cursor.fetchall()

        # Close cursor
        cursor.close()

        # Check if the result is empty
        if not results:
            return jsonify({'error': 'PSRN not found'}), 404

        # Return PSRN
        return jsonify(results), 200
        
    except mysql.connector.Error as e:
        return jsonify({'error': f"Error connecting to MySQL Server: {e}"}), 500
    
def get_padetails_saved(conn, psrn):
    try:
        # Establish connection to MySQL Server if not already connected
        if not conn.is_connected():
            conn = create_connection()
        cursor = conn.cursor()
        
        # Execute the query
        sql = "SELECT * FROM NFAPA WHERE PSRN = %s and Submit_status = FALSE"
        val = (psrn,)
        cursor.execute(sql, val)        
        results = cursor.fetchall()

        # Close cursor
        cursor.close()

        # Check if the result is empty
        if not results:
            return jsonify({'error': 'PSRN not found'}), 404

        # Return PSRN
        return jsonify(results), 200
        
    except mysql.connector.Error as e:
        return jsonify({'error': f"Error connecting to MySQL Server: {e}"}), 500

def get_nfadet(conn, psrn,panum):
    try:
        # Establish connection to MySQL Server if not already connected
        if not conn.is_connected():
            conn = create_connection()
        cursor = conn.cursor()
        
        # Execute the query
        sql = "SELECT ItemID, ItemDesc, InvoiceNum, Date1, ConferenceAmt, OtherAmt FROM NFAPA_List WHERE PSRN = %s AND PANum = %s"
        val = (psrn,panum,)
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

def put_det_NFAPA(conn, PSRN, PANum, Save_status, Submit_status, ApprovalStatus):
    try:
        # Establish connection to MySQL Server if not already connected
        if not conn.is_connected():
            conn = create_connection()
        cursor = conn.cursor()
        
        # Execute the query
        sql = """INSERT INTO NFAPA (PSRN, PANum, Save_status, Submit_status, ApprovalStatus)
                 VALUES (%s, %s, %s, %s, %s)"""
        val = (PSRN, PANum, Save_status, Submit_status, ApprovalStatus)
        cursor.execute(sql, val)
        
        # Commit the transaction
        conn.commit()

        # Return success message
        return jsonify({'message': 'Data inserted successfully'}), 200
        
    except mysql.connector.Error as e:
        return jsonify({'error': f"Error inserting data: {e}"}), 500
    
def put_det(conn,PSRN, ItemID, ItemDesc, InvoiceNum, Date1, ConferenceAmt, OtherAmt, PANum):
    try:
        # Establish connection to MySQL Server if not already connected
        if not conn.is_connected():
            conn = create_connection()
        cursor = conn.cursor()
        
        # Execute the query
        sql = """INSERT INTO NFAPA_List (PSRN, ItemID, ItemDesc, InvoiceNum, Date1, ConferenceAmt, OtherAmt, PANum)
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"""
        val = (PSRN, ItemID, ItemDesc, InvoiceNum, Date1, ConferenceAmt, OtherAmt, PANum)
        cursor.execute(sql,val)
        conn.commit()
        return jsonify({'message': 'Data inserted successfully'}), 200
    except mysql.connector.Error as e:
        return jsonify({'error': f"Error connecting to MySQL Server: {e}"}), 500
    
def get_all_rej(conn):
    try:
        # Establish connection to MySQL Server if not already connected
        if not conn.is_connected():
            conn = create_connection()
        cursor = conn.cursor()
        
        # Execute the query
        sql = """SELECT t1.PANum,t1.TotalAmount,t2.Name,t2.PSRN
        FROM (SELECT n.PANum, SUM(nl.ConferenceAmt + nl.OtherAmt) AS TotalAmount
            FROM nfapa n
            INNER JOIN nfapa_list nl ON nl.PANum = n.PANum
            WHERE n.ApprovalStatus = 0 and n.Submit_status=1
            GROUP BY n.PANum) AS t1
        INNER JOIN
            (SELECT u.PSRN,u.name, n.PANum,n.ApprovalStatus
            FROM user_details u
            INNER JOIN nfapa n ON n.PSRN = u.psrn) AS t2
        ON t1.PANum = t2.PANum;"""
        cursor.execute(sql)        
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
    
def get_update_approval(conn,psrn,PANum):
    try:
        # Establish connection to MySQL Server if not already connected
        if not conn.is_connected():
            conn = create_connection()
        cursor = conn.cursor()
        
        # Execute the query
        sql = "UPDATE NFAPA SET ApprovalStatus = 2 where Submit_Status = TRUE and PSRN = %s and PANum = %s"
        val = (psrn,PANum,)
        cursor.execute(sql, val)        
        conn.commit()

        # Close cursor
        cursor.close()

        return jsonify({'message': 'Update successful'}), 200
    
    except mysql.connector.Error as e:
        return jsonify({'error': f"Error executing SQL query: {e}"}), 500
