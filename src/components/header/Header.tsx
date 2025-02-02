import './header.css';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {useEffect, useState} from 'react';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'; // Блокировка прокрутки
        } else {
            document.body.style.overflow = 'auto'; // Включение прокрутки
        }
        return () => {
            document.body.style.overflow = 'auto'; // Очистка при размонтировании
        };
    }, [isMenuOpen]);

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{amount: 0.2, once: true}}
        >
            <Navbar expand="lg" className="sticky-header" collapseOnSelect>
                <Container fluid className="d-flex justify-content-between px-3 px-md-5 gap-5">
                    <Navbar.Brand as={Link} to={'/'}>
                        <motion.div custom={1} variants={logoAnimation} className="logo-container">
                            <svg className="logo-image" viewBox="0 0 24 24" role="img"
                                 xmlns="http://www.w3.org/2000/svg">
                                <title>Moscow Metro icon</title>
                                <path
                                    d="M16.603 11.85l-2.481-6.26-2.092 3.66-2.092-3.66-2.481 6.262H6.74v.941h3.736v-.941h-.553l.538-1.555 1.569 2.57 1.569-2.57.538 1.555h-.553v.941h3.751v-.941zm5.335-1.912A9.933 9.933 0 0 0 12 0C6.516 0 2.062 4.453 2.062 9.938c0 2.75 1.121 5.23 2.914 7.023a.804.804 0 0 0 1.375-.568.825.825 0 0 0-.239-.582 8.303 8.303 0 0 1-2.42-5.873c0-4.588 3.72-8.324 8.308-8.324 4.588 0 8.324 3.736 8.324 8.324a8.289 8.289 0 0 1-2.436 5.888l-7.024 7.023L12 24l7.039-7.039a9.891 9.891 0 0 0 2.899-7.023Z"
                                    fill="currentColor"
                                />
                            </svg>
                            <motion.div className={"logo-text"}>
                                <motion.text>Метро</motion.text>
                            </motion.div>
                        </motion.div>
                    </Navbar.Brand>

                    {/* Для экранов больше 1024px отображаем только ссылки меню */}
                    <div className="d-none d-lg-flex align-items-center">
                        <Nav className="flex-row gap-3">
                            <Nav.Link as={Link} to="/routes">
                                Маршруты
                            </Nav.Link>
                        </Nav>
                    </div>

                    {/* Мобильный бургер-меню */}
                    <motion.button
                        className="menu-toggle d-lg-none"
                        onClick={toggleMenu}
                        initial={false}
                        whileTap={{scale: 0.9}} // Эффект нажатия
                        transition={{duration: 0.3, ease: "easeInOut"}}
                    >
                        {isMenuOpen ? (
                            <motion.span
                                key="close"
                                initial={{opacity: 0, scale: 0.8, rotate: 0}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.8}}
                                className="menu-icon"
                            >
                                ✖
                            </motion.span>
                        ) : (
                            <motion.span
                                key="burger"
                                initial={{opacity: 0, scale: 0.8, rotate: 0}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.8}}
                                className="menu-icon"
                            >
                                ☰
                            </motion.span>
                        )}
                    </motion.button>

                </Container>
            </Navbar>

            {/* Мобильное меню */}
            {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
            <motion.div
                className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
                initial={{opacity: 0}}
                animate={{opacity: isMenuOpen ? 1 : 0}}
                transition={{duration: 0.2, ease: "easeInOut"}}
            >
                <motion.div className="menu-content">
                    <Nav className="flex-column gap-3 align-items-start">
                        <Nav.Link as={Link} to="/routes" onClick={toggleMenu}>
                            Маршруты
                        </Nav.Link>
                    </Nav>
                </motion.div>
            </motion.div>
        </motion.div>

    );
}

export default Header;

export const logoAnimation = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {duration: 0.8, ease: "easeInOut"}},
};
