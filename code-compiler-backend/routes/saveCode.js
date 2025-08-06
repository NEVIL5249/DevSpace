const express = require('express');
const jwt = require('jsonwebtoken');
const Snippet = require('../models/Snippet');

const router = express.Router();

// Save code snippet
router.post('/save-code', async (req, res) => {
  try {
    const { title, code, language, token } = req.body;
    
    if (!token) {
      return res.status(401).json({ message: 'Token required' });
    }
    
    if (!title || !code || !language) {
      return res.status(400).json({ message: 'Title, code, and language are required' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const userId = decoded.userId;
    
    const snippet = new Snippet({
      userId,
      title,
      code,
      language
    });
    
    await snippet.save();
    res.status(201).json({ 
      message: 'Snippet saved successfully', 
      snippet 
    });
  } catch (error) {
    console.error('Save code error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 