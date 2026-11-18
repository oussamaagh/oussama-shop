
const products = [
    { id: 1, name: "الزيت 1", duration: "9 أيام", price: 30, color: "#ff3158" },
    { id: 2, name: "الزيت 2", duration: "شهر كامل", price: 55, color: "#168cff" },
    { id: 3, name: "الزيت 3", duration: "شهرين", price: 99, color: "#a45cff" },
    { id: 4, name: "الزيت 4", duration: "120 يوم", price: 130, color: "#ff9d32" },
    { id: 5, name: "الزيت 5", duration: "مدى الحياة", price: null, color: "#35d8d0" }
];

const promoCodes = [
    "9889I6Y665H",
    "ODUID7CH",
    "KDKKKD88",
    "LLDKDK"
];

let cart = [];
let couponApplied = false;
let appliedCode = "";

const productsList = document.getElementById("products-list");

// رسم صورة هيدشوت خاصة بكل منتج
function headshotImage(color, id) {
    return `
    <div class="headshot-image">
        <svg viewBox="0 0 320 180"
             xmlns="http://www.w3.org/2000/svg">

            <defs>
                <linearGradient id="bg${id}" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="${color}"/>
                    <stop offset="100%" stop-color="#071329"/>
                </linearGradient>
            </defs>

            <rect width="320" height="180"
                  fill="url(#bg${id})"/>

            <circle cx="160" cy="83" r="65"
                    fill="none" stroke="white"
                    stroke-width="2" opacity=".5"/>

            <circle cx="160" cy="83" r="48"
                    fill="none" stroke="white"
                    stroke-width="1" opacity=".5"/>

            <!-- شخصية مقاتل خيالية -->
            <path d="M100 180 Q105 120 135 112
                     L145 106 L175 106 L185 112
                     Q215 120 220 180 Z"
                  fill="#101a30" stroke="white"
                  stroke-width="2"/>

            <path d="M125 76 Q125 24 160 23
                     Q195 24 195 76
                     L184 108 Q160 126 136 108 Z"
                  fill="#263d60" stroke="#d9edff"
                  stroke-width="2"/>

            <path d="M125 65 Q130 18 160 18
                     Q190 18 195 65
                     L181 53 L160 48 L139 53 Z"
                  fill="#101a30" stroke="${color}"
                  stroke-width="4"/>

            <path d="M139 76 L154 73
                     M166 73 L181 76"
                  stroke="#8eeaff" stroke-width="5"
                  stroke-linecap="round"/>

            <path d="M146 94 Q160 101 174 94"
                  fill="none" stroke="white"
                  stroke-width="2"/>

            <!-- علامة الهيدشوت -->
            <path d="M160 5 V30 M160 140 V165
                     M80 83 H105 M215 83 H240"
                  stroke="white" stroke-width="3"/>

            <circle cx="160" cy="83" r="7"
                    fill="${color}" stroke="white"
                    stroke-width="2"/>

            <text x="160" y="160"
                  font-size="13" font-weight="bold"
                  fill="white" text-anchor="middle">
                HEADSHOT
            </text>
        </svg>
    </div>`;
}

// عرض المنتجات
function displayProducts() {
    productsList.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        if (product.price !== null) {
            card.innerHTML = `
                ${headshotImage(product.color, product.id)}

                <h3>${product.name}</h3>

                <p class="duration">
                    ⏳ المدة: ${product.duration}
                </p>

                <p class="price">
                    ${product.price.toFixed(2)} DH
                </p>

                <button class="add-btn"
                    onclick="addToCart(${product.id})">
                    🛒 أضف إلى السلة
                </button>
            `;
        } else {
            card.innerHTML = `
                ${headshotImage(product.color, product.id)}

                <h3>${product.name}</h3>

                <p class="duration">⏳ مدى الحياة</p>

                <p>الثمن عند التواصل معنا</p>

                <a class="add-btn"
                   style="display:block;text-decoration:none;margin-top:15px"
                   href="mailto:oussamaabbassi733@gmail.com">
                   تواصل معنا
                </a>
            `;
        }

        productsList.appendChild(card);
    });
}

// فتح نافذة الأكواد
function openCodes() {
    document.getElementById("code-modal").classList.add("show");
}

// إغلاق نافذة الأكواد
function closeCodes() {
    document.getElementById("code-modal").classList.remove("show");
}

// اختيار كود
function chooseCode(code) {
    document.getElementById("coupon-input").value = code;

    closeCodes();

    document.getElementById("cart-panel").classList.add("active");
    document.getElementById("overlay").classList.add("active");

    document.getElementById("coupon-message").style.color = "#ffd76a";

    document.getElementById("coupon-message").textContent =
        "تم اختيار الكود. اضغط تفعيل التخفيض بعد اختيار المنتج.";
}

// فتح وإغلاق السلة
function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

// إضافة منتج
function addToCart(id) {
    const product = products.find(p => p.id === id);

    if (!product || product.price === null) {
        alert("تواصل معنا لمعرفة ثمن الزيت 5");
        return;
    }

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert("تمت إضافة " + product.name + " إلى السلة 💎");
}

// تفعيل كود التخفيض
function applyCoupon() {
    const code = document.getElementById("coupon-input")
        .value.trim().toUpperCase();

    const message = document.getElementById("coupon-message");

    if (promoCodes.includes(code)) {
        couponApplied = true;
        appliedCode = code;

        message.style.color = "#35e99a";
        message.textContent =
            "✅ مبروك! تم تفعيل تخفيض 15%";

    } else {
        couponApplied = false;
        appliedCode = "";

        message.style.color = "#ff526d";
        message.textContent =
            "❌ الكود غير صحيح، حاول مرة أخرى.";
    }

    updateCart();
}

// تحديث السلة
function updateCart() {
    const container = document.getElementById("cart-items");

    container.innerHTML = "";

    let originalTotal = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>السلة فارغة 🛒</p>";
    }

    cart.forEach(item => {
        originalTotal += item.price * item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>${item.duration}</p>
                <p>${item.quantity} × ${item.price} DH</p>
            </div>

            <button class="remove-btn"
                onclick="removeItem(${item.id})">
                حذف
            </button>
        `;

        container.appendChild(div);
    });

    const discount = couponApplied
        ? originalTotal * 0.15
        : 0;

    const finalTotal = originalTotal - discount;

    document.getElementById("cart-count").textContent =
        cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById("original-total").textContent =
        originalTotal.toFixed(2) + " DH";

    document.getElementById("discount-total").textContent =
        discount.toFixed(2) + " DH";

    document.getElementById("final-total").textContent =
        finalTotal.toFixed(2) + " DH";
}

// حذف منتج
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// تأكيد الطلب
function checkout() {
    if (cart.length === 0) {
        alert("السلة فارغة!");
        return;
    }

    const payment = document.getElementById("payment").value;

    if (!payment) {
        alert("اختر طريقة الدفع أولا!");
        return;
    }

    const originalTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const discount = couponApplied
        ? originalTotal * 0.15
        : 0;

    const finalTotal = originalTotal - discount;

    const orderDetails = cart.map(item =>
        `${item.name} | ${item.duration} | العدد: ${item.quantity}`
    ).join("\n");

    const body = `
السلام عليكم، أريد طلباً من متجر Free Fire.

${orderDetails}

المجموع الأصلي: ${originalTotal.toFixed(2)} DH

كود التخفيض: ${couponApplied ? appliedCode : "بدون كود"}

التخفيض: ${couponApplied ? "15%" : "0%"}

قيمة التخفيض: ${discount.toFixed(2)} DH

المجموع النهائي: ${finalTotal.toFixed(2)} DH

طريقة الدفع: ${payment}

الدولة: المغرب

المرجو تأكيد طلبي وإرسال تفاصيل الدفع.
    `;

    const subject = "طلب جديد - FF HEADSHOT STORE";

    window.location.href =
        "mailto:oussamaabbassi733@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
}

// تشغيل الموقع
displayProducts();
updateCart();
