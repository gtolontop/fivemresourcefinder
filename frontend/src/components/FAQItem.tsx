import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setOpen(!open)}>
        <h4>{question}</h4>
        <span>{open ? '-' : '+'}</span>
      </div>
      {open && <div className="faq-answer"><p>{answer}</p></div>}
    </div>
  );
};

export default FAQItem;
