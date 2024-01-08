import { BirdStatus } from './bird-status';
import { BirdFamily } from './bird-family';
import { BirdOrder } from './bird-order';
export interface Bird {
  id: number;
  common_name: string;
  vietnamese_name: string;
  scientific_name: string;
  bird_order: string;
  description: string;
  distribution: string;
  diet: string;
  status?: BirdStatus;
  order?: BirdOrder;
  family?: BirdFamily;
  class_name: string;
  images: string[];
}

export interface BirdState {
  birds: Bird[];
  birdDetail: Bird;
  currentPage: number;
  totalPages: number;
  totalItem: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

/**
 * {
    "id": 5,
    "common_name": "African Emerald Cuckoo",
    "vietnamese_name": "Chim Cu cu xanh châu Phi",
    "scientific_name": "Chrysococcyx cupreus",
    "description": "African Emerald Cuckoo là một loài chim nhỏ thuộc họ Cuculidae. Chim có kích thước trung bình từ 17 đến 20 cm. Chim đực và chim cái có ngoại hình khác nhau. Chim đực có lông màu xanh lá cây chói lọi trên lưng, cổ và ngực, trong khi chim cái có lông màu nâu nhạt và sọc trắng trên cánh. Cả hai giới đều có mỏ nhọn và màu đen.",
    "distribution": "African Emerald Cuckoo sinh sống trong các khu rừng, cánh đồng và khu vực cây bụi ở châu Phi. ",
    "diet": "Chúng ăn chủ yếu các loại côn trùng, bao gồm bướm, con nhộng và kiến.",
    "class_name": "AFRICAN EMERALD CUCKOO",
    "status": null,
    "order": {
        "id": 5,
        "orderName": "Cuculiformes",
        "orderVietnameseName": "Bộ Cu Cu"
    },
    "family": {
        "id": 5,
        "familyName": "Cuculidae",
        "familyVietnameseName": "Họ Cu Cu"
    },
    "images": [
        "http://res.cloudinary.com/dmzvudfg5/image/upload/v1699154988/birds_upload/AFRICAN%20EMERALD%20CUCKOO/1.jpg.jpg",
        "http://res.cloudinary.com/dmzvudfg5/image/upload/v1699154989/birds_upload/AFRICAN%20EMERALD%20CUCKOO/2.jpg.jpg",
        "http://res.cloudinary.com/dmzvudfg5/image/upload/v1699154989/birds_upload/AFRICAN%20EMERALD%20CUCKOO/3.jpg.jpg",
        "http://res.cloudinary.com/dmzvudfg5/image/upload/v1699154990/birds_upload/AFRICAN%20EMERALD%20CUCKOO/4.jpg.jpg",
        "http://res.cloudinary.com/dmzvudfg5/image/upload/v1699154991/birds_upload/AFRICAN%20EMERALD%20CUCKOO/5.jpg.jpg"
    ]
}
 */
