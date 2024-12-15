// Placeholder for any JavaScript functionality in the future.
console.log("Welcome to TP Hosting!");

// Function to show and auto-hide login success message
document.addEventListener("DOMContentLoaded", function () {
    const message = document.querySelector(".flash-messages");
    if (message) {
        // Fade-in effect
        setTimeout(() => {
            message.style.opacity = "1"; // Fully visible
        }, 100); // Short delay to trigger CSS transition

        // Keep the message visible for 3 seconds
        setTimeout(() => {
            message.style.opacity = "0"; // Fade out
        }, 3100); // Start fading out after 3 seconds

        // Remove the message after fade-out
        setTimeout(() => {
            message.remove();
        }, 3600); // Remove element completely
    }
});

let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-images img');
    const indicators = document.querySelectorAll('.carousel-indicators div');
    const totalSlides = slides.length;

    function showSlide(index) {
        const offset = -index * 100; // Calculate the offset
        document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    // Add event listeners to indicators
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            currentIndex = i;
            showSlide(currentIndex);
        });
    });

    // Initialize
    showSlide(currentIndex);
    setInterval(nextSlide, 3000); // Change slide every 3 seconds
});

document.addEventListener("DOMContentLoaded", function () {
    // Function to create and display the mockup ad
    function showMockupAd() {
        // Create the ad element
        const ad = document.createElement("div");
        ad.className = "mockup-ad";
        ad.style.position = "fixed";
        ad.style.top = "10%"; /* Change position according to your needs */
        ad.style.left = "50%";
        ad.style.transform = "translate(-50%, -10%)";
        ad.style.backgroundColor = "#FF9800"; /* Color of the ad box */
        ad.style.color = "white";
        ad.style.padding = "20px 60px";
        ad.style.borderRadius = "8px";
        ad.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
        ad.style.textAlign = "center";
        ad.style.fontSize = "18px";
        ad.style.zIndex = "1000";

        // Add a message to the ad
        const message = document.createElement("p");
        message.textContent = "ANUNCIO: ¡No te pierdas nuestras ofertas navideñas!";
        ad.appendChild(message);

        // Create image element and set its properties
        const adImage = document.createElement("img");
        adImage.src = "static/images/ad.jpg"; /* Path to the image you want to display */
        adImage.alt = "Ad Image";
        adImage.style.width = "400px"; /* Adjust size as necessary */
        adImage.style.marginBottom = "10px"; /* Space between the image and the text */
        adImage.style.borderRadius = "20px"
        ad.appendChild(adImage);

        // Create close button
        const closeButton = document.createElement("span");
        closeButton.textContent = "×";
        closeButton.style.position = "absolute";
        closeButton.style.top = "10px";
        closeButton.style.right = "10px";
        closeButton.style.cursor = "pointer";
        closeButton.style.fontSize = "20px";
        closeButton.style.fontWeight = "bold";
        closeButton.style.color = "white";
        closeButton.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        closeButton.style.padding = "5px";
        closeButton.style.zIndex = "1001"; // Ensure it's on top of the ad

        // Close the ad when clicked
        closeButton.addEventListener("click", function () {
            ad.remove();
        });

        // Append the close button to the ad
        ad.appendChild(closeButton);

        // Append the ad to the body
        document.body.appendChild(ad);

        // Remove the ad after 5 seconds if not manually closed
        setTimeout(() => {
            ad.remove();
        }, 5000); // Display for 5 seconds
    }

    // Show mockup ad every 3 minutes (180000 milliseconds)
    setInterval(showMockupAd, 180000);
});


