const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();
const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; // Chuỗi bí mật của bạn


const getUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            res.json({ message: 'Truy cập thành công vào route bảo mật', user });
        });
    } else {
        console.log("not token");
    }
}

module.exports = {
    getUser
}