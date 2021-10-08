import React, { useState } from 'react'
import { Divider, Tab, Tabs } from '@material-ui/core'
import { Breadcrumb } from 'matx'
import SellerInfo from './SellerInfo'
import SellerShop from "../sellers/shops/SellerShop"

const SellerViewer = ({location}) => {
    const {id} = location.state
    const [tabIndex, setTabIndex] = useState(0)

    const handleTabChange = (e, value) => {
        setTabIndex(value)
    }

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Sellers', path: '/vendors' },
                        { name: 'View Seller' },
                    ]}
                />
            </div>
            <Tabs
                className="mt-4"
                value={tabIndex}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
            >
                {tabList.map((item, ind) => (
                    <Tab
                        className="capitalize"
                        value={ind}
                        label={item}
                        key={ind}
                    />
                ))}
            </Tabs>
            <Divider className="mb-6" />

            {tabIndex === 0 && <SellerInfo id={id} />}
            {tabIndex === 1 && <SellerShop id={id} />}
        </div>
    )
}

const tabList = ['Details', 'Shops']

export default SellerViewer

