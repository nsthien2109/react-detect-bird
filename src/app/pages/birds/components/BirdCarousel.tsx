import { Carousel, Image } from 'antd';

type BirdCarouselProps = {
  images: string[];
};
const BirdCarousel = ({ images }: BirdCarouselProps) => {
  return (
    <>
      <Carousel dotPosition={'right'} autoplay className="rounded-md h-[400px]">
        {images &&
          images?.map((item, index) => {
            return (
              <div className="carousel-images h-[400px] rounded-md" key={index}>
                <Image alt="Bird image" width={'100%'} className="object-cover rounded-md" src={item} />
              </div>
            );
          })}
      </Carousel>
    </>
  );
};

export default BirdCarousel;
