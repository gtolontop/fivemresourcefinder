import React, { useState, useRef, useEffect } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setOpen(!open)}>
        <p>{question}</p>
        <div className={`faq-icon ${open ? 'open' : ''}`}>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_38_16980)">
              <rect y="7.08105" width="16" height="2" rx="1" fill="white" />
              <rect x="7" y="0.0810547" width="2" height="16" rx="1" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_38_16980">
                <rect width="16" height="16" fill="white" transform="translate(0 0.0810547)" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div
        className="faq-answer-wrapper"
        style={{ height: open ? `${height}px` : '0px' }}
      >
        <div className="faq-answer" ref={contentRef}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
