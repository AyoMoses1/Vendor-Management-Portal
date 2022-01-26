import { MatxLoadable } from 'matx'

const GetAllShippingClass = MatxLoadable({
  loader: () => import('./ShippingClass/GetAllShippingClass'),
})

const GetAllShippingOptions = MatxLoadable({
  loader: () => import('./ShippingOptions/GetAllShippingOptions'),
})

const CreateShippingClass = MatxLoadable({
  loader: () => import('./ShippingClass/CreateShippingClass'),
})

const CreateShippingOptions = MatxLoadable({
  loader: () => import('./ShippingOptions/CreateShippingOptions'),
})

const CreateShippingZones = MatxLoadable({
  loader: () => import('./ShippingZones/CreateShippingZone'),
})

const GetAllShippingZones = MatxLoadable({
  loader: () => import('./ShippingZones/GetAllShippingZones'),
})

const shippingRoutes = [
  {
    path: '/shipping-classes',
    component: GetAllShippingClass,
  },
  {
    path: '/shipping-options',
    component: GetAllShippingOptions,
  },
  {
    path: '/shipping-class/new',
    component: CreateShippingClass,
  },
  {
    path: '/shipping-options/new',
    component: CreateShippingOptions,
  },
  {
    path: '/shipping-zones/new',
    component: CreateShippingZones,
  },
  {
    path: '/shipping-zones',
    component: GetAllShippingZones,
  },
]
export default shippingRoutes
