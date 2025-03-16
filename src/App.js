import React, { useEffect } from "react";
import "./App.css";

// fuunction to convert text to speech
function App() {
  useEffect(() => {
    const btn = document.querySelector(".talk");
    const content = document.querySelector(".content");

    function speak(text) {
      const text_speak = new SpeechSynthesisUtterance(text);
      text_speak.rate = 1;
      text_speak.volume = 1;
      text_speak.pitch = 1;
      window.speechSynthesis.speak(text_speak);
    }

    function wishMe() {
      var day = new Date();
      var hour = day.getHours();
      if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
      } else if (hour > 12 && hour < 17) {
        speak("Good Afternoon Boss...");
      } else {
        speak("Good Evening Boss...");
      }
    }

    window.addEventListener("load", () => {
      speak("Initializing Cartel...");
      wishMe();
    });

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
      const currentIndex = event.resultIndex;
      const transcript = event.results[currentIndex][0].transcript;
      content.textContent = transcript;
      takeCommand(transcript.toLowerCase());
    };

    btn.addEventListener("click", () => {
      content.textContent = "Listening....";
      recognition.start();
    });
    // function for commands
    function takeCommand(message) {
      if (
        message.includes("cartel") ||
        message.includes("hello") ||
        message.includes("hey")
      ) {
        speak("Hello Sir, How May I Help You?");
      } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
      } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
      } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
      } else if (
        message.includes("what is") ||
        message.includes("who is") ||
        message.includes("what are")
      ) {
        window.open(
          `https://www.google.com/search?q=${message.replace(" ", "+")}`,
          "_blank"
        );
        const finalText =
          "This is what I found on the internet regarding " + message;
        speak(finalText);
      } else if (message.includes("wikipedia")) {
        window.open(
          `https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`,
          "_blank"
        );
        const finalText =
          "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
      } else if (message.includes("time")) {
        const time = new Date().toLocaleString(undefined, {
          hour: "numeric",
          minute: "numeric",
        });
        const finalText = time;
        speak(finalText);
      } else if (message.includes("date")) {
        const date = new Date().toLocaleString(undefined, {
          month: "short",
          day: "numeric",
        });
        const finalText = date;
        speak(finalText);
      } else if (message.includes("calculator")) {
        window.open("Calculator:///");
        const finalText = "Opening Calculator";
        speak(finalText);
      } else {
        window.open(
          `https://www.google.com/search?q=${message.replace(" ", "+")}`,
          "_blank"
        );
        const finalText =
          "I found some information for " + message + " on Google";
        speak(finalText);
      }
    }
  }, []);

  return (
    <div>
      <link rel="stylesheet" href="" />
      <link rel="shortcut icon" href="/avatar.png" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />

      <section className="main">
        <div className="image-container">
          <div className="image">
            <img src="/giphy.gif" alt="pic" />
          </div>
          <h1>Cartel</h1>
          <p>I'm a Virtual Assistant Cartel, How may I help you?</p>
        </div>
        <div className="input">
          <button className="talk">
            <i className="fas fa-microphone-alt"></i>
          </button>
          <h1 className="content">Click here to speak</h1>
        </div>
      </section>
    </div>
  );
}

export default App;
