import { Injectable } from '@nestjs/common';

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ConfigService {
  private readonly envConfig: Record<string, string>;
  private readonly nodeENV: string;

  constructor() {
    this.nodeENV = (process.env.NODE_ENV || 'development').toLowerCase();
    this.envConfig = dotenv.parse(
      fs.readFileSync(
        path.join(
          process.cwd(),
          'configs',
          '.env.' + this.nodeENV,
        ),
      ),
    );
  }

  public get(key: string): string {
    return this.envConfig[key];
  }
}
