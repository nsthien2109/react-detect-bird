import { Bird } from './bird';

export interface BirdFamily {
  id: number;
  familyName: string;
  familyVietnameseName?: string;
  birds?: Bird[];
}

export interface BirdFamilyState {
  families: BirdFamily[];
  familyDetail: BirdFamily;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
