import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import ImageViewer from './ImageViewer';

// Use a module-scoped variable for Selecto props
let mockSelectoProps: any = undefined;

// Mock react-selecto and expose props for test access
jest.mock('react-selecto', () => {
  return function MockSelecto(props: any) {
    mockSelectoProps = props;
    return <div data-testid="selecto-mock" />;
  };
});

const mockOcrData = [
  { WordText: 'Hello', Left: 10, Top: 20, Width: 30, Height: 40 },
  { WordText: 'World', Left: 50, Top: 60, Width: 70, Height: 80 },
];

describe('ImageViewer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSelectoProps = undefined;
  });

  it('renders zoom controls and image', () => {
    render(<ImageViewer imageSrc="img.png" ocrData={mockOcrData} />);
    expect(screen.getByText('Zoom In')).toBeInTheDocument();
    expect(screen.getByText('Zoom Out')).toBeInTheDocument();
    expect(screen.getByAltText('OCR Preview')).toBeInTheDocument();
  });

  it('handles image load and sets image size', () => {
    render(<ImageViewer imageSrc="img.png" ocrData={mockOcrData} />);
    const img = screen.getByAltText('OCR Preview') as HTMLImageElement;
    Object.defineProperty(img, 'naturalWidth', { value: 200 });
    Object.defineProperty(img, 'naturalHeight', { value: 100 });
    fireEvent.load(img);
    // eslint-disable-next-line testing-library/no-node-access
    const wordBoxes = document.getElementsByClassName('word-box');
    expect(wordBoxes).toHaveLength(2);
  });

  it('zooms in and out', () => {
    render(<ImageViewer imageSrc="img.png" ocrData={mockOcrData} />);
    const img = screen.getByAltText('OCR Preview') as HTMLImageElement;
    Object.defineProperty(img, 'naturalWidth', { value: 100 });
    Object.defineProperty(img, 'naturalHeight', { value: 100 });
    fireEvent.load(img);

    const zoomInBtn = screen.getByText('Zoom In');
    const zoomOutBtn = screen.getByText('Zoom Out');

    for (let i = 0; i < 10; i++) {
      fireEvent.click(zoomInBtn);
    }
    for (let i = 0; i < 10; i++) {
      fireEvent.click(zoomOutBtn);
    }
    // No error should occur
    expect(zoomInBtn).toBeInTheDocument();
    expect(zoomOutBtn).toBeInTheDocument();
  });

  it('handles hover and selection styling', () => {
    render(<ImageViewer imageSrc="img.png" ocrData={mockOcrData} />);
    const img = screen.getByAltText('OCR Preview') as HTMLImageElement;
    Object.defineProperty(img, 'naturalWidth', { value: 100 });
    Object.defineProperty(img, 'naturalHeight', { value: 100 });
    fireEvent.load(img);
    // eslint-disable-next-line testing-library/no-node-access
    const wordBoxes = document.getElementsByClassName('word-box');
    // Hover
    fireEvent.mouseEnter(wordBoxes[0]);
    fireEvent.mouseLeave(wordBoxes[0]);
    // No error, styling handled by React
    expect(wordBoxes[0]).toBeInTheDocument();
  });

  it('handles Selecto selection and dispatches wordSelected event', () => {
    const eventListener = jest.fn();
    window.addEventListener('wordSelected', eventListener);

    render(<ImageViewer imageSrc="img.png" ocrData={mockOcrData} />);
    const img = screen.getByAltText('OCR Preview') as HTMLImageElement;
    Object.defineProperty(img, 'naturalWidth', { value: 100 });
    Object.defineProperty(img, 'naturalHeight', { value: 100 });
    fireEvent.load(img);

    act(() => {
      mockSelectoProps.onSelect({
        selected: [
          { id: 'id-20-10', dataset: { text: 'Hello' } },
          { id: 'id-60-50', dataset: { text: 'World' } },
        ],
      });
    });

    expect(eventListener).toHaveBeenCalled();
    const customEvent = eventListener.mock.calls[0][0];
    expect(customEvent.detail).toBe('Hello World');
  });
});
