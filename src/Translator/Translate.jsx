import React, { useState ,useEffect} from "react";
import "./Translate.css";

import { BeatLoader } from "react-spinners";
import axios from "axios";
const Translate = () => {
  const [hitoeng,sethiToEng] = useState(false);

  const [formData, setFormData] = useState({ language: "hi", message: "" });
//   const[selectlanguage,setlanguage] = useState('hi');
  const[input,setInput] = useState('');
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  
  const handleTranslate2=()=>{
    sethiToEng(true);
  }
 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

//    console.log(selectlanguage);

    setInput(e.target.value);
    setError("");
  };

  const translate = async () => {
   
    const options = {
      method: 'POST',
      url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
      params: {
        'to[0]': `${hitoeng?'en':formData.language}`,
        'api-version': '3.0',
        profanityAction: 'NoAction',
        textType: 'plain'
      },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': import.meta.env.VITE_REACT_APP_API_KEY,
        'X-RapidAPI-Host':import.meta.env.VITE_REACT_APP_HOST
      },
      data: [
        {
          Text: `${input}`
        }
      ]
    };
    
    try {
        const response = await axios.request(options);
        // console.log(response);
        const translateText = response.data[0].translations[0].text;
       setIsLoading(false);
        setTranslation(translateText);
       
        // console.log(response.data[0].translations[0].text);
    } catch (error) {
        console.error(error);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.message) {
      setError("Please enter the message.");
      return;
    }
    setIsLoading(true);
    translate();
   
    
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(translation)
      .then(() => displayNotification())
      .catch((err) => console.error("failed to copy: ", err));
  };

  const displayNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div div className="flex flex-col bg-fuchsia-600">
    <div className="container ">
      <h1 className="font-bold">Translate English to Hindi</h1>

      <form onSubmit={handleOnSubmit}>
        <div className="choices">
          <input
            type="radio"
            id="hindi"
            name="language"
            value="hi"
            language="hi"
            defaultChecked={formData.language}
            onChange={handleInputChange}
            
          />
          <label htmlFor="hindi">Hindi</label>

        </div>

        <textarea
          name="message"
          placeholder="Type your message here.."
          onChange={handleInputChange}
        ></textarea>

        {error && <div className="error">{error}</div>}

        <button type="submit" onClick={()=>{sethiToEng(false)}}>Translate</button>
      </form>

      <div className="translation">
        <div className="copy-btn" onClick={handleCopy}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
            />
          </svg>
        </div>
        {hitoeng?"": isLoading ? <BeatLoader size={12} color={"red"} /> : translation}
      </div>

      <div className={`notification ${showNotification ? "active" : ""}`}>
        Copied to clipboard!
      </div>
    </div>

    {/* Hindi to english */}
    <div className="container ">
      <h1 className="font-bold">Translate Hindi to English</h1>

      <form onSubmit={handleOnSubmit}>
        <div className="choices">
          <input
            type="radio"
            id="hindi"
            name="language"
            value="hi"
            language="hi"
            defaultChecked={formData.language}
            onChange={handleInputChange}
            
          />
          <label htmlFor="hindi">English</label>


        </div>

        <textarea
          name="message"
          placeholder="Type your message here.."
          onChange={handleInputChange}
        ></textarea>

        {error && <div className="error">{error}</div>}

        <button type="submit" onClick={handleTranslate2}>Translate</button>
      </form>

      <div className="translation">
        <div className="copy-btn" onClick={handleCopy}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
            />
          </svg>
        </div>
        {hitoeng? isLoading ? <BeatLoader size={12} color={"red"} /> : translation:""}
      </div>

      <div className={`notification ${showNotification ? "active" : ""}`}>
        Copied to clipboard!
      </div>
    </div>
    </div>
  );
};

export default Translate;