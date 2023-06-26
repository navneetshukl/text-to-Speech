const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { config } = require('dotenv');

// Configuring OpenAI module 
const { Configuration, OpenAIApi } = require('openai');

// Using say module to convert text to audio
const say = require('say');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('styles'));

config();
let data=""

//Reading the API key from environment
apiKey=process.env.API_KEY

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the index.html file
app.get('/', (req, res) => {
  
 res.render('template',{data})
});

// Handle form submission
app.post('/getdata', async (req, res) => {
  try {
    data = req.body.speechInput;

    console.log('Submitted data:', data);
    if(apiKey==null){
      console.log("API key not set");
      return 
    }

    //Creating an object for OpenAI service
    const openAi = new OpenAIApi(
      new Configuration({
        apiKey: apiKey,
      })
    );

    //Calling OpenAI Api to get the response for the given text
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: data }],
    });
    let message = response.data.choices[0].message.content;
    console.log(response.data.choices[0].message.content);

    //Converting the text to speech using the speak function of say module
    say.speak(message, 1.0, (err) => {
      if (err) {
        console.log(err)
        return console.error(err)
      }
    
      console.log('Text has been spoken.')
    });

    //Once the request is completed redirect to home page
    res.redirect("/");
  } catch (error) {
    console.error("Error occurred:", error);
    // Handle the error here, e.g., send an error response or redirect to an error page
  }
});


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});