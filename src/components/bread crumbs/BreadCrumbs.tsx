import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import './breadcrumbs.css';
import { api } from '../../api';

function Breadcrumbs() {
    const { id } = useParams(); // Получаем ID маршрута или поездки из URL
    const [routeName, setRouteName] = useState(""); // Название маршрута
    const [tripName, setTripName] = useState(""); // Название поездки
    const location = useLocation(); // Хук для получения текущего пути

    useEffect(() => {
        if (id && location.pathname.includes('/routes/')) { // Если мы на странице маршрута
            api.routes.routesRead(id)
                .then((response) => {
                    const data = response.data;
                    if (data && data.origin && data.destination) {
                        setRouteName(`${data.origin} - ${data.destination}`);
                    }
                })
                .catch((err) => {
                    console.error("Ошибка загрузки маршрута:", err);
                });
        } else if (id && location.pathname.includes('/trips/')) { // Если мы на странице поездки
            setTripName(`Поездка №${id}`); // Пример: Поездка №123
        } else {
            setRouteName(""); // Очищаем имя маршрута для страницы списка
            setTripName(""); // Очищаем название поездки для других страниц
        }
    }, [id, location]);

    return (
        <nav aria-label="breadcrumb" className="breadcrumbs">
            <ul className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Главная</Link>
                </li>
                {location.pathname.includes('/routes') && (
                    <li className="breadcrumb-item">
                        <Link to="/routes">Маршруты</Link>
                    </li>
                )}
                {location.pathname.includes('/trips') && (
                    <li className="breadcrumb-item">
                        <Link to="/trips">Поездки</Link>
                    </li>
                )}
                {location.pathname.includes('/user') && (
                    <li className="breadcrumb-item" aria-current="page">
                        <Link to="/user">Личный кабинет</Link>
                    </li>
                )}
                {location.pathname.includes('/routes/') && id && (
                    <li className="breadcrumb-item active" aria-current="page">
                        {routeName || "Загрузка маршрута..."}
                    </li>
                )}
                {location.pathname.includes('/trips/') && id && (
                    <li className="breadcrumb-item active" aria-current="page">
                        {tripName || "Загрузка поездки..."}
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Breadcrumbs;
