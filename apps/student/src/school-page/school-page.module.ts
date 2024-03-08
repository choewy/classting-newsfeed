import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';

import { SchoolPageController } from './school-page.controller';
import { SchoolPageService } from './school-page.service';
import { SchoolPageRepository } from '../common/repositories';

@Module({
  imports: [TypeOrmLibsModule.forFeature([SchoolPageRepository])],
  controllers: [SchoolPageController],
  providers: [SchoolPageService],
})
export class ShcoolPageModule {}
