from flask import Flask, jsonify, request
from queries_sql import create_connection,get_psrn,get_name,get_name_designation,get_ProjTitle_AgencyName,get_something,get_nfadet
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

@app.route('/name', methods=['POST'])
def psrn_to_name():
    # Retrieve data from the request JSON payload
    user_data = request.json
    
    # Assuming the request JSON payload contains 'userName', 'userEmail', and 'password' keys
    if 'userPSRN' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Dummy user creation logic
    return get_name(conn,user_data["userPSRN"])

@app.route('/name_designation', methods=['POST'])
def psrn_to_name_designation():
    # Retrieve data from the request JSON payload
    user_data = request.json
    
    # Assuming the request JSON payload contains 'userName', 'userEmail', and 'password' keys
    if 'userPSRN' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Dummy user creation logic
    return get_name_designation(conn,user_data["userPSRN"])

@app.route('/ProjectTitle_AgencyName', methods=['POST'])
def psrn_to_ProjectTitle_AgencyName():
    # Retrieve data from the request JSON payload
    user_data = request.json
    
    # Assuming the request JSON payload contains 'userName', 'userEmail', and 'password' keys
    if 'userPSRN' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Dummy user creation logic
    return get_ProjTitle_AgencyName(conn,user_data["userPSRN"])

@app.route('/something', methods=['POST'])
def psrn_to_something():
    # Retrieve data from the request JSON payload
    user_data = request.json
    
    # Assuming the request JSON payload contains 'userName', 'userEmail', and 'password' keys
    if 'userPSRN' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if 'userPROJID' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Dummy user creation logic
    return get_something(conn,user_data["userPSRN"],user_data["userPROJID"])

@app.route('/nfadet', methods=['POST'])
def psrn_to_nfadet():
    # Retrieve data from the request JSON payload
    user_data = request.json
    
    # Assuming the request JSON payload contains 'userName', 'userEmail', and 'password' keys
    if 'userPSRN' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if 'userPANUM' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if 'userITEMID' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Dummy user creation logic
    return get_nfadet(conn,user_data["userPSRN"],user_data["userPANUM"],user_data["userITEMID"])

if __name__ == '__main__':
    app.run(debug=True)