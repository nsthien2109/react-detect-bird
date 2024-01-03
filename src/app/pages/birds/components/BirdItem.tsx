import { Card } from 'antd';
import { Bird } from '../../../models/bird';
import { Link } from 'react-router-dom';

const { Meta } = Card;

type BirdItemProps = {
  bird: Bird;
};

const BirdItem = ({ bird }: BirdItemProps) => {
  return (
    <Link to={`${bird.id}`}>
      <Card hoverable style={{ width: '100%' }} cover={<img alt="example" src={bird.images[0]} />}>
        <Meta title={bird.common_name} description={bird.vietnamese_name} />
      </Card>
    </Link>
  );
};

export default BirdItem;
