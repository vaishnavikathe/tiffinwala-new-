import Contact from "../models/contact.js";

//Save contact message
export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const contact = await Contact.create({
      name,
      email,
      message
    });

    res.status(201).json({
      message: "Message sent successfully",
      contact
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


// Get all messages (admin/vendor dashboard)
export const getContacts = async (req, res) => {
  try {

    const contacts = await Contact.find()
      .sort({ createdAt: -1 });

    res.json({
      contacts
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};