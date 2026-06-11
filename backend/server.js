const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/candidates", require("./routes/candidates"));
app.use("/api/vote", require("./routes/vote"));
app.use("/api/results", require("./routes/results"));

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});