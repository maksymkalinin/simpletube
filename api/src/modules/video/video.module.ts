import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { ConfigModule } from '../config/config.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '../config/config.service';
import * as path from 'path';

@Module({
  imports: [ConfigModule, MulterModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      dest: path.join(process.cwd(), configService.get('VIDEO_FOLDER_FILES')),
    }),
    inject: [ConfigService],
  })],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
