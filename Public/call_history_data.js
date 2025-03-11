// voicebot-dashboard/public/call_history_data.js
document.addEventListener('DOMContentLoaded', () => {
    // Handle Action Buttons (View, Download)
    document.querySelectorAll('.phone-action-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.querySelector('i').className.includes('fa-eye') ? 'view' : 'download';
            if (action === 'view') {
                alert('View call details');
            } else if (action === 'download') {
                alert('Download call transcript');
            }
        });
    });
});