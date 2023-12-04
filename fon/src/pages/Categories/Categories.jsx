import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Card, Table, Form } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Pagination from "rc-pagination";
import Switch from 'react-switch';
import Fancybox from '../../Component/FancyBox';
import $ from 'jquery'
import { CategoriesAll, CategoriesDelete, CategoriesSearch, CategoriesStatus } from "../../Auth/Api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const Categories = () => {

    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [loading, Setloading] = useState(true)
    const [iconcoror, Seticoncoror] = useState()
    const [Data, SetData] = useState([])
    const [Search, SetSearch] = useState({
        name: ""
    })

    const GetData = async () => {
        const Result = await CategoriesAll()
        if (Result.data.Status === true) {
            SetData(Result.data.Data)
            Setloading(false)
            $('#remove_tr').empty()
        }
        else {
            SetData([])
            Setloading(false)
            $('#remove_tr').empty()
            $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../../not-found/stamp.svg"/><p>No Found Categories</p></div></td>')
        }
    }

    const sorting = (col, type = "string", order, e) => {
        Seticoncoror(e.target.id)
        if (order === "ASC") {
            const sorted = [...Data].sort((a, b) =>
                a[col] > b[col] ? 1 : -1
            );
            if (iconcoror !== e.target.id) {
                SetData(sorted)
            }
        }
        if (order === "DSC") {
            const sorted = [...Data].sort((a, b) =>
                a[col] < b[col] ? 1 : -1
            );
            if (iconcoror !== e.target.id) {
                SetData(sorted)
            }
        }
    }

    const DeleteStamp = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger me-2",
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel! ",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    Setloading(true)
                    const Result = await CategoriesDelete(id)
                    if (Result.data.Status === true) {
                        Setloading(false)
                        toast.success("Categories Delete Successfully...")
                        GetData()
                    }
                    else {
                        toast.error(Result.data.Response_Message)
                    }
                }
            });
    }

    const InputSearch = async (e) => {
        SetSearch({ ...Search, name: e.target.value })
        const Result = await CategoriesSearch(e.target.value)
        if (Result.data.Status === true) {
            SetData(Result.data.Data)
            $('#remove_tr').empty()
            setCurrent(1)
        }
        else {
            SetData([])
            $('#remove_tr').empty()
            $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../../not-found/news.svg"/><p>No Found Categories</p></div></td>')
        }
    }

    const ChangeStatus = async (e, id) => {
        const Result = await CategoriesStatus((e === true) ? 1 : 0, id)
        if (Result.data.Status === true) {
            toast.success("Status Update Successfully...")
            if (Search.name !== "") {
                const Result1 = await CategoriesSearch(Search.name)
                if (Result1.data.Status === true) {
                    SetData(Result1.data.Data)
                }
                else {
                    SetData([])
                }
            }
            else {
                GetData()
            }
        }
        else {
            toast.error(Result.data.Response_Message)
        }
    }

    const getData = (current, pageSize) => {
        return Data.slice((current - 1) * pageSize, current * pageSize);
    };

    const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(Data.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    }

    const PaginationChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize)
    }


    const PrevNextArrow = (current, type, originalElement) => {
        if (type === 'prev') {
            return <button className='paggination-btn'>Previous</button>;
        }
        if (type === 'next') {
            return <button className='paggination-btn'>Next</button>;
        }
        return originalElement;
    }

    useEffect(() => {
        GetData()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3 className="my-1">Categories</h3>
                <div className="page-heading-right">
                    <Form.Control type="text" placeholder="Search Name" className="wv-200 my-1 ms-3" onChange={(e) => { InputSearch(e) }} />
                    <Link to="/Categories/Add" className="my-1 ms-3">
                        <Button variant="primary" value="create">Add New</Button>
                    </Link>
                </div>
            </div>
            <div className="page-content">
                <Card>
                    <Card.Body>
                        {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                        <Table bordered responsive>
                            <thead>
                                <tr>
                                    <th width="6%" className="text-center">No</th>
                                    <th width="64%">
                                        <div className='table-sort-filter'>Name
                                            <span className='table-sort'>
                                                <div className={`sort-down ${iconcoror === "name_down" ? "active" : ""}`} id="name_down" onClick={(e) => { sorting('name', "", "DSC", e) }}></div>
                                                <div className={`sort-up ${iconcoror === "name_up" ? "active" : ""}`} id="name_up" onClick={(e) => { sorting('name', "", "ASC", e) }}></div>
                                            </span>
                                        </div>
                                    </th>
                                    <th width="10%" className="text-center">Image</th>
                                    <th width="10%" className="text-center">
                                        <div className='table-sort-filter justify-content-center'>Status
                                            <span className='table-sort'>
                                                <div className={`sort-down ${iconcoror === "status_down" ? "active" : ""}`} id="status_down" onClick={(e) => { sorting('status', "", "DSC", e) }}></div>
                                                <div className={`sort-up ${iconcoror === "status_up" ? "active" : ""}`} id="status_up" onClick={(e) => { sorting('status', "", "ASC", e) }}></div>
                                            </span>
                                        </div>
                                    </th>
                                    <th width="10%" className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getData(current, size).map((val, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='text-center'>{val?.id}</td>
                                                <td>{val?.name}</td>
                                                <td className='text-center'>
                                                    <Fancybox>
                                                        <a href={val.image} data-fancybox="gallery">
                                                            <img src={val.image} alt="" className="hv-40 rounded-3" />
                                                        </a>
                                                    </Fancybox>
                                                </td>
                                                <td className='text-center'>
                                                    <Switch
                                                        onChange={(e) => { ChangeStatus(e, val._id) }}
                                                        checked={(val.status === 1) ? true : false}
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
                                                </td>
                                                <td className='text-center'>
                                                    <Link to={`/Categories/View/${val._id}`}>
                                                        <Button variant="outline-warning" size="sm" className="me-2 btn-icon"><i className='bx bx-show'></i></Button>
                                                    </Link>
                                                    <Button variant="outline-danger" size="sm" className="btn-icon" onClick={() => DeleteStamp(val._id)}><i className='bx bx-trash-alt' ></i></Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr id="remove_tr"></tr>
                            </tbody>
                        </Table>
                        {(Data.length > size) ?
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
                            </div> : ""}
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default Categories