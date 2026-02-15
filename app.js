// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

// Define the port number where our server will listen
const PORT = 3000;

app.use(express.static('public'));

// "Middleware" allows express to read form data and store it in req.body
app.use(express.urlencoded({ extended: true }));

// Create a temp array to store orders -- const makes pointer / reference stay, list can grow/shrink
const contacts = [];

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {

   res.sendFile(`${import.meta.dirname}/views/home.html`);

});

//  Confirmation
app.get('/thank-you', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
    // Test
});

// Submit contact route
//
app.post('/submit-contact', (req, res) => {

  // Create a JSON object to store the order data
  const contact = {
    fname: req.body.fname,
    lname: req.body.lname,
    title: req.body.jtitle,
    company: req.body.company,
    met: req.body.meet,
    other: req.body.other,
    message: req.body.message,
    mailing: req.body.mlist,
    format: req.body.format,
    timestamp: new Date()
  };

  // Add order object to orders array
  contacts.push(contact);

  // Send user to thank you page
  res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

// Admin route
app.get('/admin', (req, res) => {
    res.send(contacts);
});


// Start the server and listen on the specified port 
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 
