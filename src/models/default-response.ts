export interface DefaultResponse<T> {
  stat_code: number;
  stat_msg: string;
  data: T;
  pagination: any[]
}