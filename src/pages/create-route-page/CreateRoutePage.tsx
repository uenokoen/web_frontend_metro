
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store.ts";
import { useNavigate } from "react-router-dom";
import { createRoute } from "../../../routeSlice.ts";
import Breadcrumbs from "../../components/bread crumbs/BreadCrumbs.tsx"; // Используем createRoute

const CreateRoutePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newRouteData = {
            origin: formData.get("origin") as string,
            destination: formData.get("destination") as string,
            description: formData.get("description") as string,
            price: parseFloat(formData.get("price") as string) || 0,
        };

        try {
            // Выполняем запрос на создание маршрута через Redux
            await dispatch(createRoute({ data: newRouteData })).unwrap();
            navigate("/updateroute"); // Навигация на страницу маршрутов после успешного создания
        } catch (error) {
            console.error("Ошибка при создании маршрута:", error);
            alert("Произошла ошибка при создании маршрута.");
        }
    };

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
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="destination">
                            <Form.Label>Куда</Form.Label>
                            <Form.Control
                                type="text"
                                name="destination"
                                className={'form-auth'}
                                placeholder="Введите место назначения"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                className={'form-auth'}
                                placeholder="Введите описание"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                className={'form-auth'}
                                placeholder="Введите стоимость"
                            />
                        </Form.Group>
                        <Button
                            variant="danger"
                            className="mt-4 custom-button-save"
                            type="submit"
                        >
                            Создать
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateRoutePage;
