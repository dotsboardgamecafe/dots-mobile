export interface Badges {
  user_id: number;
  badge_id: number;
  badge_name: string;
  badge_image_url: string;
  badge_code: string;
  is_claim: boolean;
  created_date: string;
  is_badge_owned: boolean;
  description?:string,
  vp_point: number,
  need_to_claim: boolean
}

export interface BadgesQuery {
  code?: string,
  limit?: number,
  page?: number
}
