const express = require("express");
const app = express();
const cors = require('cors');
const mainRouter = require("./src/routes/routes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
      res.send(`Veltro Server is running`)
})

app.use("/", mainRouter);

app.listen(PORT, () => console.log(`Veltro Server is listening on port ${PORT}`));

// Required for Vercel
module.exports = app;