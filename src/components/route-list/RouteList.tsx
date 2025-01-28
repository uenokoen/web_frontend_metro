import { Col, Container, Row } from "react-bootstrap";
import RouteCard from "../route-card/RouteCard.tsx";
import { useEffect, useState } from "react";
import Search from "../search/Search";
import { api } from '../../modules/MetroApi.ts';
import Breadcrumbs from "../bread crumbs/BreadCrumbs.tsx";
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
    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const data = await api.getRoutes(searchQuery);
                setRoutes(data.routes || []);
            } catch (err: never) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, [searchQuery]);

    return (
        <Container className="mb-5">
            <Search onSearch={setSearchQuery} />
            <div className="mt-3 mb-3">
                <Breadcrumbs />
            </div>
            <Row className="g-4 justify-content-center">
                {loading ? (
                    <p>Загрузка...</p>
                ) : error ? (
                    <p>Ошибка: {error}</p>
                ) : routes.length > 0 ? (
                    routes.map((route) => (
                        <Col
                            key={route.id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            xl={4}
                            className="d-flex justify-content-center align-items-stretch"
                        >
                            <RouteCard route={route} />
                        </Col>
                    ))
                ) : (
                    <p>Маршруты не найдены</p>
                    )}
            </Row>
        </Container>
    );
}

export default RouteList;