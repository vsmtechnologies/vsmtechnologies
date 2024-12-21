require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const connectDB = require('./db/db');
const PORT = process.env.PORT || 5000;
const errorMiddleware = require('./middlewares/error-middlewares');
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const adminRoute = require('./router/admin-router');
const dataRoute = require('./router/data-router');

const clorsOption = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD", 
    credential: true,
}; 
app.use(cors(clorsOption)); 
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", dataRoute);

app.use("/api/admin", adminRoute); // let's define admin route

app.use(errorMiddleware); 

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`server is listen on PORT : ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};
start();