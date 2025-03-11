// voicebot-dashboard/public/webhooks_data.js
document.addEventListener('DOMContentLoaded', () => {
    // Add Webhook Button
    document.getElementById('add-webhook').addEventListener('click', () => {
        document.getElementById('webhook-modal').style.display = 'block';
    });

    // Close Webhook Modal
    document.getElementById('close-webhook-modal').addEventListener('click', () => {
        document.getElementById('webhook-modal').style.display = 'none';
    });

    // Save Webhook
    document.getElementById('save-webhook').addEventListener('click', () => {
        const name = document.getElementById('webhook-name').value;
        const url = document.getElementById('webhook-url').value;
        const events = document.getElementById('webhook-events').value;
        if (name && url) {
            const apiCards = document.querySelector('.form-card');
            const newCard = document.createElement('div');
            newCard.className = 'api-card';
            newCard.innerHTML = `
                <div class="api-icon">
                    <i class="fas fa-link"></i>
                </div>
                <div class="api-info">
                    <div class="api-title">${name}</div>
                    <div class="api-status">${url}</div>
                </div>
                <div class="api-action">
                    <button class="phone-action-btn"><i class="fas fa-pencil-alt"></i></button>
                    <button class="phone-action-btn"><i class="fas fa-trash"></i></button>
                    <button class="phone-action-btn" style="background-color: var(--primary-color); color: white; border-color: var(--primary-color);"><i class="fas fa-play"></i></button>
                </div>
            `;
            apiCards.insertBefore(newCard, apiCards.querySelector('button'));
            document.getElementById('webhook-modal').style.display = 'none';
            // Reset form
            document.getElementById('webhook-name').value = '';
            document.getElementById('webhook-url').value = '';
            document.getElementById('webhook-events').value = '';
        } else {
            alert('Please enter a name and URL.');
        }
    });

    // Handle Action Buttons (Edit, Delete, Test)
    document.querySelectorAll('.api-action .phone-action-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.querySelector('i').className.includes('fa-pencil-alt') ? 'edit' :
                                        e.target.querySelector('i').className.includes('fa-trash') ? 'delete' : 'test';
            const apiCard = e.target.closest('.api-card');
            const title = apiCard.querySelector('.api-title').textContent;
            if (action === 'edit') {
                alert(`Edit webhook ${title}`);
                // Open modal with webhook data pre-filled
                document.getElementById('webhook-modal').style.display = 'block';
                document.getElementById('webhook-name').value = title;
                document.getElementById('webhook-url').value = apiCard.querySelector('.api-status').textContent;
                document.getElementById('webhook-events').value = ''; // Add logic to retrieve events if stored
            } else if (action === 'delete') {
                if (confirm(`Are you sure you want to delete ${title}?`)) {
                    apiCard.remove();
                    alert(`${title} deleted successfully`);
                }
            } else if (action === 'test') {
                alert(`Testing webhook ${title}`);
            }
        });
    });
});