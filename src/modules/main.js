import { StorageManager } from "./modules/storage.js";
import { UIManager } from "./modules/ui.js";
import { APIManager } from "./modules/api.js";
import { showToast, formatCurrency } from "./modules/utils.js";

class WaroengDigitalApp {
  constructor() {
    this.storage = new StorageManager();
    this.ui = new UIManager();
    this.api = new APIManager();
    this.currentUser = null;
    this.currentPage = "home";
    this.foodItems = [];
    this.cart = [];
    this.comments = [];
    this.init();
    this.isLoginMode = true; // State for login/register tab
  }

  async init() {
    this.currentUser = this.storage.getCurrentUser();
    if (this.currentUser) {
      await this.showMainApp();
    } else {
      this.showLoginForm();
    }
    this.setupEventListeners();
  }

  setupEventListeners() {
    const loginForm = document.getElementById("loginForm");
    if (loginForm)
      loginForm.addEventListener("submit", (e) => this.handleLogin(e));

    // Event listeners for auth tabs
    const loginTab = document.getElementById("loginTab");
    if (loginTab)
      loginTab.addEventListener("click", () => this.switchToLogin());

    const registerTab = document.getElementById("registerTab");
    if (registerTab)
      registerTab.addEventListener("click", () => this.switchToRegister());

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn)
      logoutBtn.addEventListener("click", () => this.handleLogout());

    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle)
      themeToggle.addEventListener("click", () => this.toggleTheme());

    const closeSidebar = document.getElementById("closeSidebar");
    if (closeSidebar)
      closeSidebar.addEventListener("click", () => this.ui.hideSidebar());

    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn)
      checkoutBtn.addEventListener("click", () => this.checkout());

    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-nav]")) {
        e.preventDefault();
        this.navigateTo(e.target.dataset.nav);
      }
    });

    const savedTheme = this.storage.getTheme();
    if (savedTheme) {
      document.body.className = savedTheme;
      this.updateThemeIcon();
    }
  }

  async handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password");
    const userType = formData.get("userType");

    // Validate based on the current mode
    if ((!this.isLoginMode && !username) || !email || !password) {
      this.ui.showError("Semua field harus diisi");
      return;
    }
    // Admin validation
    if (userType === "admin" && password !== "chefwaroeng#25") {
      this.ui.showError("Password admin salah!");
      return;
    }

    if (this.isLoginMode) {
      // --- LOGIN LOGIC ---
      // Handle Admin login separately
      if (userType === "admin") {
        if (password === "chefwaroeng#25") {
          const adminUser = { username: "Admin", email, userType: "admin" };
          this.startUserSession(adminUser);
        } else {
          this.ui.showError("Password admin salah!");
        }
        return;
      }

      // Handle regular user login
      const validatedUser = this.storage.validateLogin(email, password);
      if (validatedUser) {
        this.startUserSession(validatedUser);
      } else {
        this.ui.showError(
          "Email atau password salah. Silakan coba lagi atau daftar."
        );
      }
    } else {
      // --- REGISTER LOGIC ---
      const registerResult = this.storage.registerUser({
        username,
        email,
        password,
        userType: "user", // Force userType to 'user' on registration
      });

      if (!registerResult.success) {
        this.ui.showError(registerResult.message);
        return;
      }

      // Registration successful, prompt user to log in
      showToast("Registrasi berhasil! Silakan login.", "success");
      this.switchToLogin(); // Switch back to login form
    }
  }

  async startUserSession(user) {
    const sessionData = { ...user, loginTime: new Date().toISOString() };
    this.storage.saveUser(sessionData);
    this.currentUser = sessionData;
    showToast(`Selamat datang, ${sessionData.username}!`, "success");
    await this.showMainApp();
  }

  handleLogout() {
    this.storage.clearUser();
    this.currentUser = null;
    this.cart = [];
    document.getElementById("mainApp").classList.add("hidden");
    document.getElementById("loginContainer").classList.remove("hidden");
    showToast("Anda telah logout", "success");
  }

  async showMainApp() {
    this.ui.showLoading();
    setTimeout(async () => {
      document.getElementById("loginContainer").classList.add("hidden");
      document.getElementById("loadingScreen").classList.add("hidden");
      document.getElementById("mainApp").classList.remove("hidden");

      this.setupNavigation();
      this.updateUserWelcome();
      await this.loadData();
      this.cart = this.storage.getCart();
      this.updateCartUI();

      if (this.currentUser.userType === "admin") {
        this.navigateTo("admin");
      } else {
        this.navigateTo("home");
      }
    }, 2000);
  }

  setupNavigation() {
    const navMenu = document.getElementById("navMenu");
    let navItems = [];

    if (this.currentUser.userType === "admin") {
      navItems = [{ name: "Dashboard Admin", page: "admin" }];
    } else {
      navItems = [
        { name: "Beranda", page: "home" },
        { name: "Kategori", page: "kategori" },
        { name: "Regional", page: "regional" },
      ];
    }

    navMenu.innerHTML = navItems
      .map(
        (item) => `
            <li><a href="#" data-nav="${item.page}" class="${
          item.page === this.currentPage ? "active" : ""
        }">${item.name}</a></li>
        `
      )
      .join("");
  }

  updateUserWelcome() {
    const userWelcome = document.getElementById("userWelcome");
    if (userWelcome)
      userWelcome.textContent = `Halo, ${this.currentUser.username}`;
  }

  async loadData() {
    try {
      // Data dari API tidak lagi diambil
      // const apiFoods = await this.api.getFoodData();
      const customFoods = this.storage.getFoodItems();
      // Gabungkan dan hapus duplikat jika ada (berdasarkan ID)
      const uniqueFoodMap = new Map();
      customFoods.forEach((food) => uniqueFoodMap.set(food.id, food));
      this.foodItems = Array.from(uniqueFoodMap.values());

      this.comments = this.storage.getComments();
    } catch (error) {
      console.error("Error loading data:", error);
      showToast("Error loading data", "error");
    }
  }

  async navigateTo(page) {
    this.currentPage = page;
    const navLinks = document.querySelectorAll("[data-nav]");
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.nav === page);
    });

    const contentArea = document.getElementById("contentArea");
    switch (page) {
      case "home":
        contentArea.innerHTML = this.ui.renderHomePage(this.comments);
        document.getElementById("shoppingSidebar").classList.add("hidden"); // SEMBUNYIKAN DI HOME
        this.setupHomePageEvents();
        break;
      case "kategori":
        contentArea.innerHTML = this.ui.renderKategoriPage(this.foodItems);
        document.getElementById("shoppingSidebar").classList.remove("hidden"); // TAMBAHKAN INI
        this.ui.showSidebar();
        this.setupKategoriEvents();
        break;
      case "regional":
        contentArea.innerHTML = this.ui.renderRegionalPage(this.foodItems);
        document.getElementById("shoppingSidebar").classList.remove("hidden"); // TAMBAHKAN INI
        this.ui.showSidebar();
        this.setupRegionalEvents();
        break;
      case "admin":
        if (this.currentUser.userType === "admin") {
          contentArea.innerHTML = this.ui.renderAdminPage(this.foodItems);
          document.getElementById("shoppingSidebar").classList.add("hidden"); // SEMBUNYIKAN DI ADMIN
          this.setupAdminEvents();
        }
        break;
    }
  }

  setupHomePageEvents() {
    const form = document.getElementById("commentForm");
    if (form)
      form.addEventListener("submit", (e) => this.handleCommentSubmit(e));

    const stars = document.querySelectorAll(".rating-stars span");
    stars.forEach((star, i) => {
      star.addEventListener("click", () => this.setRating(i + 1));
    });
  }

  setupKategoriEvents() {
    const btns = document.querySelectorAll(".category-btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () =>
        this.filterByCategory(btn.dataset.category)
      );
    });
    this.setupAddToCartEvents();
  }

  setupRegionalEvents() {
    const btns = document.querySelectorAll(".regional-btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () =>
        this.filterByRegion(btn.dataset.region)
      );
    });
    this.setupAddToCartEvents();
  }

  setupAddToCartEvents() {
    const btns = document.querySelectorAll(".add-to-cart");
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.addToCart(parseInt(btn.dataset.id));
      });
    });
  }

  setupAdminEvents() {
    const addBtn = document.getElementById("addFoodBtn");
    if (addBtn) addBtn.addEventListener("click", () => this.handleAddFood());
  }

  addToCart(foodId) {
    const food = this.foodItems.find((f) => f.id === foodId);
    if (!food) return;

    const existing = this.cart.find((item) => item.id === foodId);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({
        id: food.id,
        name: food.name,
        price: food.price,
        quantity: 1,
        image: food.image,
      });
    }

    this.updateCartUI();
    this.storage.saveCart(this.cart);
    showToast(`${food.name} ditambahkan ke keranjang`, "success");
  }

  updateCartUI() {
    const cartItems = document.getElementById("cartItems");
    const totalPrice = document.getElementById("totalPrice");

    if (!cartItems || !totalPrice) return;

    if (this.cart.length === 0) {
      cartItems.innerHTML =
        '<p style="text-align:center;opacity:0.6;">Keranjang masih kosong</p>';
      totalPrice.textContent = "0";
      return;
    }

    cartItems.innerHTML = this.cart
      .map(
        (item) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${formatCurrency(item.price)}</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="app.updateCartQuantity(${
                      item.id
                    }, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="app.updateCartQuantity(${
                      item.id
                    }, 1)">+</button>
                </div>
            </div>
        `
      )
      .join("");

    const total = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    totalPrice.textContent = total.toLocaleString("id-ID");
  }

  updateCartQuantity(foodId, change) {
    const item = this.cart.find((i) => i.id === foodId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
      this.cart = this.cart.filter((i) => i.id !== foodId);
    }

    this.updateCartUI();
    this.storage.saveCart(this.cart);
  }

  checkout() {
    if (this.cart.length === 0) {
      showToast("Keranjang masih kosong", "error");
      return;
    }

    const total = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const items = this.cart.map((i) => `${i.name} (${i.quantity}x)`).join(", ");

    if (
      confirm(
        `Total: ${formatCurrency(
          total
        )}\nItems: ${items}\n\nLanjutkan checkout?`
      )
    ) {
      showToast("Pesanan berhasil! Terima kasih", "success");
      this.cart = [];
      this.updateCartUI();
      this.storage.clearCart();
      this.ui.hideSidebar();
    }
  }

  filterByCategory(category) {
    const btns = document.querySelectorAll(".category-btn");
    btns.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.category === category)
    );

    const filtered =
      category === "all"
        ? this.foodItems
        : this.foodItems.filter((item) => {
            // Check if item.category is an array and includes the category
            return (
              Array.isArray(item.category) && item.category.includes(category)
            );
          });

    const grid = document.getElementById("foodGrid");
    if (grid) {
      grid.innerHTML = this.ui.renderFoodItems(filtered);
      this.setupAddToCartEvents();
    }
  }

  filterByRegion(region) {
    const btns = document.querySelectorAll(".regional-btn");
    btns.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.region === region)
    );

    const filtered =
      region === "all"
        ? this.foodItems
        : this.foodItems.filter((i) => i.region === region);

    const grid = document.getElementById("regionalFoodGrid");
    if (grid) {
      grid.innerHTML = this.ui.renderFoodItems(filtered);
      this.setupAddToCartEvents();
    }
  }

  handleAddFood() {
    const name = document.getElementById("foodName").value.trim();
    const fileInput = document.getElementById("foodImage");
    const price = parseFloat(document.getElementById("foodPrice").value);

    // Read multiple categories from checkboxes
    const categoryCheckboxes = document.querySelectorAll(
      '#foodCategoryCheckboxes input[name="category"]:checked'
    );
    const categories = Array.from(categoryCheckboxes).map((cb) => cb.value);

    const region = document.getElementById("foodRegion").value;
    const description =
      document.getElementById("foodDescription").value.trim() ||
      `Hidangan lezat ${name}`;

    if (!name || !fileInput.files[0] || !price || categories.length === 0) {
      showToast("Semua field harus diisi", "error");
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const newFood = {
        id: Date.now(),
        name,
        image: e.target.result, // Base64 image data
        price,
        category: categories, // Save as an array
        region,
        description,
        isCustom: true,
      };

      this.foodItems.push(newFood);
      this.storage.saveFoodItems(
        this.foodItems.filter((item) => item.isCustom)
      );

      document.getElementById("foodName").value = "";
      document.getElementById("foodImage").value = "";
      document.getElementById("foodPrice").value = "";
      document.getElementById("foodRegion").value = "";
      document.getElementById("foodDescription").value = "";
      // Uncheck all category checkboxes
      categoryCheckboxes.forEach((cb) => (cb.checked = false));

      this.navigateTo("admin");
      showToast("Makanan berhasil ditambahkan", "success");
    };

    reader.readAsDataURL(file);
  }

  editFood(foodId) {
    const food = this.foodItems.find((f) => f.id === foodId);
    if (!food) return;

    const newName = prompt("Nama makanan:", food.name);
    const newImage = prompt("URL gambar:", food.image);
    const newPrice = prompt("Harga:", food.price);
    const newCategory = prompt("Kategori:", food.category);
    const newRegion = prompt("Daerah:", food.region);

    if (newName && newImage && newPrice && newCategory && newRegion) {
      food.name = newName;
      food.image = newImage;
      food.price = parseFloat(newPrice);
      food.category = newCategory;
      food.region = newRegion;

      this.storage.saveFoodItems(
        this.foodItems.filter((item) => item.isCustom)
      );
      this.navigateTo("admin");
      showToast("Makanan berhasil diupdate", "success");
    }
  }

  deleteFood(foodId) {
    if (confirm("Apakah Anda yakin ingin menghapus makanan ini?")) {
      this.foodItems = this.foodItems.filter((f) => f.id !== foodId);
      this.storage.saveFoodItems(
        this.foodItems.filter((item) => item.isCustom)
      );
      this.navigateTo("admin");
      showToast("Makanan berhasil dihapus", "success");
    }
  }

  handleCommentSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name").trim();
    const comment = formData.get("comment").trim();
    const rating = parseInt(
      document.querySelector(".rating-stars").dataset.rating || "0"
    );

    if (!name || !comment || rating === 0) {
      showToast("Semua field harus diisi dan rating harus dipilih", "error");
      return;
    }

    const newComment = {
      id: Date.now(),
      name,
      comment,
      rating,
      date: new Date().toISOString(),
    };

    this.comments.push(newComment);
    this.storage.saveComments(this.comments);

    e.target.reset();
    document.querySelector(".rating-stars").dataset.rating = "0";
    this.resetStarHighlight();

    this.navigateTo("home");
    showToast("Komentar berhasil ditambahkan", "success");
  }

  setRating(rating) {
    const container = document.querySelector(".rating-stars");
    container.dataset.rating = rating;
    this.highlightStars(rating);
  }

  highlightStars(rating) {
    const stars = document.querySelectorAll(".rating-stars span");
    stars.forEach((span, index) => {
      const icon = span.querySelector("i");
      if (index < rating) {
        icon.classList.remove("far");
        icon.classList.add("fas");
      } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
      }
    });
  }

  resetStarHighlight() {
    const currentRating = parseInt(
      document.querySelector(".rating-stars").dataset.rating || "0"
    );
    this.highlightStars(currentRating);
  }

  toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains("dark-theme");

    if (isDark) {
      body.className = "light-theme";
    } else {
      body.className = "dark-theme";
    }

    this.storage.saveTheme(body.className);
    this.updateThemeIcon();
  }

  updateThemeIcon() {
    const themeToggle = document.getElementById("themeToggle");
    const isDark = document.body.classList.contains("dark-theme");

    if (themeToggle) {
      themeToggle.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    }
  }

  showLoginForm() {
    document.getElementById("loadingScreen").classList.add("hidden");
    document.getElementById("mainApp").classList.add("hidden");
    document.getElementById("loginContainer").classList.remove("hidden");
  }

  // --- Auth Tab Switcher Methods ---
  switchToLogin() {
    this.isLoginMode = true;
    document.getElementById("loginTab").classList.add("active");
    document.getElementById("registerTab").classList.remove("active");
    document.getElementById("usernameGroup").style.display = "none";
    document.getElementById("userType").parentElement.style.display = "block";
    document.getElementById("authButton").textContent = "Masuk";
    document.getElementById("username").required = false;
  }

  switchToRegister() {
    this.isLoginMode = false;
    document.getElementById("loginTab").classList.remove("active");
    document.getElementById("registerTab").classList.add("active");
    document.getElementById("usernameGroup").style.display = "block";
    // Hide userType selection on register, default to 'user'
    document.getElementById("userType").parentElement.style.display = "none";
    document.getElementById("userType").value = "user";
    document.getElementById("authButton").textContent = "Daftar";
    document.getElementById("username").required = true;
  }
}

// Initialize app
const app = new WaroengDigitalApp();
window.app = app;
