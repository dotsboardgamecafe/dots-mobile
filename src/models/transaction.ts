export interface Transaction {
  data_source: string;
  transaction_code: string;
  game_name: string;
  game_img_url: string;
  final_price_amount: number;
  awarded_user_point: number;
  payment_method: string;
  status: StatusTransactionType;
  created_date: string;
  updated_date: string;
}

export type StatusTransactionType = 'PAID' | 'EXPIRED' | 'PENDING'