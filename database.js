const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'perpus',
});

function handleDisconnect(connection) {
    connection.connect(err => {
        if (err) {
            console.error('Error connecting to MySQL, retrying in 5 seconds:', err);
            setTimeout(() => handleDisconnect(connection), 5000);
        } else {
            console.log('Connected to MySQL database.');
        }
    });

    connection.on('error', err => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.warn('MySQL connection lost. Reconnecting...');
            handleDisconnect(connection); // Perbaiki koneksi jika terputus
        } else {
            console.error('MySQL error:', err);
            throw err;
        }
    });
}

handleDisconnect(db);

module.exports = db;
