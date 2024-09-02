export type Pagination<T> = {
  total: number;
  limit: number;
  offset: number;
  items: T[];
};
