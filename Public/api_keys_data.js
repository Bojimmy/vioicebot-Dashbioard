// voicebot-dashboard/public/api_keys_data.js
document.addEventListener('DOMContentLoaded', () => {
    // Add API Key Button
    document.getElementById('add-api-key').addEventListener('click', () => {
        document.getElementById('api-key-modal').style.display = 'block';
    });

    // Close API Key Modal
    document.getElementById('close-api-key-modal').addEventListener('click', () => {
        document.getElementById('api-key-modal').style.display = 'none';
    });

    // Save API Key
    document.getElementById('save-api-key').addEventListener('click', () => {
        const name = document.getElementById('api-key-name').value;
        const permissions = document.getElementById('api-key-permissions').value;
        if (name) {
            const apiCards = document.querySelector('.form-card');
            const newCard = document.createElement('div');
            newCard.className = 'api-card';
            newCard.innerHTML = `
                <div class="api-icon">
                    <i class="fas fa-key"></i>
                </div>
                <div class="api-info">
                    <div class="api-title">${name}</div>
                    <div class="api-status">...............${Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
                </div>
                <div class="api-action">
                    <button class="phone-action-btn"><i class="fas fa-eye"></i></button>
                    <button class="phone-action-btn"><i class="fas fa-copy"></i></button>
                    <button class="phone-action-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            apiCards.insertBefore(newCard, apiCards.querySelector('button'));
            document.getElementById('api-key-modal').style.display = 'none';
            // Reset form
            document.getElementById('api-key-name').value = '';
            document.getElementById('api-key-permissions').value = '';
        } else {
            alert('Please enter a name.');
        }
    });

    // Handle Action Buttons (View, Copy, Delete)
    document.querySelectorAll('.api-action .phone-action-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.querySelector('i').className.includes('fa-eye') ? 'view' :
                                        e.target.querySelector('i').className.includes('fa-copy') ? 'copy' : 'delete';
            const apiCard = e.target.closest('.api-card');
            const title = apiCard.querySelector('.api-title').textContent;
            if (action === 'view') {
                alert(`View details for ${title}`);
            } else if (action === 'copy') {
                alert(`Copied key for ${title} to clipboard`);
            } else if (action === 'delete') {
                if (confirm(`Are you sure you want to delete ${title}?`)) {
                    apiCard.remove();
                    alert(`${title} deleted successfully`);
                }
            }
        });
    });
});