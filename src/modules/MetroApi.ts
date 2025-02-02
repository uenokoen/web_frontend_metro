import { mockRoutes } from '../mock-services/mockData';
import {dest_api} from "../../target_config.ts";

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

    async getRoutes(searchQuery: string = ""): Promise<{ routes: Route[] }> {
        const params: GetRouteParams = {};
        if (searchQuery) {
            params.origin = searchQuery;
        }

        // Преобразуем все параметры в строковые значения
        const queryString = new URLSearchParams(params as Record<string, string>).toString();

        const url = `${dest_api}/routes/?${queryString}`;
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
            const { routes }: { routes: Route[] } = await response.json();
            return { routes };
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Ошибка получения маршрутов с сервера:", error.message);
            } else {
                console.error("Неизвестная ошибка:", error);
            }
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
        const url = `${dest_api}/routes/${id}/`;
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
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Ошибка получения маршрута с сервера:", error.message);
            } else {
                console.error("Неизвестная ошибка:", error);
            }
            console.warn("Возвращаем данные из mock-объектов для ингредиента");
            const route = mockRoutes.find((item) => item.id === parseInt(id));
            return route || null;
        }
    },
};