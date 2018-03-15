use jyang;
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

#insert user credential when first register
insert into User (email,passwd) values ('seo@gmail.com','abc123');
insert into User (email,passwd) values ('clark2018@gmail.com','wnm23');
insert into User (email,passwd) values ('Roland2107@gmail.com','R0596');
#insert user info (address)
insert into Address (street,city,zipcode,country) values ('123 St','Lincoln','68508','USA');
insert into Address (street,city,zipcode,country) values ('19 Bowman St','Melbourne','32904','USA');
insert into Address (street,city,zipcode,country) values ('18th St','Lincoln','68508','USA');
#insert info into Inventory
insert into Inventory (inventoryName, email) values ('firstInventory','clark2018@gmail.com');
insert into Inventory (inventoryName, email) values ('MyInventory','Roland2107@gmail.com');
insert into Inventory (inventoryName, email) values ('Inventory1', 'seo@gmail.com');

#insert info into Category
insert into Category (categoryName,inventoryId,parentCategory) values ('Furnitures',2,1);
insert into Category (categoryName,inventoryId,parentCategory) values ('Electronics',3,NULL);
insert into Category (categoryName,inventoryId,parentCategory) values ('Food',4,NULL);]
insert into Category (categoryName,inventoryId,parentCategory) values (NULL,1,NULL);
#insert info into Item
insert into Item (categoryId,itemName,qty,price,itemStatus,supplier,category) values ('1','sofa','5','299','1','ComfyHome','Furnitures');
insert into Item (categoryId,itemName,qty,price,itemStatus,supplier,category) values ('2','smartphone',7,'899','1','Sony','Electronics');
#insert user info (Note: information in address has to be repeated to get the correct addressId)
insert into UserInfo (email,firstName,lastName,creationTime,addressId) 
values ('seo@gmail.com','Bill','Gates',CURRENT_TIMESTAMP,(select addressId from Address where street = '123 St' AND city = 'Lincoln' AND zipcode = '68508' AND country = 'USA'));
insert into UserInfo (email,firstName,lastName,creationTime,addressId) 
values ('clark2018@gmail.com','Jasaon','Clark',CURRENT_TIMESTAMP,(select addressId from Address where street = '19 Bowman St' AND city = 'Melbourne' AND zipcode = '32904' AND country = 'USA'));

#update user info (Note: email can't be updated, as it's foreign key for UserInfo table)
UPDATE UserInfo SET lastName = 'Clington' where email = 'seo@gmail.com';
UPDATE UserInfo SET lastName = 'Brown' where email = 'clark2018@gmail.com';

#update address info 
UPDATE Address SET street = '321 St' where addressId = (select addressId from UserInfo where email = 'seo@gmail.com');
UPDATE Address SET street = '15 Bowman St' where addressId = (select addressId from UserInfo where email = 'clark2018@gmail.com');



##GET USER INFO
#get user password given an email
select passwd from User where email = 'seo@gmail.com';
select passwd from User where email = 'clark2018@gmail.com';
select passwd from User where email = 'Roland2107@gmail.com';
#get info of a user
select * from UserInfo where email = 'seo@gmail.com';
select * from UserInfo where email = 'clark2018@gmail.com';
select * from UserInfo where email = 'Roland2107@gmail.com';
#get address of a user given an email
select * from Address where addressId = (select addressId from UserInfo where email = 'seo@gmail.com');
select * from Address where addressId = (select addressId from UserInfo where email = 'clark2018@gmail.com');
select * from Address where addressId = (select addressId from UserInfo where email = 'Roland2107@gmail.com');
#get Inventory of a user given an email
select * from Inventory where email = 'clark2018@gmail.com';
select * from Inventory where email = 'Roland2107@gmail.com';
select * from Inventory where email = 'seo@gmail.com';
#get Category of a user given an email
select * from Category where categoryId = (select categoryId from Inventory where email = 'clark2018@gmail.com');
select * from Category where categoryId = (select categoryId from Inventory where email = 'Roland2107@gmail.com');
#get Item of a user given a categoryName
select * from Item where CategoryId = (select categoryId from Category where categoryName = 'Furnitures');
select * from Item where CategoryId = (select categoryId from Category where categoryName = 'Electronics');
