import React from 'react';
import { FormLabel} from "@mui/material";
import { useStyles } from "./style";

const ResumeUploader = ({pdfFile,setPdfFile,setPdfSelectionError}) => {
  const classes = useStyles();

  const fileType=['application/pdf'];
  const convert2base64 = (e) => {
    const files = e.target.files[0];
    const reader = new FileReader();

    if(files && fileType.includes(files.type)){
      reader.readAsDataURL(files);
      reader.onloadend = () => {
        setPdfFile(reader.result);
      };
      setPdfSelectionError("");
    }else{
      setPdfSelectionError("Please Select a Valid PDF file");
    }
  };

  return (
    <div>
      <div className={classes.FormControl}>
        <FormLabel className={classes.formLabel}>
          Upload Resume :
        </FormLabel>
        <input
          required
          accept="file"
          type="file"
          onChange={(e) => convert2base64(e)}
          className={classes.pdfUpload}
        />
      </div>
    </div>
  )
}

export default ResumeUploader;





