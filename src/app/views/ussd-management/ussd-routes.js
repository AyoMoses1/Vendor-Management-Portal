import { MatxLoadable } from 'matx'

const USSDFeaturedCategories = MatxLoadable({
    loader: () => import('./FeaturedCategories/index.js'),
})

const DOCPickupCenters = MatxLoadable({
    loader: () => import('./DOCPickupCenters/index.js'),
})

const PickupCenter = MatxLoadable({
    loader: () => import('./PickupCenter/index.js'),
})

const USSDProduct = MatxLoadable({
    loader: () => import('./Products/index.js'),
})

const USSDSpecialOrders =  MatxLoadable({
    loader: () => import('./SpecialOrders/index.js'),
})

const USSDSpecialOrder = MatxLoadable({
    loader: () => import('./SpecialOrder/index.js'),
})
const ussdRoutes = [
    {
        path: '/ussd-featured-categories',
        component: USSDFeaturedCategories
    },
    {
        path: '/doc-pickup-centers',
        component: DOCPickupCenters
    },
    {
        path: '/pickup-center',
        component: PickupCenter
    },
    {
        path: '/ussd-products',
        component: USSDProduct
    },
    {
        path: '/ussd-special-orders',
        component: USSDSpecialOrders
    },
    {
        path: '/special-order',
        component: USSDSpecialOrder
    }
]

export default ussdRoutes;