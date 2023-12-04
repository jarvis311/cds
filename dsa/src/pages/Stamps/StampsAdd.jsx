import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { toast } from "react-toastify";
import { GetAllCategory, StampAdd } from "../../Auth/Api";
import { SelectPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
    item => ({ label: item, value: item })
);

const StampsAdd = () => {

    const Redirect = useNavigate()
    const [loading, Setloading] = useState(false)
    const [validate, setValidate] = useState(false)
    const [categoryDropdownArray, setCategoryDropdownArray] = useState([])

    const [Data, SetData] = useState({
        main_image: "",
        zip_name: "",
        zip_name_ios: "",
        is_premium: 0,
        is_premium_ios: 0,
        status: 0,
        status_ios: 0,
        category_id: ""
    })
    console.log('Data >>>', Data)
    const InputFile = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.files[0] })
        setValidate(false)
    }
    const categoryDropdown = async () => {
        const Result = await GetAllCategory()
        setCategoryDropdownArray(
            Result?.data?.Data.map((val, index) => {
                return { label: val.name, value: val._id };
            })
        );
    };
    useEffect(() => {
        categoryDropdown()
    }, [])
    const handleOnchageSelect = (e) => {
        SetData({ ...Data, category_id: e })
        setValidate(false)
    }
    const Save = async () => {
        Setloading(true)
        if (Data.main_image == "" || Data.zip_name == "" || Data.zip_name_ios == "") {
            setValidate(true)
            Setloading(false)
        } else {
            setValidate(true)
            const Result = await StampAdd(Data)
            if (Result.data.Status === true) {
                toast.success("Data Saved Successfully")
                Setloading(false)
                Redirect("/Stamps")
            }
            else {
                toast.error(Result.data.Response_Message)
                Setloading(false)
            }
        }

    }

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Stamps Add</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Stamps">Stamps</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Stamps Add</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="page-content">
                <Form method='post' noValidate validated={validate}>
                    <Card className="mb-4">
                        <Card.Body>
                            {(loading === true) ? <div className="loader" ></div> : <></>}
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Category</Form.Label>
                                    <SelectPicker
                                        data={categoryDropdownArray}
                                        cleanable={false}
                                        defaultValue={Data.category_id}
                                        onChange={e => handleOnchageSelect(e)}
                                        value={Data._id}
                                        block
                                        className="my-2"
                                        placeholder="Select Category"
                                    />

                                </Col>
                                <Col md={6}>
                                    <Form.Label>Thumb Image</Form.Label>
                                    <Form.Control type="file" name="main_image" className="my-2" onChange={(e) => { InputFile(e) }} required />
                                </Col>
                                <Col md={6}>
                                    <Form.Label>ZIP Name</Form.Label>
                                    <Form.Control type="file" name="zip_name" className="my-2" onChange={(e) => { InputFile(e) }} required />
                                </Col>
                                <Col md={6}>
                                    <Form.Label>ZIP Name iOS</Form.Label>
                                    <Form.Control type="file" name="zip_name_ios" className="my-2" onChange={(e) => { InputFile(e) }} />
                                </Col>
                                <Col md={3}>
                                    <Form.Label className="d-block mb-2">Is Premium</Form.Label>
                                    <Switch
                                        onChange={(e) => { SetData({ ...Data, is_premium: (e === true) ? 1 : 0 }) }}
                                        checked={(Data.is_premium === 1) ? true : false}
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
                                <Col md={3}>
                                    <Form.Label className="d-block mb-2">Is Premium iOS</Form.Label>
                                    <Switch
                                        onChange={(e) => { SetData({ ...Data, is_premium_ios: (e === true) ? 1 : 0 }) }}
                                        checked={(Data.is_premium_ios === 1) ? true : false}
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
                                <Col md={3}>
                                    <Form.Label className="d-block mb-2">Status</Form.Label>
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
                                <Col md={3}>
                                    <Form.Label className="d-block mb-2">Status iOS</Form.Label>
                                    <Switch
                                        onChange={(e) => { SetData({ ...Data, status_ios: (e === true) ? 1 : 0 }) }}
                                        checked={(Data.status_ios === 1) ? true : false}
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
                            <Link to='/Stamps' className="btn btn-secondary">Cancel</Link>
                        </Card.Footer>
                    </Card>
                </Form>
            </div>
        </Layout>
    )
}

export default StampsAdd