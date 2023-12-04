import React from "react";
import { Button, Card, Col, Form, Row, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from '../../layout/Layout';

const CelebrityVoiceAdd = () => {
    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Celebrity Voice Add</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Celebrity-Voice">Celebrity Voice</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Celebrity Voice Add</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="page-content">
                <Form method='post' noValidate>
                    <Card className="mb-4">
                        <Card.Body>
                            {/* <div className="loader table-loader" ></div> */}
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Celebrity Name</Form.Label>
                                    <Form.Control type="text" name="name" className="my-2" required />
                                    <Form.Control.Feedback type="invalid">
                                        Enter Your Celebrity Name
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Thumb Image URL</Form.Label>
                                    <Form.Control type="text" name="image" className="my-2" required />
                                    <Form.Control.Feedback type="invalid">
                                        Enter Thumb Image URL
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Premium Status</Form.Label>
                                    <Form.Check type="switch" className="my-2 yes-no"/>
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Reward Status</Form.Label>
                                    <Form.Check type="switch" className="my-2 yes-no"/>
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Check type="switch" className="my-2"/>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="primary" className="me-3" >Save</Button>
                            <Link to='/Celebrity-Voice'>
                                <Button variant="secondary">Cancel</Button>
                            </Link>
                        </Card.Footer>
                    </Card>
                </Form>
            </div>
        </Layout>
    )
}

export default CelebrityVoiceAdd