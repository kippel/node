import express from "express";
import { db } from "./db/db";
import { users } from "./db/schema";


const app = express()

const PORT = 3000

app.use(express.json())

app.get("/", async (req, res) => {
  const result = await db.select().from(users);
  console.log(result)
  res.json({'foo': "bar"});
});

app.listen(PORT, () => {
    console.log(`Server ${PORT}`)
})