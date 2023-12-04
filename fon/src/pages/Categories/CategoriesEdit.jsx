/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb, InputGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch';
import { toast } from "react-toastify";
import { Categoriesedit, Categoriesview } from "../../Auth/Api";
import { useEffect } from "react";

const CategoriesEdit = () => {

    const Redirect = useNavigate()
    const { id } = useParams()
    const [loading, Setloading] = useState(false)
    const [validate, setValidate] = useState(false)
    const [Data, SetData] = useState({
        name: "",
        image: "",
        status: 0,
    })

    const InputData = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }

    const InputFile = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.files[0] })
    }

    const GetData = async () => {
        const Result = await Categoriesview(id)
        if (Result.data.Status === true) {
            SetData(Result.data.Data)
        }
    }

    const Save = async () => {
        if (Data?.name === "") {
            setValidate(true)
        } else {
            Setloading(true)
            const Result = await Categoriesedit(Data, id)
            if (Result.data.Status === true) {
                toast.success("Categories Update Successfully...")
                Setloading(false)
                Redirect(`/Categories/view/${id}`)
            }
            else {
                toast.error(Result.data.Response_Message)
            }
        }
    }

    useEffect(() => {
        GetData()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Categories Edit</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Categories">Categories</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Categories Edit</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="page-content">
                <Form method='post' noValidate validated={validate}>
                    <Card className="mb-4">
                        <Card.Body>
                            {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                            <Row>
                                <Col md={6}>
                                    <Form.Label htmlFor="name">Name</Form.Label>
                                    <Form.Control type="text" name="name" className="my-2" value={Data.name} onChange={(e) => { InputData(e) }} required />
                                    <Form.Control.Feedback type="invalid">
                                        Enter Your Categories Name
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={6}>
                                    <Form.Label htmlFor="mainimage">Image</Form.Label>
                                    <InputGroup className="my-2">
                                        <Form.Control type="file" name="image" onChange={(e) => { InputFile(e) }} />
                                        <img src={Data?.image} width={40} height={40} />
                                    </InputGroup>
                                </Col>
                                <Col md={3}>
                                    <Form.Label htmlFor="ispremium" className="d-block mb-2">Status</Form.Label>
                                    <Switch
                                        onChange={(e) => { SetData({ ...Data, status: (e === true) ? 1 : 0 }) }}
                                        checked={(Data.status === 1) ? true : false}
                                        offColor="#C8C8C8"
                                        onColor="#0093ed"
                                        height={30}
                                        width={70}
                                        className="react-switch"
                                        uncheckedIcon={
                                            <div className="react-switch-off">NO</div>
                                        }
                                        checkedIcon={
                                            <div className="react-switch-on">YES</div>
                                        }
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="primary" className="me-3" onClick={Save}>Save</Button>
                            <Link to={`/Categories/view/${id}`}>
                                <Button variant="secondary">Cancel</Button>
                            </Link>
                        </Card.Footer>
                    </Card>
                </Form>
            </div>
        </Layout>
    )
}

export default CategoriesEdit