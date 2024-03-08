import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';

import { SchoolNewsController } from './school-news.controller';
import { SchoolNewsService } from './school-news.service';
import { SchoolNewsRepository } from '../repositories/school-news.repository';
import { SchoolPageRepository } from '../repositories/school-page.repository';

@Module({
  imports: [TypeOrmLibsModule.forFeature([SchoolPageRepository, SchoolNewsRepository])],
  controllers: [SchoolNewsController],
  providers: [SchoolNewsService],
})
export class SchoolNewsModule {}
