const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { config } = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');
const readline = require('readline');

config();

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the index.html file
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

// Handle form submission
app.post('/getdata', async (req, res) => {
  const data = req.body.speechInput;

  // Do something with the submitted data
  console.log('Submitted Name:', data);

  res.send('Form submitted successfully!');

  const openAi = new OpenAIApi(
    new Configuration({
      apiKey: process.env.API_KEY,
    })
  );
  const response = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: data }],
  });
  console.log(response.data.choices[0].message.content);

});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
