import './route-card.css'
import {Button, Card} from "react-bootstrap";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";

function RouteCard({route}) {
    return (
        <motion.div
            className={"card-wrapper"}
        >
            <Card className="card text-decoration-none">
                <div className="justify-content-center text-center">
                    <Card.Img variant="top" src={route.thumbnail} className="card-image w-75" />
                </div>
                <Card.Body>
                    <Card.Title
                        style={{ color: "#000000", fontSize: "16px", fontWeight: "bold" }}
                        className="mb-4"
                    >
                        Маршрут: {route.origin} - {route.destination}
                    </Card.Title>
                    <div className="d-flex justify-content-between flex-row align-items-center">
                        <h6>Стоимоcть: {route.price} ₽</h6>
                        <Button variant={'danger'} className={'custom-button'} as={Link} to={`/routes/${route.id}`}>
                            Подробнее
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </motion.div>
    );
}

export default RouteCard;