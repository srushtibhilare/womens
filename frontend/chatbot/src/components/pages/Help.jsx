import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, SendHorizonal, User, Bot, Heart, AlertCircle } from 'lucide-react';
import './hindi.css';

const lawData = {
  categories: {
    "घरेलू हिंसा": {
      keywords: ["पति मारता है", "ससुराल वाले सताते हैं", "मारपीट", "गाली-गलौज", "घर में हिंसा"],
      helpline: "महिला हेल्पलाइन: 181 | पुलिस: 100 | दहेज विरोधी हेल्पलाइन: 011-26942369"
    },
    "कार्यस्थल उत्पीड़न": {
      keywords: ["ऑफिस में परेशानी", "बॉस छेड़ता है", "यौन उत्पीड़न", "काम की जगह पर अश्लील टिप्पणी"],
      helpline: "कार्यस्थल हेल्पलाइन: 1800-123-123 | NCW हेल्पलाइन: 7827-170-170"
    },
    "बाल विवाह": {
      keywords: ["जबरन शादी", "कम उम्र में शादी", "बेटी की शादी रोकें", "नाबालिग विवाह"],
      helpline: "बाल हेल्पलाइन: 1098 | CHILDLINE: 1098"
    },
    "दहेज": {
      keywords: ["दहेज मांग", "दहेज के लिए प्रताड़ना", "ससुराल वाले दहेज मांगते हैं"],
      helpline: "दहेज विरोधी हेल्पलाइन: 011-26942369 | पुलिस: 100"
    }
  },
  acts: [
    {
      "कानून": "घरेलू हिंसा अधिनियम",
      "साल": "2005",
      "विवरण": "यह कानून पत्नी या महिला साथी को शारीरिक, मानसिक, भावनात्मक और आर्थिक हिंसा से सुरक्षा प्रदान करता है। आप तुरंत सुरक्षा आदेश प्राप्त कर सकती हैं।",
      "समाधान": "नजदीकी महिला थाने में शिकायत दर्ज कराएं या 181 पर कॉल करें",
      "Category": "घरेलू हिंसा"
    },
    {
      "कानून": "कार्यस्थल पर महिलाओं का यौन उत्पीड़न (रोकथाम, निषेध एवं निवारण) अधिनियम",
      "साल": "2013",
      "विवरण": "इस कानून के तहत कार्यस्थल पर महिलाओं के यौन उत्पीड़न को रोकने के लिए सख्त प्रावधान हैं। हर संस्थान में आंतरिक शिकायत समिति (ICC) बनाना अनिवार्य है।",
      "समाधान": "कंपनी की ICC को लिखित शिकायत दें या 1800-123-123 पर कॉल करें",
      "Category": "कार्यस्थल उत्पीड़न"
    },
    {
      "कानून": "बाल विवाह निषेध अधिनियम",
      "साल": "2006",
      "विवरण": "इस कानून के तहत 18 वर्ष से कम आयु की लड़की और 21 वर्ष से कम आयु के लड़के का विवाह प्रतिबंधित है। उल्लंघन करने पर 2 साल की जेल और 1 लाख रुपये जुर्माना का प्रावधान है।",
      "समाधान": "चाइल्डलाइन 1098 पर तुरंत सूचित करें या पुलिस से संपर्क करें",
      "Category": "बाल विवाह"
    },
    {
      "कानून": "दहेज निषेध अधिनियम",
      "साल": "1961",
      "विवरण": "दहेज लेना और देना दोनों ही अपराध है। दहेज के लिए प्रताड़ित करने पर 5 साल तक की जेल और जुर्माना हो सकता है।",
      "समाधान": "नजदीकी पुलिस स्टेशन में शिकायत दर्ज कराएं या 100 पर कॉल करें",
      "Category": "दहेज"
    }
  ],
  emotionalSupport: [
    {
      "message": "आप अकेली नहीं हैं, हम आपके साथ हैं ❤️\nआपकी सुरक्षा हमारी प्राथमिकता है",
      "keywords": ["डर लगता है", "अकेली महसूस करती हूँ", "कोई सहारा नहीं"]
    },
    {
      "message": "आप बहुत साहसी हैं, अपनी भावनाओं को व्यक्त करना सही है 💪\nकृपया मदद मांगने में संकोच न करें",
      "keywords": ["हिम्मत टूट रही है", "थक गई हूँ", "अब और नहीं सह सकती"]
    },
    {
      "message": "आप जैसी महिलाएं हमारे समाज की नींव हैं 🌸\nकृपया अपने अधिकारों के लिए खड़े हों, हम आपके साथ हैं",
      "keywords": ["मेरी कोई सुनने वाला नहीं", "मैं क्या करूँ", "लोग क्या कहेंगे"]
    }
  ]
};

function MahilaSahyogChatbot() {
  const [messages, setMessages] = useState([
    {
      text: "नमस्ते दीदी! मैं आपकी कैसे मदद कर सकती हूँ?\n\nआप निम्न विषयों पर मदद मांग सकती हैं:\n• घरेलू हिंसा\n• कार्यस्थल उत्पीड़न\n• बाल विवाह\n• दहेज संबंधी मुद्दे\n• अन्य कोई समस्या\n\nआप अपनी समस्या लिख सकती हैं या माइक बटन दबाकर बोल सकती हैं।",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'hi-IN';
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }

    return () => recognitionRef.current?.stop();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSend = (userInput = input) => {
    const query = userInput.trim();
    if (!query) return;

    setMessages(prev => [...prev, { text: query, sender: 'user' }]);
    setInput('');

    const emotionalSupport = lawData.emotionalSupport.find(support =>
      support.keywords.some(keyword => query.includes(keyword))
    );

    if (emotionalSupport) {
      setMessages(prev => [...prev, {
        text: `${emotionalSupport.message}\n\nयदि आपको कानूनी सहायता चाहिए, तो कृपया अपनी समस्या विस्तार से बताएं।`,
        sender: 'bot'
      }]);
      return;
    }

    let foundHelp = false;
    const lowerQuery = query.toLowerCase();

    for (const category in lawData.categories) {
      const catData = lawData.categories[category];
      if (catData.keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()))) {
        const relevantActs = lawData.acts.filter(act => act.Category === category);
        relevantActs.forEach(act => {
          const response = `⚖️ ${act.कानून} (${act.साल})\n\n${act.विवरण}\n\n🛡️ समाधान: ${act.समाधान}\n\n☎️ हेल्पलाइन: ${catData.helpline}`;
          setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
        });
        foundHelp = true;
      }
    }

    if (!foundHelp) {
      setMessages(prev => [...prev, {
        text: `माफ कीजिए, मैं आपकी समस्या पूरी तरह नहीं समझ पाई।\n\nकृपया इन नंबरों पर संपर्क करें:\n🔸 महिला हेल्पलाइन: 181\n🔸 पुलिस: 100\n🔸 राष्ट्रीय महिला आयोग: 7827-170-170\n\nआपकी सुरक्षा हमारी प्राथमिकता है ❤️`,
        sender: 'bot'
      }]);
    }
  };

  return (
    <div className="app">
      <h1><Heart size={24} color="#d81b60" /> महिला सशक्तिकरण सहायता</h1>

      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-icon">
              {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} color="#d81b60" />}
            </div>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="अपनी समस्या लिखें या बोलें..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />

        <div className="button-group">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`icon-btn ${isListening ? 'active' : ''}`}
            title="वॉइस इनपुट"
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="send-btn"
            title="संदेश भेजें"
          >
            <SendHorizonal size={20} />
          </button>
        </div>
      </div>

      <div className="emergency-info">
        <AlertCircle size={18} color="#d81b60" />
        <p>आपातकालीन सहायता: महिला हेल्पलाइन - 181 | पुलिस - 100 | बाल हेल्पलाइन - 1098</p>
      </div>
    </div>
  );
}

export default MahilaSahyogChatbot;
