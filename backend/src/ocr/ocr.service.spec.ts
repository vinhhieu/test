import { OcrService } from './ocr.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { ocrSpace } from 'ocr-space-api-wrapper';

jest.mock('fs');
jest.mock('ocr-space-api-wrapper', () => ({
  ocrSpace: jest.fn(),
}));

describe('OcrService', () => {
  let service: OcrService;
  let configService: ConfigService;

  beforeEach(() => {
    configService = {
      get: jest.fn().mockReturnValue('dummy-api-key'),
    } as any;
    service = new OcrService(configService);
  });

  it('should set apiKey from config', () => {
    expect((service as any).apiKey).toBe('dummy-api-key');
    expect(configService.get).toHaveBeenCalledWith('API_KEY');
  });

  it('should process image and call ocrSpace with correct params', async () => {
    const mockFile = { path: 'test-path', mimetype: 'image/png' } as any;
    const mockBuffer = Buffer.from('test');
    (fs.readFileSync as jest.Mock).mockReturnValue(mockBuffer);
    (ocrSpace as jest.Mock).mockResolvedValue({
      ParsedResults: [{ ParsedText: 'abc' }],
    });

    const result = await service.processImage(mockFile);

    expect(fs.readFileSync).toHaveBeenCalledWith('test-path');
    expect(ocrSpace).toHaveBeenCalledWith(
      `data:image/png;base64,${mockBuffer.toString('base64')}`,
      { apiKey: 'dummy-api-key', isOverlayRequired: true },
    );
    expect(result).toEqual({ ParsedResults: [{ ParsedText: 'abc' }] });
  });

  it('should throw if fs.readFileSync throws', async () => {
    const mockFile = { path: 'bad-path', mimetype: 'image/png' } as any;
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('fail');
    });

    await expect(service.processImage(mockFile)).rejects.toThrow('fail');
  });

  it('should throw if ocrSpace throws', async () => {
    const mockFile = { path: 'test-path', mimetype: 'image/png' } as any;
    const mockBuffer = Buffer.from('test');
    (fs.readFileSync as jest.Mock).mockReturnValue(mockBuffer);
    (ocrSpace as jest.Mock).mockRejectedValue(new Error('ocr fail'));

    await expect(service.processImage(mockFile)).rejects.toThrow('ocr fail');
  });
});
