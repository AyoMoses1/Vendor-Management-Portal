import { MatxLoadable } from 'matx'

const Agents = MatxLoadable({
  loader: () => import('./Agents'),
})

const AgentsInfo = MatxLoadable({
  loader: () => import('./AgentInfo'),
})

const NewAgent = MatxLoadable({
  loader: () => import('./NewAgent'),
})

const EditAgent = MatxLoadable({
  loader: () => import('./EditAgent'),
})

const agentsRoutes = [
  {
    path: '/agents',
    component: Agents,
  },
  {
    path: '/agent/details',
    component: AgentsInfo,
  },
  {
    path: '/agent/new',
    component: NewAgent,
  },
  {
    path: '/agent/edit',
    component: EditAgent,
  },
]
export default agentsRoutes
