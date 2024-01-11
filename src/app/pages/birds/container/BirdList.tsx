import { Breadcrumb, Input, Pagination, Spin } from 'antd';
import BirdItem from '../components/BirdItem';
import { Link } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { getAllBirdsAction } from '../bird.actions';

const { Search } = Input;

const BirdList = () => {
  const dispatch = useDispatch();

  const { birds, isLoading, currentPage, totalItem } = useSelector((state: RootState) => state.birds);

  const getAllBird = useRef(() => {});

  getAllBird.current = () => {
    if (currentPage === 1) {
      dispatch(getAllBirdsAction(1) as any);
    }
  };

  useEffect(() => {
    getAllBird.current();
  }, []);

  const handlePaginationChange = (page: number) => {
    dispatch(getAllBirdsAction(page) as any);
  };
  return (
    <div className="bird">
      <div className="bird-wrapper">
        <div className="flex items-center justify-between mb-7">
          <Breadcrumb
            items={[
              {
                title: <Link to="/">Dashboard</Link>,
              },
              {
                title: 'Birds',
              },
            ]}
          />
          <Search className="p-4 w-96" placeholder="input search birds here" loading={false} />
        </div>
        <Spin spinning={isLoading}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {birds.map((bird, index) => {
              return <BirdItem bird={bird} key={index} />;
            })}
          </div>

          <div className="mt-5 text-center pagination-box">
            <Pagination
              onChange={(page, _) => handlePaginationChange(page)}
              className="items-center w-full"
              current={currentPage}
              total={totalItem}
            />
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default BirdList;
