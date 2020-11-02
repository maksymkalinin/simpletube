import { Module } from '@nestjs/common';
import * as modules from './modules';

@Module({
  imports: Object.values(modules),
})
export class AppModule {}
