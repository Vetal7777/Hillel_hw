import React from "react";
//импортируем сам React пакет
import ReactDOM from 'react-dom/client';
//???
import './index.css';
//ипортируем стили (стили чисто body)
import App from "./app";
//импортируем наш общий файл со всеми приложениями

const root = ReactDOM.createRoot(document.getElementById('root'));
//укзаываем что все будет в папке .root
root.render(
    //отрендари плиз
    <React.StrictMode>
        <App/>
    {/*    Компонент приложений всех*/}
    </React.StrictMode>
)