var express = require("express");
var mysql = require("mysql2");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "blender",
    database: "mywebsite"
});


db.connect(function(error) {

    if (error) {
        console.log(error);
    } else {
        console.log("Database connected");
    }

});



app.post("/signup", function(req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], function(error, result) {

        if (error) {
            console.log(error);
            return res.status(500).send("Error creating account");
        }

        res.redirect("/after_signup.html");

    });

});



app.post("/login", function(req, res) {

    var email = req.body.email;
    var password = req.body.password;

    var sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [email, password], function(error, result) {

        if (error) {
    console.log(error);
    return res.status(500).send("Error logging in");
}

       else if (result.length > 0) {
    res.redirect("/Products.html");
}

        else {
            res.redirect("/unsuccessful_login.html");
        }

    });

});


app.listen(3000, function() {
    console.log("Server running on port 3000");
});