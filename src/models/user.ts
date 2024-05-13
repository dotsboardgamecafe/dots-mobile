export interface UserProfile {
  user_code: string;
  email: string;
  username: string;
  phone_number: string;
  fullname: string;
  image_url: string;
  latest_point: number;
  latest_tier: string;
  tier_range_point: TierRangePoint;
  tier_benefits?: (TierBenefits)[] | null;
  member_since: string;
  password: string;
  x_player: string;
  status_verification: boolean;
  status: string;
  created_date: string;
  updated_date: string;
  deleted_date: string;
}
export interface TierRangePoint {
  min_point: number;
  max_point: number;
}
export interface TierBenefits {
  reward_code: string;
  reward_name: string;
  reward_img_url: string;
  reward_description: string;
}