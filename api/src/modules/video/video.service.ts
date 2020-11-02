import { HttpException, Injectable } from '@nestjs/common';

import { VideoFileDTO } from './dto';
import { IVideo, IVideoMeta } from './video.entity';
import { ConfigService } from '../config/config.service';
import * as fs from 'fs';
import * as bluebird from 'bluebird';
import * as path from 'path';
import * as ffmpeg from 'fluent-ffmpeg';

const readdirAsync = bluebird.promisify(fs.readdir);
const readFileAsync = bluebird.promisify(fs.readFile);
const unlinkAsync = bluebird.promisify(fs.unlink);
const writeFileAsync = bluebird.promisify(fs.writeFile);
const ffprobeAsync = bluebird.promisify(ffmpeg.ffprobe);

@Injectable()
export class VideoService {
  private readonly videoFilesPath: string;
  private readonly videoThumbsPath: string;
  private readonly videoMetaPath: string;

  constructor(private readonly configService: ConfigService) {
    this.videoFilesPath = path.join(process.cwd(), this.configService.get('VIDEO_FOLDER_FILES'));
    this.videoThumbsPath = path.join(process.cwd(), this.configService.get('VIDEO_FOLDER_THUMBS'));
    this.videoMetaPath = path.join(process.cwd(), this.configService.get('VIDEO_FOLDER_META'));

    this.createMediaVideoFolders();
  }

  public async getAll(): Promise<IVideo[]> {
    const files = await readdirAsync(this.videoFilesPath);

    if (!files.length) {
      return [];
    }

    let response: IVideo[] = [];

    try {
      response = bluebird.Promise.map(files, this.createVideoResponse.bind(this));
    } catch (err) {
      console.error(err);
      throw new HttpException(err.message, 500);
    }
    
    return response;
  }

  public async getVideo(name: string): Promise<{ file: fs.ReadStream, head: object }> {
    const filePath = path.join(this.videoFilesPath, name);
    const metaPath = path.join(this.videoMetaPath, `${name}`);
    const exists = fs.existsSync(filePath);
    if (!exists) {
      throw new HttpException('Not found!', 404);
    }

    const { size: fileSize } = fs.statSync(filePath);
    let mimetype: string = 'video/mp4';

    if (fs.existsSync(metaPath)) {
      const metaJSON = await readFileAsync(metaPath);
      mimetype = JSON.parse(metaJSON).mimetype;
    }

    const head = {
      'Content-Length': fileSize,
      'Content-Type': mimetype,
    };
    const file = fs.createReadStream(filePath);
    return {
      head,
      file,
    };
  }

  public async getThumb(name): Promise<fs.ReadStream> {
    const filePath = path.join(this.videoThumbsPath, `${name}.png`);
    const exists = fs.existsSync(filePath);
    if (!exists) {
      throw new HttpException('Thumb was now found', 404);
    }

    return fs.createReadStream(filePath);
  }

  public async uploadVideo(files: VideoFileDTO[]): Promise<object[]> {
    if (!Array.isArray(files) || !files.length) {
      return null;
    }

    const result = await bluebird.Promise.map(files, async file => {
      const { mimetype, originalname, filename, path: filePath, size } = file;

      if (mimetype.split('/')[0] !== 'video') {
        await unlinkAsync(filePath);
        console.error(`File ${originalname} is not video file`);
        return { type: 'error', error: new HttpException(`File ${originalname} was not saved, because it is not video file`, 400) };
      }

      const fileResult: Array<{type: string, message?: string, error?: Error}>
        = [{ type: 'success', message: `File ${originalname} successfully uploaded` }];

      const videoMeta: IVideoMeta = {
        mimetype,
        size,
        originalName: originalname,
      };

      try {
        const metadata = await ffprobeAsync(filePath);
        const metaFromVideoStream = metadata.streams.find(stream => stream.codec_type === 'video');

        videoMeta.width = metaFromVideoStream.width;
        videoMeta.height = metaFromVideoStream.height;
      } catch (err) {
        console.error(`Error while getting metadata from ${originalname}`, err);
        fileResult.push({ type: 'error', error: new HttpException(`Error while getting metadata from ${originalname}`, 500) });
      } finally {
        await writeFileAsync(path.join(this.videoMetaPath, `${filename}.json`), JSON.stringify(videoMeta));
      }

      try {
        ffmpeg(filePath).screenshot({
          count: 1,
          filename: `${filename}.png`,
          size: '640x480',
        }, this.videoThumbsPath);
      } catch (err) {
        console.error(`Error while taking thumbnail from ${originalname}`, err);
        fileResult.push({ type: 'error', error: new HttpException(`Error while taking thumbnail from ${originalname}`, 500) });
      }

      return fileResult;
    });

    return result
      .reduce((acc, fileRes) => acc.concat(fileRes), []);
  }

  private createMediaVideoFolders(): void {
    fs.mkdirSync(this.videoFilesPath, { recursive: true });
    fs.mkdirSync(this.videoThumbsPath, { recursive: true });
    fs.mkdirSync(this.videoMetaPath, { recursive: true });
  }

  private async createVideoResponse(filename: string): Promise<IVideo> {
    const host = this.configService.get('APP_HOST');
    const port = this.configService.get('APP_PORT');
    const baseUrl = `http://${host}:${port}/video`;

    const response: IVideo = {
      filename,
      videoUrl: `${baseUrl}/${filename}`,
    };

    if (fs.existsSync(path.join(this.videoThumbsPath, `${filename}.png`))) {
      response.thumbnailUrl = `${baseUrl}/${filename}/thumb/`;
    }
    if (fs.existsSync(path.join(this.videoMetaPath, `${filename}.json`))) {
      response.meta = JSON.parse(await readFileAsync(path.join(this.videoMetaPath, `${filename}.json`)));
    }

    return response;
  }
}