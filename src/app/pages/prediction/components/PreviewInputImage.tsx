import React from 'react';

type PreviewInputImageProps = {
  photoPreview : string
}
const PreviewInputImage = ({photoPreview }  : PreviewInputImageProps) => {
    return (
      <div className="w-full h-[400px] rounded border-2 border-dotted p-4">
        <div className="border rounded border-gray-700 w-full h-full">
          <img className="object-cover w-full h-full rounded" src={photoPreview} alt="Image preview of input" />
        </div>
      </div>
    );
};

export default PreviewInputImage;