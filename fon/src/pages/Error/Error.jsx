import React from "react";

const Error=()=>{
    return(
    <>
        <div className="d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
            <div className="text-center">
                <img src="../../not-found/not-found.svg" className="hv-300" alt="" />
                <h3 className="mt-5 fw-700">Page Not Found</h3>  
            </div>
        </div>
    </>
    )
}

export default Error;