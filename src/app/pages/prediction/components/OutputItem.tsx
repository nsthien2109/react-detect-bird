import React, { useState, useEffect } from 'react';
import { Prediction } from '../../../models/prediction';
import noImage from '../../../../assets/images/no-image.png';
import { isImageUrlValid } from '../../../shared/utils/image';

type OutputItemProps = {
  bird: Prediction;
  onClick: (predict: Prediction) => void;
};
const OutputItem = ({ bird, onClick }: OutputItemProps) => {
  const [isErrImg, setIsErrImg] = useState(false);

  useEffect(() => {
    isImageUrlValid(bird.images[0]).then((result) => setIsErrImg(!result));
  }, [isErrImg, bird]);

  return (
    <div
      className="flex p-1 border border-solid rounded cursor-pointer flex-column hover:shadow"
      onClick={() => onClick(bird)}
    >
      <div className="output-item-img h-[100px] w-full mb-4">
        <img
          aria-hidden
          className="object-cover w-full h-full"
          src={isErrImg ? noImage : bird.images[0]}
          alt="Image of output item"
        />
        <p>{bird.confidence} %</p>
      </div>
      <div className="p-1 output-item-content">
        <h4 className="text-sm font-semibold uppercase truncate">{bird.common_name}</h4>
        <p className="font-light text-gray-400 truncate text-md">{bird.vietnamese_name}</p>
      </div>
    </div>
  );
};

export default OutputItem;
