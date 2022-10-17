import React, { Component } from "react";
import { Grid, Card, Icon, Button, Tooltip } from "@material-ui/core";
import SellerCard from "./SellerCard";



const sellers = [
  {
    // imgLogo: "/assets/icon/Vector (2).png",
    total: "10",
    label: "Total Products",
    color: "green",
    icon: "products"
  },
  {
    // imgLogo: "/assets/icon/Vector (3).png",
    total: "100",
    label: "Total Order this month",
    color: "orange",
    icon: "cart"
  },
  {
    // imgLogo: "/assets/icon/Vector (4).png",
    total: "10,000",
    label: "Profit in this month",
    color: "pink",
    icon : "profit"
  },   
  {
    // imgLogo: "/assets/icon/Ellipse 106 (1).png",
    total: "1000",
    label: "Views in this month",
    color: "green",
    icon : "eye"
  },
]

const Seller = ({ theme }) => {

  return (
    // <Card className=" p-20 mb-24">
      <Grid container >
        <div className="flexbox">
          {sellers.map((seller) => (
            <SellerCard
              key={seller.label}
              seller={seller}
              className="seller-card"
            />
          ))}
        </div>
        <Grid item xs={12} md={12}>
        </Grid>
      </Grid>
    // </Card>
  );
}

export default Seller;
