import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import { AddCelbrityVoice } from "../../Auth/Api";
import { toast } from "react-toastify";

const CelebrityVoiceAdd = () => {
  const Redirect = useNavigate();
  const [loading, Setloading] = useState(false);
  const [validate, setValidate] = useState(false);
  const [Data, SetData] = useState({
    name: "",
    thumb_image_url: "",
    premium_status: "",
    reward_status: "",
    status: "",
    // position: "",
  });
  console.log("Data >>>>>", Data);
  // const InputFile = (e) => {
  //     SetData({ ...Data, [e.target.name]: e.target.files[0] })
  // }

  const Save = async () => {
    if (Data.name === "" || Data.thumb_image_url === "") {
      setValidate(true);
    } else {
      setValidate(false);
      Setloading(true);
      const Result = await AddCelbrityVoice(Data);
      if (Result.data.Status === true) {
        toast.success("Voice Saved Successfully...");
        Setloading(false);
        Redirect("/Celebrity-Voice");
      } else {
        toast.error(Result.data.Response_Message);
      }
    }
  };
  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Celebrity Voice Add</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item>
            <Link to="/Home">
              <i className="bx bx-home-alt me-2 fs-5"></i> Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Celebrity-Voice">Celebrity Voice</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Celebrity Voice Add</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="page-content">
        <Form method="post" noValidate validated={validate}>
          <Card className="mb-4">
            <Card.Body>
              {loading === true ? (
                <div className="loader table-loader"></div>
              ) : (
                <></>
              )}
              <Row>
                <Col md={6}>
                  <Form.Label>Celebrity Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    className="my-2"
                    onChange={(e) => {
                      SetData({
                        ...Data,
                        name: e.target.value,
                      });
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter Your Celebrity Name
                  </Form.Control.Feedback>
                </Col>
                <Col md={6}>
                  <Form.Label>Thumb Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="thumb_image_url"
                    className="my-2"
                    onChange={(e) => {
                      SetData({
                        ...Data,
                        thumb_image_url: e.target.value,
                      });
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter Thumb Image URL
                  </Form.Control.Feedback>
                </Col>
                <Col md={2}>
                  <Form.Label>Premium Status</Form.Label>
                  <Form.Check
                    type="switch"
                    name="premium_status"
                    className="my-2 yes-no"
                    checked={Data.premium_status === 1}
                    onChange={(e) => {
                      SetData({
                        ...Data,
                        premium_status: e.target.checked ? 1 : 0,
                        reward_status: e.target.checked
                          ? 0
                          : Data.reward_status,
                      });
                    }}
                  />
                </Col>
                <Col md={2}>
                  <Form.Label>Reward Status</Form.Label>
                  <Form.Check
                    type="switch"
                    name="reward_status"
                    className="my-2 yes-no"
                    checked={Data.reward_status === 1}
                    onChange={(e) => {
                      SetData({
                        ...Data,
                        reward_status: e.target.checked ? 1 : 0,
                        premium_status: e.target.checked
                          ? 0
                          : Data.premium_status,
                      });
                    }}
                  />
                </Col>
                <Col md={2}>
                  <Form.Label>Status</Form.Label>
                  <Form.Check
                    type="switch"
                    name="status"
                    className="my-2"
                    checked={Data.status === 1 ? true : false}
                    onChange={(e) => {
                      SetData({
                        ...Data,
                        status: e.target.checked ? 1 : 0,
                      });
                    }}
                  />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-end">
              <Button variant="primary" className="me-3"onClick={Save}>
                Save
              </Button>
              <Link to="/Celebrity-Voice">
                <Button variant="secondary">Cancel</Button>
              </Link>
            </Card.Footer>
          </Card>
        </Form>
      </div>
    </Layout>
  );
};

export default CelebrityVoiceAdd;
