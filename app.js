var http=require('http')
var express=require('express')
var path=require('path')

var app=express()

// viewsディレクトリの設定
app.set('views',path.join(__dirname,'views'))
// テンプレートエンジンの設定
app.set('view engine','pug')

app.get('/',function(req,res){
    return res.render('index')
})

console.log('Hello')
http.createServer(app).listen('3000')