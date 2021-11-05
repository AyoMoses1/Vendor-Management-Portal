import { MatxLoadable } from 'matx'

const Agents = MatxLoadable({
  loader: () => import('./Agents'),
})

const AgentsInfo = MatxLoadable({
  loader: () => import('./AgentInfo'),
})

const agentsRoutes = [
  {
    path: '/agents',
    component: Agents,
  },
  {
    path: '/agent/:id',
    component: AgentsInfo,
  },
]
export default agentsRoutes
