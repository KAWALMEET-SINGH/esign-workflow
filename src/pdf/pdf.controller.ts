import { Controller, Post, UploadedFile, UseInterceptors ,Get,Res,Param} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PdfService } from './pdf.service';
import { Response } from 'express';
import { join } from 'path';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.pdfService.handleFileUpload(file);
  }  

  @Get('preview/:filename')
  previewFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', filename);
    return res.sendFile(filePath);
  }
  @Get()
  getHello(): object {
    return {message:"hello"};
  }
  
}
