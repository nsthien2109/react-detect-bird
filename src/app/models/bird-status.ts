export interface BirdStatus {
  id: number;
  statusName: string;
  statusVietnameseName?: string;
}

export interface BirdStatusState {
  status: BirdStatus[];
  statusDetail: BirdStatus;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
