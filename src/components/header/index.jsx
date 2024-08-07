import Upload from "../../components/upload";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { backupFile, file } from "../../features/dataSlice";
import { useForm } from "react-hook-form";
import { actualInfo, actualInfoDelete } from "../../features/actualInfoSlice";
import { useEffect } from "react";

const Header = ({ downloadFile }) => {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.info);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: info,
  });

  useEffect(() => {
    reset(info);
  }, [info, reset]);

  const deleteState = () => {
    localStorage.removeItem("file");
    localStorage.removeItem("backupFile");
    localStorage.removeItem("info");
    dispatch(file(null));
    dispatch(backupFile(null));
    dispatch(actualInfoDelete({}));

    location.reload();
  };

  const formData = (data) => {
    dispatch(actualInfo(data));
  };

  const deleteFormData = () => {
    dispatch(actualInfoDelete());
  };

  return (
    <div className="header">
      <Upload downloadFile={downloadFile} />
      <form className="main" onSubmit={handleSubmit(formData)}>
        <div className="wrapper">
          <div className="_main-class-slot">
            <span className="name">город:</span>
            <input
              type="text"
              className="input"
              placeholder="Ташкент"
              {...register("city")}
            />
          </div>
          <div className="_main-class-slot">
            <span className="name">заведение:</span>
            <input
              type="text"
              className="input"
              placeholder="Пивнушка-Xрюшка"
              {...register("location")}
            />
          </div>
          <div className="_main-class-slot">
            <span className="name">дата:</span>
            <input type="date" className="input" {...register("date")} />
          </div>
          <div className="time-wrapper _main-class-slot">
            <span className="name">время:</span>
            <div className="time-container">
              <input type="text" placeholder="1" {...register("first")} />
              <input type="text" placeholder="2" {...register("second")} />
              <input type="text" placeholder="3" {...register("third")} />
              <input
                type="number"
                placeholder="к-во"
                min={0}
                {...register("first_count")}
              />
              <input
                type="number"
                placeholder="к-во"
                min={0}
                {...register("second_count")}
              />
              <input
                type="number"
                placeholder="к-во"
                min={0}
                {...register("third_count")}
              />
            </div>
          </div>

          <div className="_main-class-slot">
            <span className="name">подарок:</span>
            <input
              type="text"
              className="input"
              placeholder="чайный пакетик"
              {...register("present")}
            />
          </div>
          <div className="_main-class-slot">
            <span className="name">проект:</span>
            <input
              type="text"
              className="input"
              placeholder="мощный проект"
              {...register("project")}
            />
          </div>
          <div className="_main-class-slot">
            <span className="name">команда:</span>
            <input
              type="text"
              className="input"
              placeholder="потужна команда"
              {...register("team")}
            />
          </div>
          <div className="_main-class-slot">
            <span className="name">ориентиры:</span>
            <textarea
              className="textarea"
              placeholder="где не знаю где"
              {...register("landmarks")}
            ></textarea>
          </div>
        </div>
        <button type="submit">Сохранить</button>
        <button style={{ background: `red` }} onClick={deleteFormData}>
          Очистить
        </button>
      </form>

      <Button variant="outlined" color="error" onClick={deleteState}>
        Удалить всё
      </Button>
    </div>
  );
};

export default Header;
