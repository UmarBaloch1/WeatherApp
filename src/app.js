const hbs = require('hbs')
const path = require('path')
const express = require('express')
const app = express()
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// defines path for express config
const indexpath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname, '../Templates/views')
const partialsPath = path.join(__dirname,'../Templates/partials')

// Setup handlebar engine and views location
app.set('view engine' , 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialsPath)

// setup static directary to set
app.use(express.static(indexpath))

app.get( '' , (req, res) =>{
    res.render('index' ,{
        name:'umar',
        title:'Weather'
    })
})

app.get('/about',(req , res )=>{
    res.render('about',{
        name:'Umar',
        title:'About me'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Umrar'
    })
})
app.get ('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Please Enter A value first"
        })
    }
    console.log(req.query.search);
    res.send({
        product:[]
    })
} )

app.get('/weather' , (req, res)=>{
    if (!req.query.address){
        return res.send({
            error:'Please Provide an address'
        })
    }
    else{
        geocode(req.query.address, (error,data='Error') => {
            if(error){
                return res.send({error})
            }
        
            forecast(req.query.address, (error, forcastdata='error') => {
                if(error){
                    return res.send({error})
                }
        
                res.send({
                    forecast:forcastdata,
                    address: req.query.address,
                    data
                })
                
              })
        })
        }


    // res.send([{
    //     address: req.query.search,
    //     forecast :'It Will be sunny',
    //     location :'Multan'
    // }])
})

app.get('/help/*',(req,res)=>{
   res.render('404Page',{
       title:'404',
       name:'Umar',
    message:'Help Article Not Found'
   }) 
})

app.get('*',(req,res)=>{
    res.render('404Page',{
        title:'404',
        message:'Page Not Found',
        name:'Umar'
       }) 
})

app.listen(3000,()=>{
    console.log("server is up on port 3000")
})