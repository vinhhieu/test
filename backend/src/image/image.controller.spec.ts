import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from './image.controller';
import { OcrService } from '../ocr/ocr.service';

describe('ImageController', () => {
  let controller: ImageController;
  let ocrService: OcrService;

  const mockOcrService = {
    processImage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [{ provide: OcrService, useValue: mockOcrService }],
    }).compile();

    controller = module.get<ImageController>(ImageController);
    ocrService = module.get<OcrService>(OcrService);
    jest.clearAllMocks();
  });

  it('should return error if no file is uploaded', async () => {
    const result = await controller.uploadImage(undefined as any);
    expect(result).toEqual({ error: 'No image uploaded' });
    expect(mockOcrService.processImage).not.toHaveBeenCalled();
  });

  it('should return text if OCR succeeds', async () => {
    mockOcrService.processImage.mockResolvedValue('recognized text');
    const mockFile = { path: 'some/path', mimetype: 'image/png' } as any;
    const result = await controller.uploadImage(mockFile);
    expect(result).toEqual({ text: 'recognized text' });
    expect(mockOcrService.processImage).toHaveBeenCalledWith(mockFile);
  });

  it('should return error if OCR service throws a generic error', async () => {
    mockOcrService.processImage.mockRejectedValue('some error');
    const mockFile = { path: 'some/path', mimetype: 'image/png' } as any;
    const result = await controller.uploadImage(mockFile);
    expect(result).toEqual({ error: 'OCR processing failed' });
  });

  it('should return error with message if OCR service throws an Error instance', async () => {
    mockOcrService.processImage.mockRejectedValue(new Error('fail reason'));
    const mockFile = { path: 'some/path', mimetype: 'image/png' } as any;
    const result = await controller.uploadImage(mockFile);
    expect(result).toEqual({ error: 'OCR processing failed: fail reason' });
  });
});
