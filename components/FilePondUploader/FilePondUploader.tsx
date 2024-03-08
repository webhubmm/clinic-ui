import React, { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import { Box } from "@chakra-ui/react";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";

registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginFilePoster
);

interface FilePondUploaderProps {
  onFileChange: (base64Image: string | null) => void;
  formDataImages: [];
  setFormDataImages: (value: any) => void;
}

const FilePondUploader: React.FC<FilePondUploaderProps> = ({
  onFileChange,
  formDataImages,
  setFormDataImages,
}) => {
  const pond = useRef<FilePond | null>(null);

  const handleUpdateFiles = (fileItems: any[] | null) => {
    if (fileItems) {
      if (fileItems.length > 0) {
        // Extract File object from fileItems
        const file = fileItems[0].file;

        // Convert the uploaded file to base64
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result as string;
            onFileChange(base64);
          };
          reader.readAsDataURL(file);
        }
      }
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
        allowMultiple={false}
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
            // You can handle the file upload logic here
            // For simplicity, let's assume it's synchronous and we encode the file to base64
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

export default FilePondUploader;
