import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Fancybox from '../../Component/FancyBox';
import { useState } from 'react';
import { useEffect } from 'react';
import { ReelsDelete, ReelsViews } from '../../Auth/Api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ReelsView = () => {

    const Redirect = useNavigate()
    const [Data, SetData] = useState([])
    const [loading, Setloading] = useState(true)
    const { id } = useParams()

    const GetViewData = async () => {
        const Result = await ReelsViews(id)
        if (Result.data.Status === true) {
            SetData(Result.data.Data[0])
            Setloading(false)
        }
        else {
            SetData([])
            Setloading(false)
        }
    }

    const DeleteNews = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger me-2",
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel! ",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    Setloading(true)
                    const Result = await ReelsDelete(id)
                    if (Result.data.Status === true) {
                        Setloading(false)
                        toast.success("Reels Delete Successfully...")
                        Redirect("/Reels")
                    }
                    else {
                        toast.error(Result.data.Response_Message)
                    }
                }
            });
    }


    useEffect(() => {
        GetViewData()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3><Link to="/Reels" className='btn btn-primary btn-icon-lg me-3'><i className='bx bxs-left-arrow-alt'></i></Link>Reels View - <span>{`${Data?.categories_id?.name}`}</span></h3>
                <div className="page-heading-right">
                    <Link to={`/Reels/Edit/${id}`}>
                        <Button variant="primary ms-3 my-1" value="edit">Edit</Button>
                    </Link>
                    <Button variant="danger ms-3 my-1 btn-icon-lg" type="button" onClick={() => DeleteNews(id)}><i className="bx bx-trash-alt"></i></Button>
                </div>
            </div>
            <div className='page-content'>
                <Card>
                    <Card.Body>
                        {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                        <Row>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Categories</p><span>{Data?.categories_id?.name}</span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Sound Name</p><span>{Data?.sound_name}</span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Video</p><span>
                                        <Fancybox>
                                            <a href={Data?.video} data-fancybox="gallery">
                                                <Button variant="outline-info" size="sm" className="me-2 btn-icon"><i className='bx bx-video'></i></Button>
                                            </a>
                                        </Fancybox>
                                    </span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Status</p><span>{(Data?.status === 1) ? "On" : "Off"}</span>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default ReelsView