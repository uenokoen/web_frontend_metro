import { Col, Container, Row } from "react-bootstrap";
import RouteCard from "../route-card/RouteCard.tsx";
import React, { useEffect, useState } from "react";
import Search from "../search/Search";
import Breadcrumbs from "../bread crumbs/BreadCrumbs.tsx";
import { useDispatch, useSelector } from 'react-redux';
import {getRoutesList, setSearchRouteTerm} from '../../../routeSlice.ts';
import emptySearch from '../../assets/emptySearch.jpg'
import Skeleton from 'react-loading-skeleton'; // Импортируем компонент Skeleton
import 'react-loading-skeleton/dist/skeleton.css';
import {AppDispatch, RootState} from "../../../store.ts";
import {deleteTrip, setError} from "../../../tripDraftSlice.ts"; // Импорт стилей для Skeleton

export interface Route {
    id: number;
    origin: string;
    destination: string;
    description: string;
    is_active: boolean;
    thumbnail?: string;
    price: number;
}

function RouteList() {
    const dispatch = useDispatch<AppDispatch>();
    const { searchRouteTerm, routes, loading, error } = useSelector((state: RootState) => state.routes);

    useEffect(() => {
        dispatch(getRoutesList());
    }, [dispatch]);

    return (
        <Container className="mb-5">
            <Search value={searchRouteTerm} />
            <div className="mt-3 mb-3">
                <Breadcrumbs />
            </div>
            <Row className="g-4 justify-content-center">
                {loading ? (
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
