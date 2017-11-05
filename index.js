const express = require('express');
const fs = require('fs');
var path = require ('path');
var csvjson = require("csvjson");
var jsonexport = require("jsonexport");
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => 
    res.redirect('/main')
);

app.get('/main', (req, res) => 
    res.sendFile(__dirname + '/main.html')
);

app.get('/medicals', function(req, res) { 
  var medicals = getMedicals(req,res);

  res.json(medicals); 
});

app.get('/medicals/:id', function(req, res){
    var id = req.params.id;
    var medicals = getMedicals(req,res);
    
    var medical = getMedicalById(id, medicals);

    if(medical === undefined){
        res.render('error',
            { id: id }
        );

        return;
    }

    res.render('medicalInfo',
        {   name: medical.name,
            brand: medical.brand,
            company: medical.company,
            price: medical.price,
            isbn: medical.isbn
        }
    );
});

app.post('/medicals', function(req, res){
    var json = req.body;

    jsonexport(json,function(err, csv){
        if(err) return console.log(err);

        fs.appendFile('./data/medicals.csv', csv, function (err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    });
});

function getMedicals(req,res){
    var data = fs.readFileSync('./data/medicals.csv', { encoding : 'utf8'});
    var medicals = csvjson.toObject(data);
    
    return medicals; 
}

function getMedicalById(id,medicals){
    return medicals.find(item => item.id === id);
}

app.listen(2000);