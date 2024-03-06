import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box } from "@chakra-ui/react";

interface TinyMCEProps {
  initialValue?: string;
  apiKey: string;
  onChange: (content: string, editor: any) => void;
}

const TinyMceEditor: React.FC<TinyMCEProps> = ({
  initialValue,
  apiKey,
  onChange,
}) => {
  return (
    <Box>
      <Editor
        initialValue={initialValue}
        apiKey={apiKey}
        init={{
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
        }}
        onEditorChange={onChange}
      />
    </Box>
  );
};

export default TinyMceEditor;
