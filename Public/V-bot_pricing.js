document.addEventListener('DOMContentLoaded', function() {
    console.log('[Log] Pricing page script loaded');
    
    // Find the Pricing menu item
    const pricingMenuItem = document.querySelector('div[data-page="pricing"]');
    
    if (pricingMenuItem) {
        console.log('[Log] Found pricing menu item');
        
        pricingMenuItem.addEventListener('click', function() {
            console.log('[Log] Pricing menu item clicked');
            
            // Wait for the page to be rendered
            setTimeout(function() {
                // Check if the pricing page exists
                const pricingPage = document.getElementById('pricing');
                
                if (pricingPage) {
                    console.log('[Log] Pricing page found, creating content');
                    createPricingContent(pricingPage);
                } else {
                    console.error('[Error] Pricing page not found after click');
                }
            }, 300);
        });
    } else {
        console.error('[Error] Could not find pricing menu item');
    }
    
    // Available plans data including the new free tier
    const availablePlans = [
        {
            id: 'free',
            name: 'Free',
            price: '$0',
            billingCycle: 'monthly',
            yearlyPrice: '$0',
            description: 'Get started with basic features',
            creditAmount: 500,
            ctaText: 'Get Started',
            ctaClass: 'btn-outline-primary',
            features: [
                { text: '500 credits', highlighted: true },
                { text: '1 phone number', highlighted: false },
                { text: 'Basic analytics', highlighted: false },
                { text: 'Email support', highlighted: false },
                { text: '1GB storage', highlighted: false },
                { text: 'Standard call quality', highlighted: false },
                { text: 'Community access', highlighted: false }
            ],
            limitations: [
                'No API access',
                'No call recording',
                'No custom caller ID',
                'Maximum 30 seconds per call'
            ]
        },
        {
            id: 'basic',
            name: 'Basic',
            price: '$19.99',
            billingCycle: 'monthly',
            yearlyPrice: '$199.99',
            description: 'Great for individuals and small teams',
            creditAmount: 2000,
            ctaText: 'Subscribe Now',
            ctaClass: 'btn-primary',
            features: [
                { text: '2,000 credits', highlighted: true },
                { text: '2 phone numbers', highlighted: false },
                { text: 'Basic analytics', highlighted: false },
                { text: 'Email support', highlighted: false },
                { text: '2GB storage', highlighted: false },
                { text: 'Standard call quality', highlighted: false },
                { text: 'Limited API access', highlighted: true },
                { text: 'Call recording', highlighted: true },
                { text: 'Basic caller ID', highlighted: false }
            ],
            limitations: []
        },
        {
            id: 'pro',
            name: 'Pro',
            price: '$49.99',
            billingCycle: 'monthly',
            yearlyPrice: '$499.99',
            description: 'Perfect for growing businesses',
            creditAmount: 10000,
            popular: true,
            ctaText: 'Subscribe Now',
            ctaClass: 'btn-primary',
            features: [
                { text: '10,000 credits', highlighted: true },
                { text: '20 phone numbers', highlighted: true },
                { text: 'Advanced analytics', highlighted: true },
                { text: 'Priority email support', highlighted: true },
                { text: '10GB storage', highlighted: false },
                { text: 'HD call quality', highlighted: true },
                { text: 'Full API access', highlighted: true },
                { text: 'Call recording & transcripts', highlighted: true },
                { text: 'Custom caller ID', highlighted: true },
                { text: 'Webhooks integration', highlighted: true }
            ],
            limitations: []
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: '$149.99',
            billingCycle: 'monthly',
            yearlyPrice: '$1499.99',
            description: 'For large organizations with advanced needs',
            creditAmount: 'Unlimited',
            ctaText: 'Contact Sales',
            ctaClass: 'btn-success',
            features: [
                { text: 'Unlimited credits', highlighted: true },
                { text: 'Unlimited phone numbers', highlighted: true },
                { text: 'Advanced analytics with AI insights', highlighted: true },
                { text: 'Priority phone & email support', highlighted: true },
                { text: 'Unlimited storage', highlighted: true },
                { text: '4K call quality', highlighted: true },
                { text: 'Advanced API access', highlighted: true },
                { text: 'Call recording, transcripts & analysis', highlighted: true },
                { text: 'Custom caller ID with brand name', highlighted: true },
                { text: 'Custom integrations', highlighted: true },
                { text: 'Dedicated account manager', highlighted: true },
                { text: 'SLA guarantees', highlighted: true },
                { text: 'Advanced security features', highlighted: true }
            ],
            limitations: []
        }
    ];
    
    // Comparison table features
    const comparisonFeatures = [
        { 
            category: 'Core Features',
            features: [
                { name: 'Credits', type: 'value', values: ['500', '2,000', '10,000', 'Unlimited'] },
                { name: 'Phone Numbers', type: 'value', values: ['1', '2', '20', 'Unlimited'] },
                { name: 'Call Time Limit', type: 'value', values: ['30 seconds', '10 minutes', '60 minutes', 'Unlimited'] },
                { name: 'Storage', type: 'value', values: ['1GB', '2GB', '10GB', 'Unlimited'] },
                { name: 'Call Quality', type: 'value', values: ['Standard', 'Standard', 'HD', '4K'] }
            ]
        },
        {
            category: 'Analytics & Reporting',
            features: [
                { name: 'Basic Analytics', type: 'boolean', values: [true, true, true, true] },
                { name: 'Advanced Analytics', type: 'boolean', values: [false, false, true, true] },
                { name: 'AI Insights', type: 'boolean', values: [false, false, false, true] },
                { name: 'Export Reports', type: 'boolean', values: [false, true, true, true] },
                { name: 'Custom Dashboards', type: 'boolean', values: [false, false, true, true] }
            ]
        },
        {
            category: 'Call Management',
            features: [
                { name: 'Call Recording', type: 'boolean', values: [false, true, true, true] },
                { name: 'Call Transcription', type: 'boolean', values: [false, false, true, true] },
                { name: 'Custom Caller ID', type: 'boolean', values: [false, false, true, true] },
                { name: 'Branded Caller ID', type: 'boolean', values: [false, false, false, true] },
                { name: 'Scheduled Calls', type: 'boolean', values: [false, true, true, true] },
                { name: 'Call Forwarding', type: 'boolean', values: [false, false, true, true] }
            ]
        },
        {
            category: 'Developer Features',
            features: [
                { name: 'API Access', type: 'boolean', values: [false, true, true, true] },
                { name: 'Webhooks', type: 'boolean', values: [false, false, true, true] },
                { name: 'Custom Integrations', type: 'boolean', values: [false, false, false, true] },
                { name: 'Developer Documentation', type: 'boolean', values: [true, true, true, true] },
                { name: 'Rate Limits', type: 'value', values: ['N/A', '100/day', '1,000/day', 'Custom'] }
            ]
        },
        {
            category: 'Support',
            features: [
                { name: 'Community Support', type: 'boolean', values: [true, true, true, true] },
                { name: 'Email Support', type: 'boolean', values: [true, true, true, true] },
                { name: 'Priority Support', type: 'boolean', values: [false, false, true, true] },
                { name: 'Phone Support', type: 'boolean', values: [false, false, false, true] },
                { name: 'Dedicated Account Manager', type: 'boolean', values: [false, false, false, true] },
                { name: 'Service Level Agreement', type: 'boolean', values: [false, false, false, true] }
            ]
        }
    ];
    
    // Function to create the entire pricing page content
    function createPricingContent(container) {
        console.log('[Log] Creating pricing page content');
        
        // Clear existing content
        container.innerHTML = '';
        
        // Add CSS to container
        const style = document.createElement('style');
        style.textContent = `
            .pricing-container {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #333;
            }
            .page-header {
                margin-bottom: 40px;
                text-align: center;
            }
            .page-header h2 {
                font-size: 32px;
                font-weight: 700;
                margin-bottom: 16px;
                color: #2d3748;
            }
            .page-header p {
                font-size: 18px;
                color: #718096;
                max-width: 700px;
                margin: 0 auto;
            }
            
            /* Billing Cycle Toggle */
            .billing-toggle {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 30px 0;
                gap: 15px;
            }
            .billing-toggle .billing-option {
                font-size: 16px;
                color: #718096;
                font-weight: 500;
            }
            .billing-toggle .billing-option.active {
                color: #4a5568;
                font-weight: 600;
            }
            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 60px;
                height: 34px;
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
                border-radius: 34px;
            }
            .toggle-slider:before {
                position: absolute;
                content: "";
                height: 26px;
                width: 26px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            input:checked + .toggle-slider {
                background-color: #3182ce;
            }
            input:checked + .toggle-slider:before {
                transform: translateX(26px);
            }
            .yearly-discount {
                background-color: #ebf8ff;
                color: #2b6cb0;
                padding: 4px 8px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                margin-left: 10px;
            }
            
            /* Plan Cards Container */
            .pricing-plans {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 30px;
                margin-bottom: 60px;
            }
            
            /* Plan Card */
            .plan-card {
                flex: 1;
                min-width: 280px;
                max-width: 340px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                transition: transform 0.3s, box-shadow 0.3s;
                display: flex;
                flex-direction: column;
                position: relative;
            }
            .plan-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            }
            
            /* Popular Tag */
            .popular-tag {
                position: absolute;
                top: 15px;
                right: -30px;
                background-color: #4299e1;
                color: white;
                font-size: 12px;
                font-weight: 600;
                padding: 5px 30px;
                transform: rotate(45deg);
                text-transform: uppercase;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            /* Plan Card Header */
            .plan-header {
                padding: 24px;
                background-color: #f8fafc;
                border-bottom: 1px solid #edf2f7;
            }
            .plan-name {
                font-size: 20px;
                font-weight: 700;
                margin: 0 0 10px 0;
                color: #2d3748;
            }
            .plan-description {
                font-size: 14px;
                color: #718096;
                margin: 0 0 20px 0;
            }
            .plan-price {
                font-size: 36px;
                font-weight: 800;
                color: #2d3748;
                margin: 0;
                display: flex;
                align-items: baseline;
            }
            .plan-cycle {
                font-size: 16px;
                color: #a0aec0;
                margin-left: 5px;
                font-weight: 500;
            }
            .plan-credits {
                margin-top: 10px;
                font-size: 15px;
                font-weight: 600;
                color: #4a5568;
            }
            .plan-credits i {
                margin-right: 5px;
                color: #4299e1;
            }
            
            /* Plan Features */
            .plan-features {
                padding: 24px;
                flex: 1;
                background-color: #fff;
            }
            .features-title {
                font-size: 16px;
                font-weight: 600;
                margin: 0 0 16px 0;
                color: #4a5568;
            }
            .features-list {
                list-style-type: none;
                padding: 0;
                margin: 0;
            }
            .features-list li {
                padding: 8px 0 8px 28px;
                position: relative;
                font-size: 14px;
                color: #4a5568;
            }
            .features-list li::before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #38b2ac;
                font-weight: 700;
            }
            .features-list li.highlighted {
                font-weight: 600;
                color: #2d3748;
            }
            .features-list li.highlighted::before {
                color: #3182ce;
            }
            
            /* Plan Limitations */
            .plan-limitations {
                padding: 0 24px 16px 24px;
                background-color: #fff;
            }
            .limitations-title {
                font-size: 14px;
                font-weight: 600;
                margin: 0 0 12px 0;
                color: #a0aec0;
            }
            .limitations-list {
                list-style-type: none;
                padding: 0;
                margin: 0;
            }
            .limitations-list li {
                padding: 4px 0 4px 24px;
                position: relative;
                font-size: 13px;
                color: #a0aec0;
            }
            .limitations-list li::before {
                content: "×";
                position: absolute;
                left: 0;
                color: #fc8181;
                font-weight: 700;
            }
            
            /* Plan Footer */
            .plan-footer {
                padding: 24px;
                background-color: #f8fafc;
                border-top: 1px solid #edf2f7;
                text-align: center;
            }
            
            /* Button Styles */
            .btn {
                display: inline-block;
                font-weight: 600;
                text-align: center;
                vertical-align: middle;
                user-select: none;
                border: 1px solid transparent;
                padding: 10px 16px;
                font-size: 14px;
                line-height: 1.5;
                border-radius: 4px;
                transition: all 0.15s ease-in-out;
                cursor: pointer;
                width: 100%;
            }
            .btn-primary {
                color: #fff;
                background-color: #4299e1;
                border-color: #4299e1;
            }
            .btn-primary:hover {
                background-color: #3182ce;
                border-color: #3182ce;
            }
            .btn-success {
                color: #fff;
                background-color: #48bb78;
                border-color: #48bb78;
            }
            .btn-success:hover {
                background-color: #38a169;
                border-color: #38a169;
            }
            .btn-outline-primary {
                color: #4299e1;
                background-color: transparent;
                border-color: #4299e1;
            }
            .btn-outline-primary:hover {
                color: #fff;
                background-color: #4299e1;
                border-color: #4299e1;
            }
            
            /* Comparison Table */
            .comparison-section {
                margin-top: 80px;
                margin-bottom: 60px;
            }
            .comparison-header {
                text-align: center;
                margin-bottom: 40px;
            }
            .comparison-header h3 {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 16px;
                color: #2d3748;
            }
            .comparison-header p {
                font-size: 16px;
                color: #718096;
                max-width: 700px;
                margin: 0 auto;
            }
            .comparison-table-container {
                overflow-x: auto;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
            }
            .comparison-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 14px;
                color: #4a5568;
                min-width: 800px;
            }
            .comparison-table th,
            .comparison-table td {
                padding: 16px;
                text-align: center;
                border-bottom: 1px solid #edf2f7;
            }
            .comparison-table th:first-child,
            .comparison-table td:first-child {
                text-align: left;
                padding-left: 24px;
            }
            .comparison-table th {
                background-color: #f8fafc;
                font-weight: 600;
                color: #2d3748;
            }
            .comparison-table tr:last-child td {
                border-bottom: none;
            }
            .comparison-table .plan-column {
                min-width: 140px;
            }
            .comparison-table .feature-name {
                font-weight: 500;
            }
            .comparison-table .category-row {
                background-color: #f1f5f9;
            }
            .comparison-table .category-row td {
                font-weight: 600;
                color: #2d3748;
                padding-top: 20px;
                padding-bottom: 20px;
            }
            .comparison-table .check {
                color: #38b2ac;
                font-size: 18px;
            }
            .comparison-table .cross {
                color: #fc8181;
                font-size: 18px;
            }
            .recommended-column {
                background-color: #ebf8ff;
                box-shadow: 0 0 0 2px #90cdf4;
                position: relative;
            }
            .recommended-tag {
                position: absolute;
                top: -10px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #4299e1;
                color: white;
                font-size: 11px;
                font-weight: 600;
                padding: 2px 8px;
                border-radius: 10px;
                white-space: nowrap;
            }
            
            /* FAQ Section */
            .faq-section {
                margin-top: 80px;
                margin-bottom: 60px;
            }
            .faq-header {
                text-align: center;
                margin-bottom: 40px;
            }
            .faq-header h3 {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 16px;
                color: #2d3748;
            }
            .faq-container {
                max-width: 800px;
                margin: 0 auto;
            }
            .faq-item {
                margin-bottom: 16px;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                overflow: hidden;
            }
            .faq-question {
                padding: 16px 20px;
                background-color: #f8fafc;
                cursor: pointer;
                font-weight: 600;
                color: #2d3748;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: background-color 0.2s;
            }
            .faq-question:hover {
                background-color: #edf2f7;
            }
            .faq-question i {
                transition: transform 0.2s;
            }
            .faq-item.active .faq-question i {
                transform: rotate(180deg);
            }
            .faq-answer {
                padding: 0;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease-out, padding 0.3s ease;
            }
            .faq-item.active .faq-answer {
                padding: 16px 20px;
                max-height: 500px;
            }
            .faq-answer p {
                margin: 0;
                color: #4a5568;
                line-height: 1.6;
            }
            
            /* Call to Action Section */
            .cta-section {
                text-align: center;
                background-color: #f7fafc;
                padding: 60px 20px;
                border-radius: 8px;
                margin-bottom: 60px;
            }
            .cta-section h3 {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 16px;
                color: #2d3748;
            }
            .cta-section p {
                font-size: 16px;
                color: #718096;
                max-width: 600px;
                margin: 0 auto 24px auto;
            }
            .cta-buttons {
                display: flex;
                justify-content: center;
                gap: 16px;
                flex-wrap: wrap;
            }
            .cta-btn {
                display: inline-block;
                font-weight: 600;
                text-align: center;
                padding: 12px 24px;
                font-size: 14px;
                border-radius: 4px;
                transition: all 0.15s ease-in-out;
                cursor: pointer;
            }
            .cta-primary {
                color: #fff;
                background-color: #4299e1;
                border: 1px solid #4299e1;
            }
            .cta-primary:hover {
                background-color: #3182ce;
                border-color: #3182ce;
            }
            .cta-secondary {
                color: #4299e1;
                background-color: transparent;
                border: 1px solid #4299e1;
            }
            .cta-secondary:hover {
                background-color: #ebf8ff;
            }
            
            /* Responsive Styles */
            @media (max-width: 768px) {
                .pricing-plans {
                    flex-direction: column;
                    align-items: center;
                }
                .plan-card {
                    max-width: 100%;
                    width: 100%;
                }
                .cta-buttons {
                    flex-direction: column;
                    width: 100%;
                    max-width: 300px;
                    margin: 0 auto;
                }
            }
        `;
        
        // Add style to container
        container.appendChild(style);
        
        // Create page structure
        const pageContent = document.createElement('div');
        pageContent.className = 'pricing-container';
        pageContent.innerHTML = `
            <div class="page-header">
                <h2>Simple, Transparent Pricing</h2>
                <p>Choose the plan that works best for your needs. All plans include access to our core features.</p>
            </div>
            
            <div class="billing-toggle">
                <div class="billing-option monthly active">Monthly Billing</div>
                <label class="toggle-switch">
                    <input type="checkbox" id="billing-cycle-toggle">
                    <span class="toggle-slider"></span>
                </label>
                <div class="billing-option yearly">
                    Yearly Billing
                    <span class="yearly-discount">Save 16%</span>
                </div>
            </div>
            
            <div class="pricing-plans">
                ${availablePlans.map(plan => `
                    <div class="plan-card">
                        ${plan.popular ? '<div class="popular-tag">Most Popular</div>' : ''}
                        <div class="plan-header">
                            <h3 class="plan-name">${plan.name}</h3>
                            <p class="plan-description">${plan.description}</p>
                            <p class="plan-price">
                                <span class="monthly-price">${plan.price}</span>
                                <span class="yearly-price" style="display:none;">${plan.yearlyPrice}</span>
                                <span class="plan-cycle">/${plan.billingCycle}</span>
                            </p>
                            <div class="plan-credits">
                                <i class="fas fa-coins"></i> ${typeof plan.creditAmount === 'number' ? plan.creditAmount.toLocaleString() : plan.creditAmount} credits
                            </div>
                        </div>
                        <div class="plan-features">
                            <h4 class="features-title">What's included:</h4>
                            <ul class="features-list">
                                ${plan.features.map(feature => `
                                    <li class="${feature.highlighted ? 'highlighted' : ''}">${feature.text}</li>
                                `).join('')}
                            </ul>
                        </div>
                        ${plan.limitations.length > 0 ? `
                            <div class="plan-limitations">
                                <h4 class="limitations-title">Limitations:</h4>
                                <ul class="limitations-list">
                                    ${plan.limitations.map(limitation => `
                                        <li>${limitation}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        <div class="plan-footer">
                            <button class="btn ${plan.ctaClass}" data-plan-id="${plan.id}">${plan.ctaText}</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="comparison-section">
                <div class="comparison-header">
                    <h3>Feature Comparison</h3>
                    <p>A detailed look at what each plan offers to help you make the right choice.</p>
                </div>
                <div class="comparison-table-container">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Features</th>
                                ${availablePlans.map((plan, index) => `
                                    <th class="plan-column ${plan.id === 'pro' ? 'recommended-column' : ''}">
                                        ${plan.id === 'pro' ? '<div class="recommended-tag">Recommended</div>' : ''}
                                        ${plan.name}
                                    </th>
                                `).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${comparisonFeatures.map(category => `
                                <tr class="category-row">
                                    <td colspan="${availablePlans.length + 1}">${category.category}</td>
                                </tr>
                                ${category.features.map(feature => `
                                    <tr>
                                        <td class="feature-name">${feature.name}</td>
                                        ${feature.values.map(value => {
                                            if (feature.type === 'boolean') {
                                                return `<td>${value ? '<i class="fas fa-check check"></i>' : '<i class="fas fa-times cross"></i>'}</td>`;
                                            } else {
                                                return `<td>${value}</td>`;
                                            }
                                        }).join('')}
                                    </tr>
                                `).join('')}
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="faq-section">
                <div class="faq-header">
                    <h3>Frequently Asked Questions</h3>
                </div>
                <div class="faq-container">
                    <div class="faq-item">
                        <div class="faq-question">
                            What are credits and how do they work?
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            <p>Credits are our universal currency for using features across the platform. Each call, SMS, or API request consumes a certain number of credits. For example, a standard one-minute call typically costs 1 credit, while HD calls might cost 2 credits per minute. You can view your credit usage in your dashboard, and credits reset at the beginning of your billing cycle.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">
                            Can I upgrade or downgrade my plan?
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            <p>Yes, you can change your plan at any time. When upgrading, the new plan and benefits take effect immediately, and we'll prorate the charges for the remainder of your billing cycle. When downgrading, the changes will take effect at the start of your next billing cycle. You can manage your subscription from the Billing section of your account dashboard.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">
                            What happens if I run out of credits?
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            <p>If you exhaust your monthly credit allocation, you have a few options: (1) Wait until your credits reset at the start of your next billing cycle, (2) Upgrade to a higher plan with more credits, or (3) Purchase additional credit packs from the Billing section. We'll also send you notifications when you're approaching your credit limit so you can plan accordingly.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">
                            Is there a free trial available?
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            <p>Yes! We offer a free tier that includes 500 credits per month. This allows you to test our platform with real use cases before committing to a paid plan. The Free plan has some limitations but includes access to our core features. You can use the Free plan for as long as you want, or upgrade anytime to access more credits and advanced features.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">
                            What payment methods do you accept?
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            <p>We accept all major credit cards including Visa, Mastercard, American Express, and Discover. For Enterprise plans, we also offer invoicing with net-30 payment terms. If you require special payment arrangements, please contact our sales team to discuss options.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">
                            Do you offer refunds?
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            <p>We offer a 14-day money-back guarantee for new subscribers. If you're not satisfied with our service within the first 14 days, contact our support team for a full refund. After the 14-day period, we don't provide refunds for subscription payments, but you can cancel your subscription at any time to prevent future charges.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="cta-section">
                <h3>Ready to get started?</h3>
                <p>Choose the plan that works best for you, or try our free tier with no credit card required.</p>
                <div class="cta-buttons">
                    <a href="#" class="cta-btn cta-primary" id="signup-cta">Create Free Account</a>
                    <a href="#" class="cta-btn cta-secondary" id="demo-cta">Request a Demo</a>
                </div>
            </div>
        `;
        
        // Add content to container
        container.appendChild(pageContent);
        
        // Setup event listeners
        setupEventListeners();
        
        console.log('[Log] Pricing page created successfully');
        
        // Function to set up all event listeners
        function setupEventListeners() {
            console.log('[Log] Setting up pricing page event listeners');
            
            // Billing cycle toggle
            const billingToggle = document.getElementById('billing-cycle-toggle');
            if (billingToggle) {
                billingToggle.addEventListener('change', function() {
                    toggleBillingCycle(this.checked);
                });
            }
            
            // Plan buttons
            document.querySelectorAll('.plan-footer .btn').forEach(button => {
                button.addEventListener('click', function() {
                    const planId = this.getAttribute('data-plan-id');
                    selectPlan(planId);
                });
            });
            
            // FAQ toggle
            document.querySelectorAll('.faq-question').forEach(question => {
                question.addEventListener('click', function() {
                    const faqItem = this.parentElement;
                    faqItem.classList.toggle('active');
                });
            });
            
            // Sign up CTA
            const signupCta = document.getElementById('signup-cta');
            if (signupCta) {
                signupCta.addEventListener('click', function(e) {
                    e.preventDefault();
                    startSignup();
                });
            }
            
            // Demo CTA
            const demoCta = document.getElementById('demo-cta');
            if (demoCta) {
                demoCta.addEventListener('click', function(e) {
                    e.preventDefault();
                    requestDemo();
                });
            }
        }
        
        // Function to toggle billing cycle
        function toggleBillingCycle(isYearly) {
            console.log(`[Log] Toggling to ${isYearly ? 'yearly' : 'monthly'} billing`);
            
            // Toggle billing option active class
            document.querySelector('.billing-option.monthly').classList.toggle('active', !isYearly);
            document.querySelector('.billing-option.yearly').classList.toggle('active', isYearly);
            
            // Toggle price display
            const monthlyPrices = document.querySelectorAll('.monthly-price');
            const yearlyPrices = document.querySelectorAll('.yearly-price');
            
            monthlyPrices.forEach(el => {
                el.style.display = isYearly ? 'none' : '';
            });
            
            yearlyPrices.forEach(el => {
                el.style.display = isYearly ? '' : 'none';
            });
            
            // Update plan cycle text
            const planCycles = document.querySelectorAll('.plan-cycle');
            planCycles.forEach(el => {
                el.textContent = isYearly ? '/year' : '/month';
            });
        }
        
        // Function to handle plan selection
        function selectPlan(planId) {
            console.log(`[Log] Selected plan: ${planId}`);
            
            // Get the current billing cycle
            const isYearly = document.getElementById('billing-cycle-toggle').checked;
            const cycle = isYearly ? 'yearly' : 'monthly';
            
            // Find the selected plan
            const selectedPlan = availablePlans.find(plan => plan.id === planId);
            if (!selectedPlan) {
                console.error(`[Error] Plan not found: ${planId}`);
                return;
            }
            
            // Handle special cases
            if (planId === 'free') {
                // Redirect to signup
                startSignup('free');
                return;
            }
            
            if (planId === 'enterprise') {
                // Redirect to contact sales
                contactSales();
                return;
            }
            
            // For other plans, proceed to checkout
            proceedToCheckout(planId, cycle);
        }
        
        // Function to start signup process
        function startSignup(planId = 'free') {
            console.log(`[Log] Starting signup process for plan: ${planId}`);
            
            // In a real app, redirect to signup page or show modal
            alert(`Starting signup process for ${planId} plan`);
            
            // Example of navigating to a signup page
            // window.location.href = `/signup?plan=${planId}`;
        }
        
        // Function to contact sales
        function contactSales() {
            console.log('[Log] Contacting sales for Enterprise plan');
            
            // In a real app, open contact form or redirect
            alert('Redirecting to Enterprise sales contact form');
            
            // Example of showing a contact modal or navigating to contact page
            // showContactModal() or window.location.href = '/contact-sales';
        }
        
        // Function to request a demo
        function requestDemo() {
            console.log('[Log] Requesting a demo');
            
            // In a real app, open demo request form
            alert('Opening demo request form');
            
            // Example of showing a demo request modal or navigating to demo page
            // showDemoModal() or window.location.href = '/request-demo';
        }
        
        // Function to proceed to checkout
        function proceedToCheckout(planId, cycle) {
            console.log(`[Log] Proceeding to checkout for plan: ${planId} with ${cycle} billing`);
            
            // In a real app, redirect to checkout page
            alert(`Proceeding to checkout for ${planId} plan with ${cycle} billing`);
            
            // Example of navigating to checkout page
            // window.location.href = `/checkout?plan=${planId}&cycle=${cycle}`;
        }
    }
});