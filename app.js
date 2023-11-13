require('dotenv').config();
const openaiApiKey = process.env.OPENAI_API_KEY;



const btn = document.querySelector('.talk')

const content = document.querySelector('.content')


function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour>=0 && hour<12){
        speak("Good Morning Boss...")
    }

    else if(hour>12 && hour<17){
        speak("Good Afternoon Master...")
    }

    else{
        speak("Good Evenining Sir...")
    }

}

window.addEventListener('load', ()=>{
    speak("Initializing JARVIS..");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition =  new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', ()=>{
    content.textContent = "Listening...."
    recognition.start();
})

function takeCommand(message){
    if(message.includes('hey') || message.includes('hello')){
        speak("Hello Sir,  I am lisa an virtual assisstant How May I Help You?");
    }
    else if(message.includes("open google")){
        window.open("https://google.com", "_blank");
        speak("Opening Google...")
    }
    else if(message.includes("open youtube")){
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...")
    }
    else if(message.includes("open facebook")){
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...")
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
	    speak(finalText);
  
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speak(finalText);
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak(finalText);
    }

    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }
   
 // Inside the takeCommand function
else if(message.includes('play') && message.includes('song')) {
    const songQuery = message.replace("play", "").replace("song", "").trim();
    const spotifyApiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(songQuery)}&type=track`;

    // Replace 'YOUR_ACCESS_TOKEN' with the actual access token obtained after user authentication
    const accessToken = '2364756df6054ae8b9b7d3c52f959a29';

    fetch(spotifyApiUrl, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        const track = data.tracks.items[0];

        if (track) {
            const audio = new Audio(track.preview_url);
            audio.play();

            const finalText = `Playing ${track.name} by ${track.artists[0].name}. Enjoy the music!`;
            speak(finalText);
        } else {
            const notFoundText = `Sorry, couldn't find a matching song.`;
            speak(notFoundText);
        }
    })
    .catch(error => {
        console.error('Error fetching music:', error);
        const errorText = 'Sorry, there was an issue fetching the music.';
        speak(errorText);
    });
   
  // Define a function to generate text using OpenAI GPT-3
function generateText(prompt, callback) {
    // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
    const apiKey = OPENAI_API_KEY;

    // Set up the OpenAI GPT-3 engine
    const gpt3 = new OpenAIAPI(apiKey);

    // Define parameters for the completion
    const params = {
        engine: "davinci",
        prompt: prompt,
        max_tokens: 150,
    };

    // Request text generation from OpenAI
    gpt3.complete(params, callback);
}

// Inside the takeCommand function
else if (message.startsWith('what is') || message.startsWith('when was')) {
    const prompt = message;
    generateText(prompt, (response) => {
        const answer = response.choices[0].text.trim();
        content.textContent = answer;
        speak(answer);
    });
}

}
  
}