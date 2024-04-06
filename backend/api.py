from flask import Flask, jsonify, request
from queries_sql import create_connection,get_psrn
app = Flask(__name__)
conn = create_connection()
conn.is_connected()
@app.route('/psrn', methods=['POST'])
def user_to_psrn():
    # Retrieve data from the request JSON payload
    user_data = request.json
    
    # Assuming the request JSON payload contains 'userName', 'userEmail', and 'password' keys
    if 'userEmail' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Dummy user creation logic
    return get_psrn(conn,user_data["userEmail"])

if __name__ == '__main__':
    app.run(debug=True)
