import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from "react-bootstrap";
import Layout from '../../layout/Layout';
import { SelectPicker } from 'rsuite';
import { CategoryDelete, CategoryViewRecord, GetAllCategory } from '../../Auth/Api';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import $ from "jquery";


const CategoryView = () => {

    const params = useParams()

    const Redirect = useNavigate()
    const [Data, SetData] = useState([])
    const [loading, Setloading] = useState(true)
    const [categoryDropdownArray, setCategoryDropdownArray] = useState([])
    const { id } = useParams()
    const [categoryId, setCategoryId] = useState(id)
    let count = 10;
    let swalCountdownInterval;

    const GetViewData = async () => {
        const Result = await CategoryViewRecord(categoryId)
        if (Result.data.Status === true) {
            SetData(Result.data.Data)
            Setloading(false)
        }
        else {
            SetData([])
            Setloading(false)
        }
    }

    const categoryDropdown = async () => {
        const Result = await GetAllCategory()
        setCategoryDropdownArray(
            Result?.data?.Data.map((val, index) => {
                return { label: val.name, value: val._id };
            })
        );

        // setState_name_Data({ label: `${val.state_code + "-" + val.state_name}` ||, value: val.id })
    };
    const handleOnchageSelect = (e) => {
        setCategoryId(e)
        Redirect(`/Category/View/${e}`)
    }

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
                    const Result = await CategoryDelete(id);
                    if (Result.data.Status === true) {
                        toast.success("Category Delete Successfully...");
                        Redirect(`/Category`)
                    } else {
                        toast.error(Result.data.Response_Message);
                    }
                } else {
                    count = 10;
                    clearInterval(swalCountdownInterval);
                }
            });
    };
    useEffect(() => {
        GetViewData()
        categoryDropdown()
    }, [categoryId])


    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3><Link to="/Category" className='btn btn-primary btn-icon-lg me-3'><i className='bx bxs-left-arrow-alt'></i></Link>Category View</h3>
                <div className="page-heading-right">
                    <SelectPicker data={categoryDropdownArray} cleanable={false} defaultValue={categoryId} onChange={e => handleOnchageSelect(e)} value={Data._id} className="wv-200 my-1 ms-3" placeholder="Select Category" placement="bottomEnd" />
                    <Link to={`/Category/Edit/${params.id}`}>
                        <Button variant="primary ms-3 my-1" value="edit">Edit</Button>
                    </Link>
                    <Button variant="danger ms-3 my-1 btn-icon-lg" type="button"><i className="bx bx-trash-alt" onClick={() => DeleteStamp(params.id || Data.id)}></i></Button>
                </div>
            </div>
            <div className='page-content'>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Category Name</p>
                                    <span>{Data.name ? Data.name : "-"}</span>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Status</p>
                                    <span>{Data.status == 1 ? "On" : "Off"}</span>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default CategoryView