import React, { useRef } from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';

type InputImageProps = {
  photoPreview: string | undefined;
  setPhotoPreview: (value: string) => void;
  setFile?: (file: any) => void;
  handlePrediction: (file: File) => void;
};
const InputImage = ({ photoPreview, setPhotoPreview, handlePrediction }: InputImageProps) => {
  const coverImageRef = useRef<HTMLInputElement>(null);
  const clickSelectCover = () => {
    coverImageRef.current?.click();
  };

  const handleUploadCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      handlePrediction(file);
      setPhotoPreview(previewUrl);
    } else {
      setPhotoPreview('');
    }
  };

  return (
    <div
      className="flex justify-center w-full h-32 mb-2 border-2 border-dotted rounded cursor-pointer image-input item-center flex-column"
      onClick={clickSelectCover}
    >
      <CloudUploadOutlined />
      <p className="mt-3 font-medium">Upload image</p>
      <input type="file" name="file" ref={coverImageRef} onChange={handleUploadCover} hidden />
    </div>
  );
};

export default InputImage;
