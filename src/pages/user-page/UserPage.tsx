import React from "react";
import { Button, Form, Container, Card } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../../../store.ts";
import {updateUserAsync} from "../../../userSlice.ts";
import Breadcrumbs from "../../components/bread crumbs/BreadCrumbs.tsx";


const UserProfile = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Достаем данные из состояния Redux
    const { username, email, first_name, last_name, error } = useSelector(
        (state: RootState) => state.users
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Формируем данные для обновления
        const formData = new FormData(e.currentTarget);
        const updatedData = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            first_name: formData.get("first_name") as string,
            last_name: formData.get("last_name") as string,
            new_password: formData.get("newPassword") as string || undefined,
            confirm_password: formData.get("confirmPassword") as string || undefined,
        };

        // Проверяем совпадение пароля
        if (
            updatedData.new_password &&
            updatedData.new_password !== updatedData.confirm_password
        ) {
            alert("Новый пароль и подтверждение пароля не совпадают!");
            return;
        }

        // Делаем запрос на обновление через Redux
        dispatch(updateUserAsync(updatedData));
    };

    return (
        <Container className="mt-5">
            <div className="mt-3 mb-3">
                <Breadcrumbs/>
            </div>
            <Card className="shadow-sm">
                <Card.Body>
                    <h4 className="mb-4">Редактировать профиль</h4>
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleSubmit}>
                        {/* Поле для имени пользователя */}
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Логин пользователя</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                defaultValue={username}
                                placeholder="Введите логин пользователя"
                            />
                        </Form.Group>

                        {/* Поле для email */}
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                defaultValue={email}
                                placeholder="Введите email"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="last_name">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                defaultValue={last_name}
                                placeholder="Введите фамилию пользователя"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="first_name">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                defaultValue={first_name}
                                placeholder="Введите имя пользователя"
                            />
                        </Form.Group>

                        <h5 className="mt-4">Смена пароля</h5>

                        {/* Поле для текущего пароля */}
                        <Form.Group className="mb-3" controlId="currentPassword">
                            <Form.Label>Текущий пароль</Form.Label>
                            <Form.Control
                                type="password"
                                name="currentPassword"
                                placeholder="Введите текущий пароль"
                            />
                        </Form.Group>

                        {/* Поле для нового пароля */}
                        <Form.Group className="mb-3" controlId="newPassword">
                            <Form.Label>Новый пароль</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                placeholder="Введите новый пароль"
                            />
                        </Form.Group>

                        {/* Поле для подтверждения пароля */}
                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Подтвердите новый пароль</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Подтвердите новый пароль"
                            />
                        </Form.Group>

                        {/* Кнопка сохранения */}
                        <Button variant="danger" type="submit" className="custom-button-save">
                            Сохранить изменения
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserProfile;
