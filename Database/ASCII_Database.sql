CREATE DATABASE IF NOT EXISTS ASCII;
USE ASCII;

CREATE TABLE User_email (
    PSRN INT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE User_details (
    PSRN INT PRIMARY KEY,
    Name VARCHAR(255),
    Designation VARCHAR(255)
);

ALTER TABLE User_details ADD CONSTRAINT fk1 FOREIGN KEY (PSRN) REFERENCES User_email(PSRN);

CREATE TABLE Designation_Limit (
    Designation VARCHAR(255) PRIMARY KEY,
    Cont_Limit INT
);

ALTER TABLE User_details ADD CONSTRAINT fk2 FOREIGN KEY (Designation) REFERENCES Designation_Limit(Designation);

CREATE TABLE NFAPA (
    PSRN INT,
    PANum INT,
    Save_status BOOLEAN DEFAULT FALSE,
    Submit_status BOOLEAN DEFAULT FALSE,
    ApprovalStatus BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (PSRN, PANum)
);

ALTER TABLE NFAPA ADD CONSTRAINT fk3 FOREIGN KEY (PSRN) REFERENCES User_email(PSRN);

CREATE TABLE NFAPA_List (
    PSRN INT,
    ItemID INT,
    ItemDesc VARCHAR(500),
    InvoiceNum VARCHAR(300),
    Date1 DATE,
    ConferenceAmt INT,
    OtherAmt INT,
    PANum INT,
    PRIMARY KEY (PSRN, ItemID, PANum)
);
CREATE INDEX idx_PANum ON NFAPA (PANum);
ALTER TABLE NFAPA_List ADD CONSTRAINT fk4 FOREIGN KEY (PSRN) REFERENCES User_email(PSRN);
ALTER TABLE NFAPA_List ADD CONSTRAINT fk11 FOREIGN KEY (PANum) REFERENCES NFAPA(PANum);

CREATE TABLE Projects (
    PSRN INT,
    ProjTitle VARCHAR(255),
    ProjID INT,
    AgencyName VARCHAR(255),
    BudgetedAmt INT,
    BudgetHead VARCHAR(255),
    Balance INT,
    PRIMARY KEY (PSRN, ProjID)
);

CREATE TABLE Proj_List (
    RequestID INT,
    SINum INT,
    PartyName VARCHAR(255),
    PONum INT,
    BillNum INT,
    BillAmt INT,
    Advance INT DEFAULT 0,
    PRIMARY KEY (RequestID, SINum)
);

CREATE TABLE NFABILLSR (
    PSRN INT,
    Proj_ID INT,
    RequestID INT AUTO_INCREMENT,
    ApprovalStatus BOOLEAN DEFAULT FALSE,
    Save_status BOOLEAN DEFAULT FALSE,
    Submit_status BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (RequestID)
);

ALTER TABLE NFABILLSR ADD CONSTRAINT fk7 FOREIGN KEY (RequestID) REFERENCES Proj_List(RequestID);

CREATE TABLE Purchase (
    NFAPurID INT PRIMARY KEY,
    PSRN INT,
    BudgetHead VARCHAR(255),
    ApprovalStatus BOOLEAN DEFAULT FALSE,
    Save_status BOOLEAN DEFAULT FALSE,
    Submit_status BOOLEAN DEFAULT FALSE
);

CREATE TABLE PurchaseList (
    NFAPurID INT,
    SrNo INT,
    Descr VARCHAR(255),
    Qty INT,
    UnitRate INT,
    TotCost INT,
    PRIMARY KEY (NFAPurID, SrNo)
);

ALTER TABLE PurchaseList ADD CONSTRAINT fk9 FOREIGN KEY (NFAPurID) REFERENCES Purchase(NFAPurID);


-- Inserting data into User_email table
INSERT INTO User_email (PSRN, email) VALUES
(312874, 'a.baskar@goa.bits-pilani.ac.in'),
(509632, 'aditya.challa@goa.bits-pilani.ac.in'),
(783219, 'arnab.kumar.paul@goa.bits-pilani.ac.in'),
(124567, 'ashwin.srinivasan@goa.bits-pilani.ac.in'),
(635421, 'basabdatta.bhattacharya@goa.bits-pilani.ac.in'),
(845912, 'bharat.madhusudan.deshpande@goa.bits-pilani.ac.in'),
(976214, 'biju.k.raveendran.nair@goa.bits-pilani.ac.in'),
(548791, 'devashish.gosain@goa.bits-pilani.ac.in'),
(367215, 'diptendu.chatterjee@goa.bits-pilani.ac.in'),
(458723, 'gargi.sanket.prabhu@goa.bits-pilani.ac.in'),
(187543, 'hemant.rathore@goa.bits-pilani.ac.in'),
(932156, 'kanchan.manna@goa.bits-pilani.ac.in'),
(369124, 'kunal.kishore.korgaonkar@goa.bits-pilani.ac.in'),
(785412, 'neena.goveas@goa.bits-pilani.ac.in'),
(215478, 'rajesh.kumar@goa.bits-pilani.ac.in'),
(632145, 'ramprasad.s.joshi@goa.bits-pilani.ac.in'),
(854126, 'sanjay.k.sahay@goa.bits-pilani.ac.in'),
(147852, 'santonu.sarkar@goa.bits-pilani.ac.in'),
(412578, 'shubhangi.krushnachandra.gawali@goa.bits-pilani.ac.in'),
(985674, 'siddharth.gupta@goa.bits-pilani.ac.in'),
(741852, 'snehanshu.saha@goa.bits-pilani.ac.in'),
(365214, 'sougata.sen@goa.bits-pilani.ac.in'),
(487215, 'sravan.danda@goa.bits-pilani.ac.in'),
(621458, 'sujith.thomas@goa.bits-pilani.ac.in'),
(956213, 'surjya.ghosh@goa.bits-pilani.ac.in'),
(785461, 'swaroop.joshi@goa.bits-pilani.ac.in'),
(365874, 'tanmay.tulsidas.verlekart@goa.bits-pilani.ac.in'),
(785469, 'vinayak.naik@goa.bits-pilani.ac.in'),
(100000, 'f20221239@goa.bits-pilani.ac.in'),
(100001, 'f20220053@goa.bits-pilani.ac.in'),
(100002, 'f20221182@goa.bits-pilani.ac.in'),
(100003, 'f20220622@goa.bits-pilani.ac.in');

-- Inserting data into Designation_Limit table
INSERT INTO Designation_Limit (Designation, Cont_Limit) VALUES
('Assistant Professor', 40000),
('Senior Professor', 100000),
('Associate Professor', 60000),
('Professor', 80000),
('Visiting Faculty', 35000),
('Head Of Department',100000);

-- Inserting data into User_details table
INSERT INTO User_details (PSRN, Name, Designation) VALUES
(312874, 'A. Baskar', 'Assistant Professor'),
(509632, 'Aditya Challa', 'Assistant Professor'),
(783219, 'Arnab Kumar Paul', 'Assistant Professor'),
(124567, 'Ashwin Srinivasan', 'Professor'),
(635421, 'Basabdatta Bhattacharya', 'Associate Professor'),
(845912, 'Bharat Madhusudan Deshpande', 'Senior Professor'),
(976214, 'Biju K. Raveendran Nair', 'Professor'),
(548791, 'Devashish Gosain', 'Assistant Professor'),
(367215, 'Diptendu Chatterjee', 'Assistant Professor'),
(458723, 'Gargi Sanket Prabhu', 'Visiting Faculty'),
(187543, 'Hemant Rathore', 'Assistant Professor'),
(932156, 'Kanchan Manna', 'Assistant Professor'),
(369124, 'Kunal Kishore Korgaonkar', 'Assistant Professor'),
(785412, 'Neena Goveas', 'Professor'),
(215478, 'Rajesh Kumar', 'Assistant Professor'),
(632145, 'Ramprasad S. Joshi', 'Associate Professor'),
(854126, 'Sanjay K. Sahay', 'Professor'),
(147852, 'Santonu Sarkar', 'Head Of Department'),
(412578, 'Shubhangi Krushnachandra Gawali', 'Assistant Professor'),
(985674, 'Siddharth Gupta', 'Assistant Professor'),
(741852, 'Snehanshu Saha', 'Professor'),
(365214, 'Sougata Sen', 'Assistant Professor'),
(487215, 'Sravan Danda', 'Assistant Professor'),
(621458, 'Sujith Thomas', 'Assistant Professor'),
(956213, 'Surjya Ghosh', 'Assistant Professor'),
(785461, 'Swaroop Joshi', 'Assistant Professor'),
(365874, 'Tanmay Tulsidas Verlekart', 'Assistant Professor'),
(785469, 'Vinayak Naik', 'Professor'),
(100000, 'Pray Raskapoorwala', 'Professor'),
(100001, 'Tanish Desai', 'Professor'),
(100002, 'Jainam Shah', 'Professor'),
(100003, 'Aditya Chaudhary', 'Professor');

