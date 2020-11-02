import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as path from 'path';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const fileName = 'd=decoded.mp4';
  const testFilePath = path.join(process.cwd(), `test/testFiles/${fileName}`);
  const fakeTestFile = path.join(process.cwd(), 'test/testFiles/bdbabeccd91fc5ec38d96b7c27ce03d9');

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  describe('/upload', () => {
    it('should upload video to testUploads', async () => {
      const response = await request(app.getHttpServer())
        .post('/video/upload')
        .attach('files', testFilePath)
        .expect(201);

      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject({ type: 'success', message: `File ${fileName} successfully uploaded` });
    });

    it('should return an error object when file is not a video', async () => {
      const response = await request(app.getHttpServer())
        .post('/video/upload')
        .attach('files', fakeTestFile)
        .expect(201);

      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('type', 'error');
      expect(response.body[0]).toHaveProperty('error');
      expect(response.body[0].error).toMatchObject({
        message: 'File bdbabeccd91fc5ec38d96b7c27ce03d9 was not saved, because it is not video file',
        response: 'File bdbabeccd91fc5ec38d96b7c27ce03d9 was not saved, because it is not video file',
        status: 400,
      });
    });

    it('should return empty object if array is empty', async () => {
      const response = await request(app.getHttpServer())
        .post('/video/upload')
        .send()
        .expect(204);

      expect(response.body).toMatchObject({});
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
