import express from "express";
const gTTS = require('gtts');
const app = express()


const PORT = 3000

app.use(express.json())

app.get("/", (req, res) => {
  res.json({'foo': "bar"});
  var gtts = new gTTS('casa', 'ca');
  gtts.save('/home/kippel/codes/node/hello.mp3', function (err, result) {
  if(err) { throw new Error(err) }
  console.log('Success! Open file /tmp/hello.mp3 to hear result.');
});
  
});

app.listen(PORT, () => {
    console.log(`Server ${PORT}`)
})