import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import 'rsuite/dist/rsuite.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap.css';
import 'boxicons/css/boxicons.css';
import 'swiper/css';
import 'swiper/css/pagination';
import './App.css';
import './utilities.css';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/Login';

import Stamps from './pages/Stamps/Stamps';
import StampsAdd from './pages/Stamps/StampsAdd';
import StampsEdit from './pages/Stamps/StampsEdit';
import StampsView from './pages/Stamps/StampsView';

import Category from './pages/Category/Category';
import CategoryAdd from './pages/Category/CategoryAdd';
import CategoryView from './pages/Category/CategoryView';

import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import Error from './pages/Error/Error';
import NewWebView from './pages/NewWebview'

function App() {
    axios.defaults.baseURL = process.env.REACT_APP_API_LINK
    const ProtectedRoute = ({ redirectPath = "/" }) => {
        if (!Cookies.get('jwt-VoiceGPS')) {
            return <Navigate to={redirectPath} replace />
        }
        else {
            axios.defaults.headers.Authorization = `Bearer ${Cookies.get('jwt-VoiceGPS')}`
            return <Outlet />;
        }
    }

    const PrivateRoute = ({ redirectPath = "/Home" }) => {
        if (!Cookies.get('jwt-VoiceGPS')) {
            return <Outlet />

        }
        else {
            axios.defaults.headers.Authorization = `Bearer ${Cookies.get('jwt-VoiceGPS')}`
            return <Navigate to={redirectPath} replace />;
        }
    }

    return (
        <>
            <ToastContainer position='bottom-right' autoClose="500" closeOnClick="true" />
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute />}>

                        <Route path="/Home" element={<Home />} />

                        <Route path="/Stamps" element={<Stamps />} />
                        <Route path="/Stamps/Add" element={<StampsAdd />} />
                        <Route path="/Stamps/Edit/:id" element={<StampsEdit />} />
                        <Route path="/Stamps/View/:id" element={<StampsView />} />

                        <Route path='/Category' element={<Category />} />
                        <Route path='/Category/Add' element={<CategoryAdd />} />
                        <Route path='/Category/Edit/:id' element={<CategoryAdd />} />
                        <Route path='/Category/View/:id' element={<CategoryView />} />

                    </Route>
                    <Route path='/destination/:title' element={<NewWebView />} />

                    <Route path='*' element={<Error />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Login />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;