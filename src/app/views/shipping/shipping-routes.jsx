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

const ShippingOptionsDetails = MatxLoadable({
  loader: () => import('./ShippingOptions/ShippinpOptionsDetails'),
})

const CreateShippingZones = MatxLoadable({
  loader: () => import('./ShippingZones/CreateShippingZone'),
})

const GetAllShippingZones = MatxLoadable({
  loader: () => import('./ShippingZones/GetAllShippingZones'),
})

const GetShippingZoneDetails = MatxLoadable({
  loader: () => import('./ShippingZones/GetShippingZoneDetails'),
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
    path: '/shipping-option/new',
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
  {
    path: '/shipping-option/details',
    component: ShippingOptionsDetails,
  },
  {
    path: '/shipping-zone/details',
    component: GetShippingZoneDetails,
  },
]
export default shippingRoutes
