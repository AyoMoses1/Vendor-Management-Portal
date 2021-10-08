import React, {useState, useEffect} from 'react';
import CouponForm from "./CouponForm"
import { Breadcrumb } from "matx";
import http from "../../services/api";
import { useHistory } from "react-router-dom";
import Notification from "../../components/Notification"

function NewCoupon() {
    const initialState = {
    name: "",
    code: "",
    enabled: "",
    maximumOff: 0,
    minimumBuy: 0,
    barcode: "",
    expireDate: "",
    applyToAll: false,
    value: 0,
    couponType: "",
    modifiable: false,
    neverExpire: false,
    newUsersOnly: false,
    discountApplyMode: "",
    excludedProducts: [],
    excludedProductCategories:[],
    productCategories:[],
    products:[],
    customers: [],
    paymentMethod:"",
    providesFreeShipping: false,
    individualUseOnly: false,
    limitPerUser: 0,
    overallUsageLimit: 0
    };

    const history = useHistory();
    const [state, setState] = useState(initialState);
    const [alert, setAlert] = useState("");
    const [severity, setSeverity] = useState("")

    const handleSubmit = () => {
      http
        .post("/afrimash/coupons", state)
        .then((response)=>{
           if (response.data.status === "OK"){  
               history.push("/coupons")
           }else if(!response.data.status) {
                setAlert("An Error Ocurred, Could not Create Coupon")
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
                    { name: "Create Coupon" }
                    ]}
                />
            </div>
            <CouponForm values={state} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default NewCoupon
