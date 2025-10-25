import React from 'react';

// SVG Icons for Twitter(X), Mail, and Letterboxd
const TwitterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const MailIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M20 5H4C2.89543 5 2 5.89543 2 7V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V7C22 5.89543 21.1046 5 20 5ZM4 7L12 11.5L20 7V8.618L12 13.5L4 8.618V7Z"/>
    </svg>
);

const LetterboxdIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="4.5" cy="12" r="2.5"></circle>
        <circle cx="12" cy="12" r="2.5"></circle>
        <circle cx="19.5" cy="12" r="2.5"></circle>
    </svg>
);


const SocialButtons: React.FC = () => {
  const buttonStyle = "flex items-center justify-center h-10 w-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white transition-all duration-300 hover:bg-white/25 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg";

  return (
    <div className="flex gap-3">
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter profile" className={buttonStyle}>
            <TwitterIcon />
        </a>
        <a href="mailto:hello@kinomoyo.com" aria-label="Send us an email" className={buttonStyle}>
            <MailIcon />
        </a>
        <a href="https://letterboxd.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Letterboxd profile" className={buttonStyle}>
            <LetterboxdIcon />
        </a>
    </div>
  );
};

export default SocialButtons;