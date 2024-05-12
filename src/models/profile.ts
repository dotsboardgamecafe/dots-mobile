export interface Profile {
  token: string
  user_code: string
  image_url: string
  fullname: string
  phone_number: string
  email: string
  expired_at: string
  actor_type: string
  created_date: string
}

export interface RegisterParam {
  fullname: string
  username: string
  email: string
  phone_number: string
  password: string
  confirm_password: string
}