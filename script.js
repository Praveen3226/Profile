document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particle.js
    initParticles();
    
    // Setup navigation menu for mobile
    setupMobileMenu();
    
    // Setup profile card tilt effect
    setupProfileCardTilt();
    
    // Initialize animations
    initAnimations();
    
    // Setup contact form
    setupContactForm();
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
  });
  
  // Initialize Particle.js background
  function initParticles() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: ["#4361ee", "#7209b7"]
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            }
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#4361ee",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  }
  
  // Mobile menu toggle
  function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
      
      // Close mobile menu when a link is clicked
      const links = document.querySelectorAll('.nav-link');
      links.forEach(link => {
        link.addEventListener('click', function() {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
        });
      });
    }
  }
  
  // Profile card tilt effect
  function setupProfileCardTilt() {
    const profileCard = document.querySelector('.profile-card');
    const profileCardWrapper = document.querySelector('.profile-card-wrapper');
    
    if (profileCard && profileCardWrapper) {
      profileCardWrapper.addEventListener('mousemove', handleProfileCardTilt);
      profileCardWrapper.addEventListener('mouseleave', resetProfileCardTilt);
    }
    
    function handleProfileCardTilt(e) {
      const wrapperRect = profileCardWrapper.getBoundingClientRect();
      const centerX = wrapperRect.left + wrapperRect.width / 2;
      const centerY = wrapperRect.top + wrapperRect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const moveX = (mouseX - centerX) / (wrapperRect.width / 2);
      const moveY = (mouseY - centerY) / (wrapperRect.height / 2);
      
      // Limit the rotation angle to make the effect more subtle
      const rotateX = moveY * -10; // Invert Y axis for natural tilt
      const rotateY = moveX * 10;
      
      profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    
    function resetProfileCardTilt(e) {
      profileCard.style.transform = 'rotateX(0) rotateY(0)';
    }
  }
  
  // Initialize animations
  function initAnimations() {
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-percentage');
    animateOnScroll(skillBars, (el) => {
      el.style.width = el.style.width || el.offsetWidth + 'px';
    });
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    animateOnScroll(timelineItems, (el) => {
      el.classList.add('active');
    });
    
    // Animate circular skills
    const circleElements = document.querySelectorAll('.circular-chart .circle');
    circleElements.forEach(circle => {
      const dashArray = circle.getAttribute('stroke-dasharray');
      if (dashArray) {
        circle.setAttribute('stroke-dasharray', '0, 100');
        animateOnScroll([circle], (el) => {
          el.setAttribute('stroke-dasharray', dashArray);
        });
      }
    });
    
    // Animate section icons
    const sectionIcons = document.querySelectorAll('.section-icon');
    animateOnScroll(sectionIcons, (el) => {
      el.classList.add('animated');
    });
    
    // Setup active nav link on scroll
    setupActiveNavOnScroll();
  }
  
  // Animate elements when they enter viewport
  function animateOnScroll(elements, callback) {
    // Create IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          // Unobserve after animation is triggered once
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe each element
    elements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // Contact form setup
  function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
          showToast('Error', 'Please fill in all fields', 'error');
          return;
        }
        
        // Here you would normally send the form data to a server
        // For demo purposes, we'll just simulate a successful submission
        
        // Show success message
        showToast('Success', 'Your message has been sent successfully!');
        
        // Reset form
        contactForm.reset();
      });
    }
  }
  
  // Toast notification
  function showToast(title, message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastTitle = toast.querySelector('.toast-title');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon i');
    
    // Set content
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    // Set icon and color based on type
    if (type === 'success') {
      toastIcon.className = 'fas fa-check-circle';
      toast.style.borderLeft = '4px solid #4361ee';
    } else if (type === 'error') {
      toastIcon.className = 'fas fa-times-circle';
      toast.style.borderLeft = '4px solid #e63946';
    } else if (type === 'warning') {
      toastIcon.className = 'fas fa-exclamation-circle';
      toast.style.borderLeft = '4px solid #ffb703';
    } else if (type === 'info') {
      toastIcon.className = 'fas fa-info-circle';
      toast.style.borderLeft = '4px solid #4cc9f0';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
    
    // Close toast on click
    const toastClose = toast.querySelector('.toast-close');
    toastClose.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }
  
  // Setup smooth scrolling for navigation links
  function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const navHeight = document.querySelector('.glass-nav').offsetHeight;
          
          window.scrollTo({
            top: offsetTop - navHeight,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // Setup active nav link on scroll
  function setupActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      const navHeight = document.querySelector('.glass-nav').offsetHeight;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100; // Some buffer
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
        } else {
          document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.remove('active');
        }
      });
    });
  }
  
  // Add SVG gradients for circular charts
  function addSVGGradients() {
    // Add SVG definitions to the DOM for the gradients
    const svgDefs = `
      <svg width="0" height="0" style="position: absolute">
        <defs>
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#4361ee" />
            <stop offset="100%" stop-color="#4cc9f0" />
          </linearGradient>
          <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#7209b7" />
            <stop offset="100%" stop-color="#3f37c9" />
          </linearGradient>
        </defs>
      </svg>
    `;
    
    // Append to body
    document.body.insertAdjacentHTML('beforeend', svgDefs);
  }
  
  // Call when the DOM is loaded
  addSVGGradients();