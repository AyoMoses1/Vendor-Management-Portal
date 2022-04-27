const routes = {
    agentApplicationRoute: '/afrimash/agent-applications',
    approveApplicationRoute: '/afrimash/agents/approval',
    deleteAgentRoute: (id) => `/afrimash/agents/${id}`,
    transferCustomer: (sourceAgentId, receivingAgentId) => `/afrimash/agents/${sourceAgentId}/move-customers/${receivingAgentId}`,
    ussdProductCategories: '/afrimash/USSD/product-categories/search',
    featureProductCategoriesUssd: '/afrimash/product-categories/feature-on-ussd',
    featureProductUssd: '/afrimash/products/feature-on-ussd',
    ussdProducts: (catId) => `/afrimash/USSD/product-categories/${catId}/products`
    
}

export default routes;