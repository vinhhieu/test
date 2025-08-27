import React, { useState, useRef } from 'react';
import OCRControls from '../components/OCRControls';
import ImageViewer from '../components/ImageViewer';
import { IOcrResponse, IWord } from '../interfaces';

const UploadPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [ocrData, setOcrData] = useState<IWord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parsedDataOCR = (data: IOcrResponse) => {
    const parsedResults = data.ParsedResults;
    if (!parsedResults || parsedResults.length === 0) return [];

    const lines = parsedResults[0].TextOverlay?.Lines || [];
    const ocrData: IWord[] = [];

    lines.forEach((line: any) => {
      line.Words.forEach((word: IWord) => {
        ocrData.push(word);
      });
    });

    return ocrData;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:3000/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const parsedData = parsedDataOCR(data.text);
      setOcrData(parsedData);
    } catch (error) {
      // console.error('OCR processing error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-page">
      <h1>Image OCR Processor</h1>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
        aria-labelledby="upload-label"
      />

      <button onClick={triggerFileInput} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Upload Image'}
      </button>

      {image && ocrData && !isLoading && (
        <div>
          <OCRControls />
          <ImageViewer imageSrc={image} ocrData={ocrData} />
        </div>
      )}
    </div>
  );
};

export default UploadPage;
