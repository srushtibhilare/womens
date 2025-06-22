import React, { useState } from 'react';
import './About.css';
import womenProblemsData from './womenrightmarathi.json'; // Place your JSON data in this file

export default function Search() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

  const translateIfNeeded = (text) => {
    const translations = {
      "child marriage": "बालविवाह",
      "dowry": "देवघेव",
      "sexual harassment": "लैंगिक छळ",
      "domestic violence": "घरगुती हिंसा",
      "property": "मालमत्ता",
      "rape": "बलात्कार",
      // Add more English to Marathi keywords here if needed
    };
    return translations[text.toLowerCase()] || text;
  };

  const handleSearch = () => {
    const translatedQuery = translateIfNeeded(query);
    const keyword = normalize(translatedQuery);
    let matchedCategory = null;

    Object.entries(womenProblemsData.categories).forEach(([catKey, catData]) => {
      catData.keywords.forEach((kw) => {
        if (normalize(kw).includes(keyword)) {
          matchedCategory = catData;
        }
      });
    });

    setResult(matchedCategory);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="तुमची समस्या टाका (e.g., dowry, बालविवाह)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>🔍</button>
      {result && (
        <div className="result-box">
          <h3>📌 मदतीची माहिती:</h3>
          <p><strong>Helpline:</strong> {result.helpline}</p>
          <p><strong>ताबडतोब उपाय:</strong></p>
          <ul>
            {result.immediateSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
          <p><strong>कायदेशीर प्रक्रिया:</strong> {result.legalProcess}</p>
        </div>
      )}
    </div>
  );
}
