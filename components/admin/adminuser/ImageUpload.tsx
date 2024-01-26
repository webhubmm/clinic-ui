'use client'
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import React from 'react'
import { useForm } from "react-hook-form";
import { Button } from '@chakra-ui/react';

export default function ImageUpload() {
  const [files, setFiles] = React.useState([]);

  return (
     <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={3}
                server="/api"
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
  )
}
