import { MatxLoadable } from 'matx'

const USSDProductCategories = MatxLoadable({
    loader: () => import('./ProductCategories/index.js'),
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

const ussdRoutes = [
    {
        path: '/ussd-product-categories',
        component: USSDProductCategories
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
    }
]

export default ussdRoutes;