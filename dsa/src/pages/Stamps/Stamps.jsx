import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Pagination from "rc-pagination";
import Switch from 'react-switch';
import Fancybox from '../../Component/FancyBox';
import $ from 'jquery'
import { StampIsPremium, StampIsPremiumIos, StampStatus, StampStatusIos, StampUpdatePostion, StampsAll, StampsDelete } from "../../Auth/Api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const Stamps = () => {

    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [loading, Setloading] = useState(true)
    const [iconcoror, Seticoncoror] = useState()
    const [Data, SetData] = useState([])
    const [stampData, setStampData] = useState([])
    const GetData = async () => {
        const Result = await StampsAll()
        console.log(Result)
        if (Result.data.Status === true) {
            SetData(Result.data.Data)
            const _result = Result.data.Data
            const _filterData = _result.slice((current - 1) * size, current * size);
            setStampData(_filterData)
            Setloading(false)
            $('#remove_tr').empty()
        }
        else {
            SetData([])
            Setloading(false)
            $('#remove_tr').empty()
            $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../../not-found/stamp.svg"/><p>No Found Stamps</p></div></td>')
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
    let count = 10;
    let swalCountdownInterval;
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
                    const Result = await StampsDelete(id)
                    if (Result.data.Status === true) {
                        Setloading(false)
                        setCurrent(1)
                        toast.success("Stamps Delete Successfully...")
                        GetData()
                    }
                    else {
                        toast.error(Result.data.Response_Message)
                    }
                } else {
                    count = 10;
                    clearInterval(swalCountdownInterval);
                }
            });
    };
    const Changeispremium = async (e, id) => {
        const Result = await StampIsPremium((e === true) ? 1 : 0, id)
        if (Result.data.Status === true) {
            toast.success("Is Premium Update Successfully...")
            GetData()
        }
        else {
            toast.error(Result.data.Response_Message)
        }
    }

    const Changeispremiumios = async (e, id) => {
        const Result = await StampIsPremiumIos((e === true) ? 1 : 0, id)
        if (Result.data.Status === true) {
            toast.success("Is Premium Ios Update Successfully...")
            GetData()
        }
        else {
            toast.error(Result.data.Response_Message)
        }
    }

    const Changestatus = async (e, id) => {
        const Result = await StampStatus((e === true) ? 1 : 0, id)
        if (Result.data.Status === true) {
            toast.success("Status Update Successfully...")
            GetData()
        }
        else {
            toast.error(Result.data.Response_Message)
        }
    }

    const Changestatusios = async (e, id) => {
        const Result = await StampStatusIos((e === true) ? 1 : 0, id)
        if (Result.data.Status === true) {
            toast.success("Status Ios Update Successfully...")
            GetData()
        }
        else {
            toast.error(Result.data.Response_Message)
        }
    }

    const getData = (current, pageSize) => {
        // if(data && data.length){
        return Data.slice((current - 1) * pageSize, current * pageSize);
        // }        
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
        const _filterData = Data.slice((page - 1) * pageSize, page * pageSize);
        setStampData(_filterData)
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
    }, [current])

    const handleOnDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return;
        let items = Array.from(stampData)
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log("=items ---->>", items);
        // setStampData(items)
        let data = items.map(item => item._id)
        const pageInformation = {
            currentPage: current,  // Assuming you have a variable named 'current' for the current page
            sourceIndex: source.index,
            destinationIndex: destination.index
        };
        const updatePotion = await StampUpdatePostion(data, pageInformation)
        if (updatePotion.data.Status === true) {
            toast.success("Position Update Successfully...");
            GetData();
        } else {
            toast.error(updatePotion.data.Response_Message);
        }
        // update_stamp_position
    };

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3 className="my-1">Stamps</h3>
                <div className="page-heading-right">
                    <Link to="/Stamps/Add" className="my-1 ms-3">
                        <Button variant="primary" value="create">Add New</Button>
                    </Link>
                </div>
            </div>
            <div className="page-content">
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                                <Table bordered responsive>
                                    <thead>
                                        <tr>
                                            <th width="6%" className="text-center">No</th>
                                            <th width="10%" className="text-center">Thumb Image</th>
                                            <th width="20%">Category Name</th>
                                            <th width="9%" className="text-center">Zip Name</th>
                                            <th width="9%" className="text-center">Zip Name iOS</th>
                                            <th width="9%" className="text-center">
                                                Is Premium
                                            </th>
                                            <th width="9%" className="text-center">
                                                Is Premium iOS
                                            </th>
                                            <th width="9%" className="text-center">
                                                Status
                                            </th>
                                            <th width="9%" className="text-center">
                                                Status iOS
                                            </th>
                                            <th width="10%" className='text-center'>Action</th>
                                        </tr>
                                    </thead>

                                    <DragDropContext onDragEnd={handleOnDragEnd}>
                                        <Droppable droppableId="stamps">
                                            {(provided) => (
                                                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                                                    {stampData.length > 0 && stampData.map((val, index) => {
                                                        return (
                                                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <tr
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            ref={provided.innerRef}
                                                                            isDragging={snapshot.isDragging}
                                                                        >
                                                                            <td className='text-center'>{(current === 1) ? index + 1 : current * size + index + 1 - size}</td>
                                                                            <td className='text-center'>
                                                                                <Fancybox>
                                                                                    <a href={val.thumb_image} data-fancybox="gallery">
                                                                                        <img src={val.thumb_image} alt="" className="hv-40 rounded-3" />
                                                                                    </a>
                                                                                </Fancybox>
                                                                            </td>
                                                                            <td>{val?.category_id?.name || "-"}</td>
                                                                            <td className='text-center'>
                                                                                <a href={val.zip_name}>
                                                                                    <Button variant="outline-info" size="sm" className="btn-icon"><i className='bx bx-download' ></i></Button>
                                                                                </a>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <a href={val.zip_name_ios}>
                                                                                    <Button variant="outline-info" size="sm" className="btn-icon"><i className='bx bx-download' ></i></Button>
                                                                                </a>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <Switch
                                                                                    onChange={(e) => { Changeispremium(e, val._id) }}
                                                                                    checked={(val.is_premium === 1) ? true : false}
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
                                                                                <Switch
                                                                                    onChange={(e) => { Changeispremiumios(e, val._id) }}
                                                                                    checked={(val.is_premium_ios === 1) ? true : false}
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
                                                                                <Switch
                                                                                    onChange={(e) => { Changestatus(e, val._id) }}
                                                                                    checked={(val.status === 1) ? true : false}
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
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <Switch
                                                                                    onChange={(e) => { Changestatusios(e, val._id) }}
                                                                                    checked={(val.status_ios === 1) ? true : false}
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
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <Link to={`/Stamps/View/${val._id}`}>
                                                                                    <Button variant="outline-warning" size="sm" className="me-2 btn-icon"><i className='bx bx-show'></i></Button>
                                                                                </Link>
                                                                                <Button variant="outline-danger" size="sm" className="btn-icon" onClick={() => DeleteStamp(val._id)}><i className='bx bx-trash-alt' ></i></Button>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    })}
                                                </tbody>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
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
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Stamps