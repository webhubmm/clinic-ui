import React, { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import { Box } from "@chakra-ui/react";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginFilePoster
);

interface FilePondUploaderProps {
  onFileChange: (base64Images: string[]) => void;
  formDataImages: [];
  setFormDataImages: (value: any) => void;
}

const MultipleFilePondUploader: React.FC<FilePondUploaderProps> = ({
  onFileChange,
  formDataImages,
  setFormDataImages,
}) => {
  const pond = useRef<FilePond | null>(null);

  const handleUpdateFiles = (fileItems: any[] | null) => {
    const newUploadedImages: string[] = [];

    if (fileItems) {
      fileItems?.forEach((fileItem) => {
        const file = fileItem.file;
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result as string;
            newUploadedImages.push(base64);
            if (newUploadedImages.length === fileItems.length) {
              setFormDataImages({ ...formDataImages, newUploadedImages });
              onFileChange(newUploadedImages);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    } else if (!fileItems) {
      pond.current?.removeFiles();
    }
  };

  useEffect(() => {
    handleUpdateFiles(formDataImages);
  }, [formDataImages]);

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

export default MultipleFilePondUploader;
