const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const connectDb = require('./db');
const path = require('path');
require('dotenv').config()

const PORT = process.env.PORT || 3001

const app = express();
app.use(express.json());
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
connectDb();
app.listen(PORT, ()=>{
});
routerApi(app);
