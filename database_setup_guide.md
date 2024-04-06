README

Database Name: ASCII

Tables:
1. User_email: Stores user information with their PSRN (Personal Serial Number) and email.
2. User_details: Contains details of users such as their name, PSRN, and designation.
3. Designation_Limit: Holds information about the designation and the corresponding expenditure limit.
4. NFAPA: Records Non-Financial Approval for Purchase Authorization (NFAPA) details like PSRN, PANum (Purchase Authorization Number), and status flags.
5. NFAPA_List: Contains the list of items for NFAPA requests with details such as PSRN, ItemID, ItemDesc, etc.
6. Projects: Stores project details like PSRN, ProjTitle, ProjID, etc.
7. Proj_List: Contains the list of items related to projects with details such as RequestID, SINum, PartyName, etc.
8. NFABILLSR: Records NFAPA bill details with PSRN, Proj_ID, RequestID, and status flags.
9. Purchase: Stores purchase details with NFAPurID, PSRN, and status flags.
10. PurchaseList: Contains the list of items for purchases with NFAPurID and details like SrNo, Descr, Qty, etc.

Constraints:
- Primary keys and foreign key constraints have been applied to ensure data integrity and relationships between tables.

Indexes:
- An index `idx_PANum` has been created on the `PANum` column of the `NFAPA` table for optimization.

Data:
- Dummy data has been inserted into various tables to simulate real-world scenarios.
- Data includes user information, project details, NFAPA requests, purchase details, etc.

Queries:
- Various SQL queries have been used to create tables, insert data, and establish relationships.
- Joins, constraints and indexing techniques have been utilized for efficient data retrieval and management.

Required Knowledge:
- Basic understanding of SQL syntax and database concepts such as tables, columns, primary keys, foreign keys, indexes, etc.
- Knowledge of relational database management systems (RDBMS) and how to interact with them using SQL.
- Familiarity with data modeling and normalization techniques for designing database schemas.
- Understand data integrity constraints to maintain consistency and accuracy.
