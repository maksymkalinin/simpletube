import { IsNumber, IsString, Matches } from 'class-validator';

export class VideoFileDTO {
  @IsString()
  @Matches(/^video\/.*/)
  readonly mimetype: string;

  @IsString()
  readonly originalname: string;

  @IsString()
  readonly filename: string;

  @IsString()
  readonly path: string;

  @IsNumber()
  readonly size: number;
}