import { Module } from '@nestjs/common';

import { SchoolPageController } from './school-page.controller';

@Module({
  controllers: [SchoolPageController],
})
export class SchoolPageModule {}
