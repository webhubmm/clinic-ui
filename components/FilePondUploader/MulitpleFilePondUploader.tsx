import React, { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

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
      <FilePond
        ref={pond}
        allowMultiple={true}
        maxFileSize="2MB"
        onupdatefiles={handleUpdateFiles}
        allowRevert={false}
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
