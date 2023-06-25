const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { config } = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');
const readline = require('readline');
const say = require('say');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('styles'));

config();
let data=""

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the index.html file
app.get('/', (req, res) => {
  //const indexPath = path.join(__dirname, 'index.html');
 res.render('template',{data})
});

// Handle form submission
app.post('/getdata', async (req, res) => {
   data = req.body.speechInput;

  // Do something with the submitted data

  console.log('Submitted data:', data);

 // res.send('Form submitted successfully!');

  const openAi = new OpenAIApi(
    new Configuration({
      apiKey: process.env.API_KEY,
    })
  );
  const response = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: data }],
  });
  let message=response.data.choices[0].message.content;
  console.log(response.data.choices[0].message.content);
  say.speak(message)
  //res.render('template', { data });
  res.redirect("/")

  

});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
