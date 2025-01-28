
import {createRoot} from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/common.css'
import App from "./App.tsx";

createRoot(document.getElementById('root')!).render(
    <>
        <App/>
    </>
    ,
)
