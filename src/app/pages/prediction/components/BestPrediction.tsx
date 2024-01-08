import React from 'react';
import { Bird } from '../../../models/bird';

import { Image } from 'antd';
type BestPredictionProps = {
  bird: Bird;
};

const BestPrediction = ({ bird }: BestPredictionProps) => {
  return (
    <div className="best-prediction">
      <div className="flex gap-5">
        <div className="flex-1 pre-info">
          <ul className="p-4 bg-gray-300 border border-dotted rounded pre-info-list">
            <li className="mb-4 pre-info-item">
              <span className="font-semibold">Common Name : </span>
              {bird.common_name}
            </li>
            <li className="mb-4 pre-info-item">
              <span className="font-semibold">Vietnamese Name : </span>
              {bird.vietnamese_name}
            </li>
            <li className="mb-4 pre-info-item">
              <span className="font-semibold">Scientific Name : </span>
              {bird.scientific_name}
            </li>
            <li className="mb-4 pre-info-item">
              <span className="font-semibold">Bird Order : </span>
              {bird.order?.orderName}
            </li>
            <li className="mb-4 pre-info-item">
              <span className="font-semibold">Family : </span>
              {bird.family?.familyName}
            </li>
            <li className="mb-4 pre-info-item">
              <span className="font-semibold">Description : </span>
              {bird.description}
            </li>
            <li className="mb-4 pre-info-item">
              <span className="font-semibold">Distribution : </span>
              {bird.distribution}
            </li>
            <li className="mb-4 pre-info-item">
              <span className="font-semibold">Diet : </span>
              {bird.diet}
            </li>
            <li className="mb-4 pre-info-item">
              <span className="font-semibold">Status : </span>
              {bird.status?.statusName}
            </li>
          </ul>
        </div>

        <div className="pre-image w-[150px] h-[150px]">
          <Image.PreviewGroup items={bird.images}>
            <Image className="object-cover rounded" width={150} height={150} src={bird.images[0]} />
          </Image.PreviewGroup>
        </div>
      </div>
    </div>
  );
};

export default BestPrediction;
