/**
 * APEXPLANET WEB DEVELOPMENT INTERNSHIP - TASK 4
 * Global JavaScript: Navigation, Active State, Form Validation & UI Helpers
 * Developer: Nirnay Mondal
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeaderScroll();
  initContactForm();
});

/**
 * Global Toast Notification Helper
 */
function showToast(message, type = 'success', duration = 3500) {
  let toastContainer = document.getElementById('globalToast');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'globalToast';
    toastContainer.className = 'toast-notification';
    document.body.appendChild(toastContainer);
  }

  toastContainer.className = `toast-notification toast-${type} active`;
  const icon = type === 'success' ? '✓' : '⚠️';
  toastContainer.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toastContainer.classList.remove('active');
  }, duration);
}

/**
 * Mobile Navigation & Active Page Highlighter
 */
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  let overlay = document.querySelector('.mobile-overlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);
  }

  function toggleMenu(isOpen) {
    const shouldOpen = isOpen !== undefined ? isOpen : !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', shouldOpen);
    overlay.classList.toggle('active', shouldOpen);
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', shouldOpen ? 'Close navigation menu' : 'Open navigation menu');
    }
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    overlay.addEventListener('click', () => toggleMenu(false));

    // Close menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // Active navigation highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link');
  allNavLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Header Scroll Shadow
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * Contact Form Validation Logic (Client-side)
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');
  const messageCount = document.getElementById('messageCount');
  const successBox = document.getElementById('contactSuccessBox');

  // Live character counter for message
  if (messageInput && messageCount) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.trim().length;
      messageCount.textContent = `${len} / 500 characters`;
    });
  }

  // Validation functions
  const validators = {
    name: (val) => {
      if (!val || val.trim().length < 2) return 'Please enter your name (at least 2 characters).';
      return '';
    },
    email: (val) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!val || !val.trim()) return 'Email address is required.';
      if (!emailRegex.test(val.trim())) return 'Please enter a valid email address (e.g., user@example.com).';
      return '';
    },
    subject: (val) => {
      if (!val || val.trim().length < 3) return 'Please enter a subject (at least 3 characters).';
      return '';
    },
    message: (val) => {
      if (!val || val.trim().length < 10) return 'Message must be at least 10 characters long.';
      return '';
    }
  };

  function validateField(inputEl, validatorKey, feedbackElId) {
    const feedbackEl = document.getElementById(feedbackElId);
    const errorMsg = validators[validatorKey](inputEl.value);

    if (errorMsg) {
      inputEl.classList.add('is-invalid');
      inputEl.classList.remove('is-valid');
      if (feedbackEl) {
        feedbackEl.textContent = errorMsg;
        feedbackEl.classList.add('visible');
      }
      return false;
    } else {
      inputEl.classList.remove('is-invalid');
      inputEl.classList.add('is-valid');
      if (feedbackEl) {
        feedbackEl.textContent = '';
        feedbackEl.classList.remove('visible');
      }
      return true;
    }
  }

  // Attach live event listeners
  if (nameInput) {
    nameInput.addEventListener('input', () => validateField(nameInput, 'name', 'nameFeedback'));
    nameInput.addEventListener('blur', () => validateField(nameInput, 'name', 'nameFeedback'));
  }
  if (emailInput) {
    emailInput.addEventListener('input', () => validateField(emailInput, 'email', 'emailFeedback'));
    emailInput.addEventListener('blur', () => validateField(emailInput, 'email', 'emailFeedback'));
  }
  if (subjectInput) {
    subjectInput.addEventListener('input', () => validateField(subjectInput, 'subject', 'subjectFeedback'));
    subjectInput.addEventListener('blur', () => validateField(subjectInput, 'subject', 'subjectFeedback'));
  }
  if (messageInput) {
    messageInput.addEventListener('input', () => validateField(messageInput, 'message', 'messageFeedback'));
    messageInput.addEventListener('blur', () => validateField(messageInput, 'message', 'messageFeedback'));
  }

  // Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, 'name', 'nameFeedback');
    const isEmailValid = validateField(emailInput, 'email', 'emailFeedback');
    const isSubjectValid = validateField(subjectInput, 'subject', 'subjectFeedback');
    const isMessageValid = validateField(messageInput, 'message', 'messageFeedback');

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      // Simulate successful frontend submission
      const senderName = nameInput.value.trim();
      form.reset();

      // Clear valid classes
      [nameInput, emailInput, subjectInput, messageInput].forEach((el) => {
        el.classList.remove('is-valid', 'is-invalid');
      });
      if (messageCount) messageCount.textContent = '0 / 500 characters';

      if (successBox) {
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => {
          successBox.style.display = 'none';
        }, 6000);
      }

      showToast(`Thank you, ${senderName}! Your message was submitted successfully.`, 'success');
    } else {
      showToast('Please correct the highlighted errors before submitting.', 'error');
    }
  });
}
