import React, {useState, useEffect} from 'react';
import CouponForm from "./CouponForm"
import { Breadcrumb } from "matx";
import http from "../../services/api";
import { useHistory } from "react-router-dom";
import Notification from "../../components/Notification"

function NewCoupon({id}) {
    const history = useHistory();
    const [state, setState] = useState([]);
    const [alert, setAlert] = useState("");
    const [severity, setSeverity] = useState("")

    const getCoupon = () =>{
        http
        .get(`/afrimash/coupons/${id}`)
        .then((response)=>{
            setState(response.data.object)
        })
    }

    const handleSubmit = () => {
      http
        .put("/afrimash/coupons", state)
        .then((response)=>{
           if (response.data.status === "OK"){  
               history.push("/coupons")
           }else if(!response.data.status) {
               setAlert("An Error Ocurred, Could Not Edit Coupon")
               setSeverity("error")
           }
        })
    }

    return (
        <div className="m-sm-30">
            <div  className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                    { name: "Coupons", path: "/coupons" },
                    { name: "Edit Coupon" }
                    ]}
                />
            </div>
            <CouponForm values={state} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default NewCoupon
