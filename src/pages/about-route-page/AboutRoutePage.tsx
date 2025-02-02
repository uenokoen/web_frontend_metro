import './about-route-page.css';
import {useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../api/';
import { Container, Spinner } from "react-bootstrap";
import Breadcrumbs from "../../components/bread crumbs/BreadCrumbs.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {getRouteAttributes, getRouteDetails} from "../../../routeSlice.ts";

function AboutRoutePage() {
    const { id } = useParams<number>();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { selectedRoute, loading, error, routeAttributes } = useSelector((state: RootState) => state.routes);

    useEffect(() => {
        dispatch(getRouteDetails(id))
            .unwrap()
            .catch(() => {
                navigate('/not-found');
            });
        dispatch(getRouteAttributes(id))
            .unwrap()
            .catch(() => {
                navigate('/not-found');
            });
    }, [dispatch, id,navigate]);

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

    if (!selectedRoute) { // Поменяли на route
        return (
            <Container className="py-5 text-center">
                <p>Маршрут не найден</p>
            </Container>
        );
    }

    const imageUrl = selectedRoute.thumbnail;
    return (
        <Container className="py-5">
            <Breadcrumbs />
            <div className="row align-items-center mt-3 mb-5">
                <div className="col-md-6">
                    <img
                        src={imageUrl}
                        alt={selectedRoute.origin}
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-6 mt-3">
                    <h2 className="mb-3 fw-bold ">{selectedRoute.origin} - {selectedRoute.destination}</h2>
                    <div className="price-badge">
                        <h5 className="fw-medium text-white mb-0">Стоимость: {selectedRoute.price} ₽</h5>
                    </div>
                    <div className="mt-4">
                        <h3 className="mb-3">Детали маршрута</h3>
                        {Object.keys(routeAttributes).length > 0 ? (
                            <div className="route-attributes">
                                {Object.entries(routeAttributes).map(([key, attr]) => (
                                    <div key={key} className="route-attribute">
                                        <span className="attribute-name">{attr.name}</span>
                                        <span className="attribute-value">{attr.value || '—'}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Детали отсутствуют.</p>
                        )}
                    </div>

                </div>
            </div>

            <div className="justify-content-start">
                <h3 className="fw-bold text-center mb-3">Описание маршрута</h3>
                <h5 className="mx-auto text-start recipe-card about-text">
                    {selectedRoute.description}
                </h5>
            </div>
        </Container>
    );
}

export default AboutRoutePage;