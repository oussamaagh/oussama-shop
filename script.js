
let cart = [];

// إضافة منتج للسلة
function addToCart(name, price) {
    cart.push({
        name: name,
        price: price
    });

    displayCart();

    alert("تمت إضافة المنتج إلى السلة 🛒");
}

// عرض السلة
function displayCart() {
    const cartItems = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.textContent = "السلة فارغة";
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.className = "cart-item";

        const name = document.createElement("span");
        name.textContent =
            item.name + " - " + item.price + " DH";

        const remove = document.createElement("button");
        remove.className = "remove-btn";
        remove.textContent = "حذف";

        remove.onclick = function() {
            cart.splice(index, 1);
            displayCart();
        };

        div.appendChild(name);
        div.appendChild(remove);

        cartItems.appendChild(div);
    });

    totalElement.textContent = total;
}

// إرسال الطلب عبر البريد الإلكتروني
function sendEmail(subject, message) {
    const email = "oussamaabbassi733@gmail.com";

    const url =
        "mailto:" + email +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(message);

    window.location.href = url;
}

// طلب زيت مدى الحياة
function contactUs(product) {
    const message =
        "السلام عليكم، أريد طلب: " + product +
        "\nالمرجو إرسال الثمن وطريقة الأداء.";

    sendEmail("طلب زيت مدى الحياة", message);
}

// طلب تعبئة الهاتف
function buyRecharge() {
    const operator =
        document.getElementById("operator").value;

    const phone =
        document.getElementById("phone").value.trim();

    const amount =
        document.getElementById("rechargeAmount").value;

    if (!phone || !amount || Number(amount) < 1) {
        alert("المرجو إدخال رقم الهاتف ومبلغ التعبئة");
        return;
    }

    if (!/^(06|07)[0-9]{8}$/.test(phone)) {
        alert("المرجو إدخال رقم هاتف مغربي صحيح");
        return;
    }

    const message =
        "طلب تعبئة الهاتف\n\n" +
        "الشركة: " + operator + "\n" +
        "رقم الهاتف: " + phone + "\n" +
        "مبلغ التعبئة: " + amount + " DH\n\n" +
        "المرجو تأكيد الطلب.";

    sendEmail("طلب تعبئة الهاتف", message);
}

// تأكيد طلب المنتجات
function checkout() {
    if (cart.length === 0) {
        alert("السلة فارغة!");
        return;
    }

    const customer =
        document.getElementById("customerName").value.trim();

    const contact =
        document.getElementById("customerContact").value.trim();

    const payment =
        document.getElementById("paymentMethod").value;

    if (!customer || !contact) {
        alert("المرجو إدخال الاسم ووسيلة التواصل");
        return;
    }

    let total = 0;
    let products = "";

    cart.forEach(item => {
        products +=
            "- " + item.name +
            " : " + item.price + " DH\n";

        total += item.price;
    });

    const message =
        "🔥 طلب جديد من ZAIT SHOP\n\n" +
        "الاسم: " + customer + "\n" +
        "التواصل: " + contact + "\n\n" +
        "المنتجات:\n" + products +
        "\nالمجموع: " + total + " DH\n" +
        "طريقة الأداء: " + payment +
        "\n\nالمرجو تأكيد الطلب.";

    sendEmail("طلب شراء جديد - ZAIT SHOP", message);
}
