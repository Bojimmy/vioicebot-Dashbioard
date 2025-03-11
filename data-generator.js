// data-generator.js
const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000/api';
const NUM_AGENTS = 5;
const NUM_KNOWLEDGE_ITEMS = 15;
const NUM_PHONE_NUMBERS = 8;
const NUM_CALLS = 50;

// Sample data
const agentNames = ['Sales Bot', 'Customer Service Bot', 'HR Assistant', 'Technical Support', 'Appointment Scheduler'];
const languages = ['en', 'es', 'fr', 'de', 'it'];
const voiceOptions = ['cimo', 'rachel', 'juan', 'sofia'];
const knowledgeTitles = ['Product FAQ', 'Return Policy', 'Employee Handbook', 'Troubleshooting Guide', 'Company History'];

// Generate random phone number
function generatePhoneNumber() {
    return '+1' + Math.floor(1000000000 + Math.random() * 9000000000);
}

// Create agents
async function createAgents() {
    console.log('Creating agents...');
    const createdAgents = [];

    for (let i = 0; i < NUM_AGENTS; i++) {
        const agent = {
            name: agentNames[i % agentNames.length] + ' ' + (i + 1),
            instructions: `You are the ${agentNames[i % agentNames.length]} for our company. Help customers with their questions.`,
            knowledge: `Sample knowledge base for ${agentNames[i % agentNames.length]}.`,
            voice: voiceOptions[Math.floor(Math.random() * voiceOptions.length)],
            language: languages[Math.floor(Math.random() * languages.length)],
            isFavorite: Math.random() > 0.7 // 30% chance of being favorite
        };

        try {
            const response = await axios.post(`${BASE_URL}/agents`, agent);
            createdAgents.push(response.data);
            console.log(`Created agent: ${agent.name}`);
        } catch (error) {
            console.error('Error creating agent:', error.message);
        }
    }

    return createdAgents;
}

// Create knowledge items
async function createKnowledgeItems() {
    console.log('Creating knowledge items...');

    for (let i = 0; i < NUM_KNOWLEDGE_ITEMS; i++) {
        const item = {
            title: knowledgeTitles[i % knowledgeTitles.length] + ' ' + (i + 1),
            content: `This is sample content for ${knowledgeTitles[i % knowledgeTitles.length]}. It contains important information that agents can use when interacting with customers.`
        };

        try {
            await axios.post(`${BASE_URL}/knowledge`, item);
            console.log(`Created knowledge item: ${item.title}`);
        } catch (error) {
            console.error('Error creating knowledge item:', error.message);
        }
    }
}

// Create phone numbers
async function createPhoneNumbers() {
    console.log('Creating phone numbers...');

    for (let i = 0; i < NUM_PHONE_NUMBERS; i++) {
        const phoneNumber = {
            number: generatePhoneNumber(),
            description: `Office line ${i + 1}`
        };

        try {
            await axios.post(`${BASE_URL}/phone-numbers`, phoneNumber);
            console.log(`Created phone number: ${phoneNumber.number}`);
        } catch (error) {
            console.error('Error creating phone number:', error.message);
        }
    }
}

// Create call history (with random agents)
async function createCallHistory(agents) {
    console.log('Creating call history...');

    for (let i = 0; i < NUM_CALLS; i++) {
        // Create calls spread over the last 30 days
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));

        const call = {
            phoneNumber: generatePhoneNumber(),
            agentId: agents[Math.floor(Math.random() * agents.length)].id,
            timestamp: date.toISOString()
        };

        try {
            await axios.post(`${BASE_URL}/call-history/simulate`, call);
            console.log(`Created call record ${i + 1}`);
        } catch (error) {
            console.error('Error creating call record:', error.message);
        }
    }
}

// Run the data generation
async function generateData() {
    try {
        const agents = await createAgents();
        await createKnowledgeItems();
        await createPhoneNumbers();
        await createCallHistory(agents);
        console.log('Data generation complete!');
    } catch (error) {
        console.error('Data generation failed:', error);
    }
}

generateData();