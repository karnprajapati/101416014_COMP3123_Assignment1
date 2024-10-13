const app = require('./app');
const { check, validationResult } = require("express-validator");
const mongoose = require('mongoose');
const DB_CONNECTION_STRING = 'mongodb+srv://admin:Mongo%401234@cluster0.0mqlv.mongodb.net/comp3123_assigment?retryWrites=true&w=majority&appName=Cluster0';

 mongoose.connect(DB_CONNECTION_STRING, {
           
        }).then(() => { console.log('MongoDB Connected...')})
     .catch ((err) =>{
        console.log("Error: ", err);
    }
);

app.get("/", (req, res) => {
    res.send("<h1>MogoDB + Mongoose Example</h1>");
  });
  
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
