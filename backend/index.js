const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const UserRoute=require('./router/UserRoute')
const AdminRoute=require('./router/AdminRoute')
const chatRoute=require('./router/ChatRoute')

app.use(express.json())
app.use(cors())
app.use('/api/user',UserRoute)
app.use('/api/admin',AdminRoute)
app.use('/api/chat',chatRoute)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://mern-do-connectfront-lyjsjo9me-rohits-projects-a5c6d24a.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

mongoose.connect('mongodb+srv://admin:sunsetwest1234RRR@royoapi.3qmdrjq.mongodb.net/doconn?retryWrites=true&w=majority&appName=RoyoApi').then(()=>{

     console.log('db connected')
     app.listen(5000,()=>console.log('server running'))
})
