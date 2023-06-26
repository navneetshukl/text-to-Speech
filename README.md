# text-to-Speech

Text-to-Speech web service takes input in the form of either text or audio, and then calls the OpenAI api's to get the response from chatGPT. 
Once the web service gets the response, it converts the response text to audio.

## Steps to run this project locally

- git clone https://github.com/navneetshukl/text-to-Speech.git
- npm init
- get the api key from the OpenAI and export it. `export API_KEY=<OpenAI API key>`
- npm install
- node server.js
