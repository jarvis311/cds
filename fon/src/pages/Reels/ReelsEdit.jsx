import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb, InputGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch';
import { useEffect } from "react";
import { CategoriesId, ReelsEdits, ReelsUpdate } from "../../Auth/Api";
import Fancybox from "../../Component/FancyBox";
import { toast } from "react-toastify";

const ReelsEdit = () => {

    const Redirect = useNavigate()
    const [loading, Setloading] = useState(false)
    const [validate, setValidate] = useState(false)
    const [GetCategoriesId, SetCategoriesId] = useState([])
    const { id } = useParams()
    const [Data, SetData] = useState({
        categories_id: 0,
        sound_name: "",
        status: 0,
        video: ""
    })

    const GetEditData = async () => {
        const Result = await ReelsEdits(id)
        if (Result.data.Status === true) {
            SetData(Result?.data?.Data)
            Setloading(false)
        }
        else {
            SetData([])
            Setloading(false)
        }
    }

    const GetCategories = async () => {
        const Result = await CategoriesId()
        if (Result.data.Status === true) {
            SetCategoriesId(Result.data.Data)
        } else {
            SetCategoriesId([])
        }
    }


    const InputData = async (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }

    const InputFile = async (e) => {
        SetData({ ...Data, [e.target.name]: e.target.files[0] })
    }

    const Save = async () => {
        if (Data.categories_id === 0 || Data.categories_id === "" || Data.sound_name === "") {
            setValidate(true)

        } else {
            setValidate(false)
            Setloading(true)
            const Result = await ReelsUpdate(Data, id)
            if (Result.data.Status === true) {
                toast.success("Reels Updated Successfully...")
                Setloading(false)
                Redirect(`/Reels/view/${id}`)
            }
            else {
                toast.error(Result.data.Response_Message)
            }
        }

    }

    useEffect(() => {
        GetEditData()
        GetCategories()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Reels Edit</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Reels">Reels</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Reels Edit</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="page-content">
                <Form method='post' noValidate validated={validate}>
                    <Card className="mb-4">
                        <Card.Body>
                            {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                            <Row>
                                <Col md={4}>
                                    <Form.Label htmlFor="firebase_account" >Categories</Form.Label>
                                    <Form.Select className="my-2" name="categories_id" onChange={e => InputData(e)} required>
                                        <option value="">Select Categories </option>
                                        {
                                            GetCategoriesId?.map((val, index) => {
                                                return (
                                                    <option key={index} value={val?.id} selected={(val?.id === Data?.categories_id) ? true : false} >{val?.name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Select Categories Name
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="name">Sound Name</Form.Label>
                                    <Form.Control type="text" name="sound_name" className="my-2" value={Data?.sound_name} onChange={(e) => { InputData(e) }} required />
                                    <Form.Control.Feedback type="invalid">
                                        Enter Your Sound Name
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="mainimage">Video</Form.Label>
                                    <InputGroup className="my-2">
                                        <Form.Control type="file" name="video" onChange={(e) => { InputFile(e) }} />
                                        <Fancybox>
                                            <a href={Data?.video} data-fancybox="gallery">
                                                <Button variant="outline-info" size="sm" className="me-2 btn-icon"><i className='bx bx-video'></i></Button>
                                            </a>
                                        </Fancybox>
                                    </InputGroup>
                                    <Form.Control.Feedback type="invalid">
                                        Select Reels Video
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="status" className="d-block mb-2">Status</Form.Label>
                                    <Switch
                                        onChange={(e) => { SetData({ ...Data, status: (e === true) ? 1 : 0 }) }}
                                        checked={(Data.status === 1) ? true : false}
                                        offColor="#C8C8C8"
                                        onColor="#0093ed"
                                        height={30}
                                        width={70}
                                        className="react-switch"
                                        uncheckedIcon={
                                            <div className="react-switch-off">OFF</div>
                                        }
                                        checkedIcon={
                                            <div className="react-switch-on">ON</div>
                                        }
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="primary" className="me-3" onClick={Save} >Save</Button>
                            <Link to={`/Reels/View/${id}`}>
                                <Button variant="secondary">Cancel</Button>
                            </Link>
                        </Card.Footer>
                    </Card>
                </Form>
            </div>
        </Layout>
    )
}

export default ReelsEdit