import React from 'react';
import { Card } from 'antd';

type CardStatistic = {
  icon: any;
  title: string;
  statistic: number;
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
const CardStatistic = ({ icon, title, statistic }: CardStatistic) => {
  return (
    <Card className="card-statistic">
      <div className="flex items-center justify-between">
        <div className="stats-infor">
          <h5 className="text-lg font-bold">{statistic}</h5>
          <p className="text-sm font-normal text-gray-500">{title}</p>
        </div>
        <div className="w-24 stats-icon">
          <img src={icon} alt="Icon of statistic card" width={100} />
        </div>
      </div>
    </Card>
  );
};

export default CardStatistic;
