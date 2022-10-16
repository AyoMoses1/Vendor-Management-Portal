import React, { Component } from "react";
import { Grid, Card, Icon, Button, Tooltip } from "@material-ui/core";
import SellerCard from "./SellerCard";



const sellers = [
  {
    imgLogo: "/assets/icon/Ellipse 108.png",
    total: "10",
    label: "Total Products",
  },
  {
    imgLogo: "/assets/icon/Ellipse 107.png",
    total: "100",
    label: "Total Order this month",
  },
  {
    imgLogo: "/assets/icon/Ellipse 106.png",
    total: "10,000",
    label: "Profit in this month",
  },   
  {
    imgLogo: "/assets/icon/Ellipse 106 (1).png",
    total: "1000",
    label: "Views in this month",
  },
]

const Seller = ({ theme }) => {

  return (
    <Card className="play-card p-20 bg-paper mb-24">
      <Grid container spacing={1}>
        <div className="scrolling-wrapper-flexbox">
          {sellers.map((seller) => (
            <SellerCard
              key={seller.label}
              seller={seller}
              theme={theme}
              className="seller-card"
            />
          ))}
        </div>
        <Grid item xs={12} md={12}>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Seller;
