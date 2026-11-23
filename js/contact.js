/* ========================================
   DevSpace Portfolio - Contact JavaScript
   ======================================== */

// EmailJS Configuration
// Replace these placeholders with your own values from the EmailJS dashboard
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';

const emailjs = window.emailjs;

if (emailjs) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Show a temporary success/error notification
function showNotification(type, message) {
    const existing = document.querySelector('.contact-form-notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'contact-form-notification';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '14px 24px';
    notification.style.borderRadius = '6px';
    notification.style.color = '#ffffff';
    notification.style.fontSize = '14px';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '9999';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    notification.style.backgroundColor = type === 'success' ? '#64A47A' : '#d32f2f';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (!emailjs) {
            showNotification('error', 'Email service is not available. Please try again later.');
            return;
        }

        // Send form data via EmailJS
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm, EMAILJS_PUBLIC_KEY)
            .then(() => {
                showNotification('success', 'Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                showNotification('error', 'Failed to send your message. Please try again later.');
            });
    });
}

console.log('DevSpace Portfolio - Contact JS Loaded');
