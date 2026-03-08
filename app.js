// Import modules
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

// Define the port number where our server will listen
const PORT = 3002;

// Configure dotenv
dotenv.config();

// Create an instance of an Express application
const app = express();

app.use(express.static('public'));

// "Middleware" allows express to read form data and store it in req.body
app.use(express.urlencoded({ extended: true }));

// Set view engine to ejs
app.set('view engine', 'ejs');

// Create a pool (bucket) of database connections
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// Database test route
app.get('/db-test', async(req, res) => {

    try {
        const contacts = await pool.query('SELECT * FROM contacts');
        res.send(contacts[0]);
    } catch(err) {
        console.error('Database error: ', err);
    }
    
});


// Create a temp array to store contacts -- const makes pointer / reference stay, list can grow/shrink
const contacts = [];

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client

app.get('/', (req, res) => {

   res.render("home");

});

app.get('/contact', (req, res) => {

   res.render("contact");

});

//  Confirmation
app.get('/thank-you', (req, res) => {

    res.render("confirmation", { contact });

});

// Submit contact route
app.post('/submit-contact', async(req, res) => {

  const input = req.body;

  // Create a JSON object to store the order data
  // Update to an array for database implementation
  let contact = [
    input.fname,
    input.lname,
    input.jtitle,
    input.company,
    input.linkedin,
    input.email,
    (input.meet != "other") ? input.meet : input.other,
    input.message,
    input.mlist,
    input.format,
  ];

    // Insert new order into database
  const sql =  `INSERT INTO contacts (fname, lname, title, company, linkedin, email, 
                met, message, mlist, form)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Add object to array
  contacts.push(contact);

  // Format for database

  // Set "on" to 1 for SQL database
  contact[8] == "on" ? contact[8] = 1 : contact[8] = 0;

  // Send to db
  const result = await pool.execute(sql, contact);

  // Redefine as object to populate on page

  contact = {
    fname: input.fname,
    lname: input.lname,
    title: input.jtitle,
    company: input.company,
    linkedin: input.linkedin,
    email: input.email,
    met: (input.meet != "other") ? input.meet : input.other,
    message: input.message,
    mlist: input.mlist,
    format: input.format,
    timestamp: new Date()
  };

  console.log(contact.met);

  // Send user to thank you page
  res.render("confirmation", { contact });

});

// Admin route
app.get('/admin', async(req, res) => {
    // Read all orders from db
    // newest first
    let sql = 'SELECT * FROM contacts ORDER BY timestamp DESC';
    const contacts = await pool.query(sql);

    res.render('admin', { contacts: contacts[0] });
});


// Start the server and listen on the specified port 
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 
