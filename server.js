const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email, message } = JSON.parse(event.body);  // Adjust to match your form data

  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: 'sagarsbiradar522@gmail.com',
      pass: 'wani paei qsjg xlqf',
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'sagarsbiradar522@gmail.com',  // Replace with your email
      subject: 'Contact Form Submission',
      text: `Email: ${email}\nMessage: ${message}`,
    });
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },  // For CORS
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};