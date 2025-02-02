import './about-route-page.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../api/';
import { Container, Spinner } from "react-bootstrap";
import Breadcrumbs from "../../components/bread crumbs/BreadCrumbs.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {getRouteDetails} from "../../../routeSlice.ts";

function AboutRoutePage() {
    const { id } = useParams<number>();
    const dispatch = useDispatch();
    const { selectedRoute, loading, error } = useSelector((state: RootState) => state.routes);

    useEffect(() => {
        dispatch(getRouteDetails(id));
    }, [dispatch, id]);

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
                </div>
            </div>

            <div className="justify-content-start">
                <h3 className="fw-bold text-center mb-3">Подробнее о маршруте</h3>
                <h5 className="mx-auto text-start recipe-card about-text">
                    {selectedRoute.description}
                </h5>
            </div>
        </Container>
    );
}

export default AboutRoutePage;