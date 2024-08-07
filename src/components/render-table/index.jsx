import { useSelector, useDispatch } from "react-redux";
import { useCreateFile } from "../../hook/useCreateFile";
import { useEffect } from "react";
import Header from "../header";
import { file } from "../../features/dataSlice";

const RenderTable = () => {
  const header = [
    "Телефон 1",
    "Место проведения",
    "Начало в",
    "ФИО",
    "Область",
    "Miejsce",
    "Przekładka Godzinowa",
    "Ориентиры",
    "Inne Miasto",
    "Часовой пояс",
    "Страна",
    "Подарок",
    "Проект",
    "Команда",
    "Тип гостя",
  ];

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { createFile } = useCreateFile();

  const {
    location,
    city,
    first,
    second,
    third,
    first_count,
    second_count,
    third_count,
    date,
  } = state.info.info;

  const { fileData } = state.data;
  const arrCount = [
    { count: first_count, time: first },
    { count: second_count, time: second },
    { count: third_count, time: third },
  ];

  const copy = JSON.parse(JSON.stringify(fileData));

  const newDate = new Date(date);
  const dd = `${newDate.getDate()}`.padStart(2, "0");
  const mm = `${newDate.getMonth()}`.padStart(2, "0");
  const formatDate = `${dd}.${mm}`;

  const createActual = (data) => {
    const arrResult = [];

    for (let i = 0; i < data.count; i++) {
      const splitLocal = copy[i][1].split("/");

      copy[
        i
      ][1] = `${city} / ${location}${formatDate} ${data.time} (перенос с${splitLocal[1]})`;
      copy[i][2] = `${data.time.split(`:`)[0]} ${data.time.split(`:`)[1]}`;

      if (arrCount[1].count.length < 1 && arrCount[2].count.length < 1) {
        copy[i][6] = `SOLO ${data.time}`;
      }

      if (
        arrCount[1].count.length > 1 &&
        arrCount[2].count.length > 1 &&
        data.time.split(`:`)[0] < arrCount[2].time.split(`:`)[0]
      ) {
        copy[i][6] = `${arrCount[2].time.split(`:`)[0]} ${
          arrCount[2].time.split(`:`)[1]
        }`;
      }

      if (
        arrCount[1].count.length > 1 &&
        arrCount[2].count.length > 1 &&
        data.time.split(`:`)[0] === arrCount[2].time.split(`:`)[0]
      ) {
        copy[i][6] = `${arrCount[0].time.split(`:`)[0]} ${
          arrCount[0].time.split(`:`)[1]
        }`;
      }

      if (
        arrCount[0].count.length > 1 &&
        arrCount[1].count.length > 1 &&
        arrCount[2].count.length < 1 &&
        data.time.split(`:`)[0] < arrCount[1].time.split(`:`)[0]
      ) {
        copy[i][6] = `${arrCount[1].time.split(`:`)[0]} ${
          arrCount[1].time.split(`:`)[1]
        }`;
      } else {
        copy[i][6] = `${arrCount[0].time.split(`:`)[0]} ${
          arrCount[0].time.split(`:`)[1]
        }`;
      }

      arrResult.push(copy[i]);
      copy.shift(copy[i]);
    }

    return arrResult;
  };

  const downloadFile = () => {
    const result = [
      header,
      ...createActual(arrCount[0]),
      ...createActual(arrCount[1]),
      ...createActual(arrCount[2]),
    ];

    createFile(result, `${city} ${formatDate} 2 dni po`);
  };

  return (
    <>
      <Header downloadFile={downloadFile} />
      <table>
        <thead>
          <tr>
            {header.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {fileData.map((item, index) => (
            <tr key={index}>
              {item.map((cell, i) => (
                <td key={i} className={i === 7 ? "mini" : ""}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RenderTable;
