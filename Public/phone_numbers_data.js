document.addEventListener('DOMContentLoaded', function() {
    console.log('[Log] Phone numbers data script loaded');
    
    // Find the Phone Numbers menu item
    const phoneNumbersMenuItem = document.querySelector('div[data-page="phone-numbers"]');
    
    if (phoneNumbersMenuItem) {
        console.log('[Log] Found phone numbers menu item');
        
        phoneNumbersMenuItem.addEventListener('click', function() {
            console.log('[Log] Phone numbers menu item clicked');
            
            // Wait for the page to be rendered
            setTimeout(function() {
                // Check if the phone numbers page exists
                const phoneNumbersPage = document.getElementById('phone-numbers');
                
                if (phoneNumbersPage) {
                    console.log('[Log] Phone numbers page found, creating content');
                    createPhoneNumbersContent(phoneNumbersPage);
                } else {
                    console.error('[Error] Phone numbers page not found after click');
                }
            }, 300);
        });
    } else {
        console.error('[Error] Could not find phone numbers menu item');
    }
    
    // Sample data
    const phoneNumbersData = [
        { 
            id: 1, 
            phoneNumber: '+1 (555) 123-4567', 
            description: 'Sales line', 
            created: '2025-02-15' 
        },
        { 
            id: 2, 
            phoneNumber: '+1 (555) 987-6543', 
            description: 'Support line', 
            created: '2025-02-20' 
        }
    ];
    
    // State variables
    let isEditing = false;
    let currentPhoneId = null;
    
    // Function to create the entire phone numbers page content
    function createPhoneNumbersContent(container) {
        console.log('[Log] Creating phone numbers page content');
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create page structure
        container.innerHTML = `
            <div class="page-header">
                <h2>Phone Numbers</h2>
                <div class="action-buttons">
                    <button id="add-phone-button" class="btn btn-primary">
                        <i class="fas fa-plus"></i> Add Phone Number
                    </button>
                    <button id="refresh-phones-button" class="btn btn-secondary">
                        <i class="fas fa-sync"></i> Refresh
                    </button>
                </div>
            </div>
            
            <div class="page-content">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Phone Number</th>
                            <th>Description</th>
                            <th>Date Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="phone-numbers-table-body">
                        <!-- Phone numbers will be inserted here -->
                    </tbody>
                </table>
            </div>
            
            <!-- Phone Modal -->
            <div id="phone-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Add Phone Number</h3>
                        <span id="close-phone-modal" class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="phone-number">Phone Number</label>
                            <input type="text" id="phone-number" placeholder="Enter phone number">
                        </div>
                        <div class="form-group">
                            <label for="phone-description">Description</label>
                            <input type="text" id="phone-description" placeholder="Enter description">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="close-phone-modal-btn" class="btn btn-secondary">Cancel</button>
                        <button id="save-phone" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        `;
        
        // Get references to the elements we just created
        const tableBody = document.getElementById('phone-numbers-table-body');
        const addButton = document.getElementById('add-phone-button');
        const refreshButton = document.getElementById('refresh-phones-button');
        const phoneModal = document.getElementById('phone-modal');
        const closeModalX = document.getElementById('close-phone-modal');
        const closeModalBtn = document.getElementById('close-phone-modal-btn');
        const savePhoneBtn = document.getElementById('save-phone');
        
        // Set up event listeners
        if (addButton) {
            addButton.addEventListener('click', function() {
                console.log('[Log] Add button clicked');
                openAddPhoneModal();
            });
        }
        
        if (refreshButton) {
            refreshButton.addEventListener('click', function() {
                console.log('[Log] Refresh button clicked');
                displayPhoneNumbers();
            });
        }
        
        if (closeModalX) {
            closeModalX.addEventListener('click', function() {
                console.log('[Log] Close modal X clicked');
                closeModal();
            });
        }
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                console.log('[Log] Close modal button clicked');
                closeModal();
            });
        }
        
        if (savePhoneBtn) {
            savePhoneBtn.addEventListener('click', function() {
                console.log('[Log] Save phone button clicked');
                savePhone();
            });
        }
        
        if (phoneModal) {
            window.addEventListener('click', function(event) {
                if (event.target === phoneModal) {
                    closeModal();
                }
            });
        }
        
        // Display phone numbers
        displayPhoneNumbers();
        
        console.log('[Log] Phone numbers page created successfully');
        
        // Function to display phone numbers
        function displayPhoneNumbers() {
            console.log('[Log] Displaying phone numbers');
            
            // Get fresh reference to table body
            const tableBody = document.getElementById('phone-numbers-table-body');
            
            if (!tableBody) {
                console.error('[Error] Table body not found');
                return;
            }
            
            // Clear existing rows
            tableBody.innerHTML = '';
            
            if (phoneNumbersData.length === 0) {
                const noDataRow = document.createElement('tr');
                noDataRow.innerHTML = `
                    <td colspan="4" class="no-data">No phone numbers found. Click "Add Phone Number" to create one.</td>
                `;
                tableBody.appendChild(noDataRow);
                return;
            }
            
            // Add rows for each phone
            phoneNumbersData.forEach(phone => {
                const row = document.createElement('tr');
                const formattedDate = formatDate(phone.created);
                
                row.innerHTML = `
                    <td>${phone.phoneNumber}</td>
                    <td>${phone.description}</td>
                    <td>${formattedDate}</td>
                    <td>
                        <button class="action-btn edit-phone" data-id="${phone.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-phone" data-id="${phone.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
            
            // Add event listeners to the action buttons
            document.querySelectorAll('.edit-phone').forEach(button => {
                button.addEventListener('click', function() {
                    const phoneId = parseInt(this.getAttribute('data-id'));
                    editPhone(phoneId);
                });
            });
            
            document.querySelectorAll('.delete-phone').forEach(button => {
                button.addEventListener('click', function() {
                    const phoneId = parseInt(this.getAttribute('data-id'));
                    deletePhone(phoneId);
                });
            });
        }
        
        // Function to open add phone modal
        function openAddPhoneModal() {
            console.log('[Log] Opening add phone modal');
            
            const phoneModal = document.getElementById('phone-modal');
            const phoneNumberInput = document.getElementById('phone-number');
            const phoneDescriptionInput = document.getElementById('phone-description');
            
            if (!phoneModal || !phoneNumberInput || !phoneDescriptionInput) {
                console.error('[Error] Modal elements not found');
                return;
            }
            
            // Reset form
            phoneNumberInput.value = '';
            phoneDescriptionInput.value = '';
            
            // Update modal title and button
            const modalTitle = document.querySelector('#phone-modal .modal-header h3');
            const saveButton = document.getElementById('save-phone');
            
            if (modalTitle) modalTitle.textContent = 'Add Phone Number';
            if (saveButton) saveButton.textContent = 'Save';
            
            // Reset editing state
            isEditing = false;
            currentPhoneId = null;
            
            // Show modal
            phoneModal.style.display = 'block';
        }
        
        // Function to edit phone
        function editPhone(phoneId) {
            console.log(`[Log] Editing phone with ID: ${phoneId}`);
            
            const phoneModal = document.getElementById('phone-modal');
            const phoneNumberInput = document.getElementById('phone-number');
            const phoneDescriptionInput = document.getElementById('phone-description');
            
            if (!phoneModal || !phoneNumberInput || !phoneDescriptionInput) {
                console.error('[Error] Modal elements not found');
                return;
            }
            
            // Find phone in data
            const phone = phoneNumbersData.find(p => p.id === phoneId);
            if (!phone) {
                console.error(`[Error] Phone with ID ${phoneId} not found`);
                return;
            }
            
            // Populate form
            phoneNumberInput.value = phone.phoneNumber;
            phoneDescriptionInput.value = phone.description;
            
            // Update modal title and button
            const modalTitle = document.querySelector('#phone-modal .modal-header h3');
            const saveButton = document.getElementById('save-phone');
            
            if (modalTitle) modalTitle.textContent = 'Edit Phone Number';
            if (saveButton) saveButton.textContent = 'Update';
            
            // Set editing state
            isEditing = true;
            currentPhoneId = phoneId;
            
            // Show modal
            phoneModal.style.display = 'block';
        }
        
        // Function to save phone
        function savePhone() {
            console.log('[Log] Saving phone number');
            
            const phoneNumberInput = document.getElementById('phone-number');
            const phoneDescriptionInput = document.getElementById('phone-description');
            
            if (!phoneNumberInput || !phoneDescriptionInput) {
                console.error('[Error] Form inputs not found');
                return;
            }
            
            // Get values
            const phoneNumber = phoneNumberInput.value.trim();
            const description = phoneDescriptionInput.value.trim();
            
            // Validate
            if (!phoneNumber) {
                alert('Please enter a phone number');
                return;
            }
            
            if (isEditing) {
                // Update existing phone
                const index = phoneNumbersData.findIndex(p => p.id === currentPhoneId);
                if (index !== -1) {
                    phoneNumbersData[index].phoneNumber = phoneNumber;
                    phoneNumbersData[index].description = description;
                }
            } else {
                // Add new phone
                const newId = phoneNumbersData.length > 0 
                    ? Math.max(...phoneNumbersData.map(p => p.id)) + 1 
                    : 1;
                
                phoneNumbersData.push({
                    id: newId,
                    phoneNumber: phoneNumber,
                    description: description,
                    created: new Date().toISOString().split('T')[0] // Today's date
                });
            }
            
            // Close modal
            closeModal();
            
            // Refresh display
            displayPhoneNumbers();
        }
        
        // Function to delete phone
        function deletePhone(phoneId) {
            console.log(`[Log] Deleting phone with ID: ${phoneId}`);
            
            // Confirm deletion
            if (!confirm('Are you sure you want to delete this phone number?')) {
                return;
            }
            
            // Remove from data
            const index = phoneNumbersData.findIndex(p => p.id === phoneId);
            if (index !== -1) {
                phoneNumbersData.splice(index, 1);
            }
            
            // Refresh display
            displayPhoneNumbers();
        }
        
        // Function to close modal
        function closeModal() {
            const phoneModal = document.getElementById('phone-modal');
            if (phoneModal) {
                phoneModal.style.display = 'none';
            }
        }
        
        // Function to format date
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    }
});