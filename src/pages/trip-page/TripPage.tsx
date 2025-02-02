import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    deleteTrip,
    getTrip,
    setError,
    updateTrip,
    setTripData,
    setRouteInTripData,
    updateRouteInTrip, setRoutes, deleteRouteInTrip, submitTrip
} from "../../../tripDraftSlice.ts";
import { AppDispatch, RootState } from "../../../store.ts";
import { useNavigate, useParams } from "react-router-dom";
import {Button, Card, Container, Form, Spinner} from "react-bootstrap";
import Breadcrumbs from "../../components/bread crumbs/BreadCrumbs.tsx";
import {motion} from "framer-motion";  // Импортируем действия и слайс

const CartPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    const navigate = useNavigate();
    const isDraft = useSelector((state: RootState) => state.tripDraft.isDraft);
    const { routetrip_set, error, loading,tripData, } = useSelector((state: RootState) => state.tripDraft);  // Получаем данные из Redux

    // Обработчик изменения полей формы
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(
            setTripData({
                ...tripData,
                [name]: value,
            })
        );
    };

    const handleRouteChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target; // Извлекаем имя поля и его новое значение
        const routeId = e.target.getAttribute('data-route-id'); // Получаем ID маршрута

        if (routeId) {
            // Обновляем состояние в Redux
            dispatch(
                setRouteInTripData({
                    routeId: parseInt(routeId, 10), // Преобразуем routeId в число
                    [name]: checked, // Передаем обновленное значение
                })
            );
        }
    };





    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            try {
                await dispatch(deleteTrip(id));
                navigate(`/routes/`);
            } catch (error) {
                dispatch(setError(error));
            }
        }
    };

    const handleSave = () => {
        if (id) {
            const tripDataToSend = {
                name: tripData.name ?? '',
                description: tripData.description ?? '',
                owner: tripData.owner ?? ''
            };
            try {
                dispatch(updateTrip({ id: id, data: tripDataToSend }));
            } catch (error) {
                dispatch(setError(error));
            }
        }
    }

    const handleSaveRoute = async () => {
        try {
            if (routetrip_set && Array.isArray(routetrip_set)) {
                await Promise.all(
                    routetrip_set.map(async (item) => {
                        if (item.route.id) {
                            const RouteDataToSend = {
                                free: item.free ?? false,
                                order: item.order,
                            };
                            // Отправляем каждый маршрут на обновление
                            await dispatch(updateRouteInTrip({ id: item.route.id, data: RouteDataToSend }));
                        }
                    })
                );
            }
        } catch (error) {
            dispatch(setError(error)); // Обрабатываем ошибку
        }
    };

    const handleDeleteRoute = async (routeId: number) => {
        if (routeId) {
            try {
                // Удаляем маршрут на сервере
                await dispatch(deleteRouteInTrip({ id: routeId }));

                // Обновляем состояние в Redux, исключая удаленный маршрут
                dispatch(
                    setRoutes(routetrip_set.filter(route => route.route.id !== routeId))
                );
            } catch (error) {
                console.error("Ошибка при удалении маршрута:", error);
            }
        }
    };

    const handleSubmitTrip = async (e: React.FormEvent) => {
        e.preventDefault()
        if (id) {
            try {
                // Удаляем маршрут на сервере
                await dispatch(submitTrip({ id: id }));
                navigate('/routes')
            } catch (error) {
                console.error("Ошибка при формировании поездки:", error);
            }
        }
    }


    useEffect(() => {
        // Если id уже есть, загружаем поездку
        if (id) {
            dispatch(getTrip(id));
        }
    }, [dispatch, id]);

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
        )
    }

    if (error) {
        return <div>{error}</div>;  // Показать ошибку
    }

    return (
        <Container className="mt-5">
            <div className="mt-3 mb-3">
                <Breadcrumbs/>
            </div>
            {routetrip_set?.map((item: any) => (
                <Card className="d-flex mb-3 shadow-sm" key={item.route.id}>
                    <Card.Body className="d-flex align-items-center">
                        {/* Картинка маршрута */}
                        <img
                            src={item.route.thumbnail}
                            alt={`Route ${item.route.id}`}
                            className="rounded"
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                            }}
                        />

                        {/* Информация о маршруте */}
                        <div className="ms-3 w-100">
                            <h6>{item.route.origin} - {item.route.destination}</h6>
                        </div>
                        <div className="ms-3 w-100">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <Form.Check
                                    type="checkbox"
                                    label={item.free ? "Бесплатная поездка" : "Платная поездка"}
                                    checked={item.free}
                                    name="free"
                                    data-route-id={item.route.id} // Передаем ID маршрута
                                    className="me-3"
                                    onChange={handleRouteChange}
                                    disabled={!isDraft}
                                />
                            </div>
                            <h6 className="mb-1">Порядок: {item.order}</h6>
                            <h6 className="mb-0">Длительность: {item.duration} мин</h6>
                        </div>
                        {(isDraft) && (
                            <Button variant="danger" className={'custom-button'}
                                    onClick={() => handleDeleteRoute(item.route.id)}>
                                Удалить
                            </Button>
                        )}

                    </Card.Body>
                </Card>
            ))}
            <Container className={'d-flex justify-content-start mb-3'}>
                {(isDraft) && (
                    <Button variant="danger" className={'custom-button-save'} onClick={handleSaveRoute}>
                        Сохранить изменения
                    </Button>
                )}
            </Container>
            {/* Детали поездки */}
            <Card className="shadow-sm mb-3">
                <Card.Body>
                    <h5 className="mb-3">Детали поездки</h5>
                    <Form className={'mb-3'} onSubmit={handleSave}>
                        <Form.Group className="mb-3" controlId="tripOwner">
                            <Form.Label>Владелец</Form.Label>
                            <Form.Control
                                type="text"
                                name="owner"
                                placeholder="Введите имя владельца поездки"
                                value={tripData.owner ?? ''}
                                onChange={handleInputChange}
                                disabled={!isDraft}// Обработчик изменения
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tripName">
                            <Form.Label>Название поездки</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Введите название поездки"
                                value={tripData.name ?? ''}
                                onChange={handleInputChange}
                                disabled={!isDraft}// Обработчик изменения
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tripPurpose">
                            <Form.Label>Цель поездки</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                placeholder="Введите цель поездки"
                                value={tripData.description ?? ''}
                                onChange={handleInputChange}
                                disabled={!isDraft}
                            />
                        </Form.Group>
                        {(isDraft) && (
                            <Button variant={'success'} className={'custom-button-save'} onClick={handleSave}>
                                Сохранить
                            </Button>
                        )}
                    </Form>
                    <h6 className="text-muted">Количество: {routetrip_set.length}</h6>
                    <div className="d-flex justify-content-end gap-2">
                        {(isDraft) && (
                            <Button variant="danger" className={'custom-button'} onClick={handleDelete}>Удалить
                                всё</Button>
                        )}
                        {(isDraft) && (
                            <Button variant="success" className={'custom-button-save'} onClick={handleSubmitTrip}>Сформировать
                                поездку</Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CartPage;
