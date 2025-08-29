$(document).ready(function () {
    const apiURL = "https://fakestoreapi.com/products";
    const productsPerPage = 6;
    let products = [];
    let currentPage = 1;

    // Fetch products from API
    function fetchProducts() {
        $.getJSON(apiURL, function (data) {
            products = data;
            renderProducts();
            renderPagination();
        });
    }

    //  Render products into DOM
    function renderProducts() {
        $("#product-list").empty();

        let start = (currentPage - 1) * productsPerPage;
        let end = start + productsPerPage;
        let paginatedProducts = products.slice(start, end);

        $.each(paginatedProducts, function (i, product) {
            let card = `
            <div class="col-md-4 mb-4">
                <div class="card h-100 border-0">
                    <div class="card-img-container text-center">
                        <img src="${product.image}" class="img-fluid" alt="${product.title}" style="max-height: 250px; object-fit: contain;">
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-info" style="font-size: 0.8rem;">+2 ألوان/أنماط أخرى</span>
                            <span class="text-secondary fw-bold" style="font-size: 0.8rem;">
                                إعلان <i class="fa-solid fa-info-circle"></i>
                            </span>
                        </div>
                        <h6 class="card-title fw-bold mt-2" style="font-size: 1rem;">
                            توب كات كلاسيكي من القطن للرجال من اجيال، سترة رياضية بدون اكمام، قطن 100 %
                        </h6>
                        <div class="d-flex align-items-center my-2">
                            <span class="text-warning me-1">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half-stroke"></i>
                                <i class="fa-regular fa-star"></i>
                            </span>
                            <span class="text-secondary" style="font-size: 0.8rem;">3</span>
                        </div>
                        <div class="d-flex align-items-end mb-2">
                            <span class="fs-4 fw-bold me-1">135</span>
                            <span class="fw-bold" style="font-size: 0.8rem;">00</span>
                            <span class="me-1">جنيه</span>
                        </div>
                        <p class="text-success fw-bold my-1" style="font-size: 0.8rem;">
                            توصيل مجاني غداً، 30 أغسطس على طلبك الأول.
                        </p>
                        <p class="text-danger fw-bold my-1" style="font-size: 0.8rem;">
                            تبقى 5 فقط - اطلبه الآن.
                        </p>
                        <div class="d-grid mt-3">
                            <button class="btn btn-warning rounded-pill py-2 fw-bold" style="background-color: #ffc107;">
                                إضافة إلى عربة التسوق
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
            $("#product-list").append(card);
        });
    }

    //  Render pagination
    function renderPagination() {
        $("#pagination").empty();
        let totalPages = Math.ceil(products.length / productsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            let activeClass = i === currentPage ? "active" : "";
            let pageBtn = `
              <li class="page-item ${activeClass}">
                <a class="page-link" href="#">${i}</a>
              </li>
            `;
            $("#pagination").append(pageBtn);
        }

        // Handle click event
        $(".page-link").on("click", function (e) {
            e.preventDefault();
            currentPage = parseInt($(this).text());
            renderProducts();
            renderPagination();
        });
    }

    //  Handle Authentication Navbar
    // Handle Authentication Navbar
    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
        // User is logged in → Show Logout and user info
        $("#auth-buttons").html(`
        <div class="d-flex align-items-center me-3">
            <span class="text-white me-2 d-none d-lg-block">Hello, ${storedUser.name}</span>
            <img src="https://via.placeholder.com/30" alt="Profile" class="rounded-circle me-2 d-none d-lg-block" id="user-profile-img">
            <button id="logoutBtn" class="btn btn-danger btn-sm">Logout</button>
        </div>
    `);

        // Handle logout
        $("#logoutBtn").on("click", function () {
            localStorage.removeItem("user");
            window.location.href = "login.html";
        });
    } else {
        // User not logged in → Show Login & Sign Up
        $("#auth-buttons").html(`
        <a href="login.html" class="btn btn-outline-light btn-sm me-2">Login</a>
        <a href="signup.html" class="btn btn-warning btn-sm">Sign Up</a>
    `);
    }
    fetchProducts();
});
