import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import OCRControls from './OCRControls';

describe('OCRControls', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders textarea and heading', () => {
    render(<OCRControls />);
    expect(
      screen.getByRole('heading', { name: /Textarea/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('updates textarea when wordSelected event is dispatched', async () => {
    render(<OCRControls />);
    const textarea = screen.getByRole('textbox');
    const event = new CustomEvent('wordSelected', {
      detail: '  Hello World  ',
    });
    await act(async () => {
      window.dispatchEvent(event);
    });
    await waitFor(() => {
      expect(textarea).toHaveValue('Hello World');
    });
  });

  it('cleans up event listener on unmount', () => {
    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<OCRControls />);
    expect(addSpy).toHaveBeenCalledWith('wordSelected', expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith(
      'wordSelected',
      expect.any(Function)
    );
  });
});
