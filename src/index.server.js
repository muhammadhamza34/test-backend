const express=require('express');
const env=require('dotenv');
const app=express();
const { default: mongoose } = require('mongoose');
const path=require('path')
const cors=require('cors');

// routes
const userRoutes=require('./routes/auth');
const adminRoutes =require('./routes/admin/auth');
const categoryRoutes =require('./routes/category');
const productRoutes =require('./routes/product');
const cartRoutes =require('./routes/cart');
const initialDataRoutes =require('./routes/admin/initialData');
const pageRoutes =require('./routes/admin/page');
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoute = require("./routes/admin/order.routes");

//enviroment variable or you can say constants
env.config();



// mongoDB connection
// mongodb+srv://cartunion:<password>@cartunioncluster1.uiuuosm.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@united.pek059l.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log('database connected')
})


app.use('/public',express.static(path.join(__dirname , 'uploads')));
// for check api and postman
app.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'hello from server'
    });
});
app.post('/data',(req,res,next)=>{
    res.status(200).json({
        message:req.body
    });
});

app.use(cors());
app.use(express.json());
app.use('/api',userRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',initialDataRoutes);
app.use('/api',pageRoutes);
app.use('/api',addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoute);





app.listen(process.env.PORT,()=>{
    console.log(`server runing on ${process.env.PORT}`);
});