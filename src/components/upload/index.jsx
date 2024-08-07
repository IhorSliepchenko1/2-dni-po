import Button from "@mui/material/Button";
import { FaRegFileExcel } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { file, backupFile } from "../../features/dataSlice";
import { useRef } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Upload = ({ downloadFile }) => {
  const state = useSelector((state) => state);

  const fileRef = useRef();
  const dispatch = useDispatch();

  const uploads = () => {
    const reader = new FileReader();
    reader.readAsText(fileRef.current.files[0]);

    reader.onload = () => {
      dispatch(backupFile(reader.result));
    };
  };

  const createDataToRender = () => {
    uploads();

    const data = JSON.stringify(state.data.backupFileData).split(`\\r\\n`);
    const { landmarks, present, project, team } = state.info.info;

    let newArr = [];
    for (let i = 0; i < data.length; i++) {
      newArr.push(data[i].split(";"));
    }
    newArr.shift(newArr[0]);
    newArr.pop(newArr.length - 1);

    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr[i].length; j++) {
        newArr[i][5] = "";
        newArr[i][7] = landmarks;
        newArr[i][9] = 2;
        newArr[i][11] = present;
        newArr[i][12] = project;
        newArr[i][13] = team;
      }
    }

    newArr.sort((a, b) => {
      return a[2] - b[2];
    });

    dispatch(file(newArr));
  };

  return (
    <div className="file-panel">
      <Button
        component="label"
        role={undefined}
        variant="contained"
        startIcon={<FaRegFileExcel />}
      >
        Загрузить файл
        <VisuallyHiddenInput type="file" ref={fileRef} />
      </Button>

      <Button
        variant="outlined"
        href="#outlined-buttons"
        onClick={createDataToRender}
      >
        Увидеть файл
      </Button>
      <Button variant="contained" onClick={downloadFile} color="success">
        Скачать
      </Button>
    </div>
  );
};

export default Upload;
