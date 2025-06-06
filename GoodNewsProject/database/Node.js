const { create } = require('domain');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    createdAt: {type: Date, default: Date.now }
});