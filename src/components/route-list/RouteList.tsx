import { Col, Container, Row } from "react-bootstrap";
import RouteCard from "../route-card/RouteCard.tsx";
import { useEffect, useState } from "react";
import Search from "../search/Search.tsx";
import { api } from '../../modules/MetroApi.ts';
import Breadcrumbs from "../bread crumbs/BreadCrumbs.tsx";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchRouteTerm } from '../../../searchSlice.ts';
import emptySearch from '../../assets/emptySearch.jpg'
import Skeleton from 'react-loading-skeleton'; // Импортируем компонент Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Импорт стилей для Skeleton

interface Route {
    id: number;
    origin: string;
    destination: string;
    description: string;
    is_active: boolean;
    thumbnail?: string;
    price: number;
}

function RouteList() {
    const [routes, setRoutes] = useState<Route[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const searchQuery = useSelector((state: any) => state.search.searchRouteTerm);
    const dispatch = useDispatch(); // Инициализация dispatch

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const data = await api.getRoutes(searchQuery);
                console.log(data);
                setRoutes(data.routes);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, [searchQuery]);

    const handleSearch = (query: string) => {
        dispatch(setSearchRouteTerm(query));
    };

    return (
        <Container className="mb-5">
            <Search onSearch={handleSearch} />
            <div className="mt-3 mb-3">
                <Breadcrumbs />
            </div>
            <Row className="g-4 justify-content-center">
                {loading ? (
                    // Заменяем "Загрузка..." на скелетоны
                    Array.from({ length: 6 }).map((_, index) => (
                        <Col
                            key={index}
                            xs={12}
                            sm={8}
                            md={6}
                            lg={4}
                            xl={4}
                            className="d-flex justify-content-center align-items-stretch"
                        >
                            <Skeleton height={200} width="100%" />
                        </Col>
                    ))
                ) : error ? (
                    <p>Ошибка: {error}</p>
                ) : routes.length > 0 ? (
                    routes.map((route) => (
                        <Col
                            key={route.id}
                            xs={12}
                            sm={8}
                            md={6}
                            lg={4}
                            xl={4}
                            className="d-flex justify-content-center align-items-stretch"
                        >
                            <RouteCard route={route} />
                        </Col>
                    ))
                ) : (
                    <div className={'d-flex flex-column align-items-center text-center'}>
                        <img src={emptySearch} alt={'Empty search'} className={'w-50 '}/>
                        <p>Увы...Такой маршрут не найден</p>
                    </div>
                )}
            </Row>
        </Container>
    );
}

export default RouteList;
