const express = require("express");
const app = express();
const path = require("path");
const port = 5000;
const connectToMongo = require("./db")
const cors = require('cors');
app.use(cors());

connectToMongo();

app.get("/", (req, res) =>
{
    res.send("Welcome");
})

app.use(express.json())

//Available Routes
app.use("/api/doubt_asker", require("./routes/auth_Doubt_Asker"))
app.use("/api/doubt_solver", require("./routes/auth_Doubt_Solver"))
app.use("/api/doubts", require("./routes/doubts"))

app.listen(port, () =>
{
    console.log(`Server is started on port ${port}`)
})
