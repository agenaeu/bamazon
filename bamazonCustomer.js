var mysql = require('mysql');

var inquirer = require("inquirer");

//let stock_quantity = connection.query("SELECT stock_quantity, FROM products");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Mooninite_23",
  database: "bamazon"
});

function connect() {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    //selectAll();
    //connection.end();


  });
};

function updateProduct() {
  console.log("Updating inventory \n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: 99
      },
      {
        item_id: 1
      }
    ],
    function (err, res) {
      if (err) {
        console.log(err)
        return;
      }
      console.log(res.affectedRows + " products updated!\n");
      connection.end();
    }
    
  );

  // logs the actual query being run
  console.log(query.sql);
}


function selectAll() {
  console.log("Reading from db");
  let readQuery = "SELECT * FROM products";
  connection.query(readQuery, function (err, results) {
    if (err) {
      console.log(err);
      return;
    }

    console.log(results);
    connection.end();
  });

}

function Customer(ID, units) {
  this.ID = ID;
  this.units = units;
};


inquirer.prompt([
  {
    name: "ID",
    message: "What is the product ID?"
  }, {
    name: "Units",
    message: "How many would you like to buy?"
  }
]).then(function (answers) {
  // initializes the variable newPurchase to be a customer object which will take
  // in all of the user's answers to the questions above
  var newPurchase = new Customer(answers.ID, answers.units);
  updateProduct(answers.units, answers.ID);
  // printInfo method is run to show that the newPurchase object was successfully created and filled
  console.log(newPurchase);
});


connect();