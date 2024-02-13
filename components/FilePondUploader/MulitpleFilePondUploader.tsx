import React, { useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import { Box } from "@chakra-ui/react";
import Image from "next/image";

registerPlugin(FilePondPluginFileEncode);

interface FilePondUploaderProps {
  onFileChange: (base64Images: string[]) => void;
}

const MulitpleFilePondUploader: React.FC<FilePondUploaderProps> = ({
  onFileChange,
}) => {
  const pond = useRef<FilePond | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleUpdateFiles = (fileItems: any[]) => {
    const newUploadedImages: string[] = [];

    fileItems.forEach((fileItem) => {
      const file = fileItem.file;
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          newUploadedImages.push(base64);
          if (newUploadedImages.length === fileItems.length) {
            setUploadedImages(newUploadedImages);
            onFileChange(newUploadedImages);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <Box mt={4}>
      <Box
        display={"flex"}
        gap={2}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        {uploadedImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Uploaded ${index}`}
            style={{
              marginTop: "10px",
              objectFit: "cover",
            }}
            width={180}
            height={150}
          />
        ))}
      </Box>
      <FilePond
        ref={pond}
        allowMultiple={true}
        onupdatefiles={handleUpdateFiles}
        server={{
          process: (
            fieldName,
            file,
            metadata,
            load,
            error,
            progress,
            abort
          ) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              load(reader.result as string);
            };
            reader.readAsDataURL(file);
          },
        }}
      />
    </Box>
  );
};

export default MulitpleFilePondUploader;