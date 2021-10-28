import { MatxLoadable } from 'matx'

const UserInfo = MatxLoadable({
  loader: () => import('./user-details'),
})

const User = MatxLoadable({
  loader: () => import('./Users'),
})

const NewUser = MatxLoadable({
  loader: () => import('./CreateUser'),
})

const EditUser = MatxLoadable({
  loader: () => import('./EditUser'),
})

const userRoutes = [
  {
    path: '/user/details',
    component: UserInfo,
  },
  {
    path: '/users/',
    component: User,
  },
  {
    path: '/user/edit',
    component: EditUser,
  },
  {
    path: '/user/new',
    component: NewUser,
  },
]

export default userRoutes
