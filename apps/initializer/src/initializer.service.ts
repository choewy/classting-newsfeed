import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class InitializerService implements OnApplicationBootstrap {
  async onApplicationBootstrap(): Promise<void> {
    return;
  }
}
