import { Module } from '@nestjs/common';

import { NewsModule } from './news';
import { SchoolModule } from './school';

@Module({
  imports: [SchoolModule, NewsModule],
})
export class AdminModule {}
