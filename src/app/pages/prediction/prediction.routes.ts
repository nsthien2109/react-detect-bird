import {RouteType} from "../../types/router.type";
import Prediction from "./container/Prediction";

export const predictionRoutes: RouteType[] = [
    {
        path: '/prediction',
        component: Prediction,
    },
];
