import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from '@testing-library/react';
import UploadPage from './UploadPage';

jest.mock('../components/OCRControls', () => () => (
  <div data-testid="ocr-controls" />
));
jest.mock('../components/ImageViewer', () => (props: any) => (
  <div data-testid="image-viewer">{props.imageSrc}</div>
));

const mockParsedResults = [
  {
    TextOverlay: {
      Lines: [
        {
          Words: [
            { WordText: 'Hello', Left: 1, Top: 2, Width: 3, Height: 4 },
            { WordText: 'World', Left: 5, Top: 6, Width: 7, Height: 8 },
          ],
        },
      ],
    },
  },
];

const mockOcrResponse = {
  ParsedResults: mockParsedResults,
};

describe('UploadPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ text: mockOcrResponse }),
    }) as any;
  });

  it('renders upload button and title', () => {
    render(<UploadPage />);
    expect(screen.getByText(/Image OCR Processor/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Upload Image/i })
    ).toBeInTheDocument();
  });

  it('triggers file input when button is clicked', async () => {
    render(<UploadPage />);
    const input = screen.getByLabelText('', { selector: 'input[type="file"]' });
    const clickSpy = jest.spyOn(input, 'click');
    fireEvent.click(screen.getByRole('button'));
    expect(clickSpy).toHaveBeenCalled();
  });

  it('does nothing if no file is selected', async () => {
    render(<UploadPage />);
    const input = screen.getByLabelText('', { selector: 'input[type="file"]' });
    fireEvent.change(input, { target: { files: undefined } });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles file upload and OCR processing', async () => {
    render(<UploadPage />);
    const input = screen.getByLabelText('', { selector: 'input[type="file"]' });

    const file = new File(['dummy'], 'test.png', { type: 'image/png' });
    const fileReaderMock = {
      readAsDataURL: jest.fn(),
      onload: null as any,
      result: 'data:image/png;base64,abc',
    };
    jest
      .spyOn(window, 'FileReader')
      .mockImplementation(() => fileReaderMock as any);

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(fileReaderMock.readAsDataURL).toHaveBeenCalledWith(file);
    });
    await act(async () => {
      fileReaderMock.onload({ target: { result: fileReaderMock.result } });
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
    expect(screen.getByTestId('ocr-controls')).toBeInTheDocument();
    expect(screen.getByTestId('image-viewer')).toBeInTheDocument();
  });

  it('handles fetch error gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    render(<UploadPage />);
    const input = screen.getByLabelText('', { selector: 'input[type="file"]' });

    const file = new File(['dummy'], 'test.png', { type: 'image/png' });
    const fileReaderMock = {
      readAsDataURL: jest.fn(),
      onload: null as any,
      result: 'data:image/png;base64,abc',
    };
    jest
      .spyOn(window, 'FileReader')
      .mockImplementation(() => fileReaderMock as any);

    fireEvent.change(input, { target: { files: [file] } });
    await act(async () => {
      fileReaderMock.onload({ target: { result: fileReaderMock.result } });
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('returns empty array for missing ParsedResults in OCR response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ text: {} }),
    });

    render(<UploadPage />);
    const input = screen.getByLabelText('', { selector: 'input[type="file"]' });

    const file = new File(['dummy'], 'test.png', { type: 'image/png' });
    const fileReaderMock = {
      readAsDataURL: jest.fn(),
      onload: null as any,
      result: 'data:image/png;base64,abc',
    };
    jest
      .spyOn(window, 'FileReader')
      .mockImplementation(() => fileReaderMock as any);

    fireEvent.change(input, { target: { files: [file] } });
    await act(async () => {
      fileReaderMock.onload({ target: { result: fileReaderMock.result } });
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
