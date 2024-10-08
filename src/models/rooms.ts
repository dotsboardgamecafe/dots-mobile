import { type Users } from './users'

export interface Rooms {
  cafe_code: string,
  cafe_name: string,
  cafe_address: string,
  room_code: string,
  room_type: string,
  room_img_url: string,
  room_image_url?: string,
  room_banner_url?: string,
  name: string,
  description: string,
  difficulty: string,
  start_date: string,
  end_date: string,
  maximum_participant: number,
  instagram_link: string,
  game_master_code?: string,
  game_master_name?: string,
  game_master_img_url?: string,
  game_code?: string,
  game_name?: string,
  game_img_url?: string,
  booking_price: number,
  reward_point: number,
  current_used_slot: number,
  room_participants?: Users[]
  tournament_participants?: Users[]
  tournament_code?: string,
  prizes_img_url?: string,
  image_url?: string,
  tournament_rules?: string,
  start_time?: string,
  end_time?: string,
  player_slot?: number,
  participant_vp?: number,
  status?: string,
  have_joined?: boolean,
  isFromNotif?: boolean
}

export interface RoomListParam {
  keyword?: string
  tournament_date?: string
  location?: string
  status: string
}

export interface BookResult {
  invoice_url: string
}