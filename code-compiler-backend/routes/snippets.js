const express = require('express');
const jwt = require('jsonwebtoken');
const Snippet = require('../models/Snippet');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all snippets for a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const snippets = await Snippet.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(snippets);
  } catch (error) {
    console.error('Get snippets error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a specific snippet
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });
    
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    
    res.json(snippet);
  } catch (error) {
    console.error('Get snippet error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new snippet
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, code, language, description, isPublic, tags } = req.body;
    
    if (!title || !code || !language) {
      return res.status(400).json({ message: 'Title, code, and language are required' });
    }
    
    const snippet = new Snippet({
      userId: req.user.userId,
      title,
      code,
      language,
      description,
      isPublic: isPublic || false,
      tags: tags || []
    });
    
    await snippet.save();
    res.status(201).json({ 
      message: 'Snippet created successfully', 
      snippet 
    });
  } catch (error) {
    console.error('Create snippet error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a snippet
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, code, language, description, isPublic, tags } = req.body;
    
    const snippet = await Snippet.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      {
        title,
        code,
        language,
        description,
        isPublic,
        tags,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    
    res.json({ 
      message: 'Snippet updated successfully', 
      snippet 
    });
  } catch (error) {
    console.error('Update snippet error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a snippet
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const snippet = await Snippet.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });
    
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    
    res.json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    console.error('Delete snippet error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 