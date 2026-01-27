const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    }
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

const skillItems = document.querySelectorAll('.skill-item');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    skillObserver.observe(item);
});

const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}

const educationItems = document.querySelectorAll('.education-item');
const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

educationItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    educationObserver.observe(item);
});

const resumeRequestBtn = document.getElementById('resumeRequestBtn');
const resumeForm = document.getElementById('resumeForm');
const sendRequestBtn = document.getElementById('sendRequestBtn');
const requestorEmail = document.getElementById('requestorEmail');
const companyName = document.getElementById('companyName');

if (resumeRequestBtn && resumeForm) {
    resumeRequestBtn.addEventListener('click', () => {
        resumeForm.style.display = 'flex';
        resumeRequestBtn.style.display = 'none';
    });
}

if (sendRequestBtn) {
    sendRequestBtn.addEventListener('click', () => {
        const email = requestorEmail.value.trim();
        const company = companyName.value.trim();
        
        if (!email || !company) {
            alert('Please fill in both email address and company name.');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        alert(`Thank you! Your resume request has been sent. I'll email my resume to ${email} shortly.`);
        
        requestorEmail.value = '';
        companyName.value = '';
        resumeForm.style.display = 'none';
        resumeRequestBtn.style.display = 'block';
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.addEventListener('click', (e) => {
    if (resumeForm && resumeForm.style.display === 'flex') {
        if (!resumeForm.contains(e.target) && e.target !== resumeRequestBtn) {
            resumeForm.style.display = 'none';
            resumeRequestBtn.style.display = 'block';
        }
    }
});