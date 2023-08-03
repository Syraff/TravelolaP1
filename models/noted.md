tabel users:
id (integer)
email (varchar)
password (varchar)
role (varchar user 1 admin)
activated (boolean)

tabel profiles:
id (integer)
firstName (varchar)
lastName (varchar)
alamat (taxt)
phoneNumber (varchar)

tabel tourBokings:
id (integer)
orderDate (date)
participants (integer)
totalPayment (integer)
transactionId (integer)

 tabel tourPackages:
 id (integer)
 name (varchar)
 destination (varchar)
 description (text)
 price (integer)
 startDate (date)
 endDate (date)

 tabel transaction:
 id (integer)
 statusPayment (varchar)