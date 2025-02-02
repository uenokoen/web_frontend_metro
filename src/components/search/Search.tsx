import './search.css';
import { Button, Container, Form } from "react-bootstrap";
import SearchImg from '../../assets/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import {getRoutesList, setSearchRouteTerm} from '../../../routeSlice.ts';
import {AppDispatch, RootState} from "../../../store.ts";
import {Link, useNavigate} from "react-router-dom";
import ShopImg from '../../assets/shopping-bag.svg'
import React from "react";
import {deleteTrip, getTrip, setError} from "../../../tripDraftSlice.ts";
interface Props {
    value: string
    loading?: boolean
}

function Search({ value, loading }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.users.isAuthenticated);
    const id = useSelector((state: RootState) => state.tripDraft.id);
    const count = useSelector((state: RootState) => state.tripDraft.route_count);
    const navigate = useNavigate()

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            dispatch(getTrip(id));
            navigate(`/trips/${id}`);
        }
    };
    return (
        <Container className="d-flex justify-content-between mt-3 mb-3w-100">
            <Container className={'d-flex justify-content-start gap-2'}>
            <Form.Control
                type="text"
                placeholder="Поиск маршрута..."
                className="search"
                value={value}
                onChange={(event => dispatch(setSearchRouteTerm(event.target.value)))}
            />
            <Button
                variant="danger"
                className="custom-button-shop"
                disabled={loading}
                onClick={() => dispatch(getRoutesList())}
            >
                <img src={SearchImg} className="w-100" alt="SearchImg"/>
            </Button>
            </Container>
            <div className="shop position-relative d-inline-block">
                {(isAuthenticated == true) && (
                    <Button variant="danger"
                            className="custom-button-shop"
                            onClick={handleClick}
                    >
                        <img src={ShopImg} className={'w-100'} alt={'ShopImg'}/>
                    </Button>
                )}

                {(!isAuthenticated || !id) ? null : (
                    <span className="position-absolute top-0 start-100 translate-middle badge">
                        {count}
                    </span>
                )}
            </div>
        </Container>
    );
}

export default Search;
