var http=require('http')
var express=require('express')
var path=require('path')
var bodyparser=require('body-parser')
var { Pool }=require('pg')

var pool=new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5432,
})

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    // pool.end()
})  

var app=express()
app.use(bodyparser())
app.use('/css',express.static(path.join(__dirname,'css')))
// viewsディレクトリの設定
app.set('views',path.join(__dirname,'views'))
// テンプレートエンジンの設定
app.set('view engine','pug')

app.get('/',function(req,res){
    var query='SELECT name,comment FROM postgres;'
    pool.query(query,(err,result) => {
        console.log(err,result)
        res.render('index',{
            posts: result.rows,
        })
    })
})

app.post('/',function(req,res){
    var query={
        text: 'INSERT INTO postgres(name,comment) VALUES($1,$2);',
        values: [req.body.username,req.body.comment],
    }
    pool.query(query,(err,result) => {
        console.log(err,result)
        res.redirect('/');
    })
})

console.log('Hello')
http.createServer(app).listen('3000')

// docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -P -p 5432:5432 -d postgres
