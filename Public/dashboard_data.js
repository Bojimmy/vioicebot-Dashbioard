// dashboard_data.js
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the dashboard page
    const dashboardTab = document.getElementById('dashboard');
    if (!dashboardTab) {
        console.log('Dashboard tab not found, exiting initialization');
        return;
    }

    // API URL
    const API_URL = 'http://localhost:3000/api';
    
    // Dashboard metrics
    let totalAgents = 0;
    let totalCalls = 0;
    let callsToday = 0;
    let averageCallDuration = 0;
    let successRate = 0;
    
    // Safe element selection function
    function getElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with id '${id}' not found`);
        }
        return element;
    }
    
    // Load dashboard data
    async function loadDashboardData() {
        try {
            // Load agents
            const agentsResponse = await fetch(`${API_URL}/agents`);
            if (!agentsResponse.ok) {
                throw new Error(`HTTP error! Status: ${agentsResponse.status}`);
            }
            const agents = await agentsResponse.json();
            totalAgents = agents.length;
            
            // Load call history
            const callsResponse = await fetch(`${API_URL}/call-history`);
            if (!callsResponse.ok) {
                throw new Error(`HTTP error! Status: ${callsResponse.status}`);
            }
            const calls = await callsResponse.json();
            totalCalls = calls.length;
            
            // Calculate calls today
            const today = new Date().toISOString().split('T')[0];
            callsToday = calls.filter(call => 
                call.timestamp.startsWith(today)
            ).length;
            
            // Calculate average call duration (of completed calls)
            const completedCalls = calls.filter(call => call.status === 'completed');
            if (completedCalls.length > 0) {
                const totalDuration = completedCalls.reduce((sum, call) => sum + call.duration, 0);
                averageCallDuration = Math.round(totalDuration / completedCalls.length);
            }
            
            // Calculate success rate
            successRate = totalCalls > 0 
                ? Math.round((completedCalls.length / totalCalls) * 100) 
                : 0;
            
            // Update dashboard UI
            updateDashboard();
            
            console.log('Dashboard data loaded');
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    }
    
    // Update dashboard UI with data
    function updateDashboard() {
        const dashboardGrid = getElement('dashboard-grid');
        if (!dashboardGrid) return;
        
        dashboardGrid.innerHTML = `
            <div class="dashboard-metrics">
                <div class="metric-card">
                    <h4>Total Agents</h4>
                    <div class="metric-value">${totalAgents}</div>
                </div>
                <div class="metric-card">
                    <h4>Total Calls</h4>
                    <div class="metric-value">${totalCalls}</div>
                </div>
                <div class="metric-card">
                    <h4>Calls Today</h4>
                    <div class="metric-value">${callsToday}</div>
                </div>
                <div class="metric-card">
                    <h4>Avg. Call Duration</h4>
                    <div class="metric-value">${formatDuration(averageCallDuration)}</div>
                </div>
                <div class="metric-card">
                    <h4>Success Rate</h4>
                    <div class="metric-value">${successRate}%</div>
                </div>
            </div>
            <div class="dashboard-charts">
                <div class="chart-container">
                    <h4>Recent Calls (Last 7 Days)</h4>
                    <canvas id="recent-calls-chart"></canvas>
                </div>
                <div class="chart-container">
                    <h4>Call Status Distribution</h4>
                    <canvas id="status-distribution-chart"></canvas>
                </div>
            </div>
        `;
        
        // Load charts (we'd need to implement this with a library like Chart.js)
    }
    
    // Format duration in seconds to mm:ss
    function formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Add CSS for dashboard
    function addDashboardStyles() {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            .dashboard-metrics {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .metric-card {
                background-color: var(--card-bg);
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                text-align: center;
            }
            
            .metric-card h4 {
                margin: 0 0 10px 0;
                color: var(--text-muted);
                font-size: 14px;
                font-weight: 500;
            }
            
            .metric-value {
                font-size: 28px;
                font-weight: 600;
                color: var(--primary-color);
            }
            
            .dashboard-charts {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 20px;
            }
            
            .chart-container {
                background-color: var(--card-bg);
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            }
            
            .chart-container h4 {
                margin: 0 0 20px 0;
                color: var(--dark-color);
                font-size: 16px;
                font-weight: 500;
            }
            
            canvas {
                width: 100% !important;
                height: 250px !important;
            }
            
            @media (max-width: 768px) {
                .dashboard-charts {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    // Add refresh button
    function addRefreshButton() {
        const pageHeader = document.querySelector('.page-header');
        if (!pageHeader) return;
        
        const refreshButton = document.createElement('button');
        refreshButton.className = 'action-btn';
        refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
        refreshButton.style.marginLeft = '10px';
        
        refreshButton.addEventListener('click', () => {
            loadDashboardData();
        });
        
        pageHeader.appendChild(refreshButton);
    }
    
    // Initialize dashboard
    function initDashboard() {
        // Add dashboard grid container if it doesn't exist
        const dashboardContainer = getElement('dashboard');
        if (dashboardContainer) {
            if (!getElement('dashboard-grid')) {
                const gridDiv = document.createElement('div');
                gridDiv.id = 'dashboard-grid';
                dashboardContainer.querySelector('.form-card').appendChild(gridDiv);
            }
        }
        
        addDashboardStyles();
        addRefreshButton();
        loadDashboardData();
    }
    
    initDashboard();
});