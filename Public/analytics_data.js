// voicebot-dashboard/public/analytics_data.js
document.addEventListener('DOMContentLoaded', () => {
    // Export Analytics Report
    document.getElementById('export-analytics').addEventListener('click', () => {
        const dateRange = document.getElementById('analytics-date-range').value;
        alert(`Exporting analytics report for ${dateRange || 'all dates'}`);
    });
});