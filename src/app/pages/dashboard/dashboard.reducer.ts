import { RootAction } from '../../store/store';
import { ACTION_TYPES } from '../../store/types';
import {DashboardState, Stats} from "../../models/stats";

const initState: DashboardState = {
    stats : {} as Stats,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const dashboardReducer = (state = initState, action: RootAction): DashboardState => {
    switch (action.type) {
        case ACTION_TYPES.GET_STATS:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isError: false,
            };

        case ACTION_TYPES.GET_STATS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                stats : action.payload
            };

        case ACTION_TYPES.GET_STATS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                isError: true,
                message: action.payload,
            };


        default:
            return state;
    }
};
