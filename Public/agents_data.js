document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the agents page
    const agentsTab = document.getElementById('agents');
    if (!agentsTab) {
        console.log('Agents tab not found, exiting initialization');
        return;
    }

    // API URL
    const API_URL = 'http://localhost:3000/api';
    
    // Array to store agents
    let agents = [];
    
    // Function to get current time
    function check_time() {
        const now = new Date();
        return `Current time: ${now.toLocaleTimeString()}`;
    }
    
    // Safe element selection function
    function getElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with id '${id}' not found`);
        }
        return element;
    }
    
    // Event binding function
    function bindEvent(elementId, eventType, handler) {
        const element = getElement(elementId);
        if (element) {
            element.addEventListener(eventType, handler);
            return true;
        }
        return false;
    }
    
    // Load agents from API
    async function loadAgents() {
        try {
            const response = await fetch(`${API_URL}/agents`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            agents = await response.json();
            
            // Populate agent table
            displayAgentsList();
            
            console.log('Agents loaded:', agents);
        } catch (error) {
            console.error('Error loading agents:', error);
        }
    }
    
    // Display agents in the table
    function displayAgentsList() {
        const agentTable = getElement('agent-table-body');
        if (!agentTable) return;
        
        // Clear existing rows
        agentTable.innerHTML = '';
        
        if (agents.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="3" style="padding: 20px; text-align: center;">No agents found. Create your first agent.</td>
            `;
            agentTable.appendChild(row);
            return;
        }
        
        // Add each agent to the table
        agents.forEach(agent => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding: 10px;">${agent.name}</td>
                <td style="padding: 10px;">${agent.language}</td>
                <td style="padding: 10px;">
                    <button class="phone-action-btn" data-action="open" data-agent-id="${agent.id}">
                        <i class="fas fa-eye"></i> Open
                    </button>
                    <button class="phone-action-btn" data-action="edit" data-agent-id="${agent.id}">
                        <i class="fas fa-pencil-alt"></i> Edit
                    </button>
                    <button class="phone-action-btn" data-action="duplicate" data-agent-id="${agent.id}">
                        <i class="fas fa-copy"></i> Duplicate
                    </button>
                    <button class="phone-action-btn" data-action="delete" data-agent-id="${agent.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                    <button class="phone-action-btn" data-action="favorite" data-agent-id="${agent.id}">
                        <i class="${agent.isFavorite ? 'fas' : 'far'} fa-star"></i> ${agent.isFavorite ? 'Remove Favorite' : 'Add Favorite'}
                    </button>
                </td>
            `;
            agentTable.appendChild(row);
        });
        
        // Add event listeners to the new buttons
        setupActionButtonListeners();
    }
    
    // Create a new agent
    async function createAgent(agentData) {
        try {
            const response = await fetch(`${API_URL}/agents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agentData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const newAgent = await response.json();
            agents.push(newAgent);
            
            displayAgentsList();
            return newAgent;
        } catch (error) {
            console.error('Error creating agent:', error);
            alert('Failed to create agent. Please try again.');
            return null;
        }
    }
    
    // Update an existing agent
    async function updateAgent(id, agentData) {
        try {
            const response = await fetch(`${API_URL}/agents/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agentData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const updatedAgent = await response.json();
            
            // Update the agent in the local array
            const index = agents.findIndex(a => a.id === id);
            if (index !== -1) {
                agents[index] = updatedAgent;
            }
            
            displayAgentsList();
            return updatedAgent;
        } catch (error) {
            console.error('Error updating agent:', error);
            alert('Failed to update agent. Please try again.');
            return null;
        }
    }
    
    // Delete an agent
    async function deleteAgent(id) {
        try {
            const response = await fetch(`${API_URL}/agents/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            // Remove from local array
            agents = agents.filter(a => a.id !== id);
            
            displayAgentsList();
            return true;
        } catch (error) {
            console.error('Error deleting agent:', error);
            alert('Failed to delete agent. Please try again.');
            return false;
        }
    }
    
    // Set up action button event listeners
    function setupActionButtonListeners() {
        const buttons = document.querySelectorAll('.phone-action-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const action = button.getAttribute('data-action');
                const agentId = button.getAttribute('data-agent-id');
                
                if (!action || !agentId) {
                    console.warn('Missing action or agent ID');
                    return;
                }
                
                const agent = agents.find(a => a.id === agentId);
                if (!agent) {
                    console.warn(`Agent with ID "${agentId}" not found`);
                    return;
                }
                
                switch (action) {
                    case 'open':
                        displayAgentDetails(agent);
                        break;
                    case 'edit':
                        openEditModal(agent);
                        break;
                    case 'duplicate':
                        const newAgentData = { ...agent };
                        delete newAgentData.id; // Remove ID for new agent
                        newAgentData.name = `${agent.name} (Copy)`;
                        newAgentData.isFavorite = false;
                        
                        const newAgent = await createAgent(newAgentData);
                        if (newAgent) {
                            alert(`${newAgent.name} duplicated successfully`);
                        }
                        break;
                    case 'delete':
                        if (confirm(`Are you sure you want to delete ${agent.name}?`)) {
                            const success = await deleteAgent(agent.id);
                            if (success) {
                                const detailsPanel = getElement('agent-details');
                                if (detailsPanel) detailsPanel.style.display = 'none';
                                alert(`${agent.name} deleted successfully`);
                            }
                        }
                        break;
                    case 'favorite':
                        const updatedAgent = await updateAgent(agent.id, {
                            isFavorite: !agent.isFavorite
                        });
                        
                        if (updatedAgent) {
                            alert(`${agent.name} ${updatedAgent.isFavorite ? 'added to' : 'removed from'} favorites`);
                        }
                        break;
                }
            });
        });
    }
    
    // Open the edit modal with agent data
    function openEditModal(agent) {
        const modal = getElement('agent-modal');
        if (!modal) return;
        
        modal.style.display = 'block';
        
        const nameField = getElement('new-agent-name');
        if (nameField) nameField.value = agent.name;
        
        const instructionsField = getElement('new-agent-instructions');
        if (instructionsField) instructionsField.value = agent.instructions;
        
        const knowledgeField = getElement('new-agent-knowledge');
        if (knowledgeField) knowledgeField.value = agent.knowledge || '';
        
        const voiceField = getElement('new-agent-voice');
        if (voiceField) voiceField.value = agent.voice;
        
        const languageField = getElement('new-agent-language');
        if (languageField) languageField.value = agent.language;
        
        const previewImage = getElement('new-agent-avatar-preview');
        if (previewImage) {
            if (agent.avatar) {
                previewImage.src = agent.avatar;
                previewImage.style.display = 'block';
            } else {
                previewImage.style.display = 'none';
            }
        }
        
        // Store agent ID for saving
        if (modal) modal.setAttribute('data-editing-agent-id', agent.id);
    }
    
    // Display agent details in the right panel
    function displayAgentDetails(agent) {
        // Update right panel fields
        const nameField = getElement('agent-name');
        if (nameField) nameField.value = agent.name;
        
        const instructionsField = getElement('agent-instructions');
        if (instructionsField) instructionsField.value = agent.instructions;
        
        const knowledgeField = getElement('agent-knowledge');
        if (knowledgeField) knowledgeField.value = agent.knowledge || '';
        
        const voiceField = getElement('agent-voice');
        if (voiceField) voiceField.value = agent.voice;
        
        const languageField = getElement('agent-language');
        if (languageField) languageField.value = agent.language;
        
        const avatarImage = getElement('agent-avatar');
        if (avatarImage) {
            if (agent.avatar) {
                avatarImage.src = agent.avatar;
                avatarImage.style.display = 'block';
            } else {
                avatarImage.style.display = 'none';
            }
        }
        
        const detailsPanel = getElement('agent-details');
        if (detailsPanel) {
            detailsPanel.style.display = 'block';
            // Store agent ID for editing
            detailsPanel.setAttribute('data-agent-id', agent.id);
        }
        
        // Disable fields (read-only mode)
        if (nameField) nameField.readOnly = true;
        if (instructionsField) instructionsField.readOnly = true;
        if (knowledgeField) knowledgeField.readOnly = true;
        if (voiceField) voiceField.disabled = true;
        if (languageField) languageField.disabled = true;
        
        const settingField = getElement('agent-setting');
        if (settingField) settingField.disabled = true;
        
        const volumeSlider = getElement('volume-slider');
        if (volumeSlider) volumeSlider.disabled = true;
        
        const speedSlider = getElement('speed-slider');
        if (speedSlider) speedSlider.disabled = true;
        
        // Button display states
        function setElementDisplay(id, displayValue) {
            const element = getElement(id);
            if (element) element.style.display = displayValue;
        }
        
        setElementDisplay('edit-avatar', 'block');
        setElementDisplay('agent-avatar-upload', 'none');
        setElementDisplay('save-agent-details', 'none');
        setElementDisplay('cancel-edit-agent', 'none');
        setElementDisplay('duplicate-agent', 'none');
        setElementDisplay('edit-agent', 'block');
        setElementDisplay('delete-agent', 'block');
        setElementDisplay('toggle-favorite', 'block');
        
        // Update favorite button
        const favoriteButton = getElement('toggle-favorite');
        if (favoriteButton) {
            const icon = favoriteButton.querySelector('i');
            if (icon) icon.className = agent.isFavorite ? 'fas fa-star' : 'far fa-star';
            favoriteButton.textContent = agent.isFavorite ? 'Remove Favorite' : 'Add Favorite';
        }
    }
    
    // Add Agent Button
    bindEvent('create-new-agent', 'click', () => {
        const modal = getElement('agent-modal');
        if (!modal) return;
        
        // Clear the editing ID
        modal.removeAttribute('data-editing-agent-id');
        
        modal.style.display = 'block';
        
        // Reset modal fields
        const nameField = getElement('new-agent-name');
        if (nameField) nameField.value = '';
        
        const instructionsField = getElement('new-agent-instructions');
        if (instructionsField) instructionsField.value = '';
        
        const knowledgeField = getElement('new-agent-knowledge');
        if (knowledgeField) knowledgeField.value = '';
        
        const voiceField = getElement('new-agent-voice');
        if (voiceField) voiceField.value = 'cimo';
        
        const languageField = getElement('new-agent-language');
        if (languageField) languageField.value = 'en';
        
        const previewImage = getElement('new-agent-avatar-preview');
        if (previewImage) {
            previewImage.style.display = 'none';
            previewImage.src = '';
        }
    });
    
    // Handle Image Upload in Modal
    bindEvent('new-agent-avatar', 'change', (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const preview = getElement('new-agent-avatar-preview');
                if (preview) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                }
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a JPEG or PNG file.');
            const uploadField = getElement('new-agent-avatar');
            if (uploadField) uploadField.value = '';
        }
    });
    
    // Close Modal
    bindEvent('close-modal', 'click', () => {
        const modal = getElement('agent-modal');
        if (modal) modal.style.display = 'none';
    });
    
    // Save Agent
    bindEvent('save-agent', 'click', async () => {
        // Get form values
        const name = getElement('new-agent-name')?.value || '';
        const instructions = getElement('new-agent-instructions')?.value || '';
        const knowledge = getElement('new-agent-knowledge')?.value || '';
        const voice = getElement('new-agent-voice')?.value || 'cimo';
        const language = getElement('new-agent-language')?.value || 'en';
        
        let avatar = '';
        const avatarInput = getElement('new-agent-avatar');
        const avatarPreview = getElement('new-agent-avatar-preview');
        if (avatarInput?.files[0] && avatarPreview) {
            avatar = avatarPreview.src;
        }
        
        if (!name || !instructions) {
            alert('Please enter a name and instructions.');
            return;
        }
        
        const agentData = {
            name,
            instructions: instructions.includes('#At the beginning of every call: Run (check_time())') 
                ? instructions 
                : `${instructions}\n#At the beginning of every call: Run (check_time())`,
            knowledge,
            voice,
            language,
            avatar
        };
        
        const modal = getElement('agent-modal');
        const editingId = modal?.getAttribute('data-editing-agent-id');
        
        let result;
        
        if (editingId) {
            // Update existing agent
            result = await updateAgent(editingId, agentData);
        } else {
            // Create new agent
            result = await createAgent(agentData);
        }
        
        if (result) {
            // Close and reset modal
            if (modal) modal.style.display = 'none';
            
            // Reset form fields
            const nameField = getElement('new-agent-name');
            if (nameField) nameField.value = '';
            
            const instructionsField = getElement('new-agent-instructions');
            if (instructionsField) instructionsField.value = '';
            
            const knowledgeField = getElement('new-agent-knowledge');
            if (knowledgeField) knowledgeField.value = '';
            
            const voiceField = getElement('new-agent-voice');
            if (voiceField) voiceField.value = 'cimo';
            
            const languageField = getElement('new-agent-language');
            if (languageField) languageField.value = 'en';
            
            const avatarField = getElement('new-agent-avatar');
            if (avatarField) avatarField.value = '';
            
            const previewImage = getElement('new-agent-avatar-preview');
            if (previewImage) {
                previewImage.style.display = 'none';
                previewImage.src = '';
            }
        }
    });
    
    // Edit Agent Button
    bindEvent('edit-agent', 'click', () => {
        const detailsPanel = getElement('agent-details');
        if (!detailsPanel) return;
        
        const agentId = detailsPanel.getAttribute('data-agent-id');
        if (!agentId) return;
        
        const agent = agents.find(a => a.id === agentId);
        if (agent) {
            openEditModal(agent);
        }
    });
    
    // Update Favorite Status
    bindEvent('toggle-favorite', 'click', async () => {
        const detailsPanel = getElement('agent-details');
        if (!detailsPanel) return;
        
        const agentId = detailsPanel.getAttribute('data-agent-id');
        if (!agentId) return;
        
        const agent = agents.find(a => a.id === agentId);
        if (agent) {
            const updatedAgent = await updateAgent(agent.id, {
                isFavorite: !agent.isFavorite
            });
            
            if (updatedAgent) {
                // Update the display
                displayAgentDetails(updatedAgent);
                alert(`${agent.name} ${updatedAgent.isFavorite ? 'added to' : 'removed from'} favorites`);
            }
        }
    });
    
    // Delete Agent from details panel
    bindEvent('delete-agent', 'click', async () => {
        const detailsPanel = getElement('agent-details');
        if (!detailsPanel) return;
        
        const agentId = detailsPanel.getAttribute('data-agent-id');
        if (!agentId) return;
        
        const agent = agents.find(a => a.id === agentId);
        if (agent && confirm(`Are you sure you want to delete ${agent.name}?`)) {
            const success = await deleteAgent(agent.id);
            if (success) {
                detailsPanel.style.display = 'none';
                alert(`${agent.name} deleted successfully`);
            }
        }
    });
    
    // Load agents when the page loads
    loadAgents();
});