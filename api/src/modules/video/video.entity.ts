export interface IVideoMeta {
  width?: number;
  height?: number;
  mimetype: string;
  size: number;
  originalName: string;
}

export interface IVideo {
  filename: string;
  videoUrl: string;
  thumbnailUrl?: string;
  meta?: IVideoMeta;
}