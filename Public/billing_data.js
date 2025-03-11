document.addEventListener('DOMContentLoaded', function() {
    console.log('[Log] Billing data script loaded');
    
    // Find the Billing menu item
    const billingMenuItem = document.querySelector('div[data-page="billing"]');
    
    if (billingMenuItem) {
        console.log('[Log] Found billing menu item');
        
        billingMenuItem.addEventListener('click', function() {
            console.log('[Log] Billing menu item clicked');
            
            // Wait for the page to be rendered
            setTimeout(function() {
                // Check if the billing page exists
                const billingPage = document.getElementById('billing');
                
                if (billingPage) {
                    console.log('[Log] Billing page found, creating content');
                    createBillingContent(billingPage);
                } else {
                    console.error('[Error] Billing page not found after click');
                }
            }, 300);
        });
    } else {
        console.error('[Error] Could not find billing menu item');
    }
    
    // Sample data for billing
    const billingData = {
        currentPlan: {
            name: 'Pro Plan',
            price: '$49.99',
            billingCycle: 'monthly',
            nextBillingDate: '2025-04-05',
            status: 'active',
            renewalStatus: 'auto',
            features: [
                'Unlimited calls',
                '20 phone numbers',
                'Advanced analytics',
                'Priority email support',
                'API access'
            ]
        },
        usage: {
            phoneNumbers: {
                used: 4,
                total: 20,
                percentage: 20
            },
            callMinutes: {
                used: 456,
                total: 1000,
                percentage: 45.6
            },
            storage: {
                used: 2.4,
                total: 10,
                percentage: 24,
                unit: 'GB'
            }
        },
        paymentMethods: [
            {
                id: 'pm_1',
                type: 'Visa',
                last4: '4242',
                expiry: '06/2026',
                name: 'John Smith',
                isDefault: true
            },
            {
                id: 'pm_2',
                type: 'Mastercard',
                last4: '5555',
                expiry: '09/2025',
                name: 'John Smith',
                isDefault: false
            }
        ],
        billingHistory: [
            {
                id: 'INV-2025-001',
                date: '2025-03-05',
                amount: '$49.99',
                status: 'Paid',
                items: [
                    { name: 'Pro Plan (Monthly)', amount: '$49.99' }
                ],
                downloadUrl: '#'
            },
            {
                id: 'INV-2025-002',
                date: '2025-02-05',
                amount: '$49.99',
                status: 'Paid',
                items: [
                    { name: 'Pro Plan (Monthly)', amount: '$49.99' }
                ],
                downloadUrl: '#'
            },
            {
                id: 'INV-2025-003',
                date: '2025-01-05',
                amount: '$54.99',
                status: 'Paid',
                items: [
                    { name: 'Pro Plan (Monthly)', amount: '$49.99' },
                    { name: 'Additional Storage (1GB)', amount: '$5.00' }
                ],
                downloadUrl: '#'
            }
        ],
        notificationSettings: {
            invoiceEmails: true,
            paymentReminders: true,
            usageAlerts: true,
            marketingEmails: false,
            additionalRecipients: []
        }
    };
    
    // Available plans for upgrading
    const availablePlans = [
        {
            id: 'basic',
            name: 'Basic Plan',
            price: '$19.99',
            billingCycle: 'monthly',
            yearlyPrice: '$199.99',
            popularFeatures: [
                '5 calls per day',
                '2 phone numbers',
                'Basic analytics',
                'Email support'
            ],
            allFeatures: [
                '5 calls per day',
                '2 phone numbers',
                'Basic analytics',
                'Email support',
                '2GB storage',
                'Standard call quality'
            ]
        },
        {
            id: 'pro',
            name: 'Pro Plan',
            price: '$49.99',
            billingCycle: 'monthly',
            yearlyPrice: '$499.99',
            popularFeatures: [
                'Unlimited calls',
                '20 phone numbers',
                'Advanced analytics',
                'Priority email support',
                'API access'
            ],
            allFeatures: [
                'Unlimited calls',
                '20 phone numbers',
                'Advanced analytics',
                'Priority email support',
                'API access',
                '10GB storage',
                'HD call quality',
                'Call recording',
                'Custom caller ID'
            ]
        },
        {
            id: 'enterprise',
            name: 'Enterprise Plan',
            price: '$149.99',
            billingCycle: 'monthly',
            yearlyPrice: '$1499.99',
            popularFeatures: [
                'Unlimited calls',
                'Unlimited phone numbers',
                'Advanced analytics',
                'Priority support',
                'Custom integrations'
            ],
            allFeatures: [
                'Unlimited calls',
                'Unlimited phone numbers',
                'Advanced analytics',
                'Priority support',
                'Custom integrations',
                'Unlimited storage',
                '4K call quality',
                'Call recording and transcription',
                'Custom caller ID',
                'Dedicated account manager',
                'SLA guarantees',
                'Advanced security features'
            ]
        }
    ];
    
    // Function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    
    // Function to create the entire billing page content
    function createBillingContent(container) {
        console.log('[Log] Creating billing page content');
        
        // Clear existing content
        container.innerHTML = '';
        
        // Add CSS to container
        const style = document.createElement('style');
        style.textContent = `
            .billing-container {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            .page-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e1e4e8;
            }
            .page-header h2 {
                margin: 0;
                font-size: 24px;
            }
            .action-buttons {
                display: flex;
                gap: 10px;
            }
            .billing-section {
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                padding: 20px;
                margin-bottom: 24px;
            }
            .billing-section h3 {
                margin-top: 0;
                margin-bottom: 16px;
                font-size: 18px;
                font-weight: 600;
                color: #333;
                border-bottom: 1px solid #f0f0f0;
                padding-bottom: 10px;
            }
            .plan-details {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            .plan-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .plan-name {
                font-size: 20px;
                font-weight: 600;
                color: #333;
            }
            .plan-price {
                font-size: 18px;
                font-weight: 600;
                color: #555;
            }
            .plan-info {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                margin-bottom: 10px;
            }
            .plan-status, .next-billing, .renewal-info {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            .status-label, .next-billing-label, .renewal-label {
                font-size: 13px;
                color: #666;
            }
            .status-value, .next-billing-value, .renewal-value {
                font-size: 15px;
                font-weight: 500;
            }
            .status-value {
                display: inline-flex;
                align-items: center;
                gap: 5px;
            }
            .status-value.active {
                color: #28a745;
            }
            .status-value.cancelled {
                color: #dc3545;
            }
            .status-value.past-due {
                color: #fd7e14;
            }
            .status-badge {
                padding: 3px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
            }
            .status-badge.paid {
                background-color: #d4edda;
                color: #155724;
            }
            .status-badge.unpaid {
                background-color: #f8d7da;
                color: #721c24;
            }
            .status-badge.pending {
                background-color: #fff3cd;
                color: #856404;
            }
            .plan-actions {
                display: flex;
                gap: 10px;
                margin-top: 10px;
            }
            .plan-features {
                margin-top: 15px;
            }
            .plan-features h4 {
                margin-top: 0;
                margin-bottom: 10px;
                font-size: 15px;
                color: #555;
            }
            .plan-features ul {
                display: flex;
                flex-wrap: wrap;
                gap: 8px 20px;
                padding-left: 0;
                margin: 0;
                list-style-position: inside;
            }
            .plan-features li {
                width: calc(50% - 20px);
                margin-bottom: 5px;
                font-size: 14px;
            }
            
            /* Usage Meters */
            .usage-container {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                margin-top: 20px;
            }
            .usage-item {
                flex: 1;
                min-width: 250px;
            }
            .usage-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }
            .usage-title {
                font-size: 14px;
                font-weight: 500;
            }
            .usage-value {
                font-size: 14px;
                color: #555;
            }
            .usage-bar {
                height: 8px;
                background-color: #e9ecef;
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 15px;
            }
            .usage-progress {
                height: 100%;
                border-radius: 4px;
                background-color: #007bff;
            }
            .usage-progress.warning {
                background-color: #fd7e14;
            }
            .usage-progress.danger {
                background-color: #dc3545;
            }
            
            /* Payment Methods */
            .payment-methods-container {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            .payment-card {
                display: flex;
                align-items: center;
                padding: 15px;
                border: 1px solid #e1e4e8;
                border-radius: 6px;
                background-color: #f8f9fa;
            }
            .payment-card.default {
                background-color: #f0f7ff;
                border-color: #cce5ff;
            }
            .card-icon {
                margin-right: 15px;
                font-size: 24px;
                color: #6c757d;
            }
            .card-info {
                flex: 1;
            }
            .card-type {
                font-weight: 500;
                margin-bottom: 3px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .default-badge {
                font-size: 11px;
                background-color: #cce5ff;
                color: #004085;
                padding: 2px 6px;
                border-radius: 10px;
            }
            .card-details {
                font-size: 14px;
                color: #555;
            }
            .card-actions {
                display: flex;
                gap: 8px;
            }
            .card-actions button {
                border: none;
                background: none;
                color: #007bff;
                cursor: pointer;
                font-size: 14px;
                padding: 5px;
            }
            .card-actions button:hover {
                text-decoration: underline;
            }
            .card-actions button.remove {
                color: #dc3545;
            }
            
            /* Billing History */
            .data-table {
                width: 100%;
                border-collapse: collapse;
            }
            .data-table th, 
            .data-table td {
                padding: 12px 15px;
                text-align: left;
                border-bottom: 1px solid #e1e4e8;
            }
            .data-table th {
                font-weight: 600;
                color: #555;
                background-color: #f8f9fa;
            }
            .data-table tr:last-child td {
                border-bottom: none;
            }
            .data-table tr:hover {
                background-color: #f8f9fa;
            }
            .download-invoice {
                color: #007bff;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 5px;
            }
            .download-invoice:hover {
                text-decoration: underline;
            }
            .view-details {
                color: #6c757d;
                text-decoration: none;
                margin-left: 10px;
                font-size: 13px;
            }
            .view-details:hover {
                text-decoration: underline;
                color: #007bff;
            }
            
            /* Notifications */
            .notification-settings {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            .notification-option {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #f0f0f0;
            }
            .notification-option:last-child {
                border-bottom: none;
            }
            .notification-info {
                display: flex;
                flex-direction: column;
                gap: 3px;
            }
            .notification-title {
                font-weight: 500;
            }
            .notification-description {
                font-size: 13px;
                color: #666;
            }
            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 44px;
                height: 24px;
            }
            .toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: .4s;
                border-radius: 24px;
            }
            .toggle-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            input:checked + .toggle-slider {
                background-color: #007bff;
            }
            input:checked + .toggle-slider:before {
                transform: translateX(20px);
            }
            
            /* Recipients section */
            .recipients-container {
                margin-top: 20px;
            }
            .recipients-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            .recipients-title {
                font-weight: 500;
                font-size: 15px;
            }
            .recipient-list {
                border: 1px solid #e1e4e8;
                border-radius: 6px;
                margin-bottom: 10px;
            }
            .recipient-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 15px;
                border-bottom: 1px solid #e1e4e8;
            }
            .recipient-item:last-child {
                border-bottom: none;
            }
            .recipient-email {
                font-size: 14px;
            }
            .no-recipients {
                padding: 15px;
                text-align: center;
                color: #666;
                font-size: 14px;
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .plan-features li {
                    width: 100%;
                }
                .plan-header {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 10px;
                }
                .action-buttons {
                    flex-direction: column;
                    width: 100%;
                }
                .action-buttons button {
                    width: 100%;
                }
            }
            
            /* Modal Styles */
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0,0,0,0.5);
            }
            .modal-content {
                background-color: #fff;
                margin: 5% auto;
                border-radius: 8px;
                box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                width: 90%;
                max-width: 600px;
                position: relative;
                animation: modalOpen 0.3s;
            }
            @keyframes modalOpen {
                from {transform: translateY(-50px); opacity: 0;}
                to {transform: translateY(0); opacity: 1;}
            }
            .modal-header {
                padding: 16px 20px;
                border-bottom: 1px solid #e1e4e8;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .modal-header h3 {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
            }
            .close {
                color: #aaa;
                font-size: 24px;
                font-weight: bold;
                cursor: pointer;
            }
            .close:hover {
                color: #333;
            }
            .modal-body {
                padding: 20px;
                max-height: 70vh;
                overflow-y: auto;
            }
            .modal-footer {
                padding: 15px 20px;
                border-top: 1px solid #e1e4e8;
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
            
            /* Form Styles */
            .form-group {
                margin-bottom: 15px;
            }
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
                font-size: 14px;
            }
            .form-control {
                width: 100%;
                padding: 8px 12px;
                font-size: 14px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                transition: border-color 0.15s ease-in-out;
            }
            .form-control:focus {
                outline: none;
                border-color: #80bdff;
                box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
            }
            .form-row {
                display: flex;
                gap: 15px;
            }
            .form-group.half {
                flex: 1;
            }
            
            /* Button Styles */
            .btn {
                display: inline-block;
                font-weight: 500;
                text-align: center;
                vertical-align: middle;
                user-select: none;
                border: 1px solid transparent;
                padding: 8px 16px;
                font-size: 14px;
                line-height: 1.5;
                border-radius: 4px;
                transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
                cursor: pointer;
            }
            .btn-primary {
                color: #fff;
                background-color: #007bff;
                border-color: #007bff;
            }
            .btn-primary:hover {
                background-color: #0069d9;
                border-color: #0062cc;
            }
            .btn-secondary {
                color: #fff;
                background-color: #6c757d;
                border-color: #6c757d;
            }
            .btn-secondary:hover {
                background-color: #5a6268;
                border-color: #545b62;
            }
            .btn-success {
                color: #fff;
                background-color: #28a745;
                border-color: #28a745;
            }
            .btn-success:hover {
                background-color: #218838;
                border-color: #1e7e34;
            }
            .btn-danger {
                color: #fff;
                background-color: #dc3545;
                border-color: #dc3545;
            }
            .btn-danger:hover {
                background-color: #c82333;
                border-color: #bd2130;
            }
            .btn-outline-primary {
                color: #007bff;
                border-color: #007bff;
                background-color: transparent;
            }
            .btn-outline-primary:hover {
                color: #fff;
                background-color: #007bff;
            }
            .btn-sm {
                padding: 4px 8px;
                font-size: 12px;
            }
            
            /* Plan Card Styles */
            .plans-container {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                justify-content: center;
            }
            .plan-card {
                flex: 1;
                min-width: 250px;
                max-width: 300px;
                border: 1px solid #e1e4e8;
                border-radius: 8px;
                overflow: hidden;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .plan-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            }
            .plan-card.current {
                border-color: #007bff;
                box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
            }
            .plan-card-header {
                padding: 20px;
                background-color: #f8f9fa;
                border-bottom: 1px solid #e1e4e8;
                text-align: center;
            }
            .plan-card.current .plan-card-header {
                background-color: #e6f2ff;
            }
            .plan-card-header h4 {
                margin-top: 0;
                margin-bottom: 15px;
                font-size: 18px;
            }
            .plan-price {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .plan-price .amount {
                font-size: 24px;
                font-weight: 600;
                color: #333;
            }
            .plan-price .cycle {
                font-size: 14px;
                color: #666;
            }
            .plan-card-body {
                padding: 20px;
            }
            .plan-features-list {
                margin: 0;
                padding-left: 20px;
            }
            .plan-features-list li {
                margin-bottom: 8px;
                font-size: 14px;
            }
            .plan-card-footer {
                padding: 15px 20px;
                background-color: #fff;
                border-top: 1px solid #f0f0f0;
                text-align: center;
            }
            
            /* Cancel Plan Modal Styles */
            .cancel-warning {
                display: flex;
                gap: 15px;
                padding: 15px;
                background-color: #fff3cd;
                border-radius: 6px;
                margin-bottom: 20px;
                align-items: center;
            }
            .cancel-warning i {
                font-size: 24px;
                color: #856404;
            }
            .cancel-warning p {
                margin: 0;
                font-weight: 500;
                color: #856404;
            }
            .cancel-info {
                margin-bottom: 20px;
            }
            .cancel-info p {
                margin-top: 0;
                margin-bottom: 10px;
                font-weight: 500;
            }
            .cancel-info ul {
                margin-top: 0;
                padding-left: 20px;
            }
            .cancel-info li {
                margin-bottom: 8px;
            }
            
            /* Invoice Detail Modal Styles */
            .invoice-details {
                border: 1px solid #e1e4e8;
                border-radius: 6px;
                margin-bottom: 20px;
            }
            .invoice-header {
                padding: 15px;
                border-bottom: 1px solid #e1e4e8;
                background-color: #f8f9fa;
            }
            .invoice-company {
                margin-top: 0;
                margin-bottom: 5px;
                font-size: 16px;
                font-weight: 600;
            }
            .invoice-id {
                font-size: 14px;
                color: #666;
                margin: 0;
            }
            .invoice-body {
                padding: 15px;
            }
            .invoice-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
            }
            .invoice-label {
                font-weight: 500;
                color: #555;
            }
            .invoice-items {
                margin-top: 20px;
            }
            .invoice-items-header {
                font-weight: 600;
                margin-bottom: 10px;
                padding-bottom: 5px;
                border-bottom: 1px solid #e1e4e8;
                display: flex;
            }
            .invoice-items-header .item-name {
                flex: 2;
            }
            .invoice-items-header .item-amount {
                flex: 1;
                text-align: right;
            }
            .invoice-item {
                display: flex;
                padding: 8px 0;
            }
            .invoice-item .item-name {
                flex: 2;
            }
            .invoice-item .item-amount {
                flex: 1;
                text-align: right;
            }
            .invoice-total {
                display: flex;
                justify-content: space-between;
                font-weight: 600;
                margin-top: 15px;
                padding-top: 10px;
                border-top: 1px solid #e1e4e8;
            }
            
            /* Additional Styles */
            .billing-cycle-selector {
                display: flex;
                justify-content: center;
                margin-bottom: 25px;
                background-color: #f0f0f0;
                padding: 4px;
                border-radius: 24px;
                width: 200px;
                margin-left: auto;
                margin-right: auto;
            }
            .cycle-option {
                flex: 1;
                text-align: center;
                padding: 8px 12px;
                cursor: pointer;
                border-radius: 20px;
                font-size: 14px;
                transition: all 0.2s;
            }
            .cycle-option.active {
                background-color: #fff;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                font-weight: 500;
            }
            .two-col {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 24px;
            }
            .feature-comparison {
                overflow-x: auto;
            }
            .comparison-table {
                width: 100%;
                border-collapse: collapse;
                min-width: 600px;
            }
            .comparison-table th,
            .comparison-table td {
                padding: 12px 15px;
                text-align: left;
                border-bottom: 1px solid #e1e4e8;
            }
            .comparison-table th {
                font-weight: 600;
                background-color: #f8f9fa;
            }
            .comparison-table td {
                text-align: center;
            }
            .comparison-table td:first-child {
                text-align: left;
                font-weight: 500;
            }
            .comparison-table tr:last-child td {
                border-bottom: none;
            }
            .comparison-table .highlight {
                background-color: #e6f7ff;
            }
            .comparison-table .check {
                color: #28a745;
            }
            .comparison-table .cross {
                color: #dc3545;
            }
        `;
        
        // Add style to container
        container.appendChild(style);
        
        // Create page structure
        const pageContent = document.createElement('div');
        pageContent.className = 'billing-container';
        pageContent.innerHTML = `
            <div class="page-header">
                <h2>Billing & Subscription</h2>
                <div class="action-buttons">
                    <button id="update-payment-button" class="btn btn-primary">
                        <i class="fas fa-credit-card"></i> Update Payment Method
                    </button>
                </div>
            </div>
            
            <div class="two-col">
                <!-- Current Plan Section -->
                <div class="billing-section current-plan-section">
                    <h3>Current Plan</h3>
                    <div class="plan-details">
                        <div class="plan-header">
                            <span class="plan-name">${billingData.currentPlan.name}</span>
                            <span class="plan-price">${billingData.currentPlan.price}/${billingData.currentPlan.billingCycle}</span>
                        </div>
                        <div class="plan-info">
                            <div class="plan-status">
                                <span class="status-label">Status</span>
                                <span class="status-value ${billingData.currentPlan.status}">
                                    <i class="fas fa-circle"></i>
                                    ${billingData.currentPlan.status.charAt(0).toUpperCase() + billingData.currentPlan.status.slice(1)}
                                </span>
                            </div>
                            <div class="next-billing">
                                <span class="next-billing-label">Next billing date</span>
                                <span class="next-billing-value">${formatDate(billingData.currentPlan.nextBillingDate)}</span>
                            </div>
                            <div class="renewal-info">
                                <span class="renewal-label">Renewal</span>
                                <span class="renewal-value">${billingData.currentPlan.renewalStatus === 'auto' ? 'Automatic' : 'Manual'}</span>
                            </div>
                        </div>
                        
                        <!-- Usage Meters -->
                        <div class="usage-container">
                            <div class="usage-item">
                                <div class="usage-header">
                                    <span class="usage-title">Phone Numbers</span>
                                    <span class="usage-value">${billingData.usage.phoneNumbers.used}/${billingData.usage.phoneNumbers.total}</span>
                                </div>
                                <div class="usage-bar">
                                    <div class="usage-progress" style="width: ${billingData.usage.phoneNumbers.percentage}%"></div>
                                </div>
                            </div>
                            
                            <div class="usage-item">
                                <div class="usage-header">
                                    <span class="usage-title">Call Minutes</span>
                                    <span class="usage-value">${billingData.usage.callMinutes.used}/${billingData.usage.callMinutes.total}</span>
                                </div>
                                <div class="usage-bar">
                                    <div class="usage-progress ${billingData.usage.callMinutes.percentage > 75 ? 'warning' : ''}" style="width: ${billingData.usage.callMinutes.percentage}%"></div>
                                </div>
                            </div>
                            
                            <div class="usage-item">
                                <div class="usage-header">
                                    <span class="usage-title">Storage</span>
                                    <span class="usage-value">${billingData.usage.storage.used}/${billingData.usage.storage.total} ${billingData.usage.storage.unit}</span>
                                </div>
                                <div class="usage-bar">
                                    <div class="usage-progress" style="width: ${billingData.usage.storage.percentage}%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="plan-features">
                            <h4>Included Features</h4>
                            <ul>
                                ${billingData.currentPlan.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="plan-actions">
                            <button id="change-plan-button" class="btn btn-secondary">
                                <i class="fas fa-exchange-alt"></i> Change Plan
                            </button>
                            <button id="cancel-plan-button" class="btn btn-danger">
                                <i class="fas fa-times"></i> Cancel Plan
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Payment Methods Section -->
                <div class="billing-section payment-methods-section">
                    <h3>Payment Methods</h3>
                    <div class="payment-methods-container">
                        ${billingData.paymentMethods.map(card => `
                            <div class="payment-card ${card.isDefault ? 'default' : ''}">
                                <div class="card-icon">
                                    <i class="far fa-credit-card"></i>
                                </div>
                                <div class="card-info">
                                    <div class="card-type">
                                        ${card.type} •••• ${card.last4}
                                        ${card.isDefault ? '<span class="default-badge">Default</span>' : ''}
                                    </div>
                                    <div class="card-details">
                                        Expires ${card.expiry} • ${card.name}
                                    </div>
                                </div>
                                <div class="card-actions">
                                    ${!card.isDefault ? `<button class="make-default" data-id="${card.id}">Make Default</button>` : ''}
                                    <button class="edit" data-id="${card.id}">Edit</button>
                                    ${!card.isDefault ? `<button class="remove" data-id="${card.id}">Remove</button>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 15px;">
                        <button id="add-payment-method" class="btn btn-outline-primary">
                            <i class="fas fa-plus"></i> Add Payment Method
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Billing History Section -->
            <div class="billing-section history-section">
                <h3>Billing History</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="billing-history-table-body">
                        ${billingData.billingHistory.map(invoice => `
                            <tr>
                                <td>${invoice.id}</td>
                                <td>${formatDate(invoice.date)}</td>
                                <td>${invoice.amount}</td>
                                <td><span class="status-badge ${invoice.status.toLowerCase()}">${invoice.status}</span></td>
                                <td>
                                    <a href="${invoice.downloadUrl}" class="download-invoice" data-id="${invoice.id}">
                                        <i class="fas fa-download"></i> Download
                                    </a>
                                    <a href="#" class="view-details" data-id="${invoice.id}">View Details</a>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <!-- Notification Settings Section -->
            <div class="billing-section notification-section">
                <h3>Notification Settings</h3>
                <div class="notification-settings">
                    <div class="notification-option">
                        <div class="notification-info">
                            <div class="notification-title">Invoice Emails</div>
                            <div class="notification-description">Receive emails when new invoices are generated</div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="invoice-emails" ${billingData.notificationSettings.invoiceEmails ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div class="notification-option">
                        <div class="notification-info">
                            <div class="notification-title">Payment Reminders</div>
                            <div class="notification-description">Receive reminders before payments are due</div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="payment-reminders" ${billingData.notificationSettings.paymentReminders ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div class="notification-option">
                        <div class="notification-info">
                            <div class="notification-title">Usage Alerts</div>
                            <div class="notification-description">Receive alerts when approaching usage limits</div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="usage-alerts" ${billingData.notificationSettings.usageAlerts ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div class="notification-option">
                        <div class="notification-info">
                            <div class="notification-title">Marketing Emails</div>
                            <div class="notification-description">Receive emails about new features and promotions</div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="marketing-emails" ${billingData.notificationSettings.marketingEmails ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
                
                <div class="recipients-container">
                    <div class="recipients-header">
                        <div class="recipients-title">Additional Email Recipients</div>
                        <button id="add-recipient" class="btn btn-sm btn-outline-primary">
                            <i class="fas fa-plus"></i> Add Recipient
                        </button>
                    </div>
                    
                    <div class="recipient-list">
                        ${billingData.notificationSettings.additionalRecipients.length > 0 
                            ? billingData.notificationSettings.additionalRecipients.map(email => `
                                <div class="recipient-item">
                                    <div class="recipient-email">${email}</div>
                                    <button class="btn btn-sm btn-danger remove-recipient" data-email="${email}">Remove</button>
                                </div>
                            `).join('')
                            : '<div class="no-recipients">No additional recipients</div>'
                        }
                    </div>
                </div>
            </div>
            
            <!-- Update Payment Method Modal -->
            <div id="payment-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Update Payment Method</h3>
                        <span id="close-payment-modal" class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="card-name">Cardholder Name</label>
                            <input type="text" id="card-name" class="form-control" placeholder="Enter cardholder name">
                        </div>
                        <div class="form-group">
                            <label for="card-number">Card Number</label>
                            <input type="text" id="card-number" class="form-control" placeholder="Enter card number">
                        </div>
                        <div class="form-row">
                            <div class="form-group half">
                                <label for="card-expiry">Expiry Date</label>
                                <input type="text" id="card-expiry" class="form-control" placeholder="MM/YY">
                            </div>
                            <div class="form-group half">
                                <label for="card-cvc">CVC</label>
                                <input type="text" id="card-cvc" class="form-control" placeholder="CVC">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="card-address">Billing Address</label>
                            <input type="text" id="card-address" class="form-control" placeholder="Enter billing address">
                        </div>
                        <div class="form-row">
                            <div class="form-group half">
                                <label for="card-city">City</label>
                                <input type="text" id="card-city" class="form-control" placeholder="City">
                            </div>
                            <div class="form-group half">
                                <label for="card-zip">ZIP Code</label>
                                <input type="text" id="card-zip" class="form-control" placeholder="ZIP Code">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="card-country">Country</label>
                            <input type="text" id="card-country" class="form-control" placeholder="Country">
                        </div>
                        <div class="form-group">
                            <label for="card-default">
                                <input type="checkbox" id="card-default" checked> Set as default payment method
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="close-payment-modal-btn" class="btn btn-secondary">Cancel</button>
                        <button id="save-payment" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
            
            <!-- Add Recipient Modal -->
            <div id="recipient-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Add Email Recipient</h3>
                        <span id="close-recipient-modal" class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-email">Email Address</label>
                            <input type="email" id="recipient-email" class="form-control" placeholder="Enter email address">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="close-recipient-modal-btn" class="btn btn-secondary">Cancel</button>
                        <button id="save-recipient" class="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
            
            <!-- Change Plan Modal -->
            <div id="change-plan-modal" class="modal">
                <div class="modal-content" style="max-width: 800px;">
                    <div class="modal-header">
                        <h3>Change Plan</h3>
                        <span id="close-plan-modal" class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="billing-cycle-selector">
                            <div class="cycle-option active" data-cycle="monthly">Monthly</div>
                            <div class="cycle-option" data-cycle="yearly">Yearly</div>
                        </div>
                        
                        <div class="plans-container">
                            ${availablePlans.map(plan => `
                                <div class="plan-card ${plan.id === billingData.currentPlan.name.toLowerCase().split(' ')[0] ? 'current' : ''}">
                                    <div class="plan-card-header">
                                        <h4>${plan.name}</h4>
                                        <div class="plan-price">
                                            <span class="amount monthly-price">${plan.price}</span>
                                            <span class="amount yearly-price" style="display:none;">${plan.yearlyPrice}</span>
                                            <span class="cycle">/<span class="cycle-text">month</span></span>
                                        </div>
                                    </div>
                                    <div class="plan-card-body">
                                        <ul class="plan-features-list">
                                            ${plan.popularFeatures.map(feature => `<li>${feature}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div class="plan-card-footer">
                                        <button class="btn ${plan.id === billingData.currentPlan.name.toLowerCase().split(' ')[0] ? 'btn-success current-plan' : 'btn-primary select-plan'}" data-plan-id="${plan.id}">
                                            ${plan.id === billingData.currentPlan.name.toLowerCase().split(' ')[0] ? 'Current Plan' : 'Select Plan'}
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="feature-comparison">
                            <h4 style="margin-top: 30px; margin-bottom: 15px;">Feature Comparison</h4>
                            <table class="comparison-table">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        ${availablePlans.map(plan => `<th>${plan.name}</th>`).join('')}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Price</td>
                                        ${availablePlans.map(plan => `<td class="${plan.id === billingData.currentPlan.name.toLowerCase().split(' ')[0] ? 'highlight' : ''}">
                                            <span class="monthly-price">${plan.price}</span>
                                            <span class="yearly-price" style="display:none;">${plan.yearlyPrice}</span>
                                        </td>`).join('')}
                                    </tr>
                                    <tr>
                                        <td>Phone Numbers</td>
                                        ${availablePlans.map(plan => `<td class="${plan.id === billingData.currentPlan.name.toLowerCase().split(' ')[0] ? 'highlight' : ''}">
                                            ${plan.id === 'basic' ? '2' : (plan.id === 'pro' ? '20' : 'Unlimited')}
                                        </td>`).join('')}
                                    </tr>
                                    <tr>
                                        <td>Call Minutes</td>
                                        ${availablePlans.map(plan => `<td class="${plan.id === billingData.currentPlan.name.toLowerCase().split(' ')[0] ? 'highlight' : ''}">
                                            ${plan.id === 'basic' ? '5 per day' : 'Unlimited'}
                                        </td>`).join('')}
                                    </tr>
                                    <tr>
                                        <td>Storage</td>
                                        ${availablePlans.map(plan => `<td class="${plan.id === billingData.currentPlan.name.toLowerCase().split(' ')[0] ? 'highlight' : ''}">
                                            ${plan.id === 'basic' ? '2GB' : (plan.id === 'pro' ? '10GB' : 'Unlimited')}
                                        </td>`).join('')}
                                    </tr>
                                    <tr>
                                        <td>API Access</td>
                                        ${availablePlans.map(plan => `<td class="${plan.id === billingData.currentPlan.name.toLowerCase().split(' ')[0] ? 'highlight' : ''}">
                                            ${plan.id === 'basic' ? '<i class="fas fa-times cross"></i>' : '<i class="fas fa-check check"></i>'}
                                        </td>`).join('')}
                                    </tr>
                                    <tr>
                                        <td>Call Recording</td>
                                        ${availablePlans.map(plan => `<td class="${plan.id === billingData.currentPlan.name.toLowerCase().split(' ')[0] ? 'highlight' : ''}">
                                            ${plan.id === 'basic' ? '<i class="fas fa-times cross"></i>' : '<i class="fas fa-check check"></i>'}
                                        </td>`).join('')}
                                    </tr>
                                    <tr>
                                        <td>Custom Integrations</td>
                                        ${availablePlans.map(plan => `<td class="${plan.id === billingData.currentPlan.name.toLowerCase().split(' ')[0] ? 'highlight' : ''}">
                                            ${plan.id === 'enterprise' ? '<i class="fas fa-check check"></i>' : '<i class="fas fa-times cross"></i>'}
                                        </td>`).join('')}
                                    </tr>
                                    <tr>
                                        <td>Dedicated Account Manager</td>
                                        ${availablePlans.map(plan => `<td class="${plan.id === billingData.currentPlan.name.toLowerCase().split(' ')[0] ? 'highlight' : ''}">
                                            ${plan.id === 'enterprise' ? '<i class="fas fa-check check"></i>' : '<i class="fas fa-times cross"></i>'}
                                        </td>`).join('')}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="close-plan-modal-btn" class="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
            
            <!-- Cancel Plan Modal -->
            <div id="cancel-plan-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Cancel Subscription</h3>
                        <span id="close-cancel-modal" class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="cancel-warning">
                            <i class="fas fa-exclamation-triangle"></i>
                            <p>Are you sure you want to cancel your subscription? This action cannot be undone.</p>
                        </div>
                        <div class="cancel-info">
                            <p>If you cancel:</p>
                            <ul>
                                <li>Your subscription will remain active until the end of your current billing period (${formatDate(billingData.currentPlan.nextBillingDate)}).</li>
                                <li>You will lose access to all premium features after that date.</li>
                                <li>Your phone numbers may be released and no longer available.</li>
                                <li>Stored data will be retained for 30 days after your subscription ends.</li>
                            </ul>
                        </div>
                        <div class="form-group">
                            <label for="cancel-reason">Please tell us why you're cancelling:</label>
                            <select id="cancel-reason" class="form-control">
                                <option value="">Select a reason</option>
                                <option value="too-expensive">Too expensive</option>
                                <option value="missing-features">Missing features I need</option>
                                <option value="not-using">Not using the service enough</option>
                                <option value="poor-service">Poor service quality</option>
                                <option value="switch-service">Switching to another service</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="cancel-feedback">Additional feedback (optional):</label>
                            <textarea id="cancel-feedback" class="form-control" rows="3" placeholder="Tell us more..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="close-cancel-modal-btn" class="btn btn-secondary">Go Back</button>
                        <button id="confirm-cancel" class="btn btn-danger">Confirm Cancellation</button>
                    </div>
                </div>
            </div>
            
            <!-- Invoice Detail Modal -->
            <div id="invoice-detail-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Invoice Details</h3>
                        <span id="close-invoice-detail-modal" class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="invoice-details">
                            <div class="invoice-header">
                                <h4 class="invoice-company">Your Company Name</h4>
                                <p class="invoice-id" id="modal-invoice-id">Invoice #INV-2025-001</p>
                            </div>
                            <div class="invoice-body">
                                <div class="invoice-row">
                                    <span class="invoice-label">Invoice Date:</span>
                                    <span id="modal-invoice-date">March 5, 2025</span>
                                </div>
                                <div class="invoice-row">
                                    <span class="invoice-label">Status:</span>
                                    <span id="modal-invoice-status">Paid</span>
                                </div>
                                <div class="invoice-row">
                                    <span class="invoice-label">Payment Method:</span>
                                    <span id="modal-invoice-payment">Visa •••• 4242</span>
                                </div>
                                
                                <div class="invoice-items">
                                    <div class="invoice-items-header">
                                        <div class="item-name">Description</div>
                                        <div class="item-amount">Amount</div>
                                    </div>
                                    <div id="modal-invoice-items">
                                        <!-- Invoice items will be inserted here -->
                                    </div>
                                    <div class="invoice-total">
                                        <span>Total</span>
                                        <span id="modal-invoice-total">$49.99</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin-top: 20px;">
                            <a href="#" id="modal-invoice-download" class="btn btn-primary">
                                <i class="fas fa-download"></i> Download Invoice
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add page content to container
        container.appendChild(pageContent);
        
        // Set up event listeners
        setupEventListeners();
        
        console.log('[Log] Billing page created successfully');
        
        // Function to set up all event listeners
        function setupEventListeners() {
            console.log('[Log] Setting up billing page event listeners');
            
            // Update Payment Method button
            const updatePaymentButton = document.getElementById('update-payment-button');
            if (updatePaymentButton) {
                updatePaymentButton.addEventListener('click', function() {
                    openPaymentModal();
                });
            }
            
            // Add Payment Method button
            const addPaymentMethodButton = document.getElementById('add-payment-method');
            if (addPaymentMethodButton) {
                addPaymentMethodButton.addEventListener('click', function() {
                    openPaymentModal();
                });
            }
            
            // Change Plan button
            const changePlanButton = document.getElementById('change-plan-button');
            if (changePlanButton) {
                changePlanButton.addEventListener('click', function() {
                    openChangePlanModal();
                });
            }
            
            // Cancel Plan button
            const cancelPlanButton = document.getElementById('cancel-plan-button');
            if (cancelPlanButton) {
                cancelPlanButton.addEventListener('click', function() {
                    openCancelPlanModal();
                });
            }
            
            // Payment Method Edit buttons
            document.querySelectorAll('.payment-card .edit').forEach(button => {
                button.addEventListener('click', function() {
                    const paymentId = this.getAttribute('data-id');
                    editPaymentMethod(paymentId);
                });
            });
            
            // Payment Method Remove buttons
            document.querySelectorAll('.payment-card .remove').forEach(button => {
                button.addEventListener('click', function() {
                    const paymentId = this.getAttribute('data-id');
                    removePaymentMethod(paymentId);
                });
            });
            
            // Payment Method Make Default buttons
            document.querySelectorAll('.payment-card .make-default').forEach(button => {
                button.addEventListener('click', function() {
                    const paymentId = this.getAttribute('data-id');
                    makeDefaultPaymentMethod(paymentId);
                });
            });
            
            // Download invoice links
            document.querySelectorAll('.download-invoice').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const invoiceId = this.getAttribute('data-id');
                    downloadInvoice(invoiceId);
                });
            });
            
            // View invoice details links
            document.querySelectorAll('.view-details').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const invoiceId = this.getAttribute('data-id');
                    viewInvoiceDetails(invoiceId);
                });
            });
            
            // Add recipient button
            const addRecipientButton = document.getElementById('add-recipient');
            if (addRecipientButton) {
                addRecipientButton.addEventListener('click', function() {
                    openRecipientModal();
                });
            }
            
            // Remove recipient buttons
            document.querySelectorAll('.remove-recipient').forEach(button => {
                button.addEventListener('click', function() {
                    const email = this.getAttribute('data-email');
                    removeRecipient(email);
                });
            });
            
            // Notification toggles
            const toggles = [
                {id: 'invoice-emails', setting: 'invoiceEmails'},
                {id: 'payment-reminders', setting: 'paymentReminders'},
                {id: 'usage-alerts', setting: 'usageAlerts'},
                {id: 'marketing-emails', setting: 'marketingEmails'}
            ];
            
            toggles.forEach(toggle => {
                const element = document.getElementById(toggle.id);
                if (element) {
                    element.addEventListener('change', function() {
                        toggleNotification(toggle.setting, this.checked);
                    });
                }
            });
            
            // Payment Modal Close (X)
            const closePaymentModalX = document.getElementById('close-payment-modal');
            if (closePaymentModalX) {
                closePaymentModalX.addEventListener('click', function() {
                    closePaymentModal();
                });
            }
            
            // Payment Modal Close (Cancel)
            const closePaymentModalBtn = document.getElementById('close-payment-modal-btn');
            if (closePaymentModalBtn) {
                closePaymentModalBtn.addEventListener('click', function() {
                    closePaymentModal();
                });
            }
            
            // Save Payment Button
            const savePaymentBtn = document.getElementById('save-payment');
            if (savePaymentBtn) {
                savePaymentBtn.addEventListener('click', function() {
                    savePaymentMethod();
                });
            }
            
            // Recipient Modal Close (X)
            const closeRecipientModalX = document.getElementById('close-recipient-modal');
            if (closeRecipientModalX) {
                closeRecipientModalX.addEventListener('click', function() {
                    closeRecipientModal();
                });
            }
            
            // Recipient Modal Close (Cancel)
            const closeRecipientModalBtn = document.getElementById('close-recipient-modal-btn');
            if (closeRecipientModalBtn) {
                closeRecipientModalBtn.addEventListener('click', function() {
                    closeRecipientModal();
                });
            }
            
            // Save Recipient Button
            const saveRecipientBtn = document.getElementById('save-recipient');
            if (saveRecipientBtn) {
                saveRecipientBtn.addEventListener('click', function() {
                    saveRecipient();
                });
            }
            
            // Plan Modal Close (X)
            const closePlanModalX = document.getElementById('close-plan-modal');
            if (closePlanModalX) {
                closePlanModalX.addEventListener('click', function() {
                    closePlanModal();
                });
            }
            
            // Plan Modal Close (Cancel)
            const closePlanModalBtn = document.getElementById('close-plan-modal-btn');
            if (closePlanModalBtn) {
                closePlanModalBtn.addEventListener('click', function() {
                    closePlanModal();
                });
            }
            
            // Billing Cycle Toggle
            const cycleOptions = document.querySelectorAll('.cycle-option');
            cycleOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const cycle = this.getAttribute('data-cycle');
                    toggleBillingCycle(cycle);
                });
            });
            
            // Select Plan Buttons
            document.querySelectorAll('.select-plan').forEach(button => {
                button.addEventListener('click', function() {
                    const planId = this.getAttribute('data-plan-id');
                    selectPlan(planId);
                });
            });
            
            // Cancel Modal Close (X)
            const closeCancelModalX = document.getElementById('close-cancel-modal');
            if (closeCancelModalX) {
                closeCancelModalX.addEventListener('click', function() {
                    closeCancelModal();
                });
            }
            
            // Cancel Modal Close (Go Back)
            const closeCancelModalBtn = document.getElementById('close-cancel-modal-btn');
            if (closeCancelModalBtn) {
                closeCancelModalBtn.addEventListener('click', function() {
                    closeCancelModal();
                });
            }
            
            // Confirm Cancel Button
            const confirmCancelBtn = document.getElementById('confirm-cancel');
            if (confirmCancelBtn) {
                confirmCancelBtn.addEventListener('click', function() {
                    confirmCancellation();
                });
            }
            
            // Invoice Detail Modal Close (X)
            const closeInvoiceDetailModalX = document.getElementById('close-invoice-detail-modal');
            if (closeInvoiceDetailModalX) {
                closeInvoiceDetailModalX.addEventListener('click', function() {
                    closeInvoiceDetailModal();
                });
            }
            
            // Close modals when clicking outside
            window.onclick = function(event) {
                const modals = [
                    {id: 'payment-modal', close: closePaymentModal},
                    {id: 'recipient-modal', close: closeRecipientModal},
                    {id: 'change-plan-modal', close: closePlanModal},
                    {id: 'cancel-plan-modal', close: closeCancelModal},
                    {id: 'invoice-detail-modal', close: closeInvoiceDetailModal}
                ];
                
                modals.forEach(modal => {
                    const element = document.getElementById(modal.id);
                    if (event.target === element) {
                        modal.close();
                    }
                });
            };
        }
        
        // Function to open payment modal
        function openPaymentModal(paymentId = null) {
            console.log('[Log] Opening payment modal');
            
            const paymentModal = document.getElementById('payment-modal');
            const modalTitle = document.querySelector('#payment-modal .modal-header h3');
            const saveButton = document.getElementById('save-payment');
            
            if (!paymentModal || !modalTitle || !saveButton) {
                console.error('[Error] Payment modal elements not found');
                return;
            }
            
            // Reset form
            document.getElementById('card-name').value = '';
            document.getElementById('card-number').value = '';
            document.getElementById('card-expiry').value = '';
            document.getElementById('card-cvc').value = '';
            document.getElementById('card-address').value = '';
            document.getElementById('card-city').value = '';
            document.getElementById('card-zip').value = '';
            document.getElementById('card-country').value = '';
            document.getElementById('card-default').checked = true;
            
            // Update title and button text
            if (paymentId) {
                // Editing existing payment method
                modalTitle.textContent = 'Edit Payment Method';
                saveButton.textContent = 'Update';
                
                // Find payment method in data
                const payment = billingData.paymentMethods.find(p => p.id === paymentId);
                if (payment) {
                    // Pre-populate form with payment data
                    document.getElementById('card-name').value = payment.name;
                    document.getElementById('card-expiry').value = payment.expiry;
                    document.getElementById('card-default').checked = payment.isDefault;
                }
                
                // Store the payment ID for later use
                saveButton.setAttribute('data-payment-id', paymentId);
            } else {
                // Adding new payment method
                modalTitle.textContent = 'Add Payment Method';
                saveButton.textContent = 'Save';
                saveButton.removeAttribute('data-payment-id');
            }
            
            // Show modal
            paymentModal.style.display = 'block';
        }
        
        // Function to close payment modal
        function closePaymentModal() {
            const paymentModal = document.getElementById('payment-modal');
            if (paymentModal) {
                paymentModal.style.display = 'none';
            }
        }
        
        // Function to save payment method
        function savePaymentMethod() {
            console.log('[Log] Saving payment method');
            
            // Get form values
            const cardName = document.getElementById('card-name').value.trim();
            const cardNumber = document.getElementById('card-number').value.trim();
            const cardExpiry = document.getElementById('card-expiry').value.trim();
            const cardCvc = document.getElementById('card-cvc').value.trim();
            const isDefault = document.getElementById('card-default').checked;
            
            // Basic validation
            if (!cardName) {
                alert('Please enter the cardholder name');
                return;
            }
            
            if (cardNumber && !isValidCardNumber(cardNumber)) {
                alert('Please enter a valid card number');
                return;
            }
            
            if (cardExpiry && !isValidExpiry(cardExpiry)) {
                alert('Please enter a valid expiry date (MM/YY)');
                return;
            }
            
            if (cardCvc && !isValidCVC(cardCvc)) {
                alert('Please enter a valid CVC (3-4 digits)');
                return;
            }
            
            // Get payment ID if editing
            const saveButton = document.getElementById('save-payment');
            const paymentId = saveButton.getAttribute('data-payment-id');
            
            if (paymentId) {
                // Update existing payment method
                const paymentIndex = billingData.paymentMethods.findIndex(p => p.id === paymentId);
                if (paymentIndex !== -1) {
                    // If making this card default, update other cards
                    if (isDefault && !billingData.paymentMethods[paymentIndex].isDefault) {
                        billingData.paymentMethods.forEach(p => {
                            p.isDefault = false;
                        });
                    }
                    
                    // Update the payment method
                    billingData.paymentMethods[paymentIndex].name = cardName;
                    if (cardNumber) {
                        billingData.paymentMethods[paymentIndex].last4 = cardNumber.slice(-4);
                    }
                    if (cardExpiry) {
                        billingData.paymentMethods[paymentIndex].expiry = cardExpiry;
                    }
                    billingData.paymentMethods[paymentIndex].isDefault = isDefault;
                }
            } else {
                // Add new payment method
                if (!cardNumber) {
                    alert('Please enter a card number');
                    return;
                }
                
                if (!cardExpiry) {
                    alert('Please enter an expiry date');
                    return;
                }
                
                if (!cardCvc) {
                    alert('Please enter a CVC');
                    return;
                }
                
                // If making this card default, update other cards
                if (isDefault) {
                    billingData.paymentMethods.forEach(p => {
                        p.isDefault = false;
                    });
                }
                
                // Determine card type based on first digit
                let cardType = 'Credit Card';
                if (cardNumber.startsWith('4')) {
                    cardType = 'Visa';
                } else if (cardNumber.startsWith('5')) {
                    cardType = 'Mastercard';
                } else if (cardNumber.startsWith('3')) {
                    cardType = 'Amex';
                } else if (cardNumber.startsWith('6')) {
                    cardType = 'Discover';
                }
                
                // Create new payment method
                const newPayment = {
                    id: 'pm_' + Math.floor(Math.random() * 1000000),
                    type: cardType,
                    last4: cardNumber.slice(-4),
                    expiry: cardExpiry,
                    name: cardName,
                    isDefault: isDefault
                };
                
                // Add to payment methods
                billingData.paymentMethods.push(newPayment);
            }
            
            // Close modal
            closePaymentModal();
            
            // Refresh billing page
            createBillingContent(document.getElementById('billing'));
        }
        
        // Function to edit payment method
        function editPaymentMethod(paymentId) {
            console.log(`[Log] Editing payment method: ${paymentId}`);
            openPaymentModal(paymentId);
        }
        
        // Function to remove payment method
        function removePaymentMethod(paymentId) {
            console.log(`[Log] Removing payment method: ${paymentId}`);
            
            // Confirm removal
            if (!confirm('Are you sure you want to remove this payment method?')) {
                return;
            }
            
            // Find payment method in data
            const paymentIndex = billingData.paymentMethods.findIndex(p => p.id === paymentId);
            if (paymentIndex !== -1) {
                // Remove payment method
                billingData.paymentMethods.splice(paymentIndex, 1);
                
                // Refresh billing page
                createBillingContent(document.getElementById('billing'));
            }
        }
        
        // Function to make payment method default
        function makeDefaultPaymentMethod(paymentId) {
            console.log(`[Log] Making payment method default: ${paymentId}`);
            
            // Update payment methods
            billingData.paymentMethods.forEach(p => {
                p.isDefault = (p.id === paymentId);
            });
            
            // Refresh billing page
            createBillingContent(document.getElementById('billing'));
        }
        
        // Function to open recipient modal
        function openRecipientModal() {
            console.log('[Log] Opening recipient modal');
            
            const recipientModal = document.getElementById('recipient-modal');
            if (recipientModal) {
                // Reset form
                document.getElementById('recipient-email').value = '';
                
                // Show modal
                recipientModal.style.display = 'block';
            }
        }
        
        // Function to close recipient modal
        function closeRecipientModal() {
            const recipientModal = document.getElementById('recipient-modal');
            if (recipientModal) {
                recipientModal.style.display = 'none';
            }
        }
        
        // Function to save recipient
        function saveRecipient() {
            console.log('[Log] Saving recipient');
            
            // Get email value
            const email = document.getElementById('recipient-email').value.trim();
            
            // Validate email
            if (!email || !isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Check if email already exists
            if (billingData.notificationSettings.additionalRecipients.includes(email)) {
                alert('This email is already in the list');
                return;
            }
            
            // Add email to recipients
            billingData.notificationSettings.additionalRecipients.push(email);
            
            // Close modal
            closeRecipientModal();
            
            // Refresh billing page
            createBillingContent(document.getElementById('billing'));
        }
        
        // Function to remove recipient
        function removeRecipient(email) {
            console.log(`[Log] Removing recipient: ${email}`);
            
            // Confirm removal
            if (!confirm('Are you sure you want to remove this email recipient?')) {
                return;
            }
            
            // Remove email from recipients
            const index = billingData.notificationSettings.additionalRecipients.indexOf(email);
            if (index !== -1) {
                billingData.notificationSettings.additionalRecipients.splice(index, 1);
                
                // Refresh billing page
                createBillingContent(document.getElementById('billing'));
            }
        }
        
        // Function to toggle notification setting
        function toggleNotification(setting, enabled) {
            console.log(`[Log] Toggling notification setting: ${setting} to ${enabled}`);
            
            // Update notification setting
            billingData.notificationSettings[setting] = enabled;
        }
        
        // Function to open change plan modal
        function openChangePlanModal() {
            console.log('[Log] Opening change plan modal');
            
            const planModal = document.getElementById('change-plan-modal');
            if (planModal) {
                // Reset to monthly billing cycle
                toggleBillingCycle('monthly');
                
                // Show modal
                planModal.style.display = 'block';
            }
        }
        
        // Function to close plan modal
        function closePlanModal() {
            const planModal = document.getElementById('change-plan-modal');
            if (planModal) {
                planModal.style.display = 'none';
            }
        }
        
        // Function to toggle billing cycle
        function toggleBillingCycle(cycle) {
            console.log(`[Log] Toggling billing cycle to: ${cycle}`);
            
            // Update active class on cycle options
            document.querySelectorAll('.cycle-option').forEach(option => {
                option.classList.toggle('active', option.getAttribute('data-cycle') === cycle);
            });
            
            // Show/hide prices based on cycle
            const monthlyPrices = document.querySelectorAll('.monthly-price');
            const yearlyPrices = document.querySelectorAll('.yearly-price');
            const cycleTexts = document.querySelectorAll('.cycle-text');
            
            if (cycle === 'monthly') {
                monthlyPrices.forEach(el => el.style.display = '');
                yearlyPrices.forEach(el => el.style.display = 'none');
                cycleTexts.forEach(el => el.textContent = 'month');
            } else {
                monthlyPrices.forEach(el => el.style.display = 'none');
                yearlyPrices.forEach(el => el.style.display = '');
                cycleTexts.forEach(el => el.textContent = 'year');
            }
        }
        
        // Function to select a plan
        function selectPlan(planId) {
            console.log(`[Log] Selecting plan: ${planId}`);
            
            // Get the active billing cycle
            const activeOption = document.querySelector('.cycle-option.active');
            const cycle = activeOption ? activeOption.getAttribute('data-cycle') : 'monthly';
            
            // Find the selected plan
            const selectedPlan = availablePlans.find(p => p.id === planId);
            if (!selectedPlan) {
                console.error(`[Error] Plan not found: ${planId}`);
                return;
            }
            
            // Confirm plan change
            const price = cycle === 'monthly' ? selectedPlan.price : selectedPlan.yearlyPrice;
            const confirmMsg = `Are you sure you want to change to the ${selectedPlan.name} for ${price}/${cycle === 'monthly' ? 'month' : 'year'}?`;
            
            if (!confirm(confirmMsg)) {
                return;
            }
            
            // Update current plan
            billingData.currentPlan.name = selectedPlan.name;
            billingData.currentPlan.price = cycle === 'monthly' ? selectedPlan.price : selectedPlan.yearlyPrice;
            billingData.currentPlan.billingCycle = cycle;
            billingData.currentPlan.features = selectedPlan.popularFeatures;
            
            // Calculate new next billing date (1 month or 1 year from now)
            const now = new Date();
            if (cycle === 'monthly') {
                now.setMonth(now.getMonth() + 1);
            } else {
                now.setFullYear(now.getFullYear() + 1);
            }
            billingData.currentPlan.nextBillingDate = now.toISOString().split('T')[0];
            
            // Close modal
            closePlanModal();
            
            // Show success message
            alert(`Your plan has been changed to ${selectedPlan.name}`);
            
            // Refresh billing page
            createBillingContent(document.getElementById('billing'));
        }
        
        // Function to open cancel plan modal
        function openCancelPlanModal() {
            console.log('[Log] Opening cancel plan modal');
            
            const cancelModal = document.getElementById('cancel-plan-modal');
            if (cancelModal) {
                // Reset form
                document.getElementById('cancel-reason').value = '';
                document.getElementById('cancel-feedback').value = '';
                
                // Show modal
                cancelModal.style.display = 'block';
            }
        }
        
        // Function to close cancel modal
        function closeCancelModal() {
            const cancelModal = document.getElementById('cancel-plan-modal');
            if (cancelModal) {
                cancelModal.style.display = 'none';
            }
        }
        
        // Function to confirm cancellation
        function confirmCancellation() {
            console.log('[Log] Confirming cancellation');
            
            // Get reason and feedback
            const reason = document.getElementById('cancel-reason').value;
            const feedback = document.getElementById('cancel-feedback').value.trim();
            
            // Validate reason
            if (!reason) {
                alert('Please select a reason for cancellation');
                return;
            }
            
            // Update plan status
            billingData.currentPlan.status = 'cancelled';
            
            // Close modal
            closeCancelModal();
            
            // Show success message
            alert(`Your subscription has been cancelled. It will remain active until ${formatDate(billingData.currentPlan.nextBillingDate)}.`);
            
            // Refresh billing page
            createBillingContent(document.getElementById('billing'));
        }
        
        // Function to download invoice
        function downloadInvoice(invoiceId) {
            console.log(`[Log] Downloading invoice: ${invoiceId}`);
            
            // In a real app, this would redirect to a PDF download
            alert(`Downloading invoice ${invoiceId}`);
        }
        
        // Function to view invoice details
        function viewInvoiceDetails(invoiceId) {
            console.log(`[Log] Viewing invoice details: ${invoiceId}`);
            
            const invoiceModal = document.getElementById('invoice-detail-modal');
            if (!invoiceModal) {
                console.error('[Error] Invoice modal not found');
                return;
            }
            
            // Find invoice in data
            const invoice = billingData.billingHistory.find(inv => inv.id === invoiceId);
            if (!invoice) {
                console.error(`[Error] Invoice not found: ${invoiceId}`);
                return;
            }
            
            // Update modal content
            document.getElementById('modal-invoice-id').textContent = `Invoice #${invoice.id}`;
            document.getElementById('modal-invoice-date').textContent = formatDate(invoice.date);
            document.getElementById('modal-invoice-status').textContent = invoice.status;
            
            // Default payment method
            const defaultPayment = billingData.paymentMethods.find(p => p.isDefault);
            if (defaultPayment) {
                document.getElementById('modal-invoice-payment').textContent = `${defaultPayment.type} •••• ${defaultPayment.last4}`;
            }
            
            // Update invoice items
            const itemsContainer = document.getElementById('modal-invoice-items');
            itemsContainer.innerHTML = '';
            
            invoice.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'invoice-item';
                itemElement.innerHTML = `
                    <div class="item-name">${item.name}</div>
                    <div class="item-amount">${item.amount}</div>
                `;
                itemsContainer.appendChild(itemElement);
            });
            
            // Update total
            document.getElementById('modal-invoice-total').textContent = invoice.amount;
            
            // Update download link
            const downloadLink = document.getElementById('modal-invoice-download');
            downloadLink.setAttribute('data-id', invoiceId);
            downloadLink.addEventListener('click', function(e) {
                e.preventDefault();
                downloadInvoice(invoiceId);
            });
            
            // Show modal
            invoiceModal.style.display = 'block';
        }
        
        // Function to close invoice detail modal
        function closeInvoiceDetailModal() {
            const invoiceModal = document.getElementById('invoice-detail-modal');
            if (invoiceModal) {
                invoiceModal.style.display = 'none';
            }
        }
        
        // Validation helper functions
        function isValidCardNumber(cardNumber) {
            // Remove spaces and non-numeric characters
            const cleaned = cardNumber.replace(/\D/g, '');
            // Check length (most cards are 13-19 digits)
            return cleaned.length >= 13 && cleaned.length <= 19;
        }
        
        function isValidExpiry(expiry) {
            // Check MM/YY format
            return /^\d{2}\/\d{2}$/.test(expiry);
        }
        
        function isValidCVC(cvc) {
            // Check 3-4 digit format
            return /^\d{3,4}$/.test(cvc);
        }
        
        function isValidEmail(email) {
            // Simple email validation
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
    }
});