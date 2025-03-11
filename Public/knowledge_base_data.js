// voicebot-dashboard/public/knowledge_base_data.js
document.addEventListener('DOMContentLoaded', () => {
    // Add Knowledge Item Button
    document.getElementById('add-knowledge-item').addEventListener('click', () => {
        document.getElementById('knowledge-modal').style.display = 'block';
    });

    // Close Knowledge Modal
    document.getElementById('close-knowledge-modal').addEventListener('click', () => {
        document.getElementById('knowledge-modal').style.display = 'none';
    });

    // Save Knowledge Item
    document.getElementById('save-knowledge').addEventListener('click', () => {
        const title = document.getElementById('knowledge-title').value;
        const source = document.getElementById('knowledge-source').value;
        const date = document.getElementById('knowledge-date').value;
        if (title && source) {
            const kbList = document.querySelector('.kb-list');
            const newItem = document.createElement('div');
            newItem.className = 'kb-item';
            newItem.innerHTML = `
                    <div class="kb-details">
                    <div class="kb-title">${title}</div>
                    <div class="kb-meta">
                            <span class="kb-meta-item"><i class="fas fa-file"></i> ${source}</span>
                            <span class="kb-meta-item"><i class="fas fa-clock"></i> ${date || 'Not specified'}</span>
                    </div>
                    </div>
                    <div class="kb-actions">
                    <button class="phone-action-btn"><i class="fas fa-eye"></i></button>
                    <button class="phone-action-btn"><i class="fas fa-trash"></i></button>
                    </div>
            `;
            kbList.appendChild(newItem);
            document.getElementById('knowledge-modal').style.display = 'none';
            // Reset form
            document.getElementById('knowledge-title').value = '';
            document.getElementById('knowledge-source').value = '';
            document.getElementById('knowledge-date').value = '';
        } else {
            alert('Please enter a title and source.');
        }
    });

    // Handle Action Buttons (View, Delete)
    document.querySelectorAll('.kb-actions .phone-action-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.querySelector('i').className.includes('fa-eye') ? 'view' : 'delete';
            if (action === 'view') {
                alert('View knowledge item details');
            } else if (action === 'delete') {
                if (confirm('Are you sure you want to delete this knowledge item?')) {
                    e.target.closest('.kb-item').remove();
                    alert('Knowledge item deleted successfully');
                }
            }
        });
    });
});