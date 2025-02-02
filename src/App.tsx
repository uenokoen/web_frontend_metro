import {Route, Routes, BrowserRouter} from "react-router-dom";
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


function App() {
    return(
        <BrowserRouter basename="/web_frontend_metro">
            <div className="d-flex flex-column min-vh-100">
                <Header/>

                <Routes>
                    <Route  path="/" element={<PromoPage />} />
                    <Route path="/routes" element={<RoutePage/>}/>
                    <Route path="/routes/:id" element={<AboutRoutePage/>}/>
                    <Route path="/login" element={<AuthPage/>}/>
                    <Route path='/trips/:id' element={<TripPage/>}/>
                    <Route path='/user' element={<UserPage/>}/>
                    <Route path='/trips' element={<TripListPage/>}/>
                    <Route path='/reg' element={<RegistrationPage/>}/>
                </Routes>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

export default App
