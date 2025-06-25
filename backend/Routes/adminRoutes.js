const express = require('express');
const { getAllUsers, getAllUploads } = require('../Controllers/adminController');
const protect = require('../Middlewares/authMiddlewares');
const adminOnly = require('../Middlewares/adminMiddleware')
const router = express.Router();
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/uploads', protect, adminOnly, getAllUploads);

module.exports = router;
