// ==================== AOS Initialization ====================
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 1000,
        offset: 100,
    });
});

// ==================== Existing Data Arrays ====================
const trendingSushis = [
    'Make Sushi',
    'Nigiri Sushi',
    'Oshizushi',
    'Temaki Sushi',
    'Uramaki Sushi',
    'Inari Sushi'
];

const trendingDrinks = [
    "Oruncha",
    "Ofukucha",
    "Sakura Tea",
    "Kombu-cha",
    "Aojiru",
    "Mugicha",
];

const cards = [
    {
        imgSrc: './assets/sushi-12.png',
        alt: "sushi-12",
        title: "Chezu Sushi",
        rating: "4.8",
        price: "$21.00"
    },
    {
        imgSrc: './assets/sushi-11.png',
        alt: "sushi-11",
        title: "Originale Sushi",
        rating: "4.8",
        price: "$21.00",
        active: true
    },
    {
        imgSrc: './assets/sushi-10.png',
        alt: "sushi-10",
        title: "Ramen Legendo",
        rating: "4.8",
        price: "$21.00"
    }
];

// ==================== Order Form Handling ====================
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('order-form');
    const receiptPopup = document.getElementById('receipt-popup');
    const receiptText = document.getElementById('receipt-text');
    const thankYouMessage = document.getElementById('thank-you-message');
    const closePopup = document.getElementById('close-popup');

    const sushiData = {
        "Chez Sushi": 21.00,
        "Original Sushi": 24.00,  // Updated price to match your HTML
        "Ramen Legendo": 27.00    // Updated price to match your HTML
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const sushiType = document.getElementById('sushi-type').value;
        const quantity = parseInt(document.getElementById('quantity').value) || 0;

        if (!name || !email || !address || !sushiType || quantity <= 0) {
            alert("Please fill out all fields correctly.");
            return;
        }

        // Calculate total
        const price = sushiData[sushiType];
        let total = price * quantity;
        let discount = total > 100 ? 15 : 0;
        total -= discount;

        // Generate receipt (existing functionality)
        receiptText.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Sushi:</strong> ${quantity} x ${sushiType} @ $${price.toFixed(2)} = $${(price * quantity).toFixed(2)}</p>
            ${discount > 0 ? `<p><strong>Discount:</strong> -$${discount.toFixed(2)}</p>` : ''}
            <p class="total-cost"><strong>Total:</strong> $${total.toFixed(2)}</p>
        `;

        // Show receipt popup (existing functionality)
        receiptPopup.style.display = 'block';
        setTimeout(() => {
            thankYouMessage.classList.remove('hidden');
        }, 500);

        // Save to Firebase (new functionality)
        try {
            const ordersRef = window.firebaseRef(window.firebaseDatabase, 'orders');
            await window.firebasePush(ordersRef, {
                name,
                email,
                address,
                sushiType,
                quantity,
                price,
                discount,
                total,
                timestamp: window.serverTimestamp()
            });
            console.log("Order saved to Firebase");
        } catch (error) {
            console.error("Error saving order:", error);
        }

        // Clear form after submission
        form.reset();
    });

    // Close receipt popup (existing functionality)
    closePopup.addEventListener('click', () => {
        receiptPopup.style.display = 'none';
        thankYouMessage.classList.add('hidden');
    });
});

// ==================== Newsletter Popup ====================
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");

    const getStartedBtn = document.getElementById("get-started-btn");
    const popup = document.getElementById("newsletter-popup");

    if (!getStartedBtn) {
        console.error("Get Started button not found!");
        return;
    }
    if (!popup) {
        console.error("Newsletter popup not found!");
        return;
    }

    getStartedBtn.addEventListener("click", () => {
        console.log("Get Started button clicked");
        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
            console.log("Hiding popup after 2s...");
        }, 2000);
    });
});