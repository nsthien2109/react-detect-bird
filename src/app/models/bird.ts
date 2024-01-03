export interface Bird {
  id: number;
  common_name: string;
  vietnamese_name: string;
  scientific_name: string;
  bird_order: string;
  family: string;
  description: string;
  distribution: string;
  diet: string;
  conservation_status: string;
  class_name: string;
  images : string[]
}

export interface BirdState {
  birds: Bird[];
  birdDetail : Bird;
  currentPage: number;
  totalPages : number;
  totalItem : number;
  pageSize : number;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
