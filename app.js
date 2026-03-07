// Import the express module
import express from 'express';

// Define the port number where our server will listen
const PORT = 3002;

// Create an instance of an Express application
const app = express();

app.use(express.static('public'));

// "Middleware" allows express to read form data and store it in req.body
app.use(express.urlencoded({ extended: true }));

// Set view engine to ejs
app.set('view engine', 'ejs');

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
app.post('/submit-contact', (req, res) => {

  // Create a JSON object to store the order data
  const contact = {
    fname: req.body.fname,
    lname: req.body.lname,
    title: req.body.jtitle,
    company: req.body.company,
    linkedin: req.body.linkedin,
    email: req.body.email,
    met: req.body.meet,
    other: req.body.other,
    message: req.body.message,
    mailing: req.body.mlist,
    format: req.body.format,
    timestamp: new Date()
  };

  // Add object to array
  contacts.push(contact);

  // Send user to thank you page
  res.render("confirmation", { contact });

});

// Admin route
app.get('/admin', (req, res) => {
    res.render("admin", { contacts });
});


// Start the server and listen on the specified port 
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 
