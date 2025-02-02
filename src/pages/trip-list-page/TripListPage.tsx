import React, {useEffect, useState} from "react";
import {Container, Card, Col, Spinner, Table, Button, Form} from "react-bootstrap";
import { AppDispatch, RootState } from "../../../store.ts";
import { useDispatch, useSelector } from "react-redux";
import { getTrip} from "../../../tripDraftSlice.ts";
import {getTrips, rejectOrCompleteTrip} from "../../../tripsSlice.ts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/bread crumbs/BreadCrumbs.tsx";
import SearchImg from "../../assets/search.svg";
import {setFilters} from "../../../tripsSlice.ts";
import './trip-list-page.css'
import timeImg from '../../assets/time.svg'
import shareImg from '../../assets/share.svg'


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
        case 'DISMISSED':
            return { label: 'Отклонена', colorClass: 'text-bg-danger' };
        default:
            return { label: status, colorClass: 'text-bg-secondary' };
    }
};

const TripListPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const tripsData = useSelector((state: RootState) => state.trips.trips);
    const loading = useSelector((state: RootState) => state.trips.loading);
    const error = useSelector((state: RootState) => state.trips.error);
    const start_date = useSelector((state: RootState) => state.trips.start_date);
    const end_date = useSelector((state: RootState) => state.trips.end_date);
    const status = useSelector((state: RootState) => state.trips.status);
    const navigate = useNavigate();
    const isSuperUser = useSelector((state: RootState) => state.users.is_superuser);
    const isAuth = useSelector((state: RootState) => state.users.isAuthenticated);
    const [userFilter, setUserFilter] = useState<string>('');
    useEffect(() => {
        if (isAuth) {
            dispatch(getTrips())
        } else {
            navigate(`/forbidden`)
        }
        const intervalId = setInterval(() => {
            dispatch(getTrips());
        }, 30000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, [dispatch, isAuth, navigate]);

    const handleClick = async (id: number) => {
        dispatch(getTrip(id)); // Загружаем информацию о выбранной поездке
        navigate(`/trips/${id}`); // Переходим на страницу с подробной информацией
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'user') {
            setUserFilter(value); // Обновляем локальный фильтр для "Создателя"
        } else {
            dispatch(setFilters({ [name]: value })); // Другие фильтры обрабатываются через Redux
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilters({ [e.target.name]: e.target.value }));
    };

    const handleComplete = async (tripId: number) => {
        try {
            await dispatch(rejectOrCompleteTrip({ tripId, action: 'finish' }));
            await dispatch(getTrips());
        } catch (error) {
            console.error("Error completing the trip:", error);
            // Вы можете установить ошибку в состояние или показать уведомление пользователю
        }
    };

    const handleReject = async (tripId: number) => {
        try {
            await dispatch(rejectOrCompleteTrip({ tripId, action: 'dismiss' }));
            await dispatch(getTrips());
        } catch (error) {
            console.error("Error rejecting the trip:", error);
            // Вы можете установить ошибку в состояние или показать уведомление пользователю
        }
    };

    const filteredTrips = tripsData.filter((trip) => {
        // Фильтрация по создателю (case insensitive)
        return trip.user?.toLowerCase().includes(userFilter.toLowerCase());
    });

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
    if (isSuperUser) {
        return (
            <Container className="mt-5">
                <div className="mt-3 mb-3">
                    <Breadcrumbs />
                </div>
                <Form className="mb-4 d-flex flex-row gap-3 align-items-center">
                    <Form.Group controlId="start_date" className="mb-3">
                        <Form.Label>Дата начала</Form.Label>
                        <Form.Control
                            type="date"
                            name="start_date"
                            className={'form-auth'}
                            value={start_date}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="end_date" className="mb-3">
                        <Form.Label>Дата окончания</Form.Label>
                        <Form.Control
                            type="date"
                            name="end_date"
                            className={'form-auth'}
                            value={end_date}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="status" className="mb-3">
                        <Form.Label>Статус</Form.Label>
                        <Form.Select
                            name="status"
                            value={status}
                            className={'form-auth'}
                            onChange={handleSelectChange}
                        >
                            <option value="">Все</option>
                            <option value="FINISHED">Завершена</option>
                            <option value="FORMED">Создана</option>
                            <option value="DISMISSED">Отклонена</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="user" className="mb-3">
                        <Form.Label>Создатель</Form.Label>
                        <Form.Control
                            type="text"
                            name="user"
                            placeholder={'Создатель'}
                            className={'form-auth'}
                            value={userFilter}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button
                        variant="danger"
                        className="custom-button-shop"
                        onClick={() => dispatch(getTrips())}
                    >
                        <img src={SearchImg} className="w-100" alt="SearchImg"/>
                    </Button>
                </Form>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Id</th>
                        <th>Время создания</th>
                        <th>Время формирования</th>
                        <th>Время завершения/отклонения</th>
                        <th>Создатель</th>
                        <th>Модератор</th>
                        <th>Время поездки</th>
                        <th>Статус</th>
                        <th>QR</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTrips.map((trip, index) => {
                        const status = formatStatus(trip.status);
                        return (
                            <tr key={trip.id}>
                                <td onClick={() => handleClick(trip.id)}>{index + 1}</td>
                                <td>{trip.id}</td>
                                <td>{trip.created_at ? formatDate(trip.created_at) : "—"}</td>
                                <td>{trip.formed_at ? formatDate(trip.formed_at) : "—"}</td>
                                <td>{trip.ended_at ? formatDate(trip.ended_at) : "—"}</td>
                                <td>{trip.user}</td>
                                <td>{trip.moderator}</td>
                                <td>{trip.duration_total}</td>
                                <td className={status.colorClass}>{status.label}</td>
                                <td>
                                    {status.label === 'Отклонена' ? (
                                        <motion.img
                                            className="status-icon"
                                            src={timeImg}
                                            alt="Time Icon"
                                            whileTap={{
                                                scale: 1.2, // Увеличение размера
                                                rotate: 360, // Вращение
                                                transition: {duration: 0.5}, // Длительность анимации
                                            }}
                                        />
                                    ) : (
                                        <div className="qr-hover-wrapper">
                                            <motion.img
                                                className="status-icon"
                                                src={shareImg}
                                                alt="QR Icon"
                                                whileTap={{
                                                    scale: 1.5, // Увеличение размера при клике
                                                    x: 50, // Сдвиг вправо
                                                    y: -30, // Сдвиг вверх
                                                    transition: {duration: 0.5}, // Длительность анимации
                                                }}
                                            />
                                            <motion.div
                                                className="qr-hover"
                                                initial={{opacity: 0, scale: 0.8}} // Начальные значения
                                                animate={{opacity: 1, scale: 1}} // Анимация появления
                                                whileHover={{
                                                    scale: 1.2, // Увеличение при наведении
                                                    transition: {duration: 0.3},
                                                }}
                                            >
                                                {trip.qr && (
                                                    <img
                                                        className="qr-code"
                                                        src={`data:image/png;base64,${trip.qr}`}
                                                        alt="QR Code"
                                                    />
                                                )}
                                            </motion.div>
                                        </div>
                                    )}
                                </td>

                                <td className={'d-flex gap-2'}>
                                    <Button
                                        variant="danger"
                                        className="custom-button-save"
                                        onClick={async () => await handleComplete(trip.id)}
                                    >
                                        Завершить
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className={'custom-button'}
                                        onClick={async () => await handleReject(trip.id)}
                                    >
                                        Отклонить
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <div className="mt-3 mb-3">
                <Breadcrumbs/>
            </div>
            <Col className="gap-2 d-flex flex-column mb-2">
                {tripsData.map((trip) => {
                    const status = formatStatus(trip.status); // Получаем статус с классом
                    return (
                        <Col key={trip.id} xs={12} md={12} lg={12}>
                            <motion.div
                                whileHover={{scale: 1.01}} // Анимация увеличения при ховере
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
                                            <p className="fs-6">
                                                <strong>Qr</strong>{" "}
                                                {trip.qr && (
                                                    <img
                                                        className="qr-code"
                                                        src={`data:image/png;base64,${trip.qr}`}
                                                        alt="QR Code"
                                                    />
                                                )}
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
