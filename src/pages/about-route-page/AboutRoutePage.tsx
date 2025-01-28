import './about-route-page.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../modules/MetroApi.ts';
import { Container, Spinner } from "react-bootstrap";
import Breadcrumbs from "../../components/bread crumbs/BreadCrumbs.tsx";

function AboutRoutePage() {
    const { id } = useParams<number>(); // Извлекаем id из URL
    const [route, setRoute] = useState(null); // Заменили на route
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoute = async () => { // Заменили fetchIngredient на fetchRoute
            try {
                const data = await api.getRoute(id); // Поменяли на getRoute (если это метод получения данных маршрута)
                setRoute(data); // Устанавливаем данные маршрута
            } catch (err) {
                console.error("Ошибка загрузки маршрута:", err);
                setError("Не удалось загрузить данные о маршруте");
            } finally {
                setLoading(false);
            }
        };

        fetchRoute();
    }, [id]);

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p>Загрузка...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5 text-center">
                <p className="text-danger">{error}</p>
            </Container>
        );
    }

    if (!route) { // Поменяли на route
        return (
            <Container className="py-5 text-center">
                <p>Маршрут не найден</p> {/* Поменяли на "Маршрут" */}
            </Container>
        );
    }

    const imageUrl = route.thumbnail; // Поменяли на route
    return (
        <Container className="py-5">
            <Breadcrumbs />
            <div className="row align-items-center mt-3 mb-5">
                <div className="col-md-6">
                    <img
                        src={imageUrl}
                        alt={route.origin} // Поменяли на route.origin (можно поменять на более подходящее название)
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-6 mt-3">
                    <h2 className="mb-3 fw-bold ">{route.origin} - {route.destination}</h2>
                    <div className="price-badge">
                        <h5 className="fw-medium text-white mb-0">Стоимость: {route.price} ₽</h5>
                    </div>
                </div>
            </div>

            <div className="justify-content-start">
                <h3 className="fw-bold text-center mb-3">Подробнее о маршруте</h3>
                <h5 className="mx-auto text-start recipe-card about-text">
                    {route.description}
                </h5>
            </div>
        </Container>
    );
}

export default AboutRoutePage;