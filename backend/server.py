from flask import Flask, request, jsonify
import pyodbc

app = Flask(__name__)

# Function to establish connection to SQL Server
def create_connection():
    server = 'localhost'
    database = 'YourDatabaseName'
    username = 'YourUsername'
    password = 'YourPassword'
    conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+password)
    return conn

# Endpoint to handle POST requests
@app.route('/query', methods=['POST'])
def execute_query():
    try:
        # Establish connection to SQL Server
        conn = create_connection()
        cursor = conn.cursor()

        # Execute the query
        cursor.execute("SELECT * FROM User_details")
        results = cursor.fetchall()

        # Convert results to list of dictionaries
        columns = [column[0] for column in cursor.description]
        results_list = []
        for row in results:
            results_list.append(dict(zip(columns, row)))

        # Close cursor and connection
        cursor.close()
        conn.close()

        return jsonify(results_list), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
