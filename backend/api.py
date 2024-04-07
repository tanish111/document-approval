from flask import Flask, jsonify, request
from flask_cors import CORS
from queries_sql import create_connection, get_psrn, get_name_designation,get_padetails,get_nfadet,get_padetails_saved,put_det_NFAPA,put_det,get_all_rej,get_update_approval

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

conn = create_connection()

@app.route('/psrn', methods=['POST'])
def user_to_psrn():
    # Retrieve data from the request JSON payload
    user_data = request.json
    
    # Assuming the request JSON payload contains 'userName', 'userEmail', and 'password' keys
    if 'userEmail' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Dummy user creation logic
    return get_psrn(conn, user_data["userEmail"])

@app.route('/name_designation', methods=['POST'])
def psrn_to_name_designation():
    # Retrieve data from the request JSON payload
    user_data = request.json
    
    # Assuming the request JSON payload contains 'userName', 'userEmail', and 'password' keys
    if 'userPSRN' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Dummy user creation logic
    return get_name_designation(conn,user_data["userPSRN"])

@app.route('/pa_details', methods=['POST'])
def psrn_to_padetails():
    # Retrieve data from the request JSON payload
    user_data = request.json
    
    # Assuming the request JSON payload contains 'userName', 'userEmail', and 'password' keys
    if 'userPSRN' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Dummy user creation logic
    return get_padetails(conn,user_data["userPSRN"])

@app.route('/pa_details_saved', methods=['POST'])
def psrn_to_padetails_saved():
    # Retrieve data from the request JSON payload
    user_data = request.json
    
    # Assuming the request JSON payload contains 'userName', 'userEmail', and 'password' keys
    if 'userPSRN' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Dummy user creation logic
    return get_padetails_saved(conn,user_data["userPSRN"])

@app.route('/nfadet', methods=['POST'])
def psrn_to_nfadet():
    # Retrieve data from the request JSON payload
    user_data = request.json
    
    # Assuming the request JSON payload contains 'userName', 'userEmail', and 'password' keys
    if 'userPSRN' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if 'userPANUM' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Dummy user creation logic
    return get_nfadet(conn,user_data["userPSRN"],user_data["userPANUM"])

@app.route('/ins_det_nfa', methods=['POST'])
def put_in_table_nfa():
    # Retrieve data from the request JSON payload
    user_data = request.json
    
    # Assuming the request JSON payload contains 'PSRN', 'PANum', 'Save_status', 'Submit_status', and 'ApprovalStatus' keys
    # Define a list of required fields
    required_fields = ['userPSRN', 'PANum', 'Save_status', 'Submit_status', 'ApprovalStatus']

    # Check if all required fields are present in user_data
    for field in required_fields:
        if field not in user_data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Call the put_det_NFAPA function with the parameters from user_data
    return put_det_NFAPA(
        conn,
        user_data['userPSRN'],
        user_data['PANum'],
        user_data['Save_status'],
        user_data['Submit_status'],
        user_data['ApprovalStatus']
    )

@app.route('/ins_det', methods=['POST'])
def put_in_table():
    # Retrieve data from the request JSON payload
    user_data = request.json
    
    # Assuming the request JSON payload contains 'userName', 'userEmail', and 'password' keys
    # Define a list of required fields
    required_fields = ['userPSRN', 'ItemID', 'ItemDesc', 'InvoiceNum', 'Date1', 'ConferenceAmt', 'OtherAmt', 'PANum']

# Check if all required fields are present in user_data
    for field in required_fields:
        if field not in user_data:
            return jsonify({'error': f'Missing required field: {field}'}), 400

# If all required fields are present, call the put_det function
    return put_det(conn, user_data["userPSRN"], user_data["ItemID"], user_data["ItemDesc"], user_data["InvoiceNum"], user_data["Date1"], user_data["ConferenceAmt"], user_data["OtherAmt"], user_data["PANum"])

@app.route('/get_rej', methods=['POST'])
def send_rej():
    try:
        # Assuming no data is required from the request JSON payload
        
        # Dummy user creation logic
        return get_all_rej(conn)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/approveQuery', methods=['POST'])
def psrn_to_Update_Query():
    try:
        # Retrieve data from the request JSON payload
        user_data = request.json
        
        # Assuming the request JSON payload contains 'userPSRN' and 'userPANum'
        if 'userPSRN' not in user_data or 'userPANUM' not in user_data:
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Dummy user creation logic
        return get_update_approval(conn, user_data["userPSRN"], user_data["userPANUM"])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
