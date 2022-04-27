import { MatxLoadable } from 'matx'

const USSDProductCategories = MatxLoadable({
    loader: () => import('./ProductCategories/index.js'),
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
        path: '/ussd-products',
        component: USSDProduct
    }
]

export default ussdRoutes;