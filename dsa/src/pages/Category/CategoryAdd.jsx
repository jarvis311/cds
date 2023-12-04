import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { CategoryUpdateRecord, CategoryViewRecord, CreateCategory } from "../../Auth/Api";
import { toast } from "react-toastify";

const CategoryAdd = () => {
    const [loading, Setloading] = useState(false)
    const [validate, setValidate] = useState(false)
    const [Data, SetData] = useState({
        name: "",
        status: 0,
    })
    console.log('Data >>>', Data)
    const params = useParams()
    const Redirect = useNavigate()

    const GetViewData = async () => {
        if (params.id) {
            const Result = await CategoryViewRecord(params.id)
            if (Result.data.Status === true) {
                SetData(Result.data.Data)
                Setloading(false)
            }
        } else {
            SetData({
                name: "",
                status: 0
            })
            Setloading(false)
        }
    }
    const Save = async () => {
        Setloading(true)
        if (Data.name == "") {
            setValidate(true)
            Setloading(false)
        } else {
            if (params.id) {
                const Result = await CategoryUpdateRecord(Data, params.id)
                if (Result.data.Status === true) {
                    toast.success("Data Saved Successfully")
                    Setloading(false)
                    Redirect(`/Category/View/${params.id}`)
                    Setloading(false)
                }
                else {
                    Setloading(false)
                    toast.error(Result.data.Response_Message)
                }
            } else {
                const Result = await CreateCategory(Data)
                if (Result.data.Status === true) {
                    toast.success("Data Saved Successfully")
                    Setloading(false)
                    Redirect("/Category")
                    Setloading(false)
                }
                else {
                    Setloading(false)
                    toast.error(Result.data.Response_Message)
                }
            }

        }
    }
    useEffect(() => {
        if (params.id) {
            GetViewData()
        }
    }, [params.id])

    return (
        <Layout sidebar={true}>
            {/* <div className="loader table-loader" ></div> */}
            <div className="page-heading">
                <h3>Category Add</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Category">Category</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Category Add</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="page-content">
                <Form method='post' noValidate validated={validate}>
                    <Card>
                        <Card.Body>
                            {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Category Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name=""
                                        className="my-2"
                                        onChange={e => SetData({ ...Data, name: e.target.value })}
                                        value={Data.name}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Category Name Field Is Require
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={3}>
                                    <Form.Label className="d-block mb-2">Status</Form.Label>
                                    <Switch
                                        onChange={e => SetData({ ...Data, status: e == true ? 1 : 0 })}
                                        checked={Data.status}
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
                            <Button variant="primary" onClick={Save} className="me-3">Save</Button>
                            <Link to={params.id ? `/Category/View/${params?.id}` : '/Category'} className="btn btn-secondary">Cancel</Link>
                        </Card.Footer>
                    </Card>
                </Form>
            </div>
        </Layout>
    )
}

export default CategoryAdd