import express from "express";

const app = express()

const PORT = 3000

app.use(express.json())

app.get("/", (req, res) => {
  res.json({'foo': "bar"});
});

app.listen(PORT, () => {
    console.log(`Server ${PORT}`)
})