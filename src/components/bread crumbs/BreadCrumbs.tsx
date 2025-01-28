import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './breadcrumbs.css';
import { api } from '../../modules/MetroApi.ts';
function Breadcrumbs() {
    const { id } = useParams(); // Получаем ID маршрута из URL
    const [routeName, setRouteName] = useState(""); // Заменили на routeName

    useEffect(() => {
        if (id) {
            // Загружаем данные маршрута по ID только если есть ID
            api.getRoute(id) // Используем getRoute, если это метод получения данных маршрута
                .then((data) => setRouteName(`${data.origin} - ${data.destination}`)) // Заменили на отображение маршрута
                .catch((err) => console.error("Ошибка загрузки маршрута:", err));
        } else {
            setRouteName(""); // Очищаем имя маршрута для страницы списка
        }
    }, [id]);

    return (
        <nav aria-label="breadcrumb" className="breadcrumbs">
            <ul className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Главная</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to="/routes">Маршруты</Link> {/* Заменили на /routes */}
                </li>
                {id && (
                    <li className="breadcrumb-item active" aria-current="page">
                        {routeName || "Загрузка..."} {/* Заменили на routeName */}
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Breadcrumbs;
