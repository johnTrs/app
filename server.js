const express=require('express')
const mysql=require('mysql')
const app=express()
var port= process.env.PORT||3000
app.listen(port,()=>{
    console.log('conntected to '+port+'....')

})


const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'USERS'

});

db.connect((err)=>{
    console.log('connected...')
} )
app.get('/createDb',(req,res)=>{
    let sql='CREATE DATABASE USERS'
    db.query(sql,(err,result)=>{
        if(err) console.log(err)
        console.log(result)
        res.send('db created..')
    })
})
app.get('/createUserTable',(req,res)=>{
let sql='CREATE TABLE MyUsers (id INT(6) AUTO_INCREMENT PRIMARY KEY,  firstname VARCHAR(30) NOT NULL,lastname VARCHAR(30) NOT NULL, email VARCHAR(50),reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)'
db.query(sql)
res.send('table created.....')

})


app.get('/addUser/:name/:last',(req,res)=>{
    var name=req.params.name
    var last=req.params.last
    let user= {firstname:name,lastname:last}
    let sql='INSERT INTO MYUSERS SET ?'
    let query=db.query(sql,user,(err,result)=>{
        if (err) console.log(err)
    })
    res.send(user+'added')
})

app.get('/getUser',(req,res)=>{
    let sql='SELECT * FROM myusers WHERE lastname="malakas"'
    db.query(sql,(err,result)=>{
    res.json(result)
    })
});
app.use(express.static('../css'))
app.use('',express.static(__dirname))
