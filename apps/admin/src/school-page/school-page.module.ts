import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';

import { SchoolPageRepository } from './repositories/school-page.repository';
import { SchoolPageController } from './school-page.controller';
import { SchoolPageService } from './school-page.service';

@Module({
  imports: [TypeOrmLibsModule.forFeature([SchoolPageRepository])],
  controllers: [SchoolPageController],
  providers: [SchoolPageService],
})
export class SchoolPageModule {}
