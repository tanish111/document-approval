Database Documentation: ASCII

1.Introduction:
    The ASCII database is designed to manage various aspects of a system, primarily focusing on user information, project details, and financial transactions.
    
2. Database Schema:

User_email:
    Stores user PSRN (Personal Serial Number) along with their email addresses.
    Knowledge required: Understanding of user identification and email management.
   
User_details:
    Contains user PSRN, name, and designation.
    Knowledge required: Understanding user information and their roles within an organization.
   
Designation_Limit:
    Records the designation and corresponding expenditure limits.
    Knowledge required: Familiarity with organizational hierarchies and expenditure policies.
   
NFAPA:
    Tracks Non-Funded Academic Projects & Activities (NFAPA) details like PSRN, PANum, and various status flags.
    Knowledge required: Understanding of academic project management.
   
NFAPA_List:
    Stores details of items related to NFAPA, including expenses.
    Knowledge required: Familiarity with academic project expenses and itemization.
   
Projects:
    Manages project details including PSRN, project title, budget, etc.
    Knowledge required: Understanding project management and budgeting.
   
Proj_List:
    Stores project-specific details like Supplier Invoice (SI) numbers, party names, etc.
    Knowledge required: Understanding procurement processes within projects.
   
NFABILLSR:
    Tracks NFAPA bill-related details such as PSRN, project ID, etc.
    Knowledge required: Familiarity with billing processes within academic projects.
   
Purchase:
     Manages purchase-related information including NFAPurID, PSRN, etc.
    Knowledge required: Understanding procurement and purchase approval workflows.
   
PurchaseList:
    Contains details of items purchased including quantities, rates, etc.
    Knowledge required: Understanding of itemized purchases and costing.
   
3.Running the Database:
To run the SQL scripts in a terminal:
    <br>1. Install a database management system like MySQL.
    <br>2. Copy the SQL script into a text file, say `ascii_database.sql`.
    <br>3. Open a terminal and navigate to the directory containing `ascii_database.sql`.
    <br>4. Run the following command to create the database:
    ```
    mysql -u username -p < ascii_database.sql
    ```
    Replace `username` with your MySQL username. You will be prompted to enter the password.
    5. Once the database is created, you can interact with it using SQL commands via the terminal or a GUI tool like MySQL Workbench.
 
    To insert data:
    1. Copy the provided `INSERT INTO` statements into a text file, say `insert_data.sql`.
    2. Open a terminal and navigate to the directory containing `insert_data.sql`.
    3. Run the following command to insert data into the database:
    ```
    mysql -u username -p ASCII < insert_data.sql
    
    ```
    Again, replace `username` with your MySQL username, and enter the password when prompted.
   
4.Conclusion:
    The ASCII database provides a structured way to manage user information, projects, and financial transactions within an academic organization. 
    By following the provided schema and running the SQL scripts, users can set up and populate the database for their specific needs.
