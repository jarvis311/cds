import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import Layout from "../../layout/Layout";
import Pagination from "rc-pagination";
import Switch from "react-switch";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CategoryDelete, CategoryStatus, CategoryUpdatePostion, GetAllCategory } from "../../Auth/Api";
import Swal from "sweetalert2";
import axios from "axios";

import $ from "jquery";
import { toast } from "react-toastify";

const Category = () => {
    const [current, setCurrent] = useState(1);
    const [checked, setChecked] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [loading, Setloading] = useState(true);
    const [Data, SetData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const Redirect = useNavigate()
    let count = 10;
    let swalCountdownInterval;

    const GetData = async () => {
        const Result = await GetAllCategory();
        // console.log(Result);
        if (Result.data.Status === true) {
            SetData(Result.data.Data);
            const _result = Result.data.Data;
            const _filterData = _result.slice((current - 1) * size, current * size);
            setCategoryData(_filterData);
            Setloading(false);
            $("#remove_tr").empty();
        } else {
            SetData([]);
            Setloading(false);
            $("#remove_tr").empty();
            $("#remove_tr").append(
                '<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../../not-found/stamp.svg"/><p>No Found Stamps</p></div></td>'
            );
        }
    };
    const DeleteStamp = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-danger btn-lg counter",
                cancelButton: "btn btn-primary btn-lg me-3",
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: "Are you sure you want to delete?",
                text: "You won't be able to revert this!",
                imageUrl: "../../icon/alert.svg",
                imageWidth: 80,
                imageHeight: 80,
                confirmButtonText: "OK (10)",
                cancelButtonText: "Cancel",
                showCancelButton: true,
                reverseButtons: true,
                didOpen: () => {
                    $(".swal2-confirm").attr("disabled", true);
                    swalCountdownInterval = setInterval(function () {
                        count--;
                        if (count < 1) {
                            $(".counter").text(`OK`);
                            $(".swal2-confirm").attr("disabled", false);
                            clearInterval(swalCountdownInterval);
                        } else {
                            $(".counter").text(`OK (${count})`);
                        }
                    }, 1000);
                },
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const Result = await CategoryDelete(id);
                    if (Result.data.Status === true) {
                        setCurrent(1)
                        toast.success("Category Delete Successfully...");
                        GetData();
                    } else {
                        toast.error(Result.data.Response_Message);
                    }
                } else {
                    count = 10;
                    clearInterval(swalCountdownInterval);
                }
            });
    };

    const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(Data.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    };
    const PrevNextArrow = (current, type, originalElement) => {
        if (type === "prev") {
            return <button className="paggination-btn">Previous</button>;
        }
        if (type === "next") {
            return <button className="paggination-btn">Next</button>;
        }
        return originalElement;
    };
    const PaginationChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize);
        const _filterData = Data.slice((page - 1) * pageSize, page * pageSize);
        setCategoryData(_filterData);
    };

    // console.log("categoryData >>>", categoryData);
    const onChange = (page) => {
        setCurrent(page);
    };

    const changeStatusOncahnge = async (e, id) => {
        const Result = await CategoryStatus(e === true ? 1 : 0, id);
        if (Result.data.Status === true) {
            toast.success("Status Update Successfully...");
            GetData();
        } else {
            toast.error(Result.data.Response_Message);
        }
    };
    const handleOnDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return;
        let items = Array.from(categoryData);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log("=items", items);
        // setCategoryData(items);
        let data = items.map(item => item._id)
        const pageInformation = {
            currentPage: current,  // Assuming you have a variable named 'current' for the current page
            sourceIndex: source.index,
            destinationIndex: destination.index
        };
        // console.log('pageInformation', pageInformation)
        console.log('Order Z>>>', data)
        const updatePotion = await CategoryUpdatePostion(data, pageInformation)
        if (updatePotion.data.Status === true) {
            toast.success("Position Update Successfully...");
            GetData();
        } else {
            toast.error(updatePotion.data.Response_Message);
        }
    };
    useEffect(() => {
        GetData();
    }, [current]);
    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3 className="my-1">Category</h3>
                <div className="page-heading-right">
                    <Link to="/Category/Add" className="my-1 ms-3">
                        <Button variant="primary" value="create">
                            Add New
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="page-content">
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                {loading === true ? (
                                    <div className="loader table-loader"></div>
                                ) : (
                                    <></>
                                )}
                                <Table bordered responsive>
                                    <thead>
                                        <tr>
                                            <th width="5%" className="text-center">
                                                No
                                            </th>
                                            <th width="75%">Category Name</th>
                                            <th width="10%" className="text-center">
                                                Status
                                            </th>
                                            <th width="10%" className="text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <DragDropContext onDragEnd={handleOnDragEnd}>
                                        <Droppable droppableId="stamps">
                                            {(provided) => (
                                                <tbody
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                >
                                                    {categoryData.length > 0 &&
                                                        categoryData.map((val, index) => {
                                                            return (
                                                                <Draggable
                                                                    key={index}
                                                                    draggableId={index.toString()}
                                                                    index={index}
                                                                >
                                                                    {(provided, snapshot) => {
                                                                        return (
                                                                            <tr
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                ref={provided.innerRef}
                                                                                isDragging={snapshot.isDragging}
                                                                            >
                                                                                <td className="text-center">
                                                                                    {current === 1
                                                                                        ? index + 1
                                                                                        : current * size + index + 1 - size}
                                                                                </td>
                                                                                <td>{val.name ? val.name : "-"}</td>
                                                                                <td className="text-center">
                                                                                    <Switch
                                                                                        onChange={(e) => {
                                                                                            changeStatusOncahnge(e, val._id);
                                                                                        }}
                                                                                        checked={
                                                                                            val.status === 1 ? true : false
                                                                                        }
                                                                                        offColor="#C8C8C8"
                                                                                        onColor="#0093ed"
                                                                                        height={30}
                                                                                        width={70}
                                                                                        className="react-switch"
                                                                                        uncheckedIcon={
                                                                                            <div className="react-switch-off">
                                                                                                NO
                                                                                            </div>
                                                                                        }
                                                                                        checkedIcon={
                                                                                            <div className="react-switch-on">
                                                                                                YES
                                                                                            </div>
                                                                                        }
                                                                                    />
                                                                                </td>
                                                                                <td className="text-center">
                                                                                    <Link
                                                                                        to={`/Category/View/${val._id}`}
                                                                                    >
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
                                                                                        <i
                                                                                            className="bx bx-trash-alt"
                                                                                            onClick={() =>
                                                                                                DeleteStamp(val._id)
                                                                                            }
                                                                                        ></i>
                                                                                    </Button>
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    }}
                                                                </Draggable>
                                                            );
                                                        })}
                                                </tbody>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                </Table>
                                {Data.length > size ? (
                                    <div className="pagination-custom">
                                        <Pagination
                                            className="pagination-data"
                                            onChange={PaginationChange}
                                            total={Data.length}
                                            current={current}
                                            pageSize={size}
                                            showSizeChanger={false}
                                            itemRender={PrevNextArrow}
                                            onShowSizeChange={PerPageChange}
                                            showTitle={false}
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default Category;
