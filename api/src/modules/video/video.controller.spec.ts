import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { ReadStream } from 'fs';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { ConfigService } from '../config/config.service';

jest.mock('express');

describe('VideoController', () => {
  let videoController: VideoController;
  let videoService: VideoService;

  const mockedResult = [{
    filename: 'some-name',
    videoUrl: 'http://localhost:5000/video/some-name',
    thumbUrl: 'http://localhost:5000/video/some-name/thumb',
    meta: {
      mimetype: 'video/mpeg4',
      size: 123456,
      originalName: 'originalVideo.mp4',
      width: 1920,
      height: 1080,
    },
  }];

  const mockedHead = {
    'Content-Length': 123456,
    'Content-Type': 'video/mpeg4',
  };

  const mockedResponse: Partial<Response> = {
    set: jest.fn(),
    json: jest.fn(),
  };

  const mockFileStream: Partial<ReadStream> = {
    pipe: jest.fn(),
  };

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [VideoService, ConfigService],
    }).compile();

    videoController = testModule.get<VideoController>(VideoController);
    videoService = testModule.get<VideoService>(VideoService);
  });

  describe('getAll', () => {
    it('should return an array of videos', async () => {
      jest.spyOn(videoService, 'getAll').mockResolvedValue(mockedResult);

      expect(await videoController.getAll()).toBe(mockedResult);
    });
  });

  describe('getVideo', () => {
    it('should return video stream with headers', async () => {
      const fileName = 'some-name';

      const videoServiceGetVideoSpy = jest.spyOn(videoService, 'getVideo')
        .mockResolvedValue({ head: mockedHead, file: mockFileStream as ReadStream });

      await videoController.getVideo(fileName, mockedResponse as Response);

      expect(videoServiceGetVideoSpy).toBeCalledWith(fileName);
      expect(mockedResponse.set).toBeCalledWith(mockedHead);
      expect(mockFileStream.pipe).toBeCalledWith(mockedResponse);
    });
  });

  describe('getThumb', () => {
    it('should return image stream', async () => {
      const fileName = 'some-name';

      const videoServiceGetThumbSpy = jest.spyOn(videoService, 'getThumb')
        .mockResolvedValue(mockFileStream as ReadStream);

      await videoController.getThumb(fileName, mockedResponse as Response);
      expect(videoServiceGetThumbSpy).toBeCalledWith(fileName);
      expect(mockFileStream.pipe).toBeCalledWith(mockedResponse);
    });
  });

  describe('upload', () => {
    it('should return empty array', async () => {
      const files = [];
      const result = [];

      const videoServiceUploadVideoSpy = jest.spyOn(videoService, 'uploadVideo')
        .mockResolvedValue(result);

      await videoController.uploadVideo(files, mockedResponse as Response);

      expect(videoServiceUploadVideoSpy).toBeCalledWith(files);
      expect(mockedResponse.json).toBeCalledWith(result);
    });
  });
});
