import { getDBConnection } from "../config/db.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const registerUser = async (req, res) => {
    const db = await getDBConnection();
    const { username, email, password } = req.body;
    try {
        const existingUser = await db.execute('SELECT * FROM tbl_users WHERE username = ?', [username]);

        // Check if user already exists
        if (existingUser[0].length > 0) {
            return res.status(400).json({ message: "Username already exists.", username: existingUser[0].username });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const result = await db.execute(
            'INSERT INTO tbl_users (username, password, email, datetime) VALUES (?, ?, ?, NOW())',
            [username, hashedPassword, email]
        );
        res.status(201).json({ message: "User registered successfully.", userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
};

const loginUser = async (req, res) => {
    const db = await getDBConnection();
    const { username, password } = req.body;
    try {
        const userExists = await db.execute('SELECT * FROM tbl_users WHERE username = ?', [username]);

        if (userExists[0].length < 1) {
            return res.status(400).json({ message: "Invalid username or password." });
        }

        // verify password
        const passwordMatch = bcryptjs.compareSync(password, userExists[0][0].password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid username or password." });
        }

        const token = jwt.sign({ id: userExists[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful.", userId: userExists[0].id, token });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
};

const getUserProfile = async (req, res) => {
    const db = getDBConnection();
    const userId = req.user.id;
    try {
        const user = await db.execute('SELECT id, username, email, datetime FROM tbl_users WHERE id = ?', [userId]);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
};

export { registerUser, loginUser, getUserProfile };