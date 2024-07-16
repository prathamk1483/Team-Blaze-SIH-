const express = require("express")
const router = express.Router();
const User_Doubt_Solver = require("../models/User_Doubt_Solver")
const { query, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")

//Route 1 Create a user using POST "/api/doubt_solver/signup"
router.post('/signup', [
    // Validate username, email, and password fields
    query('name').notEmpty().withMessage('Name is required'),
    query('username').notEmpty().withMessage('Username is required'),
    query('email').isEmail().withMessage('Invalid email'),
    query('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
    // If there are error,return Bad request and the errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether tha email already exists
        let user = await User_Doubt_Solver.findOne({ username: req.body.username })

        if (user) {
            return res.status(400).json({ error: "User with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        user = await User_Doubt_Solver.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        res.json("Doubt Solver Signed in")
    }

    // Catch Errors
    catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }

}
)

//Route 2 Log in the user using POST "/api/doubt_solver/login"
router.post("/login", [
    query('username').notEmpty().withMessage('Username is required'),
    query('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body
    try {
        let user = await User_Doubt_Solver.findOne({ username })
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const passwordcompare = await bcrypt.compare(password, user.password)
        if (!passwordcompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        res.json("Doubt Solver Logged in")

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})

router.put("/update", async (req, res) => {

    const { name, username, mail, bio, description, expertise, contact_no, linkedin, insta, whatsapp } = req.body;

    try {
        // Find the user by their username
        let user = await User_Doubt_Solver.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user information with the new data
        user.mail = mail;
        user.bio = bio;
        user.description = description;
        user.expertise = expertise;
        user.contact_no = contact_no;
        user.linkedin = linkedin;
        user.insta = insta;
        user.whatsapp = whatsapp;

        await user.save();

        res.json({ message: "User information updated successfully", user });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
