// voicebot-dashboard/public/batch_calls_data.js
document.addEventListener('DOMContentLoaded', () => {
    // Add Batch Call Button
    document.getElementById('add-batch-call').addEventListener('click', () => {
        document.getElementById('batch-call-modal').style.display = 'block';
    });

    // Close Batch Call Modal
    document.getElementById('close-batch-call-modal').addEventListener('click', () => {
        document.getElementById('batch-call-modal').style.display = 'none';
    });

    // Save Batch Call
    document.getElementById('save-batch-call').addEventListener('click', () => {
        const name = document.getElementById('batch-call-name').value;
        const agent = document.getElementById('batch-call-agent').value;
        const numbers = document.getElementById('batch-call-numbers').value;
        const script = document.getElementById('batch-call-script').value;
        const schedule = document.getElementById('batch-call-schedule').value;
        if (name && numbers) {
            const batchList = document.querySelector('.batch-call-list');
            const newItem = document.createElement('div');
            newItem.className = 'batch-call-item';
            newItem.innerHTML = `
                <div class="batch-call-details">
                    <div class="batch-call-title">${name}</div>
                    <div class="batch-call-meta">
                        <span class="batch-call-meta-item"><i class="fas fa-user"></i> ${agent}</span>
                        <span class="batch-call-meta-item"><i class="fas fa-clock"></i> Scheduled: ${schedule || 'Not specified'}</span>
                        <span class="batch-call-meta-item"><i class="fas fa-circle" style="color: #f59e0b;"></i> Pending</span>
                    </div>
                </div>
                <div class="batch-call-actions">
                    <button class="phone-action-btn"><i class="fas fa-play"></i></button>
                    <button class="phone-action-btn"><i class="fas fa-stop"></i></button>
                    <button class="phone-action-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            batchList.appendChild(newItem);
            document.getElementById('batch-call-modal').style.display = 'none';
            // Reset form
            document.getElementById('batch-call-name').value = '';
            document.getElementById('batch-call-agent').value = 'dana';
            document.getElementById('batch-call-numbers').value = '';
            document.getElementById('batch-call-script').value = '';
            document.getElementById('batch-call-schedule').value = '';
        } else {
            alert('Please enter a name and phone numbers.');
        }
    });

    // Handle Action Buttons (Start, Stop, Delete)
    document.querySelectorAll('.batch-call-actions .phone-action-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.querySelector('i').className.includes('fa-play') ? 'start' :
                                        e.target.querySelector('i').className.includes('fa-stop') ? 'stop' : 'delete';
            const batchItem = e.target.closest('.batch-call-item');
            const title = batchItem.querySelector('.batch-call-title').textContent;
            if (action === 'start') {
                alert(`Starting batch call ${title}`);
                batchItem.querySelector('.batch-call-meta-item:last-child').innerHTML = '<i class="fas fa-circle" style="color: #10b981;"></i> Running';
            } else if (action === 'stop') {
                alert(`Stopping batch call ${title}`);
                batchItem.querySelector('.batch-call-meta-item:last-child').innerHTML = '<i class="fas fa-circle" style="color: #ef4444;"></i> Stopped';
            } else if (action === 'delete') {
                if (confirm(`Are you sure you want to delete ${title}?`)) {
                    batchItem.remove();
                    alert(`${title} deleted successfully`);
                }
            }
        });
    });
});