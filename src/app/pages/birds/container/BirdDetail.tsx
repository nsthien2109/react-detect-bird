import { Card, Divider, Spin } from 'antd';
import BirdCarousel from '../components/BirdCarousel';
import { ApartmentOutlined, InfoCircleFilled } from '@ant-design/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBirdAction } from '../bird.actions';
import { useParams } from 'react-router-dom';
import { Bird } from '../../../models/bird';
import { RootState } from '../../../store/store';

const BirdDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { birdDetail, isLoading } = useSelector((state: RootState) => state.birds);

  useEffect(() => {
    dispatch(getBirdAction(parseInt(id!)) as any);
  }, [id]);

  return (
    <div className="bird-detail">
      <Spin spinning={isLoading}>
        <div className="bird-detail-wrapper">
          <div className="flex flex-column lg:flex-row gap-5">
            <div className="flex-1 bird-carousel">
              <BirdCarousel images={birdDetail.images} />
            </div>
            <div className="flex-1 px-10 bird-summary">
              <h4 className="text-4xl font-bold bird-name">{birdDetail.common_name}</h4>
              <span>{birdDetail.vietnamese_name}</span>
              <p className="my-5 text-base font-semibold bird-order">
                {' '}
                <ApartmentOutlined className="mr-3 text-xl text-green-500" />
                {birdDetail.order?.orderName} - {birdDetail.order?.orderVietnameseName}
              </p>
              <p className="my-5 text-base font-semibold bird-status">
                <InfoCircleFilled className="mr-3 text-xl text-blue-500" />
                {birdDetail.status?.statusName} - {birdDetail.status?.statusVietnameseName}
              </p>
              <Divider />
              <p className="text-gray-500 bird-desc">{birdDetail.description}</p>
            </div>
          </div>
          <Card className="mt-5">
            <div className="bird-information ">
              <ul className="bird-info-list">
                <li className="my-3 bird-info-item">
                  <h5 className="text-xl font-bold bird-info-title">Scientific Name</h5>
                  <p className="bird-info-subtitle">{birdDetail.scientific_name}</p>
                </li>
                <li className="my-3 bird-info-item">
                  <h5 className="text-xl font-bold bird-info-title">Bird Family</h5>
                  <p className="bird-info-subtitle">
                    {birdDetail.family?.familyName} - {birdDetail.family?.familyVietnameseName}
                  </p>
                </li>
                <li className="my-3 bird-info-item">
                  <h5 className="text-xl font-bold bird-info-title">Distribution</h5>
                  <p className="bird-info-subtitle">{birdDetail.distribution}</p>
                </li>
                <li className="my-3 bird-info-item">
                  <h5 className="text-xl font-bold bird-info-title">Diet</h5>
                  <p className="bird-info-subtitle">{birdDetail.diet}</p>
                </li>
                <li className="my-3 bird-info-item">
                  <h5 className="text-xl font-bold bird-info-title">Class name</h5>
                  <p className="bird-info-subtitle">{birdDetail.class_name}</p>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </Spin>
    </div>
  );
};

export default BirdDetail;
