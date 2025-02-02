import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Header from "./components/header/Header.tsx";
import PromoPage from "./pages/promo page/PromoPage.tsx";
import RoutePage from "./pages/route-page/RoutePage.tsx";
import AboutRoutePage from "./pages/about-route-page/AboutRoutePage.tsx";
import Footer from "./components/footer/Footer.tsx";
import AuthPage from "./pages/auth-page/AuthPage.tsx";
import TripPage from "./pages/trip-page/TripPage.tsx";
import UserPage from "./pages/user-page/UserPage.tsx";
import TripListPage from "./pages/trip-list-page/TripListPage.tsx";
import RegistrationPage from "./pages/registration-page/RegistrationPage.tsx";
import UpdateRoutePage from "./pages/update-route-page/UpdateRoutePage.tsx";
import EditRoutePage from "./pages/edit-route-page/EditRoutePage.tsx";
import CreateRoutePage from "./pages/create-route-page/CreateRoutePage.tsx";
import ErrorPage404 from "./pages/error-page-404/ErrorPage404.tsx";
import ErrorPage403 from "./pages/error-page-403/ErrorPage403.tsx";

function App() {
    const location = useLocation();

    // Список маршрутов, где не нужно показывать Header и Footer
    const noHeaderFooterRoutes = ["/not-found", "/forbidden"];

    const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

    return (
        <div className="d-flex flex-column min-vh-100">
            {showHeaderFooter && <Header />}

            <Routes>
                <Route path="/" element={<PromoPage />} />
                <Route path="/routes" element={<RoutePage />} />
                <Route path="/routes/:id" element={<AboutRoutePage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/trips/:id" element={<TripPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/trips" element={<TripListPage />} />
                <Route path="/reg" element={<RegistrationPage />} />
                <Route path="/updateroute" element={<UpdateRoutePage />} />
                <Route path="/editroute/:id" element={<EditRoutePage />} />
                <Route path="/createroute" element={<CreateRoutePage />} />
                <Route path="/not-found" element={<ErrorPage404 />} />
                <Route path="/forbidden" element={<ErrorPage403 />} />
            </Routes>

            {showHeaderFooter && <Footer />}
        </div>
    );
}

function AppWithRouter() {
    return (
        <BrowserRouter basename="/web_frontend_metro">
            <App />
        </BrowserRouter>
    );
}

export default AppWithRouter;
