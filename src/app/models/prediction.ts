import { History } from './history';
export interface Prediction {
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
  images: string[];
  confidence: number;
}

export interface PredictionState {
  predictions: Prediction[];
  history: History[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
