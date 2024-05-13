export interface Activity {
  username: string;
  game_image_url: string;
  game_name: string;
  data_source: string;
  source_code: string;
  point: number;
  created_date: string;
}

export interface PointActivity {
  username: string;
  data_source: string;
  source_code: string;
  point: number;
  created_date: string;
  title_description: string
}
