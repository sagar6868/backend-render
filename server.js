const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// CONTACT FORM API
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    // Mail config
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sagarsbiradar522@gmail.com",      // 🔴 your gmail
        pass: "wani paei qsjg xlqf"           // 🔴 Gmail App Password
      }
    });

    const mailOptions = {
      from: email,
      to: "yourcompany@gmail.com",
      subject: "New Contact Form Message",
      html: `
        <h3>New Enquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b><br>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
