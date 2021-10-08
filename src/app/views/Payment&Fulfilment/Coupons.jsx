import React, {useState, useEffect} from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Icon,
  TableRow,
  Button
} from "@material-ui/core";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Breadcrumb, SimpleCard } from "matx";
import Checkbox from "@material-ui/core/Checkbox";
import http from "../../services/api";
import Moment from 'react-moment';
import Notification from "../../components/Notification"

const Coupons = () => {
  const [coupons, setCoupons] = useState([])
  const [alert, setAlert] = useState("")
  const [severity, setSeverity] = useState("")
  useEffect(() => {
    getCoupons()
  }, [])
  const getCoupons = () => {
        http
        .get(`/afrimash/coupons/`)
        .then((response) => {
            if (response instanceof Object){
              if(response.data.object){
                console.log(response.data.object)
                setCoupons(response.data.object)
              }
              else{
                setAlert("An Error Ocurred, Please Reload The Page")
                setSeverity("error")
              }
            }else{
               setAlert("An Error Ocurred, Please Reload The Page")
               setSeverity("error")
            }
            
        })
        .catch((err) => {
              setAlert("An Error Ocurred, Please Reload The Page")
               setSeverity("error")
        })
    }

  return (
    <div className="m-sm-30">
    <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Coupons", path: "/coupons" },
              { name: "Coupons" }
            ]}
          />
    </div>
    <Notification alert={alert} severity={severity}/>
    <SimpleCard title="Coupons">
    <div className="w-100 overflow-auto">
          <Link
                to={{
                  pathname: '/coupon/new',
                  }}
              >
        <IconButton><Button variant="contained" color="primary" ><Icon>add</Icon>Add New</Button></IconButton></Link>
      <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
            <TableCell className="px-0">Name</TableCell>
            <TableCell className="px-0">Code</TableCell>
            <TableCell className="px-0">Amount</TableCell>
            <TableCell className="px-0">Usage Limit</TableCell>
            <TableCell className="px-0">Expiry Date</TableCell>
            <TableCell className="px-0"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coupons.map((coupon, index) => (
            <TableRow key={index}>
              <TableCell className="px-0 capitalize">
                {coupon.name || "-----"}
              </TableCell>
              <TableCell className="px-0 capitalize" align="left">
                {coupon.code}
              </TableCell>
              <TableCell className="px-0 capitalize">
                {coupon.value}
              </TableCell>
              <TableCell className="px-0 capitalize">
                {coupon.overallUsageLimit}
              </TableCell>
              <TableCell className="px-0 capitalize">
                <Moment format="YYYY/MM/DD">{coupon.expireDate}</Moment>
              </TableCell>
              <TableCell className="px-0 capitalize">
                <Link
                  to={{
                    pathname: '/coupon/edit',
                    state: { 
                      couponId: coupon.id
                    }
                  }}
                >
                  <IconButton>
                  <Icon color="success">create</Icon>
                </IconButton>
                </Link>
                <IconButton>
                  <Icon color="success">delete</Icon>
                </IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </SimpleCard>
</div>
  );
};

export default Coupons;
