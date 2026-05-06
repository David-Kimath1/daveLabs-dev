// Dark Mode Toggle
const toggleBtn = document.getElementById('darkModeToggle');
const icon = toggleBtn.querySelector('i');

if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
} else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
}

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        localStorage.setItem('darkMode', 'disabled');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Logo click to home
document.getElementById('logoHomeLink')?.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// EmailJS Initialization
(function() { emailjs.init("UgTt55uwT09RSZFKd"); })();
const SERVICE_ID = "service_ytheiah";
const TEMPLATE_ID = "template_eutli3g";

// Toast Notifications
function showToast(message, type = 'error') {
    const existing = document.querySelector('.davelabs-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'davelabs-toast';
    let iconHtml = type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : (type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-info-circle"></i>');
    toast.innerHTML = `<div class="toast-content ${type}">${iconHtml}<span>${message}</span><button class="toast-close"><i class="fas fa-times"></i></button></div>`;
    document.body.appendChild(toast);
    toast.querySelector('.toast-close').onclick = () => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    };
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);
}

// Toast Styles
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    .davelabs-toast{position:fixed;top:20px;right:20px;z-index:10000;animation:slideIn 0.3s ease forwards;}
    @keyframes slideIn{from{transform:translateX(100%);opacity:0;}to{transform:translateX(0);opacity:1;}}
    @keyframes slideOut{from{transform:translateX(0);opacity:1;}to{transform:translateX(100%);opacity:0;}}
    .toast-content{display:flex;align-items:center;gap:12px;padding:14px 20px;background:var(--bg-card);border-radius:12px;box-shadow:var(--shadow-md);min-width:280px;font-family:inherit;border-left:4px solid;}
    .toast-content.error{border-left-color:#dc3545;}
    .toast-content.success{border-left-color:#28a745;}
    .toast-content i{font-size:20px;}
    .toast-content span{flex:1;color:var(--text-primary);}
    .toast-close{background:none;border:none;cursor:pointer;color:#999;padding:4px;}
    .toast-close:hover{color:var(--text-primary);}
`;
document.head.appendChild(toastStyles);

// Burger Menu with Blur Overlay - FIXED
function initBurger() {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav__links');
    const body = document.body;
    
    if (!burger) return;
    
    // Create blur overlay
    const overlay = document.createElement('div');
    overlay.className = 'blur-overlay';
    document.body.appendChild(overlay);
    
    const openMenu = () => {
        burger.classList.add('active');
        nav.classList.add('active');
        body.classList.add('menu-open');
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        body.style.overflow = 'hidden';
    };
    
    const closeMenu = () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
        body.classList.remove('menu-open');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        body.style.overflow = '';
    };
    
    // Toggle menu on burger click
    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (nav.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking any nav link
    const navLinks = document.querySelectorAll('.nav__links a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Handle window resize - close menu if switching to desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && nav.classList.contains('active')) {
                closeMenu();
            }
        }, 250);
    });
}

// Initialize burger menu
initBurger();

// Phone Input (intl-tel-input)
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

// Form Data Helpers
function getFormData() {
    const name = document.getElementById('your-name')?.value.trim() || '';
    const company = document.getElementById('company')?.value.trim() || '';
    const email = document.getElementById('your-email')?.value.trim() || '';
    const message = document.getElementById('your-Message')?.value.trim() || '';
    let fullPhone = '', countryName = 'Kenya', countryCode = '+254';
    if (iti) {
        fullPhone = iti.getNumber();
        const data = iti.getSelectedCountryData();
        countryName = data.name;
        countryCode = `+${data.dialCode}`;
    } else {
        fullPhone = document.getElementById('your-phoneNumber')?.value.trim() || '';
    }
    return { name, company, email, phone: fullPhone, message, countryName, countryCode };
}

function validateForm() {
    const { name, email, phone, message } = getFormData();
    if (!name) { showToast('Please enter your full name', 'error'); return false; }
    if (!email) { showToast('Email address is required', 'error'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('Valid email required', 'error'); return false; }
    if (!phone) { showToast('Phone number required', 'error'); return false; }
    if (iti && !iti.isValidNumber()) { showToast('Valid phone number required', 'error'); return false; }
    if (!message) { showToast('Message required', 'error'); return false; }
    return true;
}

async function sendEmail(formData) {
    const fullMessage = `Name: ${formData.name}\nCompany: ${formData.company || 'Not provided'}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nCountry: ${formData.countryName}\n\nMessage:\n${formData.message}`;
    try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            title: `New message from ${formData.name}`,
            from_name: formData.name,
            from_email: formData.email,
            reply_email: formData.email,
            message: fullMessage,
            user_email: formData.email,
            client_email: formData.email
        });
        return { success: true };
    } catch (e) {
        return { success: false };
    }
}

function resetForm() {
    document.getElementById('your-name').value = '';
    document.getElementById('company').value = '';
    document.getElementById('your-email').value = '';
    document.getElementById('your-phoneNumber').value = '';
    document.getElementById('your-Message').value = '';
    if (iti) iti.setCountry('ke');
}

// Email Button Handler
document.getElementById('send-via-Email')?.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const btn = e.currentTarget;
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';
    btn.disabled = true;
    const res = await sendEmail(getFormData());
    if (res.success) {
        showToast('Message sent successfully! We will respond within 24 hours.', 'success');
        resetForm();
    } else {
        showToast('Failed to send. Please try again or use WhatsApp.', 'error');
    }
    btn.innerHTML = orig;
    btn.disabled = false;
});

// WhatsApp Button Handler
document.getElementById('send-via-whatsapp')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const d = getFormData();
    let msg = `Name: ${d.name}\n`;
    if (d.company) msg += `Company: ${d.company}\n`;
    msg += `Phone: ${d.phone}\nEmail: ${d.email}\n\nMessage:\n${d.message}`;
    window.open(`https://wa.me/254703659444?text=${encodeURIComponent(msg)}`, '_blank');
    showToast('WhatsApp will open to send your message.', 'info');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav__links a, #quick-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active Navigation Highlight on Scroll
function updateActiveNav() {
    const scrollPosition = window.scrollY + 150;
    let currentSection = '';
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav__links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
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

// Featured Projects Button Handlers
document.querySelectorAll('.project-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const projectName = btn.getAttribute('data-project') || 'Project';
        // Replace with actual project URLs
        const projectLinks = {
            'Golden Crust': 'https://golden-crust-dave-o-lopers-projects.vercel.app/',
            'Sub Tracker': 'https://subscripti0n-tracker.vercel.app/',
            'Nexa Bank': 'https://nexabank.example.com',
            'UrbanStay': 'https://urbanstay.example.com',
            'MediFlow': 'https://mediflow.example.com',
            'EcoCycle': 'https://ecocycle.example.com'
        };
        const url = projectLinks[projectName] || '#';
        if (url !== '#') {
            window.open(url, '_blank');
        } else {
            showToast('Project link coming soon!', 'info');
        }
    });
});

// Character Counter for Textarea
const textarea = document.getElementById('your-Message');
if (textarea) {
    const counterContainer = document.createElement('div');
    counterContainer.style.cssText = 'display: flex; align-items: center; justify-content: flex-end; gap: 8px; margin-top: 8px; font-size: 12px; max-width: 500px; margin-left: auto; margin-right: auto;';
    const counter = document.createElement('span');
    const iconChar = document.createElement('i');
    iconChar.className = 'far fa-keyboard';
    iconChar.style.color = '#999';
    counterContainer.appendChild(iconChar);
    counterContainer.appendChild(counter);
    textarea.parentNode?.appendChild(counterContainer);
    
    function updateCounter() {
        const len = textarea.value.length;
        if (len === 0) {
            counter.innerHTML = '0 characters';
            counter.style.color = '#999';
            iconChar.style.color = '#999';
        } else if (len < 20) {
            counter.innerHTML = `${len} characters (recommended: 20+)`;
            counter.style.color = '#ff9800';
            iconChar.style.color = '#ff9800';
        } else {
            counter.innerHTML = `${len} characters - looking good`;
            counter.style.color = '#28a745';
            iconChar.style.color = '#28a745';
        }
    }
    textarea.addEventListener('input', updateCounter);
    updateCounter();
}

console.log('DaveLabs website ready - Fixed burger menu navigation with unified dark mode styling');