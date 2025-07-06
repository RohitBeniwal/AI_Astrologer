'use client';

import { useState } from 'react';
import styles from './ApiInfo.module.css';

const ApiInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const apiDetails = [
    {
      name: 'Groq ✨',
      description: 'Ultra-fast inference API with state-of-the-art language models',
      features: ['Low latency responses', 'High throughput', 'Mixtral and Llama models'],
      website: 'https://groq.com'
    },
    {
      name: 'OpenRouter 🌌',
      description: 'Gateway to multiple AI models through a unified API',
      features: ['Access to 50+ models', 'Pay-as-you-go pricing', 'Simple integration'],
      website: 'https://openrouter.ai'
    },
    {
      name: 'Gemini 🔮',
      description: 'Google\'s most capable AI model for multimodal understanding',
      features: ['Text and image understanding', 'Advanced reasoning', 'Contextual awareness'],
      website: 'https://ai.google.dev/'
    }
  ];

  return (
    <div className={styles.apiInfoContainer}>
      <button 
        className={styles.infoButton} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {isOpen ? 'Hide API Info' : 'View Available APIs'}
      </button>
      
      {isOpen && (
        <div className={styles.apiInfoPanel}>
          <h2 className={styles.apiInfoTitle}>Cosmic Oracle Powers</h2>
          <p className={styles.apiInfoDescription}>
            Our AI Astrologer harnesses the power of multiple advanced AI models to deliver mystical insights:
          </p>
          
          <div className={styles.apiCardContainer}>
            {apiDetails.map((api, index) => (
              <div key={index} className={styles.apiCard}>
                <h3 className={styles.apiName}>{api.name}</h3>
                <p className={styles.apiDescription}>{api.description}</p>
                <ul className={styles.apiFeatures}>
                  {api.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <a 
                  href={api.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.apiLink}
                >
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiInfo;