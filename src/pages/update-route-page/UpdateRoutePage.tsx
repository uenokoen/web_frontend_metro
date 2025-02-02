import React, { useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import Search from "../../components/search/Search.tsx";
import Breadcrumbs from "../../components/bread crumbs/BreadCrumbs.tsx";
import { useDispatch, useSelector } from "react-redux";
import {deleteRouteAsync, getRouteDetails, getRoutesList, setSearchRouteTerm} from "../../../routeSlice.ts";
import { AppDispatch, RootState } from "../../../store.ts";
import {useNavigate} from "react-router-dom";

function UpdateRoutePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { searchRouteTerm, routes, loading, error } = useSelector(
        (state: RootState) => state.routes
    );
    const isAuth = useSelector(
        (state: RootState) => state.users.isAuthenticated
    );
    const isSuperUser = useSelector(
        (state: RootState) => state.users.is_superuser
    );
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth && isSuperUser) {
            dispatch(getRoutesList());
        }else {
            navigate(`/forbidden`)
        }

    }, [dispatch, isAuth, isSuperUser, navigate]);

    const handleEdit = (id: number) => {
        navigate(`/editroute/${id}`)
    };

    const handleDelete = async (id: number) => {
        try {
            // Выполняем запрос на обновление через Redux и ждем его результат
            await dispatch(deleteRouteAsync({routeId: id})).unwrap();
            await dispatch(getRoutesList())
        } catch (error) {
            console.error('Ошибка при удалении маршрута:', error);
            alert('Произошла ошибка при удалении маршрута.');
        }
    };

    const handleCreate = () => {
        navigate(`/createroute`)
    };

    return (
        <Container className="mb-5">
            <Search value={searchRouteTerm} onChange={(e) => dispatch(setSearchRouteTerm(e.target.value))} />
            <div className="mt-3 mb-3">
                <Breadcrumbs />
            </div>

            {loading ? (
                <p>Загрузка маршрутов...</p>
            ) : error ? (
                <p>Ошибка: {error}</p>
            ) : routes.length > 0 ? (
                <Table striped bordered hover responsive className="mt-3">
                    <thead>
                    <tr className={'text-center'}>
                        <th>Изображение</th>
                        <th>Маршрут</th>
                        <th>Статус</th>
                        <th>Цена</th>
                        <th>
                            <Button variant="success" className={'custom-button-save'} onClick={handleCreate}>
                                Создать маршрут
                            </Button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {routes
                        .slice() // Создаём копию массива, чтобы не мутировать Redux state
                        .sort((a, b) => a.origin.localeCompare(b.origin)) // Сортировка по полю `origin`
                        .map((route) => (
                        <tr key={route.id}>
                            <td>
                                {route.thumbnail ? (
                                    <img
                                        src={route.thumbnail}
                                        alt="Route Thumbnail"
                                        style={{width: "100px", height: "auto", borderRadius: '12px'}}
                                    />
                                ) : (
                                    <span>Нет изображения</span>
                                )}
                            </td>
                            <td>{`${route.origin} → ${route.destination}`}</td>
                            <td>{route.is_active ? "Активен" : "Неактивен"}</td>
                            <td>{route.price}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="custom-button-save me-2"
                                    onClick={() => handleEdit(route.id)}
                                >
                                    Редактировать
                                </Button>
                                <Button
                                    variant="danger"
                                    className={'custom-button'}
                                    onClick={() => handleDelete(route.id)}
                                >
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <p>Увы...Маршруты не найдены</p>
            )}
        </Container>
    );
}

export default UpdateRoutePage;
