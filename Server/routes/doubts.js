const express = require("express");
const router = express.Router();
const Doubt = require("../models/Doubt");
const User_Doubt_Asker = require("../models/User_Doubt_Asker");
const { body, validationResult } = require("express-validator");

router.post("/doubt", async (req, res) => {
    const { title, description, category, user } = req.body;

    let existingUser;

    try {
        const { user, title, description, category } = req.body;

        const existingUser = await User_Doubt_Asker.findById(user);
        if (existingUser) {
            const newDoubt = await Doubt.create({
                user: user, // Make sure user ID is provided in the request body
                title: title,
                description: description,
                category: category
            });

            // Add the doubt ID to the doubtsAsked array of the user
            existingUser.doubtsAsked.push(newDoubt._id);

            // Save the updated user document
            await existingUser.save();

            // If the user exists and the doubt is saved successfully
            return res.status(200).json({ message: "Doubt saved successfully.", doubt: newDoubt });
        }

        else {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }


    }

    // Catch Errors
    catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }

}
)

module.exports = router;
