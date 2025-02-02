import React, { useEffect } from "react";
import { Container, Card, Col, Spinner } from "react-bootstrap";
import { AppDispatch, RootState } from "../../../store.ts";
import { useDispatch, useSelector } from "react-redux";
import { getTrip, getTrips } from "../../../tripDraftSlice.ts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/bread crumbs/BreadCrumbs.tsx";  // Импортируем motion

// Форматируем дату
const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();  // Преобразуем в формат "день.месяц.год часы:минуты"
};

// Функция для приведения статуса к удобочитаемому виду с покраской
const formatStatus = (status: string) => {
    switch (status) {
        case 'FINISHED':
            return { label: 'Завершена', colorClass: 'text-bg-success' };
        case 'FORMED':
            return { label: 'Создана', colorClass: 'text-bg-warning' };
        case 'IN_PROGRESS':
            return { label: 'В процессе', colorClass: 'text-bg-info' };
        default:
            return { label: status, colorClass: 'text-bg-secondary' };
    }
};

const TripListPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const tripsData = useSelector((state: RootState) => state.trips.trips);
    const loading = useSelector((state: RootState) => state.trips.loading);
    const error = useSelector((state: RootState) => state.trips.error);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTrips());
    }, [dispatch]);

    const handleClick = async (id: number) => {
        dispatch(getTrip(id)); // Загружаем информацию о выбранной поездке
        navigate(`/trips/${id}`); // Переходим на страницу с подробной информацией
    };

    if (loading) {
        return (
            <Container className="mt-5">
                <div className="mt-3 mb-3">
                    <Breadcrumbs />
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "200px" }}
                >
                    <Spinner animation="border" variant="primary" />
                    <span className="ms-2">Загрузка...</span>
                </motion.div>
            </Container>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (tripsData.length === 0) {
        return (

            <Container className="mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                <h4 className="text-center text-muted">Упс... похоже, вы еще не создали поездку</h4>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <div className="mt-3 mb-3">
                <Breadcrumbs />
            </div>
            <Col className="gap-2 d-flex flex-column mb-2">
                {tripsData.map((trip) => {
                    const status = formatStatus(trip.status); // Получаем статус с классом
                    return (
                        <Col key={trip.id} xs={12} md={12} lg={12}>
                            <motion.div
                                whileHover={{ scale: 1.01 }} // Анимация увеличения при ховере
                                onClick={() => handleClick(trip.id)} // Передаем ID при клике
                            >
                                <Card className="shadow-sm">
                                    <Card.Body>
                                        <Card.Title className="fs-5">
                                            Поездка №{trip.id}
                                            <div className={'mt-1'}>
                                                <span
                                                    className={`badge rounded-pill ${status.colorClass} w-25`}>
                                                    {status.label}
                                                </span>
                                            </div>
                                        </Card.Title>
                                        <div className="mt-3">
                                            <p className="fs-6">
                                                <strong>Время создания:</strong>{" "}
                                                {trip.created_at ? formatDate(trip.created_at) : "—"}
                                            </p>
                                            <p className="fs-6">
                                                <strong>Время формирования:</strong>{" "}
                                                {trip.formed_at ? formatDate(trip.formed_at) : "—"}
                                            </p>
                                            <p className="fs-6">
                                                <strong>Время завершения:</strong>{" "}
                                                {trip.ended_at ? formatDate(trip.ended_at) : "—"}
                                            </p>
                                            <p className="fs-6">
                                                <strong>Общее время поездки:</strong>{" "}
                                                {trip.duration_total ? trip.duration_total : "—"}
                                            </p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        </Col>
                    );
                })}
            </Col>
        </Container>
    );
};

export default TripListPage;
