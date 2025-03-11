// voicebot-dashboard/public/settings_data.js
document.addEventListener('DOMContentLoaded', () => {
    // Save Account Settings
    document.getElementById('save-account-settings').addEventListener('click', () => {
        const name = document.getElementById('account-name').value;
        const email = document.getElementById('account-email').value;
        const timezone = document.getElementById('account-timezone').value;
        if (name && email) {
            alert('Account settings saved successfully');
        } else {
            alert('Please enter a name and email.');
        }
    });

    // Update Password
    document.getElementById('update-password').addEventListener('click', () => {
        const current = document.getElementById('current-password').value;
        const newPass = document.getElementById('new-password').value;
        const confirm = document.getElementById('confirm-password').value;
        if (current && newPass && confirm && newPass === confirm) {
            alert('Password updated successfully');
            // Reset form
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-password').value = '';
        } else {
            alert('Please fill in all fields and ensure passwords match.');
        }
    });

    // Add User Button
    document.getElementById('add-user').addEventListener('click', () => {
        document.getElementById('user-modal').style.display = 'block';
    });

    // Close User Modal
    document.getElementById('close-user-modal').addEventListener('click', () => {
        document.getElementById('user-modal').style.display = 'none';
    });

    // Save User
    document.getElementById('save-user').addEventListener('click', () => {
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        const role = document.getElementById('user-role').value;
        if (name && email) {
            alert(`User ${name} saved successfully as ${role}`);
            document.getElementById('user-modal').style.display = 'none';
            // Reset form
            document.getElementById('user-name').value = '';
            document.getElementById('user-email').value = '';
            document.getElementById('user-role').value = 'admin';
        } else {
            alert('Please enter a name and email.');
        }
    });
});