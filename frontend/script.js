// Replace script.js with this updated version that includes blur overlay and smooth animations

// ========== EMAILJS CONFIGURATION ==========
(function() {
    emailjs.init("UgTt55uwT09RSZFKd");
})();

const SERVICE_ID = "service_ytheiah";
const TEMPLATE_ID = "template_eutli3g";

// ========== TOAST NOTIFICATIONS ==========
function showToast(message, type = 'error') {
    const existingToast = document.querySelector('.davelabs-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'davelabs-toast';

    let icon = '';
    if (type === 'error') icon = '<i class="fas fa-exclamation-circle"></i>';
    else if (type === 'success') icon = '<i class="fas fa-check-circle"></i>';
    else if (type === 'info') icon = '<i class="fas fa-info-circle"></i>';
    else icon = '<i class="fas fa-clock"></i>';

    toast.innerHTML = `
        <div class="toast-content ${type}">
            ${icon}
            <span>${message}</span>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        </div>
    `;

    document.body.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    });

    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);
}

// Add toast styles dynamically
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    .davelabs-toast { position: fixed; top: 20px; right: 20px; z-index: 10000; animation: slideIn 0.3s ease forwards; }
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
    .toast-content { display: flex; align-items: center; gap: 12px; padding: 14px 20px; background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); min-width: 280px; max-width: 400px; font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; border-left: 4px solid; }
    .toast-content.error { border-left-color: #dc3545; background: linear-gradient(135deg, #fff, #fff5f5); }
    .toast-content.error i { color: #dc3545; font-size: 20px; }
    .toast-content.success { border-left-color: #28a745; background: linear-gradient(135deg, #fff, #f0fff4); }
    .toast-content.success i { color: #28a745; font-size: 20px; }
    .toast-content.info { border-left-color: #17a2b8; background: linear-gradient(135deg, #fff, #f0f9ff); }
    .toast-content.info i { color: #17a2b8; font-size: 20px; }
    .toast-content span { flex: 1; color: #1a1a2e; line-height: 1.4; }
    .toast-close { background: none; border: none; cursor: pointer; color: #999; font-size: 14px; padding: 4px; transition: 0.2s; }
    .toast-close:hover { color: #1a1a2e; transform: scale(1.1); }
`;
document.head.appendChild(toastStyles);

// ========== SMOOTH SCROLLING ==========
function smoothScrollToElement(element, duration = 800) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startPosition + (distance * ease));
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);
}

// ========== BURGER MENU WITH BLUR EFFECT & BOTTOM TO TOP ANIMATION ==========
function initBurgerMenu() {
    const burgerBtn = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav__links');
    const body = document.body;

    if (!burgerBtn || !navMenu) return;

    // Create blur overlay element
    const blurOverlay = document.createElement('div');
    blurOverlay.className = 'blur-overlay';
    blurOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    `;
    document.body.appendChild(blurOverlay);

    // Function to open menu
    function openMenu() {
        burgerBtn.classList.add('active');
        navMenu.classList.add('active');
        body.classList.add('menu-open');
        blurOverlay.style.visibility = 'visible';
        blurOverlay.style.opacity = '1';
        
        // Prevent body scroll
        body.style.overflow = 'hidden';
    }

    // Function to close menu
    function closeMenu() {
        burgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
        blurOverlay.style.visibility = 'hidden';
        blurOverlay.style.opacity = '0';
        
        // Restore body scroll
        body.style.overflow = '';
    }

    // Toggle menu on burger click
    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when clicking on blur overlay
    blurOverlay.addEventListener('click', () => {
        closeMenu();
    });

    // Close menu when clicking on a navigation link
    const navLinks = document.querySelectorAll('.nav__links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Handle window resize - close menu if switching to desktop view
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMenu();
            }
        }, 250);
    });
}

// ========== MAIN INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    initBurgerMenu(); // Initialize burger menu with blur effect

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav__links a, #quick-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                smoothScrollToElement(targetSection, 600);
            }
        });
    });

    // ========== INITIALIZE INTEL-TEL-INPUT ==========
    const phoneInput = document.querySelector("#your-phoneNumber");
    let iti = null;

    if (phoneInput) {
        iti = window.intlTelInput(phoneInput, {
            initialCountry: "ke",
            preferredCountries: ["ke", "us", "gb", "ng", "za", "tz", "ug"],
            separateDialCode: true,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19/build/js/utils.js"
        });
    }

    // ========== FORM HANDLING ==========
    const sendEmailBtn = document.getElementById('send-via-Email');
    const sendWhatsAppBtn = document.getElementById('send-via-whatsapp');

    function getFormData() {
        const name = document.getElementById('your-name')?.value.trim() || '';
        const company = document.getElementById('company')?.value.trim() || '';
        const email = document.getElementById('your-email')?.value.trim() || '';
        const message = document.getElementById('your-Message')?.value.trim() || '';

        let fullPhone = '';
        let countryName = 'Kenya';
        let countryCode = '+254';

        if (iti) {
            fullPhone = iti.getNumber();
            const selectedCountryData = iti.getSelectedCountryData();
            countryName = selectedCountryData.name;
            countryCode = `+${selectedCountryData.dialCode}`;
        } else {
            const phoneRaw = document.getElementById('your-phoneNumber')?.value.trim() || '';
            fullPhone = phoneRaw;
        }

        return { name, company, email, phone: fullPhone, message, countryName, countryCode };
    }

    function validateForm() {
        const { name, email, phone, message } = getFormData();

        if (!name) {
            showToast('Please enter your full name', 'error');
            document.getElementById('your-name')?.focus();
            return false;
        }
        if (!email) {
            showToast('Email address is required', 'error');
            document.getElementById('your-email')?.focus();
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showToast('Please enter a valid email address', 'error');
            document.getElementById('your-email')?.focus();
            return false;
        }
        if (!phone) {
            showToast('Please enter your phone number', 'error');
            document.getElementById('your-phoneNumber')?.focus();
            return false;
        }
        if (iti && !iti.isValidNumber()) {
            showToast('Please enter a valid phone number', 'error');
            document.getElementById('your-phoneNumber')?.focus();
            return false;
        }
        if (!message) {
            showToast('Please write your message', 'error');
            document.getElementById('your-Message')?.focus();
            return false;
        }
        return true;
    }

    async function sendEmail(formData) {
        const fullMessage = `Name: ${formData.name}
Company: ${formData.company || 'Not provided'}
Phone: ${formData.phone}
Email: ${formData.email}
Country: ${formData.countryName}

Message:
${formData.message}`;

        const templateParams = {
            title: `New message from ${formData.name}`,
            from_name: formData.name,
            from_email: formData.email,
            reply_email: formData.email,
            message: fullMessage,
            user_email: formData.email,
            client_email: formData.email
        };

        try {
            const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
            console.log('Email sent:', response);
            return { success: true };
        } catch (error) {
            console.error('Email error:', error);
            return { success: false, error: error.text };
        }
    }

    function resetForm() {
        document.getElementById('your-name').value = '';
        document.getElementById('company').value = '';
        document.getElementById('your-email').value = '';
        document.getElementById('your-phoneNumber').value = '';
        document.getElementById('your-Message').value = '';
        if (iti) {
            iti.setCountry('ke');
            iti.setNumber('');
        }
    }

    if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            if (!validateForm()) return;
            const formData = getFormData();
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';
            this.disabled = true;
            const result = await sendEmail(formData);
            if (result.success) {
                showToast('Message sent successfully! We will respond within 24 hours.', 'success');
                resetForm();
            } else {
                showToast('Failed to send. Please try again or use WhatsApp.', 'error');
            }
            this.innerHTML = originalText;
            this.disabled = false;
        });
    }

    if (sendWhatsAppBtn) {
        sendWhatsAppBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!validateForm()) return;
            const formData = getFormData();
            let message = '';
            message += `Name: ${formData.name}\n`;
            if (formData.company) message += `Company: ${formData.company}\n`;
            message += `Phone: ${formData.phone}\n`;
            message += `Email: ${formData.email}\n\n`;
            message += `Message:\n${formData.message}`;
            const phoneNumber = '254733588676';
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');
            showToast('WhatsApp will open to send your message.', 'info');
        });
    }

    // ========== ACTIVE NAVIGATION ==========
    const sections = document.querySelectorAll('section[id]');
    const navActiveLinks = document.querySelectorAll('.nav__links a');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 150;
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        navActiveLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) link.classList.add('active');
        });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });
    updateActiveNav();

    // ========== CHARACTER COUNTER ==========
    const textarea = document.getElementById('your-Message');
    if (textarea) {
        const counterContainer = document.createElement('div');
        counterContainer.style.cssText = 'display: flex; align-items: center; justify-content: flex-end; gap: 8px; margin-top: 8px; font-size: 12px; max-width: 500px; margin-left: auto; margin-right: auto;';
        const counter = document.createElement('span');
        counter.className = 'davelabs-counter';
        const icon = document.createElement('i');
        icon.className = 'far fa-keyboard';
        icon.style.color = '#999';
        counterContainer.appendChild(icon);
        counterContainer.appendChild(counter);
        textarea.parentNode.appendChild(counterContainer);

        function updateCounter() {
            const length = textarea.value.length;
            if (length === 0) {
                counter.innerHTML = '0 characters';
                counter.style.color = '#999';
                icon.style.color = '#999';
            } else if (length < 20) {
                counter.innerHTML = `${length} characters (recommended: 20+)`;
                counter.style.color = '#ff9800';
                icon.style.color = '#ff9800';
            } else {
                counter.innerHTML = `${length} characters - looking good`;
                counter.style.color = '#28a745';
                icon.style.color = '#28a745';
            }
        }
        textarea.addEventListener('input', updateCounter);
        updateCounter();
    }

    console.log('DaveLabs website ready - Burger menu with blur effect & smooth animations active');
});