import { Button } from "@material-ui/core";
import React, { Component, useState } from "react";
import "./shared.css";

const Tabs = ({ tabs, setValue }) => {
    const [activeIndex, setActiveInxex] = useState(0);
    
    const handleClick = (index) => {
        setActiveInxex(index)
        setValue(index);
    }

    return (
        <div>
            {tabs.map((t, index) => <Button key={t.id + t.name} variant="outlined" className={activeIndex === index ? "tab-toggler-active" : "tab-toggler-inactive"} onClick={() => handleClick(index)}>
                {t.name}
            </Button>)}
        </div>
    );
};

export default Tabs;
