export interface MostVP {
  rank?: number,
  user_fullname?: string
  user_name?: string
  user_img_url?: string
  location?: string
  total_game_played?: number
  total_point?: number
}

export interface HallOfFame {
  user_fullname: string,
  user_name: string,
  game_img_url: string,
  user_img_url: string,
  location: string
  cafe_name: string
  tournament_banner_url: string
}