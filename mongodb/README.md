# Mongo DB

## Mongo DB setup

**Install mongo** follow https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/

**Connect to mongodb** docker using `mongo admin -u root -p rootpassword`

**Generate json dump** in https://mockaroo.com/

**Import json into mongo db** using `$ mongoimport --db project --collection employees --authenticationDatabase admin -u root --password 'rootpassword' --file employees.json `

## Mongo DB basic commands
  
*Connect to mongodb* docker using `mongo admin -u root -p rootpassword`

*Check imported data*

    > use project
    employees
    > db.employees.count()
    1000
    > db.employees.find()
    { "_id" : ObjectId("60d351ba0cacd802d82b6f42"), "name" : "Bari McCuaig", "address" : "843 Drewry Circle", "email" : "bmccuaig3@networksolutions.com", "hired" : "1/25/2020", "salary" : "£6294.20", "department" : { "name" : "Trantow, Corkery and Toy", "location" : "Longping" } }
    ...
    > db.employees.find({ _id: ObjectId("60d351ba0cacd802d82b6f65") })
    { "_id" : ObjectId("60d351ba0cacd802d82b6f65"), "name" : "Delores Dionsetti", "address" : "3 Brentwood Alley", "email" : "ddionsettiz@mail.ru", "hired" : "11/30/2020", "salary" : "£2445.94", "department" : { "name" : "Vandervort-Zboncak", "location" : "Jīma" } }
    > db.employees.find({ _id: ObjectId("60d351ba0cacd802d82b6f65") }).pretty()
    {
    	"_id" : ObjectId("60d351ba0cacd802d82b6f65"),
    	"name" : "Delores Dionsetti",
    	"address" : "3 Brentwood Alley",
    	"email" : "ddionsettiz@mail.ru",
    	"hired" : "11/30/2020",
    	"salary" : "£2445.94",
    	"department" : {
		    "name" : "Vandervort-Zboncak",
		    "location" : "Jīma"
	    }
    }

*Create collection from scratch:*

    > db.employees.drop()
    true
    > show collections;    
    > db.createCollection('employees')
    { "ok" : 1 }
    > show collections
    employees
    > db.employees.find()
    > db.employees.insert({ name: 'Jonh', salary: 15000 })
    WriteResult({ "nInserted" : 1 })
    > db.employees.find()
    { "_id" : ObjectId("60d35536ee52c1310f1bd20d"), "name" : "Jonh", "salary" : 15000 }
    > db.employees.insertMany([ {name: 'Jonh', salary: 15000 },
    ... {name: 'Susan', salary: 14000 }
    ... ])
    {
        "acknowledged" : true,
        "insertedIds" : [
            ObjectId("60d355adee52c1310f1bd20e"),
            ObjectId("60d355adee52c1310f1bd20f")
        ]
    }
    > db.employees.find()
    { "_id" : ObjectId("60d35536ee52c1310f1bd20d"), "name" : "Jonh", "salary" : 15000 }
    { "_id" : ObjectId("60d355adee52c1310f1bd20e"), "name" : "Jonh", "salary" : 15000 }
    { "_id" : ObjectId("60d355adee52c1310f1bd20f"), "name" : "Susan", "salary" : 14000 }
    > db.employees.find({name: 'Susan' })
    { "_id" : ObjectId("60d355adee52c1310f1bd20f"), "name" : "Susan", "salary" : 14000 }

*Data query operations*

    Query with AND and OR
    > db.employees.find({ 'department.name': 'Kassulke-Veum' })
    { "_id" : ObjectId("60d3560e760174ada447daf0"), "name" : "Kerstin Westoff", "address" : "49831 Gina Center", "email" : "kwestofff@wikimedia.org", "hired" : "7/21/2018", "salary" : "£5718.49", "department" : { "name" : "Kassulke-Veum", "location" : "Villamontes" } }
    > db.employees.find({'department.name': 'Yozio'}).count()
    214
    > db.employees.find({ $and: [ { 'department.name': 'Yozio' }, { salary: { $gt: 2000 } } ] }).pretty()
    ...
    > db.employees.find({ $or: [ { 'department.name': 'Yozio' }, { 'department.location': 'Obala' } ] }).pretty()
    ...

    Return the name value only
    > db.employees.find({}, { name: 1 })
    { "_id" : ObjectId("60d35f0b7eea4f7ed1d43dd2"), "name" : "Barnard Peachman" }

    Return the name and salary value without objectId
    > db.employees.find({}, { name: 1, salary: 1, _id: 0 })
    { "name" : "Meredeth Lamperd", "salary" : 8135 }

    Combining both
    > db.employees.find({ salary: { $gt: 3000 }}, { name: 1, _id: 0 })
    
    Sort results from lowest to highest salary
    > db.employees.find({ salary: { $gt: 3000 }}, { name: 1, _id: 0 }).sort({ salary: 1 })

    Sort results from highest to lowest salary
    > db.employees.find({ salary: { $gt: 3000 }}, { name: 1, _id: 0 }).sort({ salary: -1 })

    Sort results name alphabetically
    > db.employees.find({ salary: { $gt: 3000 }}, { name: 1, _id: 0 }).sort({ name: 1 })

    Get latest inserted object
    > db.employees.find({}).sort({ _id:-1 }).limit(1).pretty()

*Data manipulation*

    Replace the whole document with name value...
    > db.employees.update({ _id: ObjectId("60d35f0b7eea4f7ed1d441b8")}, { name: 'Adam Lambert' })
    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

    Update the document property only
    > db.employees.update({ _id: ObjectId("60d35f0b7eea4f7ed1d441b7")}, { $set: { name: 'Adam Lambert'}})
    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

    Update record if match criteria, else insert new document (upsert)
    > db.employees.update({ name: 'Adam Lambert' }, { name: 'Adam Lambert', salary: 10000 } }, { upsert: true })

    Update multiple records matching
    > db.employees.update({ salary: { $gt: 9000 }}, { $set: { name: 'Banana Split' } }, { multi: true })
    WriteResult({ "nMatched" : 115, "nUpserted" : 0, "nModified" : 115 })

*Aggregate queries*

    Aggregate documents per department and calculate average salary
    > db.employees.aggregate([{ $group: { _id: "$department.name", salary: { $avg: "$salary" } }}])
    { "_id" : "Trilia", "salary" : 5141.227272727273 }
    { "_id" : "Yozio", "salary" : 5805.136150234742 }
    { "_id" : "Dynazzy", "salary" : 5575.777777777777 }







