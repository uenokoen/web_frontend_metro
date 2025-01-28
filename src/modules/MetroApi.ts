import { mockRoutes } from '../mock-services/mockData';

const API_PREFIX = '/api/';

interface GetRouteParams {
    origin?: string;
    destination?: string;
}

interface Route {
    id: number;
    origin: string;
    destination: string;
    description: string;
    is_active: boolean;
    thumbnail?: string;
    price: number;
}

export const api = {

    async getRoutes(searchQuery: string = "") {
        const params: GetRouteParams = {};
        if (searchQuery) {
            params.origin = searchQuery;
        }
        const queryString = new URLSearchParams(params).toString();
        const url = `${API_PREFIX}routes/?${queryString}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Route[] = await response.json();
            return data;
        } catch (error) {
            console.error("Ошибка получения маршрутов с сервера:", error.message);
            console.warn("Возвращаем данные из mock-объектов");
            const filteredMocks = searchQuery
                ? mockRoutes.filter((item) =>
                    item.origin.toLowerCase().includes(searchQuery.toLowerCase())
                )
                : mockRoutes;
            return { routes: filteredMocks };
        }
    },

    async getRoute(id: string) {
        const url = `${API_PREFIX}routes/${id}/`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Ошибка получения маршрута с сервера:", error.message);
            console.warn("Возвращаем данные из mock-объектов для ингредиента");
            const route = mockRoutes.find((item) => item.id === parseInt(id));
            return route || null;
        }
    },
};
