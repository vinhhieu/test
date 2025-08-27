import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from '../ocr/ocr.service';
import { Express } from 'express';

@Controller('image')
export class ImageController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { error: 'No image uploaded' };
    }

    try {
      const result = await this.ocrService.processImage(file);
      return { text: result };
    } catch (error: unknown) {
      let errorMessage = 'OCR processing failed';
      if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
      }
      return { error: errorMessage };
    }
  }
}
