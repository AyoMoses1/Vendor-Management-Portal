import React, { Component } from "react";
import { Card } from "@material-ui/core";




const ViewedCard = ({theme, view}) => {
    return (
        <div className="scroll">
            <div>{view?.id}</div>
            <Card className="kerd">
            <div className="flix flex-middle">
                <div className="pics"> </div>
                <div className="ml-12">
                <small className="text-muted">
                    <h6> {view?.name} </h6>
                    <p> {view?.item}</p>
                </small>
                <h6> {view?.amount} </h6>
                </div>
            </div>
            </Card>
        </div>
    )
}

export default ViewedCard;

