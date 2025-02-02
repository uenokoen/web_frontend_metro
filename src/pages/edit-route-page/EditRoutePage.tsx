import React, { useEffect, useState } from "react";
import {Container, Form, Button, Row, Col, Image, Table} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store.ts";
import {useNavigate, useParams} from "react-router-dom";
import {
    addPicInRoute,
    addRouteAttribute, deleteRouteAttribute,
    getRouteAttributes,
    getRouteDetails,
    updateRouteAsync, updateRouteAttribute
} from "../../../routeSlice.ts";
import Breadcrumbs from "../../components/bread crumbs/BreadCrumbs.tsx";

const EditRoutePage: React.FC = () => {
    const { id } = useParams();
    const numericId = id ? parseInt(id, 10) : null;
    const navigate = useNavigate()
    const isAuth = useSelector((state: RootState) =>
        state.users.isAuthenticated);
    const isSuperUser = useSelector((state: RootState) =>
        state.users.is_superuser);
    const route = useSelector((state: RootState) =>
        state.routes.routes.find((r) => r.id === numericId)
    );
    const routeAttributes = useSelector((state: RootState) => state.routes.routeAttributes);
    const [image, setImage] = useState<File | null>(null);
    const dispatch = useDispatch<AppDispatch>();


    const [newAttrName, setNewAttrName] = useState("");
    const [newAttrValue, setNewAttrValue] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!numericId) {
            alert("Маршрут не найден.");
            return;
        }

        // Формируем данные для обновления
        const formData = new FormData(e.currentTarget);
        const updatedData = {
            origin: formData.get("origin") as string,
            destination: formData.get("destination") as string,
            description: formData.get("description") as string,
            price: parseFloat(formData.get("price") as string) || 0,
            is_active: formData.get("is_active") === "on",
        };

        try {
            // Выполняем запрос на обновление через Redux и ждем его результат
            await dispatch(updateRouteAsync({routeId: numericId, updatedData})).unwrap();

            // Если запрос успешен, выполняем навигацию
            navigate(`/updateroute`);
        } catch (error) {
            console.error('Ошибка при обновлении маршрута:', error);
            alert('Произошла ошибка при обновлении маршрута.');
        }
    };

    useEffect(() => {
        if (numericId && isAuth && isSuperUser) {
            dispatch(getRouteDetails(numericId));
            dispatch(getRouteAttributes(numericId));
        } else {
            navigate(`/forbidden`)
        }
    }, [isAuth, numericId, dispatch, navigate, isSuperUser]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file); // Сохраняем файл изображения
        }
    };

    const handleSaveImage = async () => {
        if (image && numericId) {
            try {
                const dataPic = new FormData();
                dataPic.append("image", image);  // Добавляем изображение в FormData

                // Выполняем запрос для добавления изображения
                await dispatch(addPicInRoute({ routeId: numericId, dataPic })).unwrap();
                setImage(null); // Сбрасываем изображение после успешного сохранения
            } catch (error) {
                console.error("Ошибка при добавлении изображения:", error);
                alert("Произошла ошибка при добавлении изображения.");
            }
        } else {
            alert('Пожалуйста, загрузите изображение.');
        }
    };

    const handleAddAttribute = async () => {
        if (newAttrName.trim() && newAttrValue.trim() && numericId) {
            await dispatch(addRouteAttribute({ routeId: numericId, attributeName: newAttrName, attributeValue: newAttrValue }));
            await dispatch(getRouteAttributes(numericId))
            setNewAttrName("");
            setNewAttrValue("");
        }
    };

    const handleDeleteAttribute = async (attributeName: string) => {
        if (numericId) {
            await dispatch(deleteRouteAttribute({ routeId: numericId, attributeName }));
            await dispatch(getRouteAttributes(numericId))
        }
    };

    const handleUpdateAttribute = async (attributeName: string, newValue: string) => {
        if (numericId) {
            await dispatch(updateRouteAttribute({ routeId: numericId, attributeName, newValue }));
            await dispatch(getRouteAttributes)
        }
    };

    if (!route) {
        return <div>Маршрут не найден или загружается...</div>;
    }

    return (
        <Container className="mt-5 mb-3">
            <div className="mt-3 mb-3">
                <Breadcrumbs/>
            </div>
            <Row>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="origin">
                            <Form.Label>Откуда</Form.Label>
                            <Form.Control
                                type="text"
                                name="origin"
                                className={'form-auth'}
                                placeholder="Введите место отправления"
                                defaultValue={route.origin}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="destination">
                            <Form.Label>Куда</Form.Label>
                            <Form.Control
                                type="text"
                                name="destination"
                                className={'form-auth'}
                                placeholder="Введите место назначения"
                                defaultValue={route.destination}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                className={'form-auth'}
                                placeholder="Введите описание"
                                defaultValue={route.description}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                className={'form-auth'}
                                placeholder="Введите стоимость"
                                defaultValue={route.price}
                            />
                        </Form.Group>

                        <Form.Check
                            type="checkbox"
                            label="Активен"
                            defaultChecked={route.is_active}
                            name="is_active"
                            className="me-3"
                        />

                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Загрузить изображение</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                className={'form-auth'}
                                onChange={handleImageUpload}
                            />
                            <Button
                                className="mt-2 custom-button-save"
                                variant="danger"
                                onClick={handleSaveImage}
                            >
                                Сохранить изображение
                            </Button>
                        </Form.Group>

                        <Button
                            variant="danger"
                            className="mt-4 custom-button-save"
                            type='submit'
                        >
                            Сохранить маршрут
                        </Button>
                    </Form>
                </Col>

                <Col md={6} className="d-flex align-items-center justify-content-center">
                    {route.thumbnail ? (
                        <Image
                            src={route.thumbnail}
                            alt="Предпросмотр"
                            className="img-fluid rounded shadow"
                            style={{maxHeight: "300px"}}
                        />
                    ) : (
                        <div className="text-muted">Предпросмотр изображения</div>
                    )}
                </Col>
            </Row>
            {/* 🔽 Таблица атрибутов */}
            <h3 className="mt-5">Атрибуты маршрута</h3>
            <Table bordered hover className="mt-3">
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Значение</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(routeAttributes).map(([key, attr]) => (
                    <tr key={key}>
                        <td>{attr.name}</td>
                        <td>
                            <Form.Control
                                type="text"
                                className="form-auth"
                                value={attr.value}
                                onBlur={(e) => handleUpdateAttribute(attr.name, e.target.value)}
                            />
                        </td>
                        <td className={'gap-2 d-flex'}>
                            <Button variant="danger" className={'custom-button'} onClick={() => handleDeleteAttribute(attr.name)}>
                                Удалить
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {/* 🔽 Добавление нового атрибута */}
            <h4 className="mt-4">Добавить атрибут</h4>
            <Row className="mt-2">
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Название"
                        className={'form-auth'}
                        value={newAttrName}
                        onChange={(e) => setNewAttrName(e.target.value)}
                    />
                </Col>
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Значение"
                        className={'form-auth'}
                        value={newAttrValue}
                        onChange={(e) => setNewAttrValue(e.target.value)}
                    />
                </Col>
                <Col md={4}>
                    <Button onClick={handleAddAttribute} variant="success" className={'custom-button-save'}>
                        Добавить
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default EditRoutePage;
