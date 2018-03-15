USE tsim;

##password for database: 60619312

DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Inventory;
DROP TABLE IF EXISTS UserInfo;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Address;

CREATE TABLE Address (
	addressId int not null auto_increment,
    street varchar(255),
    city varchar(255),
	state varchar(255),
    zipcode varchar(255),
    country varchar(255),
    CONSTRAINT PK_Address PRIMARY KEY (addressId)

) Engine=InnoDB,COLLATE=latin1_general_cs;

CREATE TABLE User (
	userId int NOT NULL auto_increment,
    email varchar(225) NOT NULL,
    passwd varchar(225) NOT NULL,
    CONSTRAINT PK_User PRIMARY KEY (userId),
    CONSTRAINT uniqueEmail UNIQUE (email)
) Engine=InnoDB,COLLATE=latin1_general_cs;

CREATE TABLE UserInfo (
    userInfoId int NOT NULL auto_increment,
    email varchar(225) NOT NULL,
    firstName varchar(225) NOT NULL,
    middleName VARCHAR(225),
    lastName varchar(225) NOT NULL,
    phoneNumber varchar(225),
    #creationDate DATE NOT NULL,
    creationTime TIMESTAMP NOT NULL,
    addressId int NOT NULL,
    CONSTRAINT FK_Address FOREIGN KEY (addressId) 
    REFERENCES Address(addressId),
    CONSTRAINT PK_UserInfo PRIMARY KEY (userInfoId),    
    CONSTRAINT FK_User FOREIGN KEY (email) REFERENCES User(email),
    CONSTRAINT uniqueEmail UNIQUE (email)
) Engine=InnoDB,COLLATE=latin1_general_cs;

CREATE TABLE Inventory (
    inventoryId  int NOT NULL auto_increment,
    inventoryName VARCHAR(225) NOT NULL,
    email varchar(225) NOT NULL,
    CONSTRAINT PK_Inventory PRIMARY KEY (inventoryId), 
    CONSTRAINT FK_User2 FOREIGN KEY (email) REFERENCES User(email)
) Engine=InnoDB,COLLATE=latin1_general_cs;

CREATE TABLE Category (
    categoryId  int NOT NULL auto_increment,
    categoryName VARCHAR(225) NOT NULL,
    inventoryId int NOT NULL,
    parentCategory int,
    CONSTRAINT PK_Category PRIMARY KEY (categoryId), 
    CONSTRAINT FK_Inventory2 FOREIGN KEY (inventoryId) REFERENCES Inventory(inventoryId),
    CONSTRAINT FK_ParentCategory FOREIGN KEY (parentCategory) REFERENCES Category(categoryId)
    #CONSTRAINT uniqueEmail UNIQUE (email)
) Engine=InnoDB,COLLATE=latin1_general_cs;

CREATE TABLE Item (
    itemId  int NOT NULL auto_increment,
    categoryId int NOT NULL,
    itemName VARCHAR(225) NOT NULL,
    qty int NOT NULL,
    price int NOT NULL,
    itemStatus int NOT NULL,
    supplier VARCHAR(225),
    category VARCHAR(225),
    CONSTRAINT PK_Item PRIMARY KEY (itemId), 
    #CONSTRAINT FK_ FOREIGN KEY (inventoryId) REFERENCES , 
    CONSTRAINT FK_Category FOREIGN KEY (categoryId) REFERENCES Category(categoryId)
) Engine=InnoDB,COLLATE=latin1_general_cs;

