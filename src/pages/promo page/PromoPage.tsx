import './promoPage.css';
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import trainIcon from '../../assets/metro-front-svgrepo-com.svg'
import landmarkIcon from '../../assets/landmark-svgrepo-com.svg'
import moonIcon from '../../assets/moon-svgrepo-com.svg'
function PromoPage() {
    // Данные для контейнеров
    const routeData = [
        {
            title: "Быстрые маршруты",
            description: "Планируйте поездки без лишних пересадок и задержек. Наш сервис подберет оптимальный путь.",
            src: trainIcon
        },
        {
            title: "Достояние",
            description: "Исследуйте город с комфортом, посещая ключевые достопримечательности по пути.",
            src: landmarkIcon
        },
        {
            title: "Ночные рейсы",
            description: "Будьте в курсе ночных маршрутов метро для удобных поездок в любое время.",
            src: moonIcon
        },
    ];

    return (
        <>
            <Container className="promo-page d-flex flex-column justify-content-center align-items-center">
                {/* Заголовок и текст */}
                <motion.div
                    className="promo-header text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="fw-bold display-4">Добро пожаловать в ваш навигатор метро</h1>
                    <p className="lead mt-3">
                        Выберите оптимальный маршрут, чтобы добраться до нужной станции с комфортом и без лишних пересадок.
                    </p>
                </motion.div>

                {/* Контейнеры маршрутов */}
                <Row className="mt-5 w-100 g-4">
                    {routeData.map((route, index) => (
                        <Col key={index} xs={12} md={4}>
                            <motion.div
                                className="route-card p-4 rounded shadow-sm text-center"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: (index + 1) * 0.3, duration: 0.8 }}
                            >
                                <img src={route.src} alt="Route Icon" className="mb-3" width={60} />
                                <h5 className="fw-bold">{route.title}</h5>
                                <h6>{route.description}</h6>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default PromoPage;
