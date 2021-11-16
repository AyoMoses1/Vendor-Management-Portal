import { MatxLoadable } from 'matx'

const AccountSettings = MatxLoadable({
  loader: () => import('./account-settings'),
})

const settingsRoutes = [
  {
    path: '/user-settings',
    component: AccountSettings,
  },
]
export default settingsRoutes
