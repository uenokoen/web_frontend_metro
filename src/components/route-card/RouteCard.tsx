import './route-card.css'
import {Button, Card} from "react-bootstrap";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {AppDispatch, RootState} from "../../../store.ts";
import {useDispatch, useSelector} from "react-redux";
import {addRouteToTrip} from "../../../tripDraftSlice.ts";
import {getRoutesList} from "../../../routeSlice.ts";

interface Route {
    id: number;
    origin: string;
    destination: string;
    description: string;
    is_active: boolean;
    thumbnail?: string;
    price: number;
}
function RouteCard({route}: { route: Route }) {

    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.users.isAuthenticated);

    const handleAdd = async () => {
        if (route.id) {
            await dispatch(addRouteToTrip(route.id));
            await dispatch(getRoutesList()); // Для обновления отображения состояния иконки "корзины"
        }
    }

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
                        style={{color: "#000000", fontSize: "16px", fontWeight: "bold"}}
                        className="mb-4"
                    >
                        Маршрут: {route.origin} - {route.destination}
                    </Card.Title>
                    <div className="d-flex justify-content-between flex-row align-items-center">
                        <h6>Стоимоcть: {route.price} ₽</h6>
                    </div>
                    <div className={'d-flex justify-content-start gap-2'}>
                        <Button variant={'danger'} className={'custom-button'} as={Link as any}
                                to={`/routes/${route.id}`}>
                            Подробнее
                        </Button>
                        {(isAuthenticated == true ) && (
                            <Button variant={'danger'} className={'custom-button-save'} onClick={() => handleAdd()}>
                                Добавить
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </motion.div>
    );
}

export default RouteCard;