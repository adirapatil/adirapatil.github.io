// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header .container').prepend(mobileMenuToggle);

    const nav = document.querySelector('nav');
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Add mobile menu styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 992px) {
            .mobile-menu-toggle {
                display: block;
                font-size: 24px;
                cursor: pointer;
                z-index: 1001;
            }
            .mobile-menu-toggle.active i:before {
                content: "\\f00d";
            }
            nav {
                display: none;
                position: absolute;
                top: 70px;
                left: 0;
                width: 100%;
                background: #fff;
                box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                padding: 20px;
                z-index: 1000;
            }
            nav.active {
                display: block;
            }
        }
        @media (min-width: 993px) {
            .mobile-menu-toggle {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonials Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialSlider.classList.add('active');
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });

        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialSlider.classList.remove('active');
        });

        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
            testimonialSlider.classList.remove('active');
        });

        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });

        // Auto scroll testimonials
        let scrollAmount = 0;
        const testimonialWidth = document.querySelector('.testimonial').offsetWidth + 30; // width + gap
        const step = 1;
        const autoScroll = setInterval(() => {
            testimonialSlider.scrollLeft += step;
            scrollAmount += step;
            if (scrollAmount >= testimonialWidth) {
                testimonialSlider.scrollLeft = 0;
                scrollAmount = 0;
            }
        }, 30);

        // Pause auto scroll when hovering
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(autoScroll);
        });
    }

    // Search Functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInputs = document.querySelectorAll('.search-box input');

    if (searchBtn && searchInputs.length) {
        searchBtn.addEventListener('click', function() {
            const service = searchInputs[0].value.trim();
            const location = searchInputs[1].value.trim();

            if (service || location) {
                // In a real application, this would redirect to search results
                // For demo purposes, we'll show an alert
                alert(`Searching for ${service ? service : 'all services'} in ${location ? location : 'all locations'}`);

                // You could also redirect to a search results page
                // window.location.href = `search-results.html?service=${encodeURIComponent(service)}&location=${encodeURIComponent(location)}`;
            } else {
                alert('Please enter a service or location to search');
            }
        });

        // Allow search on Enter key
        searchInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchBtn.click();
                }
            });
        });
    }

    // Sticky Header Effect
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Add sticky header styles
    const stickyStyle = document.createElement('style');
    stickyStyle.textContent = `
        header.sticky {
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            animation: slideDown 0.35s ease-out;
        }
        @keyframes slideDown {
            from {
                transform: translateY(-100%);
            }
            to {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(stickyStyle);

    // Service Card Hover Effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // Provider Card Hover Effect
    const providerCards = document.querySelectorAll('.provider-card');
    providerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // Login/Signup Button Functionality
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');

    if (loginBtn && signupBtn) {
        // Add click event to navigate to login page
        loginBtn.addEventListener('click', function() {
            window.location.href = 'login.html';
        });

        // Add click event to navigate to signup page
        signupBtn.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });

        // Create modal container if it doesn't exist (for backward compatibility)
        let modalContainer = document.querySelector('.modal-container');
        if (!modalContainer) {
            modalContainer = document.createElement('div');
            modalContainer.className = 'modal-container';
            document.body.appendChild(modalContainer);
        }

        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .modal-container {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 2000;
                justify-content: center;
                align-items: center;
            }
            .modal {
                background-color: #fff;
                border-radius: 8px;
                padding: 30px;
                width: 400px;
                max-width: 90%;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                position: relative;
            }
            .modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                font-size: 20px;
                cursor: pointer;
                color: #999;
            }
            .modal-close:hover {
                color: #333;
            }
            .modal h2 {
                margin-bottom: 20px;
                color: #333;
                text-align: center;
            }
            .form-group {
                margin-bottom: 20px;
            }
            .form-group label {
                display: block;
                margin-bottom: 5px;
                color: #666;
            }
            .form-group input {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            .form-group input:focus {
                outline: none;
                border-color: #ff6b6b;
            }
            .form-submit {
                width: 100%;
                padding: 12px;
                background-color: #ff6b6b;
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 500;
                transition: background-color 0.3s;
            }
            .form-submit:hover {
                background-color: #ff5252;
            }
            .form-footer {
                text-align: center;
                margin-top: 20px;
                color: #666;
            }
            .form-footer a {
                color: #ff6b6b;
                text-decoration: none;
            }
            .form-footer a:hover {
                text-decoration: underline;
            }
        `;
        document.head.appendChild(modalStyle);

        // Login button click handler
        loginBtn.addEventListener('click', function() {
            modalContainer.style.display = 'flex';
            modalContainer.innerHTML = `
                <div class="modal">
                    <span class="modal-close">&times;</span>
                    <h2>Login</h2>
                    <form id="login-form">
                        <div class="form-group">
                            <label for="login-email">Email</label>
                            <input type="email" id="login-email" required>
                        </div>
                        <div class="form-group">
                            <label for="login-password">Password</label>
                            <input type="password" id="login-password" required>
                        </div>
                        <button type="submit" class="form-submit">Login</button>
                    </form>
                    <div class="form-footer">
                        <p>Don't have an account? <a href="#" id="switch-to-signup">Sign up</a></p>
                    </div>
                </div>
            `;

            // Close modal when clicking the X
            document.querySelector('.modal-close').addEventListener('click', function() {
                modalContainer.style.display = 'none';
            });

            // Close modal when clicking outside
            modalContainer.addEventListener('click', function(e) {
                if (e.target === modalContainer) {
                    modalContainer.style.display = 'none';
                }
            });

            // Switch to signup form
            document.getElementById('switch-to-signup').addEventListener('click', function(e) {
                e.preventDefault();
                signupBtn.click();
            });

            // Handle login form submission
            document.getElementById('login-form').addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;

                // In a real application, this would send a request to the server
                // For demo purposes, we'll show an alert
                alert(`Login attempt with email: ${email}`);
                modalContainer.style.display = 'none';
            });
        });

        // Signup button click handler
        signupBtn.addEventListener('click', function() {
            modalContainer.style.display = 'flex';
            modalContainer.innerHTML = `
                <div class="modal">
                    <span class="modal-close">&times;</span>
                    <h2>Sign Up</h2>
                    <form id="signup-form">
                        <div class="form-group">
                            <label for="signup-name">Full Name</label>
                            <input type="text" id="signup-name" required>
                        </div>
                        <div class="form-group">
                            <label for="signup-email">Email</label>
                            <input type="email" id="signup-email" required>
                        </div>
                        <div class="form-group">
                            <label for="signup-password">Password</label>
                            <input type="password" id="signup-password" required>
                        </div>
                        <div class="form-group">
                            <label for="signup-confirm-password">Confirm Password</label>
                            <input type="password" id="signup-confirm-password" required>
                        </div>
                        <button type="submit" class="form-submit">Sign Up</button>
                    </form>
                    <div class="form-footer">
                        <p>Already have an account? <a href="#" id="switch-to-login">Login</a></p>
                    </div>
                </div>
            `;

            // Close modal when clicking the X
            document.querySelector('.modal-close').addEventListener('click', function() {
                modalContainer.style.display = 'none';
            });

            // Close modal when clicking outside
            modalContainer.addEventListener('click', function(e) {
                if (e.target === modalContainer) {
                    modalContainer.style.display = 'none';
                }
            });

            // Switch to login form
            document.getElementById('switch-to-login').addEventListener('click', function(e) {
                e.preventDefault();
                loginBtn.click();
            });

            // Handle signup form submission
            document.getElementById('signup-form').addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('signup-name').value;
                const email = document.getElementById('signup-email').value;
                const password = document.getElementById('signup-password').value;
                const confirmPassword = document.getElementById('signup-confirm-password').value;

                if (password !== confirmPassword) {
                    alert('Passwords do not match');
                    return;
                }

                // In a real application, this would send a request to the server
                // For demo purposes, we'll show an alert
                alert(`Sign up attempt with name: ${name} and email: ${email}`);
                modalContainer.style.display = 'none';
            });
        });
    }
});
