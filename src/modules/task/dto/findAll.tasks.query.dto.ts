import { IsEnum } from 'class-validator';

import { PaginationDto, SortBy } from '../../../shared';

enum FindAllTasksSortEnum {
  id = 'id',
  title = 'title',
  description = 'description',
}

export class FindAllTasksQueryDto extends PaginationDto {
  @IsEnum(FindAllTasksSortEnum)
  sort: FindAllTasksSortEnum = FindAllTasksSortEnum.title;

  @IsEnum(SortBy)
  sortBy: SortBy = SortBy.asc;
}
