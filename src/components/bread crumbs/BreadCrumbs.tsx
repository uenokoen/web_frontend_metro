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
        console.log("Effect triggered", id, location.pathname);
        if (id) {
            // Если мы на странице маршрута
            if (location.pathname.includes('/routes/')) {
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
            }
            // Если мы на странице поездки
            else if (location.pathname.includes('/trips/')) {
                setTripName(`Поездка №${id}`); // Пример: Поездка №123
            }
        } else {

            setRouteName("");
            setTripName("");
        }
    }, [id, location]);

    return (
        <nav aria-label="breadcrumb" className="breadcrumbs">
            <ul className="breadcrumb">
                {/* Главная */}
                <li className="breadcrumb-item">
                    <Link to="/">Главная</Link>
                </li>

                {/* Для маршрутов */}
                {location.pathname.includes('/routes') && (
                    <li className="breadcrumb-item">
                        <Link to="/routes">Маршруты</Link>
                    </li>
                )}

                {/* Для поездок */}
                {location.pathname.includes('/trips') && (
                    <li className="breadcrumb-item">
                        <Link to="/trips">Поездки</Link>
                    </li>
                )}

                {location.pathname.includes('/updateroute') || location.pathname.includes('/editroute') || location.pathname.includes('/createroute')  ? (
                    <li className="breadcrumb-item">
                        <Link to="/updateroute">Список маршрутов</Link>
                    </li>
                ) : null}

                {/* Редактирование маршрута */}
                {location.pathname.includes('/editroute') && (
                    <li className="breadcrumb-item active" aria-current="page">
                        Редактирование маршрута
                    </li>
                )}

                {location.pathname.includes('/createroute') && (
                    <li className="breadcrumb-item active" aria-current="page">
                        Создание маршрута
                    </li>
                )}

                {/* Заголовок активной страницы */}
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
