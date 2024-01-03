import { Prediction } from './index';
export interface History {
  id: number;
  date: string;
  url: string;
  predictions: {
    id: number;
    confidence: number;
    bird: Prediction;
  }[];
  user?: {
    id: number;
    username: string;
    email: string;
    isActive: boolean;
    createdAt: string;
  };
}
