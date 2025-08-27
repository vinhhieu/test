import React, { useState, useEffect } from 'react';

const OCRControls: React.FC = () => {
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleWordSelected = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setSelectedText(customEvent.detail.trim());
    };

    window.addEventListener(
      'wordSelected',
      handleWordSelected as EventListener
    );

    return () => {
      window.removeEventListener(
        'wordSelected',
        handleWordSelected as EventListener
      );
    };
  }, []);

  return (
    <div className="ocr-controls">
      <h3>Textarea</h3>
      <textarea value={selectedText} rows={4} readOnly />
    </div>
  );
};

export default OCRControls;
