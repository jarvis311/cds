import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Fancybox from '../../Component/FancyBox';
import { CategoriesAll, CategoriesDelete, Categoriesview } from '../../Auth/Api';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { SelectPicker } from "rsuite";

const CategoriesView = () => {

    const Redirect = useNavigate()
    const [Data, SetData] = useState([])
    const [loading, Setloading] = useState(true)
    const [ViewSearchData, SetViewSearchData] = useState([])
    const { id } = useParams()
    const [Id, SetId] = useState(id)


    const GetAllData = async () => {
        const Result = await CategoriesAll()
        if (Result.data.Status === true) {
            var SetSearchData = []
            Result.data.Data.map((val) => {
                SetSearchData.push({
                    label: val.name,
                    value: val._id
                })
                SetViewSearchData(SetSearchData)
            })
        }
        else {
            SetSearchData = []
            SetViewSearchData(SetSearchData)
        }
    }

    const GetViewData = async (id) => {
        const Result = await Categoriesview((id === "") ? Id : id)
        if (Result.data.Status === true) {
            SetData(Result.data.Data)
            Setloading(false)
        }
        else {
            SetData([])
            Setloading(false)
        }
    }

    const DeleteStamp = async (id) => {
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
                    const Result = await CategoriesDelete(id)
                    if (Result.data.Status === true) {
                        Setloading(false)
                        toast.success("Categories Delete Successfully...")
                        Redirect("/Categories")
                    }
                    else {
                        toast.error(Result.data.Response_Message)
                    }
                }
            });
    }

    const InputData = (e) => {
        SetId(e)
        GetViewData(e)
    }

    useEffect(() => {
        GetViewData("")
        GetAllData()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3><Link to="/Categories" className='btn btn-primary btn-icon-lg me-3'><i className='bx bxs-left-arrow-alt'></i></Link>Categories View - <span>{`${Data?.name}`}</span></h3>
                <div className="page-heading-right">
                    <SelectPicker data={ViewSearchData} defaultValue={Id} cleanable={false} className="wv-200 my-1 ms-3" placeholder="Select Title" onChange={e => InputData(e)} placement="bottomEnd" />
                    <Link to={`/Categories/Edit/${Id}`}>
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
                                    <p className='mb-0 fw-bold'>Id</p>
                                    <span>{Data.id}</span>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Name</p>
                                    <span>{Data.name}</span>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Image</p>
                                    <span>
                                        <Fancybox>
                                            <a href={Data.image} data-fancybox="gallery">
                                                <img src={Data.image} alt="" className="hv-40 rounded-3" />
                                            </a>
                                        </Fancybox>
                                    </span>
                                </div>
                            </Col>

                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Status</p>
                                    <span>{(Data.status === 1) ? 'On' : 'Off'}</span>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default CategoriesView