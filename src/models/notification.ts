export interface Notification {
  id: number
  receiver_source: string
  receiver_code: string
  notification_type: string
  notification_title: string
  notification_description: string
  status_read: boolean
  created_date: string
}