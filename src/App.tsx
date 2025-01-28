import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Header from "./components/header/Header.tsx";
import PromoPage from "./pages/promo page/PromoPage.tsx";
import RoutePage from "./pages/route-page/RoutePage.tsx";
import AboutRoutePage from "./pages/about-route-page/AboutRoutePage.tsx";
import Footer from "./components/footer/Footer.tsx";


function App() {
    return(
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <Header/>

                <Routes>
                    <Route  path="/" element={<PromoPage />} />
                    <Route path="/routes" element={<RoutePage/>}/>
                    <Route path="/routes/:id" element={<AboutRoutePage/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    )
}

export default App
