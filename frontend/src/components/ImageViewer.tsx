import React, { useState, useRef, useEffect } from 'react';
import { ISelectedWord, IWord } from '../interfaces';
import Selecto from 'react-selecto';

interface ImageViewerProps {
  imageSrc: string;
  ocrData: IWord[];
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageSrc, ocrData }) => {
  const [scale, setScale] = useState(1);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [words, setWords] = useState<IWord[]>([]);
  const [hoveredWord, setHoveredWord] = useState<IWord | null>(null);
  const [selectedWords, setSelectedWords] = useState<ISelectedWord[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageSize.width > 0 && imageSize.height > 0) {
      setWords(ocrData);
    }
  }, [imageSize, ocrData]);

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  return (
    <div className="image-viewer">
      <div className="zoom-controls">
        <button onClick={zoomIn}>Zoom In</button>
        <button onClick={zoomOut}>Zoom Out</button>
      </div>

      <div
        className="image-container"
        ref={containerRef}
        style={{
          position: 'relative',
          width: `${imageSize.width * scale}px`,
          height: `${imageSize.height * scale}px`,
          overflow: 'hidden',
        }}
      >
        <img
          ref={imageRef}
          src={imageSrc}
          alt="OCR Preview"
          className="ocr-image"
          onLoad={handleImageLoad}
        />

        {words.map((word: IWord, index: number) => {
          const id = `id-${word.Top}-${word.Left}`;
          return (
            <div
              key={index}
              id={id}
              className="word-box"
              data-text={word.WordText}
              style={{
                position: 'absolute',
                left: `${word.Left * scale}px`,
                top: `${word.Top * scale}px`,
                width: `${word.Width * scale}px`,
                height: `${word.Height * scale}px`,
                border:
                  hoveredWord === word ||
                  selectedWords.map((el) => el.id)?.includes(id)
                    ? '2px solid red'
                    : '1px dashed rgba(255,0,0,0.5)',
                backgroundColor:
                  hoveredWord === word ||
                  selectedWords.map((el) => el.id)?.includes(id)
                    ? 'rgba(255,0,0,0.2)'
                    : 'transparent',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredWord(word)}
              onMouseLeave={() => setHoveredWord(null)}
            >
              <span
                style={{
                  fontSize: `${12 * scale}px`,
                  display: 'block',
                  padding: '2px',
                }}
              ></span>
            </div>
          );
        })}
        <Selecto
          container={containerRef.current}
          selectableTargets={['.word-box']}
          hitRate={100}
          selectByClick={true}
          toggleContinueSelect={'shift'}
          onSelect={(event) => {
            const list = event.selected.map((el) => {
              return {
                id: el.id,
                text: el.dataset?.text ?? '',
              };
            });
            setSelectedWords(list);
            const customEvent = new CustomEvent('wordSelected', {
              detail: list.map((el) => el.text).join(' '),
            });
            window.dispatchEvent(customEvent);
          }}
        />
      </div>
    </div>
  );
};

export default ImageViewer;
