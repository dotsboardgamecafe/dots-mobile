export interface Notification {
  receiver_source: string;
  receiver_code: string;
  notification_code: string;
  transaction_code: string;
  type: string;
  title: string;
  description: string;
  image_url: string;
  status_read: boolean;
  created_date: string;
  updated_date: string;
}
export interface PaginationNotificationType {
  count: number;
  count_unread: number;
  keyword: string;
  limit: number;
  offset: number;
  order: string;
  page: number;
  receiver_code: string;
  receiver_source: string;
  sort: string;
  status: string;
}
