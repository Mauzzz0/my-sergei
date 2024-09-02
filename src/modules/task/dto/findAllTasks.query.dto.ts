import { IsEnum } from 'class-validator';

import { PaginationDto } from '../../../shared/pagination.dto';

enum FindAllTasksSortEnum {
  title = 'title',
  description = 'description',
}

export class FindAllTasksQueryDto extends PaginationDto {
  @IsEnum(FindAllTasksSortEnum)
  sort: FindAllTasksSortEnum;
}
