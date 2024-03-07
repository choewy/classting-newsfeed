import { AdminRepository, NewsRepository } from '@common/repositories';
import { TypeOrmExModule } from '@core/typeorm';
import { Module } from '@nestjs/common';

import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [TypeOrmExModule.forFeature([AdminRepository, NewsRepository])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
