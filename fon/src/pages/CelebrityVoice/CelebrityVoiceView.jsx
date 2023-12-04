import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Fancybox from '../../Component/FancyBox';
import { SelectPicker } from "rsuite";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { CelbrityVoiceview } from '../../Auth/Api';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
    item => ({ label: item, value: item })
);

const CelebrityVoiceView = () => {
    const Redirect = useNavigate()
    const [Data, SetData] = useState([])
    const [loading, Setloading] = useState(true)
    const [ViewSearchData, SetViewSearchData] = useState([])
    const params = useParams()
    const [mainId, setmainId] = useState(params.id)

    const GetViewData = async (ids) => {
        console.log('mainId >>>>>>>>>>>', mainId)
        const Result = await CelbrityVoiceview(mainId)
        if (Result.data.Status === true) {
            SetData(Result.data.Data)
            Setloading(false)
        }
        else {
            SetData([])
            Setloading(false)
        }
    }
    console.log('Data ---->>>>', Data)

    useEffect(() => {
        GetViewData("")
        // GetAllData()
    }, [])
    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3><Link to="/Celebrity-Voice" className='btn btn-primary btn-icon-lg me-3'><i className='bx bxs-left-arrow-alt'></i></Link>Celebrity Voice View</h3>
                <div className="page-heading-right">
                    <SelectPicker data={data} cleanable={false} className="wv-200 my-1 ms-3" placeholder="Select Title" placement="bottomEnd" />
                    <Link to={`/Celebrity-Voice/Edit`}>
                        <Button variant="primary ms-3 my-1" value="edit">Edit</Button>
                    </Link>
                    <Button variant="danger ms-3 my-1 btn-icon-lg" type="button"><i className="bx bx-trash-alt"></i></Button>
                </div>
            </div>
            <div className='page-content'>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Celebrity Name</p>
                                    <span>Tony</span>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Thumb Image</p>
                                    <span>
                                        <Fancybox>
                                            <a href="../avatar/1.jpg" data-fancybox="gallery">
                                                <img src="../avatar/1.jpg" alt="" className="hv-40 rounded-3" />
                                            </a>
                                        </Fancybox>
                                    </span>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Premium Status</p>
                                    <span>Yes</span>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Reward Status</p>
                                    <span>No</span>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Status</p>
                                    <span>On</span>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default CelebrityVoiceView