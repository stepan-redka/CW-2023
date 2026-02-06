const fs = require('fs');
const path = require('path');
const { db } = require('../config/database');
const { replaceAt } = require('../utils/helpers');

/**
 * Get home page with all sessions
 */
const getHomePage = (req, res) => {
  const viewPath = path.join(__dirname, '../../views/index.html');
  
  fs.readFile(viewPath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load page' });
    }
    
    db.query('SELECT * FROM bookings', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.send(data.toString().replace("'%{sessions}'", JSON.stringify(results)));
    });
  });
};

/**
 * Book selected seats for a session
 */
const bookSeat = (req, res) => {
  const { selectedSeats, sessionId } = req.body;

  if (!selectedSeats || !sessionId) {
    return res.status(400).json({ error: 'Missing required fields: selectedSeats, sessionId' });
  }

  console.log('Booking seats:', selectedSeats, 'for session:', sessionId);

  db.query(
    'SELECT * FROM bookings WHERE id = ?',
    [sessionId],
    (err, results) => {
      if (err) {
        return res.status(501).json({ error: 'Database error: ' + err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Session not found' });
      }

      // Check if all selected seats are free
      let allSeatsFree = true;
      for (const seat of selectedSeats) {
        if (results[0]['seats'][seat] === '1') {
          allSeatsFree = false;
          break;
        }
      }

      if (!allSeatsFree) {
        return res.status(400).json({ error: 'One or more seats are already booked' });
      }

      // Update seats
      let updatedSeats = results[0]['seats'];
      for (const seat of selectedSeats) {
        updatedSeats = replaceAt(updatedSeats, parseInt(seat), '1');
      }

      console.log('Updated seats:', updatedSeats);

      db.query(
        'UPDATE bookings SET seats = ? WHERE id = ?',
        [updatedSeats, sessionId],
        (err) => {
          if (err) {
            return res.status(502).json({ error: 'Database error: ' + err.message });
          }
          return res.status(200).json({ message: 'Seat booked successfully' });
        }
      );
    }
  );
};

module.exports = {
  getHomePage,
  bookSeat
};
