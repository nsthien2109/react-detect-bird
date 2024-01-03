import React from 'react';
import OutputItem from './OutputItem';

import { Prediction } from '../../../models/prediction';

type OutputListProps = {
  predictions: Prediction[];
  onClick: (predict: Prediction) => void;
};

const OutputList = ({ predictions, onClick }: OutputListProps) => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 output-list">
      {predictions.map((item, index) => (
        <OutputItem key={index} bird={item} onClick={onClick} />
      ))}
    </div>
  );
};

export default OutputList;
