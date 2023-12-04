import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb, InputGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch';
import Fancybox from '../../Component/FancyBox';
import { toast } from "react-toastify";
import { GetAllCategory, StampEdit, StampView } from "../../Auth/Api";
import { useEffect } from "react";
import { SelectPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
    item => ({ label: item, value: item })
);

const StampsEdit = () => {

    const Redirect = useNavigate()
    const { id } = useParams()
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
        category_id: ''
    })
    console.log('Data >>>>', Data)

    const InputFile = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.files[0] })
    }

    const GetData = async () => {
        const Result = await StampView(id)
        if (Result.data.Status === true) {
            SetData({
                main_image: Result.data.Data.thumb_image,
                zip_name: Result.data.Data.zip_name,
                zip_name_ios: Result.data.Data.zip_name_ios,
                is_premium: Result.data.Data.is_premium,
                is_premium_ios: Result.data.Data.is_premium_ios,
                status: Result.data.Data.status,
                status_ios: Result.data.Data.status_ios,
                category_id: Result?.data?.Data?.category_id?._id || ''
            })
        }
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
    }
    const Save = async () => {
        Setloading(true)
        if (Data.main_image == "") {
            setValidate(true)
            Setloading(false)
        } else {
            const Result = await StampEdit(Data, id)
            if (Result.data.Status === true) {
                toast.success("Data Updated Successfully")
                Setloading(false)
                Redirect(`/Stamps/view/${id}`)
            }
            else {
                toast.error(Result.data.Response_Message)
                Setloading(false)
            }
        }
    }

    useEffect(() => {
        GetData()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Stamps Edit</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Stamps">Stamps</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Stamps Edit</Breadcrumb.Item>
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
                                        className="my-2"
                                        defaultValue={Data.category_id._id}
                                        onChange={e => handleOnchageSelect(e)}
                                        value={Data.category_id}
                                        block
                                        placeholder="Select Category"
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Main Image</Form.Label>
                                    <InputGroup className="my-2">
                                        <Form.Control type="file" name="main_image" onChange={(e) => { InputFile(e) }} required />
                                        <Fancybox>
                                            <a href={Data.thumb_image} data-fancybox="gallery">
                                                <img src={Data.thumb_image} alt="" className="hv-40 rounded-3" />
                                            </a>
                                        </Fancybox>
                                    </InputGroup>
                                </Col>
                                <Col md={6}>
                                    <Form.Label>ZIP Name</Form.Label>
                                    <InputGroup className="my-2">
                                        <Form.Control type="file" name="zip_name" onChange={(e) => { InputFile(e) }} required />
                                    </InputGroup>
                                </Col>
                                <Col md={6}>
                                    <Form.Label>ZIP Name iOS</Form.Label>
                                    <InputGroup className="my-2">
                                        <Form.Control type="file" name="zip_name_ios" onChange={(e) => { InputFile(e) }} required />
                                    </InputGroup>
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
                            <Button variant="primary" className="me-3" onClick={Save}>Save</Button>
                            <Link to={`/Stamps/view/${id}`} className="btn btn-secondary">Cancel</Link>
                        </Card.Footer>
                    </Card>
                </Form>
            </div>
        </Layout>
    )
}

export default StampsEdit