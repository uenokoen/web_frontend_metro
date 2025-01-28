import Route1 from '../assets/1.png'
import Route2 from '../assets/2.png'
import Route3 from '../assets/3.png'

export const mockRoutes = [
    {
        id: 1,
        origin: "Авиамоторная",
        destination: "Академическая",
        description: "Маршрут проходит через ключевые станции города, включая пересадочные узлы. Это удобный выбор для тех, кто ценит быстрое перемещение по юго-восточной части Москвы.",
        thumbnail: Route1,
        is_active: "active",
        price: 20,
    },
    {
        id: 2,
        origin: "Косино",
        destination: "Авиамоторная",
        description: "Этот маршрут соединяет спальные районы с крупными транспортными узлами. Подходит для ежедневных поездок в центр города или на работу.",
        thumbnail: Route2,
        is_active: "active",
        price: 70,
    },
    {
        id: 3,
        origin: "Китай-город",
        destination: "Выхино",
        description: "Маршрут пролегает через исторический центр Москвы, включая Китай-город, и завершает путь в жилом районе Выхино. Идеален для путешествий с культурными целями.",
        thumbnail: Route3,
        is_active: "active",
        price: 60,
    },

];
