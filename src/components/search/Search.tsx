import './search.css';
import { Button, Container, Form } from "react-bootstrap";
import SearchImg from '../../assets/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchRouteTerm } from '../../../searchSlice.ts';

interface SearchProps {
    onSearch: (query: string) => void;
}

function Search({ onSearch }: SearchProps) {
    const searchTerm = useSelector((state: any) => state.search.searchRouteTerm);
    const dispatch = useDispatch();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setSearchRouteTerm(value));
    };

    const handleSubmit = () => {
        onSearch(searchTerm);
    };

    return (
        <Container className="d-flex justify-content-start mt-3 mb-3 gap-2 w-100">
            <Form.Control
                type="text"
                placeholder="Поиск маршрута..."
                className="search"
                value={searchTerm}
                onChange={handleSearch}
            />
            <Button
                variant="danger"
                className="custom-button-shop"
                onClick={handleSubmit}
            >
                <img src={SearchImg} className="w-100" alt="SearchImg" />
            </Button>
        </Container>
    );
}

export default Search;
