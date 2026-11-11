// ========================================
// 1. WAIT FOR HTML TO LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // Select HTML elements
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
    const footer = document.querySelector("footer");

    
    // ========================================
    // 2. SMOOTH SCROLLING
    // ========================================

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    // ========================================
    // 3. SCROLL REVEAL ANIMATION
    // ========================================

    const revealElements = document.querySelectorAll(
        ".section-title, .about-content, .skill-card, .project-card, .section-description"
    );

    const animationStyle = document.createElement("style");

    animationStyle.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(35px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    document.head.appendChild(animationStyle);


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

    });


    const observer = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );


    revealElements.forEach(function (element) {

        observer.observe(element);

    });


    // ========================================
    // 4. ACTIVE NAVIGATION LINK
    // ========================================

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active-link");

            if (link.getAttribute("href") === "#" + currentSection) {

                link.classList.add("active-link");

            }

        });

    }


    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    // Style active navigation

    const navStyle = document.createElement("style");

    navStyle.textContent = `
        .nav-links a.active-link {
            color: #38bdf8;
            font-weight: 700;
        }
    `;

    document.head.appendChild(navStyle);


    // ========================================
    // 5. BACK TO TOP BUTTON
    // ========================================

    const backToTop = document.createElement("button");

    backToTop.innerHTML = "↑";

    backToTop.setAttribute("aria-label", "Back to top");

    backToTop.id = "backToTop";


    const buttonStyle = document.createElement("style");

    buttonStyle.textContent = `

        #backToTop {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 45px;
            height: 45px;
            border: none;
            border-radius: 50%;
            background: linear-gradient(90deg, #0ea5e9, #6366f1);
            color: white;
            font-size: 25px;
            font-weight: bold;
            cursor: pointer;
            display: none;
            z-index: 999;
            transition: 0.3s;
            box-shadow: 0 5px 20px rgba(56, 189, 248, 0.3);
        }

        #backToTop:hover {
            transform: translateY(-5px);
        }

    `;

    document.head.appendChild(buttonStyle);

    document.body.appendChild(backToTop);


    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            backToTop.style.display = "block";

        } else {

            backToTop.style.display = "none";

        }

    });


    backToTop.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });


    // ========================================
    // 6. DYNAMIC FOOTER YEAR
    // ========================================

    if (footer) {

        const footerParagraph = footer.querySelector("p");

        if (footerParagraph) {

            footerParagraph.innerHTML =
                `© ${new Date().getFullYear()} Monet Girma Urgesa. All Rights Reserved.`;

        }

    }


    // ========================================
    // 7. CONSOLE MESSAGE
    // ========================================

    console.log("Monet's Portfolio loaded successfully!");

});