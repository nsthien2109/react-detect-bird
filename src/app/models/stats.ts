import {User} from "./user";

export interface Stats {
    users : number,
    birds : number,
    histories : number
}

export interface DashboardState {
    stats: Stats;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
}