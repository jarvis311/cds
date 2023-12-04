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

import Categories from './pages/Categories/Categories';
import CategoriesAdd from './pages/Categories/CategoriesAdd';
import CategoriesEdit from './pages/Categories/CategoriesEdit';
import CategoriesView from './pages/Categories/CategoriesView';

import Reels from './pages/Reels/Reels';
import ReelsAdd from './pages/Reels/ReelsAdd';
import ReelsEdit from './pages/Reels/ReelsEdit';
import ReelsView from './pages/Reels/ReelsView';

import CelebrityVoice from './pages/CelebrityVoice/CelebrityVoice';
import CelebrityVoiceAdd from './pages/CelebrityVoice/CelebrityVoiceAdd';
import CelebrityVoiceView from './pages/CelebrityVoice/CelebrityVoiceView';

import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import Error from './pages/Error/Error';

function App() {
    axios.defaults.baseURL = process.env.REACT_APP_API_LINK
    const ProtectedRoute = ({ redirectPath = "/" }) => {
        if (!Cookies.get('jwt-VoiceChanger')) {
            return <Navigate to={redirectPath} replace />
        }
        else {
            axios.defaults.headers.Authorization = `Bearer ${Cookies.get('jwt-VoiceChanger')}`
            return <Outlet />;
        }
    }

    const PrivateRoute = ({ redirectPath = "/Home" }) => {
        if (!Cookies.get('jwt-VoiceChanger')) {
            return <Outlet />

        }
        else {
            axios.defaults.headers.Authorization = `Bearer ${Cookies.get('jwt-VoiceChanger')}`
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

                        <Route path="/Categories" element={<Categories />} />
                        <Route path="/Categories/Add" element={<CategoriesAdd />} />
                        <Route path="/Categories/Edit/:id" element={<CategoriesEdit />} />
                        <Route path="/Categories/View/:id" element={<CategoriesView />} />

                        <Route path="/Reels" element={<Reels />} />
                        <Route path="/Reels/Add" element={<ReelsAdd />} />
                        <Route path="/Reels/Edit/:id" element={<ReelsEdit />} />
                        <Route path="/Reels/View/:id" element={<ReelsView />} />

                        <Route path="/Celebrity-Voice" element={<CelebrityVoice />} />
                        <Route path="/Celebrity-Voice/Add" element={<CelebrityVoiceAdd />} />
                        <Route path="/Celebrity-Voice/Edit" element={<CelebrityVoiceAdd />} />
                        <Route path="/Celebrity-Voice/View" element={<CelebrityVoiceView />} />
                    </Route>

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