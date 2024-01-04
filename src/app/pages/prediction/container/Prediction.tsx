import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Spin } from 'antd';
import { FileSearchOutlined, LoadingOutlined } from '@ant-design/icons';
import InputImage from '../components/InputImage';
import PreviewInputImage from '../components/PreviewInputImage';
import OutputList from '../components/OutputList';
import BestPrediction from '../components/BestPrediction';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { predictionBirdAction } from '../prediction.actions';
import HistoryModal from '../components/HistoryModal';
import { Prediction as PredictionModel } from '../../../models/prediction';

import Lottie from 'lottie-react';
import birdfoundAnimation from '../../../../assets/anims/bird-found.json';

const Prediction = () => {
  const [photoPreview, setPhotoPreview] = useState<string>();
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const { predictions, isLoading, isSuccess, isError } = useSelector((state: RootState) => state.prediction);
  const [resultSelected, setResultSelected] = useState<any>(predictions[0]);

  const dispatch = useDispatch();

  const handlePrediction = (file: File) => {
    dispatch(predictionBirdAction(file) as any);
  };

  const handleResultSelected = (predict: PredictionModel) => {
    setResultSelected(predict);
  };

  useEffect(() => {
    setResultSelected(undefined);
  }, [predictions]);

  return (
    <>
      <div className="prediction">
        <div className="flex items-center justify-between mb-7">
          <Breadcrumb
            items={[
              {
                title: <Link to="/">Dashboard</Link>,
              },
              {
                title: 'Prediction',
              },
            ]}
          />
          <Button
            type="primary"
            className="bg-[#212B36]"
            icon={<FileSearchOutlined />}
            onClick={() => setOpenHistoryModal(true)}
          >
            History
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 prediction-wrapper">
          <div className="prediction-input w-full lg:w-[500px]">
            <h3 className="mt-3 mb-1 font-medium">Image Input</h3>
            <InputImage
              photoPreview={photoPreview}
              setPhotoPreview={setPhotoPreview}
              handlePrediction={handlePrediction}
            />
            <h3 className="mt-3 mb-1 font-medium">Preview Image Input</h3>
            {photoPreview && <PreviewInputImage photoPreview={photoPreview} />}
          </div>
          {predictions.length > 0 && predictions[0].confidence > 45 && !isLoading && (
            <div className="flex-1 prediction-output">
              <h3 className="mt-3 mb-1 font-medium">Output Birds</h3>
              <OutputList predictions={predictions} onClick={handleResultSelected} />
              <h3 className="mt-3 mb-1 font-medium">Best Prediction</h3>
              <BestPrediction bird={resultSelected ?? predictions[0]} />
            </div>
          )}

          {predictions.length === 0 && !isLoading && (
            <div className="flex-1 prediction-output">
              <h3 className="mt-3 mb-1 font-medium">Output Birds</h3>
              <div className="flex flex-col items-center ">
                <Lottie style={{ width: '200px', height: '200px' }} animationData={birdfoundAnimation} loop={true} />
                <p>Sorry, We couldn't detect this bird !, please try again</p>
              </div>
            </div>
          )}

          {isLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
        </div>
        <HistoryModal
          open={openHistoryModal}
          onCancel={() => {
            setOpenHistoryModal(false);
          }}
        />
      </div>
    </>
  );
};

export default Prediction;
