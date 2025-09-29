export class StorageManager {
  constructor() {
    this.keys = {
      CURRENT_USER: "waroeng_current_user",
      THEME: "waroeng_theme",
      CART: "waroeng_cart",
      COMMENTS: "waroeng_comments",
      FOOD_ITEMS: "waroeng_custom_foods",
    };
  }

  saveUser(user) {
    try {
      localStorage.setItem(this.keys.CURRENT_USER, JSON.stringify(user));
      sessionStorage.setItem("login_session", "active");
      return true;
    } catch (e) {
      return false;
    }
  }

  getCurrentUser() {
    try {
      const user = localStorage.getItem(this.keys.CURRENT_USER);
      const session = sessionStorage.getItem("login_session");
      return user && session === "active" ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  }

  clearUser() {
    localStorage.removeItem(this.keys.CURRENT_USER);
    sessionStorage.removeItem("login_session");
    this.clearCart();
  }

  saveTheme(theme) {
    localStorage.setItem(this.keys.THEME, theme);
  }

  getTheme() {
    return localStorage.getItem(this.keys.THEME) || "light-theme";
  }

  saveCart(cart) {
    localStorage.setItem(this.keys.CART, JSON.stringify(cart));
  }

  getCart() {
    try {
      const cart = localStorage.getItem(this.keys.CART);
      return cart ? JSON.parse(cart) : [];
    } catch (e) {
      return [];
    }
  }

  clearCart() {
    localStorage.removeItem(this.keys.CART);
  }

  saveComments(comments) {
    localStorage.setItem(this.keys.COMMENTS, JSON.stringify(comments));
  }

  getComments() {
    try {
      const comments = localStorage.getItem(this.keys.COMMENTS);
      return comments ? JSON.parse(comments) : [];
    } catch (e) {
      return [];
    }
  }

  saveFoodItems(foods) {
    localStorage.setItem(this.keys.FOOD_ITEMS, JSON.stringify(foods));
  }

  getFoodItems() {
    try {
      const foods = localStorage.getItem(this.keys.FOOD_ITEMS);
      return foods ? JSON.parse(foods) : [];
    } catch (e) {
      return [];
    }
  }

  // Tambahkan di dalam class StorageManager, setelah method getFoodItems()
  saveRegisteredUsers(users) {
    try {
      localStorage.setItem("waroeng_registered_users", JSON.stringify(users));
      return true;
    } catch (e) {
      return false;
    }
  }

  getRegisteredUsers() {
    try {
      const users = localStorage.getItem("waroeng_registered_users");
      return users ? JSON.parse(users) : [];
    } catch (e) {
      return [];
    }
  }

  registerUser(userData) {
    try {
      const users = this.getRegisteredUsers();
      const existingUser = users.find((u) => u.email === userData.email);
      if (existingUser) {
        return { success: false, message: "Email sudah terdaftar" };
      }
      users.push({
        username: userData.username,
        email: userData.email,
        password: userData.password, // Note: In a real app, hash passwords!
        userType: userData.userType,
        registeredAt: new Date().toISOString(),
      });
      this.saveRegisteredUsers(users);
      return { success: true, message: "Registrasi berhasil" };
    } catch (e) {
      return { success: false, message: "Error saat registrasi" };
    }
  }

  validateLogin(email, password) {
    const users = this.getRegisteredUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    return user || null;
  }
}
