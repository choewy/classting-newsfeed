import { ListResponseType } from '@common/implements';

import { NewsDto } from './news.dto';

export class NewsListDto extends ListResponseType(NewsDto) {}
