const routes = {
    agentApplicationRoute: '/afrimash/agent-applications',
    approveApplicationRoute: '/afrimash/agents/approval',
    deleteAgentRoute: (id) => `/afrimash/agents/${id}`,
    transferCustomer: (sourceAgentId, receivingAgentId) => `/afrimash/agents/${sourceAgentId}/move-customers/${receivingAgentId}`
    
}

export default routes;