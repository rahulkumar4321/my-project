db.company.createCollection("employeeDetails",{"validator":{$jsonSchema:{"required":["name","age"],"properties":{name:{bsonType:'string', description:"must in string and required"}}}},validationAction:'error'})


//change in validations
db.company.runCommand({
    collMod: "employeeDetails",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "age", "address"],
        properties: {
          name: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          age: {
            bsonType: "int",
            description: "must be an integer and is required"
          },
          address: {
            bsonType: "array",
            description: "must be an array and is required",
            items: {
              bsonType: "object",
              required: ["firstLine", "secondLine"],
              properties: {
                firstLine: {
                  bsonType: "string",
                  description: "must be a string"
                },
                secondLine: {
                  bsonType: "string",
                  description: "must be a string and is required"
                }
              }
            }
          }
        }
      }
    },
    validationAction: "error"
  })
  

  //Ordered options in insertMany to insert documents

  db.employeeDetails.insertMany([{},{},{}],{ordered:false})//if any document getting error then rest of document insert in collection

  //writeconcren in insert documents

  db.employeeDetails.insertMany([{},{},{}],{writeConcern:{w:0 or 1,j:true or false,wtimeout:miliseconds}})
  //w:  gives 0 and 1 if 0 then acknowledge is false and gives 1 acknowledged is true and by default is 1
  //j: for jurenal gives true and false meaning if true it meains if any of the setuation mongodb is down then restart db curser know what operation is run other wise db not know 
//by default is false
//wtimeout: any operation insert, update, delete having more time and we set timeout it operatons is fail


//mongoImport 

>mongoimport --file <filename> --db <databsename> --collection <collectionname> --jsonArray <if file as json array>


>db.student.find({age:{$eq:25}})
>db.student.find({age:{$ne:25}})
>db.student.find({age:{$gt:25}})
>db.student.find({age:{$lt:25}})
>db.student.find({age:{$gte:25}})

//logical operator
$or,$and ,$not, $nor

>db.student.find({$or:[{age:{$eq:25}},{age:{$eq:30}}]})
>db.student.find({$and:[{age:{$eq:25}},{name:{$eq:"rahul"}}]})

//Elementry operator
$exists:<Value",$type:8

db.student.find({hobbies:{$all:['watching shows','tore and travale']}})//  $all meains find all documents whos having hobbies like ture and travle and watching shows


//collections
[
  {
    _id: 1,
    product: [
      { productname: 'apple', quantity: 10 },
      { productname: 'banana', quantity: 12 },
      { productname: 'orange', quantity: 20 }
    ]
  },
  {
    _id: 2,
    product: [
      { productname: 'apple', quantity: 10 },
      { productname: 'mango', quantity: 25 },
      { productname: 'guava', quantity: 20 }
    ]
  },
  {
    _id: 3,
    product: [
      { productname: 'apple', quantity: 10 },
      { productname: 'mango', quantity: 30 },
      { productname: 'guava', quantity: 20 }
    ]
  }
]

//find documents who productname is mango and quantity is 30kg(exect match)
db.products.find({$and:[{'product.productname':'mango'} ,{'product.quantity':{$gte:30}}]})  //getting wrong output

using $elemMatch

>db.products.find({product:{$elemMatch:{quantity:{$gte:30},name:'apple'}}})

//sorting 

db.student.find().sort({age:-1,name:1})//  -1=deceding and 1 = acceding pass multiple element for soring

db.student.find().sort({age:-1}).array.forEach(element => {
  printjson(element)
});


//increment operator
{$inc:{age:2}}//age increment by 2 for all student
{$inc:{age:-2}}//age decrement by 2 for all student

>db.studetn.update({},{$inc:{age:2}})

$inc, $min, $max, $mul, $unset, $rename & Upsert 

db.student.update({},{$rename:{age:"studentAge"}})
