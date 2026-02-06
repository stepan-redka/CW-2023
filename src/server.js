const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const fs = require("fs");
const path = require("path");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

//заміна символу на певному індексі у рядку на інший рядок.
String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

// Підключення до бази даних
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'KursovaDB',
  port: process.env.DB_PORT || 3306
});


db.connect(function(err) {
  if (err) {
    return console.error(" Помилка " + err.message);
  } else {
  console.log('Connected to the database');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'pug');

// Serve static files
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

app.get('/', function (req, res) {
  fs.readFile(path.join(__dirname, '../views/index.html'),  (err, data) => {
    var sessions = {}
    db.query(
      'SELECT * FROM bookings',
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }else{
          res.send(data.toString().replace("'%{sessions}'", JSON.stringify(results)));
        }
      }
    );
  });
});


// API для бронювання місця
app.post('/api/bookSeat', (req, res) => {
  const { selectedSeats, sessionId } = req.body;

  // Перевірка, чи місце доступне (якщо не вже заброньоване)
  console.log(selectedSeats, sessionId);
  db.query(
    'SELECT * FROM bookings WHERE id = ?',
    [sessionId],
    (err, results) => {
      if (err) {
        return res.status(501).json({ error: 'Database error :' + err.message });
      }
      
      var AllSeatsFree = true;
      for(seat of selectedSeats){
        if (results[0]['seats'][seat] == '1'){
          AllSeatsFree = false
        }
      }

      if (results.length > 0 && !AllSeatsFree) {
        return res.status(400).json({ error: 'Seat is already booked' });
      } else {
        // запис про бронювання
        var temp = results[0]['seats'];
        for(seat of selectedSeats){
          temp = temp.replaceAt(parseInt(seat), '1')
        }
        console.log(temp);
        db.query(
          'UPDATE bookings SET seats = ? WHERE id = ?',
          [temp, sessionId],
          (err) => {
            if (err) {
              return res.status(502).json({ error: 'Database error :' + err.message  });
            }
            return res.status(200).json({ message: 'Seat booked successfully' });
          }
        );
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 