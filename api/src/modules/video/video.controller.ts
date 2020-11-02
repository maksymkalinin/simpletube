import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { VideoFileDTO } from './dto';
import { IVideo } from './video.entity';
import { VideoService } from './video.service';

@Controller('/video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
  ) {}

  @Get('/')
  public getAll(): Promise<IVideo[]> {
    return this.videoService.getAll();
  }

  @Get('/:filename')
  public async getVideo(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<void> {
    const { file, head } = await this.videoService.getVideo(filename);
    res.set(head);
    file.pipe(res);
  }

  @Get('/:filename/thumb')
  public async getThumb(@Param('filename') name: string, @Res() res: Response): Promise<void> {
    const fileStream = await this.videoService.getThumb(name);
    fileStream.pipe(res);
  }

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  public async uploadVideo(@UploadedFiles() files: VideoFileDTO[], @Res() res: Response): Promise<void> {
    const result = await this.videoService.uploadVideo(files);

    if (!result) {
      res.status(204);
    }

    res.json(result);
  }
}
