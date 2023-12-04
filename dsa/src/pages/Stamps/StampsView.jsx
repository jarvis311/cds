import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Fancybox from '../../Component/FancyBox';
import { StampView, StampsDelete } from '../../Auth/Api';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import $ from "jquery";

const StampsView = () => {

    const Redirect = useNavigate()
    const [Data, SetData] = useState([])
    const [loading, Setloading] = useState(true)
    const { id } = useParams()

    const GetViewData = async () => {
        const Result = await StampView(id)
        if (Result.data.Status === true) {
            SetData(Result.data.Data)
            Setloading(false)
        }
        else {
            SetData([])
            Setloading(false)
        }
    }

    let count = 10;
    let swalCountdownInterval;

    const DeleteStamp = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-danger btn-lg counter",
                cancelButton: "btn btn-primary btn-lg me-3",
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: "Are you sure you want to delete?",
                text: "You won't be able to revert this!",
                imageUrl: "../../icon/alert.svg",
                imageWidth: 80,
                imageHeight: 80,
                confirmButtonText: "OK (10)",
                cancelButtonText: "Cancel",
                showCancelButton: true,
                reverseButtons: true,
                didOpen: () => {
                    $(".swal2-confirm").attr("disabled", true);
                    swalCountdownInterval = setInterval(function () {
                        count--;
                        if (count < 1) {
                            $(".counter").text(`OK`);
                            $(".swal2-confirm").attr("disabled", false);
                            clearInterval(swalCountdownInterval);
                        } else {
                            $(".counter").text(`OK (${count})`);
                        }
                    }, 1000);
                },
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const Result = await StampsDelete(id)
                    if (Result.data.Status === true) {
                        Setloading(false)
                        toast.success("Stamps Delete Successfully...")
                        Redirect("/Stamps")
                    }
                    else {
                        toast.error(Result.data.Response_Message)
                    }
                } else {
                    count = 10;
                    clearInterval(swalCountdownInterval);
                }
            });
    };
    useEffect(() => {
        GetViewData()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3><Link to="/Stamps" className='btn btn-primary btn-icon-lg me-3'><i className='bx bxs-left-arrow-alt'></i></Link>Stamps View</h3>
                <div className="page-heading-right">
                    <Link to={`/Stamps/Edit/${id}`}>
                        <Button variant="primary ms-3 my-1" value="edit">Edit</Button>
                    </Link>
                    <Button variant="danger ms-3 my-1 btn-icon-lg" type="button" onClick={() => DeleteStamp(id)} ><i className="bx bx-trash-alt"></i></Button>
                </div>
            </div>
            <div className='page-content'>
                <Card>
                    <Card.Body>
                        {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                        <Row>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Thumb Image</p>
                                    <span>
                                        <Fancybox>
                                            <a href={Data.thumb_image} data-fancybox="gallery">
                                                <img src={Data.thumb_image} alt="" className="hv-40 rounded-3" />
                                            </a>
                                        </Fancybox>
                                    </span>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Category Name</p>
                                    <span>{Data?.category_id?.name || "-"}</span>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Zip Name</p>
                                    <span>
                                        {(Data.zip_name !== "") ?
                                            <a href={Data.zip_name}>
                                                <Button variant="outline-info" size="sm" className="btn-icon"><i className='bx bx-download' ></i></Button>
                                            </a> : ""}
                                    </span>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Zip Name iOS</p>
                                    <span>
                                        {(Data.zip_name_ios !== "") ?
                                            <a href={Data.zip_name_ios}>
                                                <Button variant="outline-info" size="sm" className="btn-icon"><i className='bx bx-download' ></i></Button>
                                            </a> : ""}
                                    </span>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Is Premium</p>
                                    <span>{(Data.is_premium === 1) ? 'Yes' : 'No'}</span>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Is Premium iOS</p>
                                    <span>{(Data.is_premium_ios === 1) ? 'Yes' : 'No'}</span>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Status</p>
                                    <span>{(Data.status === 1) ? 'On' : 'Off'}</span>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Status iOS</p>
                                    <span>{(Data.status_ios === 1) ? 'On' : 'Off'}</span>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default StampsView