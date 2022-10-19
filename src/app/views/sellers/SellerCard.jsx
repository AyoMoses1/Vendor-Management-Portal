import React, { Component } from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import './Sellerform.css'


const SellerCard = ({seller }) => {
    return (
        <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className="scrollable-item">
                <Card className="p-10 card">
                    <div className="flex seller-top">
                        <div className="img-container" style={{backgroundColor:seller.color, borderRadius:"50px"}}>

                            {seller.icon === "products" && <InventoryIcon className='seller-logo'/>}
                            {seller.icon === "cart" && <ShoppingCartIcon className='seller-logo'/>}
                            {seller.icon === "profit" && <AccountBalanceWalletIcon className='seller-logo'/>}
                            {seller.icon === "eye" && <RemoveRedEyeIcon className='seller-logo'/>}
                          {/* <img className="seller-logo" src={seller?.imgLogo} alt="logo" /> */}
                        </div>                   
                        <div className="seller-top-content">
                            <h6 className="text-primary font-weight-500 overview-amount">
                            {seller?.total}
                            </h6>
                            <p className="seller-footer">{seller?.label}</p>
                        </div>
                    </div>
                </Card>
            </div>
        </Grid>
    );
}

export default SellerCard;