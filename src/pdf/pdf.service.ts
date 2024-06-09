import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfService {
  handleFileUpload(file: Express.Multer.File) {
    return { message: 'File uploaded successfully', filename: file.filename,file };
  }
}
