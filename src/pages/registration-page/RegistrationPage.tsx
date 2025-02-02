import { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../store.ts';
import {regUserAsync} from '../../../userSlice.ts';
import './reg-page.css'
const RegistrationPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ username: '', password: '', email: '' , last_name: '',first_name:'' });
    const error = useSelector((state: RootState) => state.users.error);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.username && formData.password) {
            await dispatch(regUserAsync(formData));
            navigate('/login');
        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="shadow-lg p-4">
                        <Card.Body>
                            <h4 className="text-center mb-4">Присоединяйтесь к нам!</h4>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="username" className="mb-3">
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Введите логин"
                                        required
                                        className={'form-auth'}
                                    />
                                </Form.Group>
                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Введите email"
                                        required
                                        className={'form-auth'}
                                    />
                                </Form.Group>
                                <Form.Group controlId="fisrt_name" className="mb-3">
                                    <Form.Label>Имя пользователя</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        placeholder="Введите имя пользователя"
                                        required
                                        className={'form-auth'}
                                    />
                                </Form.Group>
                                <Form.Group controlId="last_name" className="mb-3">
                                    <Form.Label>Имя пользователя</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        placeholder="Введите фамилию пользователя"
                                        required
                                        className={'form-auth'}
                                    />
                                </Form.Group>
                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Введите пароль"
                                        required
                                        className={'form-auth'}
                                    />
                                </Form.Group>
                                <Button variant="danger" type="submit" className="w-100 custom-button">
                                    Войти
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistrationPage;
