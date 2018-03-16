use tsim;

##password for database: 60619312

##INSERT/UPDATE User

#insert user credential when first register
insert into User (email,passwd) values ('seo@gmail.com','abc123');
insert into User (email,passwd) values ('clark2018@gmail.com','wnm23');

#insert user info (address)
insert into Address (street,city,state,zipcode,country) values ('123 St','Lincoln','Nebraska','68508','USA');
insert into Address (street,city,state,zipcode,country) values ('19 Bowman St','Melbourne','Kentucky','32904','USA');

#insert user info (Note: information in address has to be repeated to get the correct addressId)
insert into UserInfo (email,firstName,lastName,creationTime,addressId) 
	values ('seo@gmail.com','Bill','Gates',CURRENT_TIMESTAMP,(select addressId from Address where street = '123 St' AND city = 'Lincoln' AND state = 'Nebraska' AND zipcode = '68508' AND country = 'USA'));
insert into UserInfo (email,firstName,lastName,creationTime,addressId) 
	values ('clark2018@gmail.com','Jasaon','Clark',CURRENT_TIMESTAMP,(select addressId from Address where street = '19 Bowman St' AND city = 'Melbourne' AND state = 'Kentucky' AND zipcode = '32904' AND country = 'USA'));
#update user info (Note: email can't be updated, as it's foreign key for UserInfo table)
UPDATE UserInfo SET lastName = 'Clington' where email = 'seo@gmail.com';
#update address info 
UPDATE Address SET street = '321 St' where addressId = (select addressId from UserInfo where email = 'seo@gmail.com');


##GET USER INFO

#get user password given an email
select passwd from User where email = 'seo@gmail.com';
#get info of a user
select * from UserInfo where email = 'seo@gmail.com';
#get address of a user given an email
select * from Address where addressId = (select addressId from UserInfo where email = 'seo@gmail.com');
#get all info of a user given an email
select * from Address join UserInfo on UserInfo.addressId = (select addressId from UserInfo where email = 'seo@gmail.com');

##INSERT INVENTORY

#insert inventory
insert into Inventory (inventoryName,email) values ('My Inventory','seo@gmail.com');
#insert category 
insert into Category (categoryName,inventoryId,parentCategory) values ('Electronics',1,NULL);
#sub category
insert into Category (categoryName,inventoryId,parentCategory) values ('Smartphone',1,
(select categoryId from Category as sub where inventoryId = 1 AND categoryName = 'Electronics'));
#insert item
insert into Item (itemName, qty, price, itemStatus, supplier, categoryId) values ('Galaxy S',3,300,1,'Samsung', (select categoryId from Category where categoryName = 'Smartphone' AND inventoryId = 1));
insert into Item (itemName, qty, price, itemStatus, supplier, categoryId) values ('xperia',2,500,1,'Sony', (select categoryId from Category where categoryName = 'Smartphone' AND inventoryId = 1));


#get all items of a user given an email
select d.email, a.categoryName, c.itemName, c.qty, c.price, c.supplier from Category a 
	join Inventory b on b.inventoryId = a.inventoryId 
	join Item c on a.categoryId = c.categoryId 
	join User d on d.email = b.email 
	where d.email = 'seo@gmail.com';
