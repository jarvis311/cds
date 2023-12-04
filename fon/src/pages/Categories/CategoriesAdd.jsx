import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import Switch from "react-switch";
import { toast } from "react-toastify";
import { Categoriesadds } from "../../Auth/Api";

const CategoriesAdd = () => {
  const Redirect = useNavigate();
  const [loading, Setloading] = useState(false);
  const [validate, setValidate] = useState(false);
  const [Data, SetData] = useState({
    name: "",
    image: "",
    status: 0,
  });

  const InputData = (e) => {
    SetData({ ...Data, [e.target.name]: e.target.value });
  };

  const InputFile = (e) => {
    SetData({ ...Data, [e.target.name]: e.target.files[0] });
  };

  const Save = async () => {
    if (
      Data.name === "" ||
      Data.image === "" ||
      Data.image === undefined ||
      Data.image === null
    ) {
      setValidate(true);
    } else {
      setValidate(false);
      Setloading(true);
      const Result = await Categoriesadds(Data);
      if (Result.data.Status === true) {
        toast.success("Categories Saved Successfully...");
        Setloading(false);
        Redirect("/Categories");
      } else {
        toast.error(Result.data.Response_Message);
      }
    }
  };

  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Categories Add</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item>
            <Link to="/Home">
              <i className="bx bx-home-alt me-2 fs-5"></i> Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Categories">Categories</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Categories Add</Breadcrumb.Item>
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
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    className="my-2"
                    onChange={(e) => {
                      InputData(e);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter Your Categories Name
                  </Form.Control.Feedback>
                </Col>
                <Col md={6}>
                  <Form.Label htmlFor="mainimage">Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    className="my-2"
                    onChange={(e) => {
                      InputFile(e);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Select Your Categories Image
                  </Form.Control.Feedback>
                </Col>
                <Col md={3}>
                  <Form.Label htmlFor="ispremium" className="d-block mb-2">
                    Status
                  </Form.Label>
                  <Switch
                    onChange={(e) => {
                      SetData({ ...Data, status: e === true ? 1 : 0 });
                    }}
                    checked={Data.status === 1 ? true : false}
                    offColor="#C8C8C8"
                    onColor="#0093ed"
                    height={30}
                    width={70}
                    className="react-switch"
                    uncheckedIcon={<div className="react-switch-off">NO</div>}
                    checkedIcon={<div className="react-switch-on">YES</div>}
                  />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-end">
              <Button variant="primary" className="me-3" onClick={Save}>
                Save
              </Button>
              <Link to="/Categories">
                <Button variant="secondary">Cancel</Button>
              </Link>
            </Card.Footer>
          </Card>
        </Form>
      </div>
    </Layout>
  );
};

export default CategoriesAdd;
