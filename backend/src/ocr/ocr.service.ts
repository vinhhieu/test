import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ocrSpace, OcrSpaceResponse } from 'ocr-space-api-wrapper';
import * as fs from 'fs';

@Injectable()
export class OcrService {
  private apiKey: string;
  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get('API_KEY');
  }
  async processImage(file: Express.Multer.File): Promise<OcrSpaceResponse> {
    const fileBuffer = fs.readFileSync(file.path);
    const base64String = fileBuffer.toString('base64');
    const base64Image = `data:${file.mimetype};base64,${base64String}`;

    return await ocrSpace(base64Image, {
      apiKey: this.apiKey,
      isOverlayRequired: true,
    });
  }
}
