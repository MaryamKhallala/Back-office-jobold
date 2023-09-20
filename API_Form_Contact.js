const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');

// Set up middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const port = process.env.PORT || 3000;

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  const cors = require('cors');

  // ...
  
  // Enable CORS
  app.use(cors());
// Define your form submission route
app.post('/contact', upload.single('attachment'), async (req, res) => {
    try {
      // Extract form data from req.body
      const { name, email, message,selectedOption } = req.body;
      
  
      // Handle file attachment (if uploaded)
      const attachmentPath = req.file ? req.file.path : '';
  
      // Configure Nodemailer
     const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other email services, make sure to provide valid credentials below
    auth: {
      user: 'contact.jobold@gmail.com', // Your Gmail email address
      pass: 'asom yjhd kiuc rngb' // Your Gmail password (use environment variables for security)
    }
  });
     
  // Create email data
  const mailOptions = {
    from: 'contact.jobold@gmail.com',
    to: 'business@jobold.com', // Replace with the recipient's email address
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nType: ${selectedOption}`,
    attachments: [{ path: attachmentPath }],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending the email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
    }
 catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }});

