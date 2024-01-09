export interface Stats {
  users: number;
  birds: number;
  histories: number;
  families: number;
  orders: number;
  status: number;
}

export interface DashboardState {
  stats: Stats;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
