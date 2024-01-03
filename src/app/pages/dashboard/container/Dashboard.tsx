import React, {useEffect} from 'react';
import { Card } from 'antd';

import CardStatistic from '../components/CardStatistic';
import { ChartStatistic } from '../components/ChartStatistic';

import accountIcon from '../../../../assets/svgs/account.svg';
import birdIcon from '../../../../assets/svgs/bird.svg';
import aiIcon from '../../../../assets/svgs/ai.svg';
import {useDispatch, useSelector} from "react-redux";
import {getStatsAction} from "../dashboard.actions";
import {RootState} from "../../../store/store";

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const stats = useSelector((state : RootState) => state.dashboard.stats);
    useEffect(() => {
        dispatch(getStatsAction() as any);
    }, []);
  return <>
    <div className="dashboard">
      <div className="dashboard-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 dashboard-stats-grid">
          <CardStatistic icon={accountIcon} title="Accounts" statistic={stats.users ?? 0} />
          <CardStatistic icon={birdIcon} title="Birds" statistic={stats.birds ?? 0} />
          <CardStatistic icon={aiIcon} title="Predictions" statistic={stats.histories ?? 0} />
        </div>
      </div>
    </div>
  </>
};

export default Dashboard;
