import React from 'react';
import { Card } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pagination } from "swiper";
import { useState } from 'react';
import { useEffect } from 'react';
import { NewsWebViews } from '../Auth/Api';

const NewWebView = () => {

    const Redirect = useNavigate()
    const [Data, SetData] = useState([])
    const [loading, Setloading] = useState(true)
    const { title } = useParams()

    const GetData = async () => {
        const Result = await NewsWebViews(title)
        if (Result.data.Status === true) {
            Setloading(false)
            SetData(Result.data.Data)
        }
        else {
            SetData([])
            Setloading(false)
        }
    }

    useEffect(() => {
        GetData()
    }, [])
    return (
        <>
            {
                loading === true ? <div className="loader" ></div> : <></>
            }
            {
                (loading === false && Data?.length !== 0) ?
                    <div className='destination'>
                        <div className="destination-media">
                            <Swiper
                                spaceBetween={50}
                                slidesPerView={1}
                                pagination={true}
                                loop={true}
                                modules={[Pagination]}
                            >
                                {
                                    Data?.news_image?.map((val, index) => {
                                        return (
                                            <SwiperSlide>
                                                <div className="destination-media-inner">
                                                    <Link className="destination-link" to="">
                                                        <img src={val.image} alt="Destination" />
                                                    </Link>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }

                            </Swiper>
                        </div>
                        <div className="destination-card">
                            <Card>
                                <Card.Body>

                                    <div className="destination-heading">
                                        <div className="destination-left-portion">
                                            <h5>{Data?.title}</h5>
                                            <div className="destination-location">
                                                <i className="bx bxs-map"></i>
                                                <span>{Data?.location_name}</span>
                                            </div>
                                        </div>
                                        <div className="destination-right-portion">

                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="destination-card">
                            <Card>
                                <Card.Body>
                                    <h5>About Destination</h5>
                                    <div dangerouslySetInnerHTML={{ __html: Data?.description }}></div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    :
                    <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                        <div className="text-center">
                            <img src="../../not-found/not-found.svg" className="hv-300" alt="" />
                            <h3 className="mt-5 fw-700">Page Not Found</h3>
                        </div>
                    </div>
            }

        </>
    )
}

export default NewWebView