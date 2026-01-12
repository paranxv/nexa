
const NEXATECH_PLUS_FEATURES = [
    { text: 'Free basic Antivirus (optional)' },
    { text: 'Support Plus - 5 incidents (1 hour each)' },
    { text: 'General Diagnostics and Troubleshooting Assistance' },
    { text: 'Setup and Installation (Computers, Printers, Home Appliances and Software)' },
    { text: 'Troubleshoot Installation and Configuration Issues' },
    { text: 'Support for Drivers and Application Software (Conditions Apply)' },
    { text: 'Anti-Spyware Setup and Configuration, and Optimization' },
    { text: 'Security Software – Installation, Threat Management, and Troubleshooting' },
    { text: 'Computer Optimization, Memory Management, and LTV Enhancement' },
    { text: 'Software and Application Update Management' },
    { text: 'Monthly Scheduled PC Tuneup Call with an Expert' },
    { text: 'Email Configuration, Archival, and General Assistance' },
    { text: 'Hardware Repair Coverage (Computer and Printer)' }
]

const NEXATECH_PRO_FEATURES = [
    { text: 'Free basic Antivirus (optional)' },
    { text: 'Unlimited Support (1 Computer, 1 Phone)' },
    { text: 'General Diagnostics and Troubleshooting Assistance' },
    { text: 'Setup and Installation (Computers, Printers, Home Appliances and Software)' },
    { text: 'Support for Drivers and Application Software (Conditions Apply)' },
    { text: 'Anti-Spyware Setup and Configuration, and Optimization' },
    { text: 'Security Software – Installation, Threat Management, and Troubleshooting' },
    { text: 'Computer Optimization, Memory Management, and LTV Enhancement' },
    { text: 'Software and Application Update Management' },
    { text: '1/2 Hour PC Genius training to educate Customer on Computer Skills' },
    { text: 'Monthly Scheduled PC Tuneup Call with an Expert' },
    { text: 'Email Configuration, Archival, and General Assistance' },
    { text: 'Virtual Assistant Service (Price Matching)' }
]

const NEXATECH_TP_FEATURES = [
    { text: 'Free basic Antivirus (optional)' },
    { text: 'Unlimited Support for up to 10 devices' },
    { text: 'General Diagnostics and Troubleshooting Assistance' },
    { text: 'Setup and Installation (Computers, Printers, Home Appliances and Software)' },
    { text: 'Troubleshoot Installation and Configuration Issues' },
    { text: 'Support for Drivers and Application Software (Conditions Apply)' },
    { text: 'Anti-Spyware Setup and Configuration, and Optimization' },
    { text: 'Security Software – Installation, Threat Management, and Troubleshooting' },
    { text: 'Computer Optimization, Memory Management, and LTV Enhancement' },
    { text: 'Software and Application Update Management' },
    { text: '1/2 Hour PC Genius training to educate Customer on Computer Skills' },
    { text: 'Monthly Scheduled PC Tuneup Call with an Expert' },
    { text: 'Email Configuration, Archival, and General Assistance' },
    { text: 'Virtual Assistant Service (Price Matching)' },
    { text: 'Hardware Repair Coverage (Computer and Printer)' }
]

export const HARDCODED_PLANS = [
    {
        id: 101,
        title: 'Nexatech Plus',
        price: 399,
        brand: 'Nexatechsol',
        image_url: 'plus', // mapped in component
        features: NEXATECH_PLUS_FEATURES,
        description: 'Promotional Bundle',
        duration: '1 Year',
        popular: false,
        bestValue: false
    },
    {
        id: 102,
        title: 'Nexatech PRO',
        price: 599,
        brand: 'Nexatechsol',
        image_url: 'pro', // mapped in component
        features: NEXATECH_PRO_FEATURES,
        description: 'Promotional Bundle',
        duration: '1 Year',
        popular: true,
        bestValue: false
    },
    {
        id: 103,
        title: 'Nexatech Total Protection',
        price: 799,
        brand: 'Nexatechsol',
        image_url: 'premium', // mapped in component
        features: NEXATECH_TP_FEATURES,
        description: 'Promotional Bundle',
        duration: '1 Year',
        popular: false,
        bestValue: true
    }
]
