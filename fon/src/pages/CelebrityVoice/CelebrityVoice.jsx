import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Table, Form } from "react-bootstrap";
import Layout from "../../layout/Layout";
import Pagination from "rc-pagination";
import Fancybox from "../../Component/FancyBox";
import { GetAllCelbrityVoice } from "../../Auth/Api";
import $ from "jquery";
import Swal from "sweetalert2";
const CelebrityVoice = () => {
  const [checked, setChecked] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [loading, Setloading] = useState(true);
  const [iconcoror, Seticoncoror] = useState();
  const [Data, SetData] = useState([]);
  const [Search, SetSearch] = useState({
    name: "",
  });

  const GetData = async () => {
    const Result = await GetAllCelbrityVoice();
    if (Result.data.Status === true) {
      SetData(Result.data.Data);
      Setloading(false);
      $("#remove_tr").empty();
    } else {
      SetData([]);
      Setloading(false);
      $("#remove_tr").empty();
      $("#remove_tr").append(
        '<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../../not-found/stamp.svg"/><p>No Found Categories</p></div></td>'
      );
    }
  };

  const getData = (current, pageSize) => {
    return Data.slice((current - 1) * pageSize, current * pageSize);
  };

  console.log("Data >>>>>", Data);
  useEffect(() => {
    GetData();
  }, []);

  const ChangeStatus = async (e, id) => {
    // const Result = await CategoriesStatus((e === true) ? 1 : 0, id)
    // if (Result.data.Status === true) {
    //     toast.success("Status Update Successfully...")
    //     if (Search.name !== "") {
    //         const Result1 = await CategoriesSearch(Search.name)
    //         if (Result1.data.Status === true) {
    //             SetData(Result1.data.Data)
    //         }
    //         else {
    //             SetData([])
    //         }
    //     }
    //     else {
    //         GetData()
    //     }
    // }
    // else {
    //     toast.error(Result.data.Response_Message)
    // }
}
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  const onChange = (page) => {
    setCurrent(page);
  };
  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">Celebrity Voice</h3>
        <div className="page-heading-right">
          <Form.Control
            type="text"
            placeholder="Search Name"
            className="wv-200 my-1 ms-3"
          />
          <Button variant="info" className="btn-icon btn-icon-lg my-1 ms-3">
            <i className="bx bx-copy"></i>
          </Button>
          <Link to="/Celebrity-Voice/Add" className="my-1 ms-3">
            <Button variant="primary" value="create">
              Add New
            </Button>
          </Link>
        </div>
      </div>
      <div className="page-content">
        <Card>
          <Card.Body>
            {/* <div className="loader table-loader" ></div> */}
            <Table bordered responsive>
              <thead>
                <tr>
                  <th width="5%" className="text-center">
                    No
                  </th>
                  <th width="45%">Celebrity Name</th>
                  <th width="10%" className="text-center">
                    Thumb Image
                  </th>
                  <th width="10%" className="text-center">
                    Premium Status
                  </th>
                  <th width="10%" className="text-center">
                    Reward Status
                  </th>
                  <th width="10%" className="text-center">
                    Status
                  </th>
                  <th width="10%" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {getData(current, size).map((val, index) => {
                  return (
                    <tr>
                      <td className="text-center">1</td>
                      <td>{val.name}</td>
                      <td className="text-center">
                        <Fancybox>
                          <a href="../avatar/1.jpg" data-fancybox="gallery">
                            <img
                              src="../avatar/1.jpg"
                              alt=""
                              className="hv-40 rounded-3"
                            />
                          </a>
                        </Fancybox>
                      </td>
                      <td className="text-center">
                        <Form.Check
                          type="switch"
                          className="yes-no"
                          onChange={(e) => {
                            ChangeStatus(e, val._id);
                          }}
                          checked={val.premium_status === 1 ? true : false}
                        />
                      </td>
                      <td className="text-center">
                        <Form.Check
                          type="switch"
                          className="yes-no"
                          onChange={(e) => {
                            ChangeStatus(e, val._id);
                          }}
                          checked={val.reward_status === 1 ? true : false}
                        />
                      </td>
                      <td className="text-center">
                        <Form.Check
                          type="switch"
                          onChange={(e) => {
                            ChangeStatus(e, val._id);
                          }}
                          checked={val.status === 1 ? true : false}
                        />
                      </td>
                      <td className="text-center">
                        <Link to={`/Celebrity-Voice/View/${val._id}`}>
                          <Button
                            variant="outline-warning"
                            size="sm"
                            className="me-2 btn-icon"
                          >
                            <i className="bx bx-show"></i>
                          </Button>
                        </Link>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="btn-icon"
                        >
                          <i className="bx bx-trash-alt"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="pagination-custom">
              <Pagination
                className="pagination-data"
                onChange={onChange}
                current={current}
                total={25}
                pageSize={10}
                showSizeChanger={false}
                // itemRender={PrevNextArrow}
                // onShowSizeChange={PerPageChange}
                showTitle={false}
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default CelebrityVoice;
