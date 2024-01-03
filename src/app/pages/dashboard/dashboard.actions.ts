import { Dispatch } from 'react';
import { ACTION_TYPES } from '../../store/types';
import { RootAction } from '../../store/store';
import {Stats} from "../../models/stats";
import {getStats} from "../../shared/services/stats.services";


const getStatsStart = () => {
    return {
        type : ACTION_TYPES.GET_STATS
    }
}

const getStatsSuccess = (data : Stats) => {
    return {
        type : ACTION_TYPES.GET_STATS_SUCCESS,
        payload : data
    }
}

const getStatsFailure = (message : string) => {
    return {
        type : ACTION_TYPES.GET_STATS_FAILURE,
        payload : message
    }
}


export  const getStatsAction = () => async  (dispatch : Dispatch<RootAction>) =>{
    dispatch(getStatsStart());
    try {
        const data = await getStats();
        dispatch((getStatsSuccess(data as Stats)));
    }catch (error) {
        dispatch(getStatsFailure(`${error}`));
    }
}