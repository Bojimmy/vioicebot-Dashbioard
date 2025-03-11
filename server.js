// server.js (Express.js backend with authentication)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const session = require('express-session'); // For user sessions

const app = express();
const port = 3000;

// In-memory data store (replace with database later)
let agents = [];
let knowledgeItems = [];
let phoneNumbers = [];
let callHistory = [];

// Create users data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Setup users database file
const usersDB = path.join(dataDir, 'users.json');
if (!fs.existsSync(usersDB)) {
    // Create default admin user if users file doesn't exist
    fs.writeFileSync(usersDB, JSON.stringify({
        'admin@example.com': {
            password: 'admin123', // In a real app, use password hashing!
            name: 'Admin User'
        }
    }, null, 2));
    console.log('Created default user: admin@example.com / admin123');
}

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: 'voicebot-dashboard-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Serve static files from parent directory and public directory
app.use(express.static(path.join(__dirname, '..'))); // Serve root directory
app.use('/public', express.static(path.join(__dirname, '../public'))); // Explicitly serve public folder

// ======== AUTHENTICATION ROUTES ========

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Read users from database
    const users = JSON.parse(fs.readFileSync(usersDB, 'utf8'));

    // Check if user exists and password matches
    if (users[email] && users[email].password === password) {
        // Store user in session (but not password)
        req.session.user = {
            email,
            name: users[email].name
        };
        return res.json({
            success: true,
            message: 'Login successful',
            user: req.session.user
        });
    }

    return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
    });
});

// Register new user endpoint
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Name, email, and password are required'
        });
    }

    // Read users from database
    const users = JSON.parse(fs.readFileSync(usersDB, 'utf8'));

    // Check if user already exists
    if (users[email]) {
        return res.status(400).json({
            success: false,
            message: 'User with this email already exists'
        });
    }

    // Add new user
    users[email] = {
        password, // In a real app, hash this password!
        name
    };

    // Save updated users
    fs.writeFileSync(usersDB, JSON.stringify(users, null, 2));

    // Store user in session (but not password)
    req.session.user = {
        email,
        name
    };

    return res.json({
        success: true,
        message: 'Registration successful',
        user: req.session.user
    });
});

// Check if user is logged in
app.get('/api/user', (req, res) => {
    if (req.session.user) {
        return res.json({
            success: true,
            user: req.session.user
        });
    }
    return res.status(401).json({
        success: false,
        message: 'Not logged in'
    });
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    return res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

// Authentication middleware for protected routes
const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }
    next();
};

// ======== BASIC PAGE ROUTES ========

// Root route - serve landing/login page
app.get('/', (req, res) => {
    console.log("Current directory:", __dirname); // Log the current directory
    const loginPath = path.join(__dirname, 'login.html');
    console.log("Looking for login file at:", loginPath); // Log where we're looking
    res.sendFile(loginPath);
});

// Dashboard route - serve dashboard page
app.get('/V_bot_dashboard.html', (req, res) => {
    const dashboardPath = path.join(__dirname, 'V_bot_dashboard.html');
    console.log("Looking for dashboard file at:", dashboardPath); // Log where we're looking
    res.sendFile(dashboardPath);
});

// ======== AGENTS API ========
// All API routes require authentication
app.get('/api/agents', requireAuth, (req, res) => {
    res.json(agents);
});

app.post('/api/agents', requireAuth, (req, res) => {
    const newAgent = {
        id: Date.now().toString(),
        name: req.body.name,
        instructions: req.body.instructions,
        knowledge: req.body.knowledge || '',
        voice: req.body.voice || 'cimo',
        language: req.body.language || 'en',
        avatar: req.body.avatar || '',
        isFavorite: false,
        createdAt: new Date().toISOString()
    };
    agents.push(newAgent);
    res.status(201).json(newAgent);
});

app.put('/api/agents/:id', requireAuth, (req, res) => {
    const id = req.params.id;
    const agentIndex = agents.findIndex(a => a.id === id);
    if (agentIndex === -1) {
        return res.status(404).json({ error: 'Agent not found' });
    }
    // Update agent properties
    agents[agentIndex] = {
        ...agents[agentIndex],
        ...req.body,
        updatedAt: new Date().toISOString()
    };
    res.json(agents[agentIndex]);
});

app.delete('/api/agents/:id', requireAuth, (req, res) => {
    const id = req.params.id;
    const initialLength = agents.length;
    agents = agents.filter(a => a.id !== id);
    if (agents.length === initialLength) {
        return res.status(404).json({ error: 'Agent not found' });
    }
    res.status(204).send();
});

// ======== KNOWLEDGE BASE API ========
app.get('/api/knowledge', requireAuth, (req, res) => {
    res.json(knowledgeItems);
});

app.post('/api/knowledge', requireAuth, (req, res) => {
    const newItem = {
        id: Date.now().toString(),
        title: req.body.title,
        content: req.body.content,
        createdAt: new Date().toISOString()
    };
    knowledgeItems.push(newItem);
    res.status(201).json(newItem);
});

app.put('/api/knowledge/:id', requireAuth, (req, res) => {
    const id = req.params.id;
    const itemIndex = knowledgeItems.findIndex(k => k.id === id);
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Knowledge item not found' });
    }
    knowledgeItems[itemIndex] = {
        ...knowledgeItems[itemIndex],
        ...req.body,
        updatedAt: new Date().toISOString()
    };
    res.json(knowledgeItems[itemIndex]);
});

app.delete('/api/knowledge/:id', requireAuth, (req, res) => {
    const id = req.params.id;
    knowledgeItems = knowledgeItems.filter(k => k.id !== id);
    res.status(204).send();
});

// ======== PHONE NUMBERS API ========
app.get('/api/phone-numbers', requireAuth, (req, res) => {
    res.json(phoneNumbers);
});

app.post('/api/phone-numbers', requireAuth, (req, res) => {
    const newNumber = {
        id: Date.now().toString(),
        number: req.body.number,
        description: req.body.description,
        createdAt: new Date().toISOString()
    };
    phoneNumbers.push(newNumber);
    res.status(201).json(newNumber);
});

// ======== CALL HISTORY API ========
app.get('/api/call-history', requireAuth, (req, res) => {
    res.json(callHistory);
});

// Add a simulated call (for testing)
app.post('/api/call-history/simulate', requireAuth, (req, res) => {
    const newCall = {
        id: Date.now().toString(),
        phoneNumber: req.body.phoneNumber || '+1' + Math.floor(1000000000 + Math.random() * 9000000000),
        agentId: req.body.agentId,
        duration: Math.floor(Math.random() * 600), // 0-600 seconds
        status: ['completed', 'failed', 'busy', 'no-answer'][Math.floor(Math.random() * 4)],
        timestamp: new Date().toISOString(),
        recordingUrl: req.body.status !== 'completed' ? null : 'call-recording-' + Date.now() + '.mp3'
    };
    callHistory.push(newCall);
    res.status(201).json(newCall);
});

// Alias /api/calls to /api/call-history for compatibility
app.get('/api/calls', requireAuth, (req, res) => {
    res.json(callHistory);
});

// ======== START SERVER ========
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);

    // Pre-populate with sample data if needed
    if (agents.length === 0) {
        agents.push({
            id: '1',
            name: 'Sales Agent',
            instructions: 'You are a sales agent for ZenCorp. Your job is to help customers with their questions about our products.',
            knowledge: 'ZenCorp sells premium software solutions for small businesses...',
            voice: 'cimo',
            language: 'en',
            isFavorite: true,
            createdAt: new Date().toISOString()
        });
        console.log('Added sample agent');
    }
});