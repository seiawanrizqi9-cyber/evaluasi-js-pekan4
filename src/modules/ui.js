import { formatCurrency, formatDate } from "./utils.js";

export class UIManager {
  showLoading() {
    document.getElementById("loadingScreen").classList.remove("hidden");
  }

  hideLoading() {
    document.getElementById("loadingScreen").classList.add("hidden");
  }

  showError(message) {
    const el = document.getElementById("errorMessage");
    if (el) {
      el.textContent = message;
      setTimeout(() => (el.textContent = ""), 5000);
    }
  }

  showSidebar() {
    document.getElementById("shoppingSidebar").classList.add("show");
  }

  hideSidebar() {
    document.getElementById("shoppingSidebar").classList.remove("show");
  }

  renderHomePage(comments) {
    return `
            <div class="fade-in">
                <section class="hero-section">
                    <h1><i class="fas fa-utensils"></i> Waroeng Digital</h1>
                    <p>"Menyajikan Cita Rasa Autentik Indonesia dalam Genggaman Anda"</p>
                </section>

                <section class="card">
                    <h2><i class="fas fa-info-circle"></i> Tentang Waroeng Digital</h2>
                    <p>Waroeng Digital adalah platform inovatif yang menghadirkan kelezatan kuliner nusantara langsung ke rumah Anda. Kami berkomitmen untuk melestarikan cita rasa autentik Indonesia melalui teknologi modern.</p>
                    <br>
                    <p>Dari Sabang sampai Merauke, setiap hidangan yang kami sajikan adalah representasi kekayaan budaya dan tradisi kuliner Indonesia.</p>
                </section>

                <section class="grid grid-2">
                    <div class="card">
                        <h3><i class="fas fa-bullseye"></i> Misi Kami</h3>
                        <p>✓ Menyediakan makanan berkualitas dengan cita rasa autentik</p>
                        <p>✓ Mendukung UMKM kuliner lokal</p>
                        <p>✓ Memberikan pelayanan terbaik untuk pelanggan</p>
                    </div>
                    <div class="card">
                        <h3><i class="fas fa-eye"></i> Visi Kami</h3>
                        <p>Menjadi platform kuliner digital terdepan di Indonesia yang menghubungkan keragaman cita rasa nusantara dengan teknologi modern.</p>
                    </div>
                </section>

                <section class="card">
                    <h2><i class="fas fa-users"></i> Tim Eksekutif & Chef</h2>
                    <div class="team-section">
                        <div class="team-member">
                            <img src="assets/img/gambar-chef/eksekutif.jpeg" alt="Chef">
                            <h4>Chef Budi Santoso</h4>
                            <p style="color: #ff8c00;">Executive Chef</p>
                            <small>25 tahun pengalaman kuliner nusantara</small>
                        </div>
                        <div class="team-member">
                            <img src="assets/img/gambar-chef/CEO.jpeg" alt="CEO">
                            <h4>Sari Indrawati</h4>
                            <p style="color: #ff8c00;">CEO & Founder</p>
                            <small>Entrepreneur passionate tentang kuliner Indonesia</small>
                        </div>
                        <div class="team-member">
                            <img src="assets/img/gambar-chef/chef 1.jpeg" alt="Sous Chef">
                            <h4>Chef Made Wirawan</h4>
                            <p style="color: #ff8c00;">Head of Chef</p>
                            <small>Spesialis masakan tradisional Bali dan Jawa</small>
                        </div>
                        <div class="team-member">
                            <img src="assets/img/gambar-chef/chef 2.jpeg" alt="Operations">
                            <h4>Anita Kusuma</h4>
                            <p style="color: #ff8c00;">Head of Operations</p>
                            <small>Ahli logistik dan manajemen supply chain</small>
                        </div>
                    </div>
                </section>

                <section class="card">
                    <h2><i class="fas fa-comments"></i> Ulasan Pelanggan</h2>
                    <form id="commentForm" style="margin-bottom: 30px;">
                        <h3>Berikan Ulasan Anda</h3>
                        <div class="form-group">
                            <input type="text" name="name" placeholder="Nama Anda" required>
                        </div>
                        <div class="form-group">
                            <textarea name="comment" placeholder="Tulis ulasan..." rows="4" required></textarea>
                        </div>
                        <div class="form-group">
                            <label>Rating:</label>
                            <div class="rating-stars" data-rating="0">
                                <span><i class="far fa-star"></i></span>
                                <span><i class="far fa-star"></i></span>
                                <span><i class="far fa-star"></i></span>
                                <span><i class="far fa-star"></i></span>
                                <span><i class="far fa-star"></i></span>
                            </div>
                        </div>
                        <button type="submit" class="btn"><i class="fas fa-paper-plane"></i> Kirim Ulasan</button>
                    </form>
                    <div id="commentsList">
                        ${
                          comments.length === 0
                            ? '<p style="text-align:center;opacity:0.6;">Belum ada ulasan</p>'
                            : comments
                                .slice(-5)
                                .reverse()
                                .map(
                                  (c) => `
                            <div class="comment-item">
                                <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                                    <strong>${c.name}</strong>
                                    <small>${formatDate(c.date)}</small>
                                </div>
                                <div class="comment-rating" style="color:#ffd700;margin-bottom:5px;">
                                    ${'<i class="fas fa-star"></i>'.repeat(
                                      c.rating
                                    )}${'<i class="far fa-star"></i>'.repeat(
                                    5 - c.rating
                                  )}
                                </div>
                                <p>${c.comment}</p>
                            </div>
                        `
                                )
                                .join("")
                        }
                    </div>
                </section>
            </div>
        `;
  }

  renderKategoriPage(foods) {
    const categories = [
      { id: "all", name: "Semua", icon: "fa-th-large" },
      { id: "nasi", name: "Nasi", icon: "fa-bowl-rice" },
      { id: "daging", name: "Daging", icon: "fa-drumstick-bite" },
      { id: "sayuran", name: "Sayuran", icon: "fa-leaf" },
      { id: "kuah", name: "Berkuah", icon: "fa-bowl-hot" },
      { id: "pedas", name: "Pedas", icon: "fa-pepper-hot" },
      { id: "manisan", name: "Manisan", icon: "fa-candy-cane" },
      { id: "minuman", name: "Minuman", icon: "fa-glass-water" },
    ];

    return `
            <div class="fade-in">
                <div class="card">
                    <h1><i class="fas fa-tags"></i> Pilih Kategori Makanan</h1>
                    <p>Temukan makanan favorit Anda berdasarkan kategori</p>
                </div>
                <div class="category-buttons">
                    ${categories
                      .map(
                        (c) => `
                        <button class="category-btn ${
                          c.id === "all" ? "active" : ""
                        }" data-category="${c.id}">
                            <i class="fas ${c.icon}"></i> ${c.name}
                        </button>
                    `
                      )
                      .join("")}
                </div>
                <div id="foodGrid" class="grid grid-4">
                    ${this.renderFoodItems(foods)}
                </div>
            </div>
        `;
  }

  renderRegionalPage(foods) {
    const regions = [
      { id: "all", name: "Semua Daerah", icon: "fa-globe-asia" },
      { id: "sumatera", name: "Sumatera", icon: "fa-mountain" },
      { id: "jakarta", name: "Jakarta", icon: "fa-city" },
      { id: "jawa-barat", name: "Jawa Barat", icon: "fa-mountains" },
      { id: "jawa-tengah", name: "Jawa Tengah", icon: "fa-monument" },
      { id: "yogyakarta", name: "Yogyakarta", icon: "fa-crown" },
      { id: "jawa-timur", name: "Jawa Timur", icon: "fa-volcano" },
      { id: "bali", name: "Bali", icon: "fa-umbrella-beach" },
      { id: "sulawesi", name: "Sulawesi", icon: "fa-water" },
    ];

    return `
            <div class="fade-in">
                <div class="card">
                    <h1><i class="fas fa-map-marked-alt"></i> Kuliner Nusantara</h1>
                    <p>Jelajahi kekayaan kuliner Indonesia dari berbagai daerah</p>
                </div>
                <div class="regional-buttons">
                    ${regions
                      .map(
                        (r) => `
                        <button class="regional-btn ${
                          r.id === "all" ? "active" : ""
                        }" data-region="${r.id}">
                            <i class="fas ${r.icon}"></i> ${r.name}
                        </button>
                    `
                      )
                      .join("")}
                </div>
                <div id="regionalFoodGrid" class="grid grid-4">
                    ${this.renderFoodItems(foods)}
                </div>
            </div>
        `;
  }

  renderAdminPage(foods) {
    const custom = foods.filter((f) => f.isCustom);
    return `
            <div class="fade-in">
                <div class="card">
                    <h1><i class="fas fa-user-shield"></i> Dashboard Admin</h1>
                </div>
                <div class="admin-panel">
                    <h2><i class="fas fa-plus-circle"></i> Tambah Makanan Baru</h2>
                    <div class="admin-form">
                        <input type="text" id="foodName" placeholder="Nama Makanan" required>
                        <div>
                            <label style="display:block;margin-bottom:8px;color:var(--text-color);">Pilih Gambar:</label>
                            <input type="file" id="foodImage" accept="image/*" required style="padding:8px;">
                        </div>
                        <input type="number" id="foodPrice" placeholder="Harga (Rp)" required>
                        <div id="foodCategoryCheckboxes" class="checkbox-group">
                            <label><input type="checkbox" name="category" value="nasi"> Nasi</label>
                            <label><input type="checkbox" name="category" value="daging"> Daging</label>
                            <label><input type="checkbox" name="category" value="sayuran"> Sayuran</label>
                            <label><input type="checkbox" name="category" value="kuah"> Berkuah</label>
                            <label><input type="checkbox" name="category" value="pedas"> Pedas</label>
                            <label><input type="checkbox" name="category" value="manisan"> Manisan</label>
                            <label><input type="checkbox" name="category" value="minuman"> Minuman</label>
                        </div>
                        <select id="foodRegion">
                            <option value="">Pilih Daerah (Opsional)</option>
                            <option value="sumatera">Sumatera</option>
                            <option value="jakarta">Jakarta</option>
                            <option value="jawa-barat">Jawa Barat</option>
                            <option value="jawa-tengah">Jawa Tengah</option>
                            <option value="yogyakarta">Yogyakarta</option>
                            <option value="jawa-timur">Jawa Timur</option>
                            <option value="bali">Bali</option>
                            <option value="sulawesi">Sulawesi</option>
                        </select>
                        <textarea id="foodDescription" placeholder="Deskripsi makanan" rows="3"></textarea>
                    </div>
                    <button id="addFoodBtn" class="btn btn-success">
                        <i class="fas fa-plus"></i> Tambah Makanan
                    </button>
                </div>
                <div class="card">
                    <h2><i class="fas fa-list"></i> Kelola Makanan (${
                      custom.length
                    } items)</h2>
                    <div style="overflow-x:auto;">
                        <table class="food-table">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Nama</th><th>Gambar</th><th>Harga</th><th>Kategori</th><th>Daerah</th><th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                  custom.length === 0
                                    ? '<tr><td colspan="7" style="text-align:center;padding:40px;">Belum ada makanan. Silakan tambahkan makanan baru.</td></tr>'
                                    : custom
                                        .map(
                                          (f) => `
                                    <tr>
                                        <td>${f.id}</td>
                                        <td>${f.name}</td>
                                        <td><img src="${
                                          f.image
                                        }" style="width:50px;height:50px;object-fit:cover;border-radius:5px;"></td>
                                        <td>${formatCurrency(f.price)}</td>
                                        <td>${f.category}</td>
                                        <td>${f.region}</td>
                                        <td>
                                            <button class="btn-warning edit-food" data-id="${
                                              f.id
                                            }">Edit</button>
                                            <button class="btn-danger delete-food" data-id="${
                                              f.id
                                            }">Hapus</button>
                                        </td>
                                    </tr>
                                `
                                        )
                                        .join("")
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
  }

  renderFoodItems(foods) {
    if (!foods || foods.length === 0) {
      return '<div class="card" style="grid-column:1/-1;text-align:center;padding:60px;"><h3>Tidak ada makanan ditemukan</h3></div>';
    }
    return foods
      .map(
        (f) => `
            <div class="food-item" data-id="${f.id}">
                <img src="${f.image}" alt="${f.name}">
                <div class="food-item-info">
                    <h3>${f.name}</h3>
                    <p>${f.description}</p>
                    <div class="food-price">${formatCurrency(f.price)}</div>
                    <div style="margin-bottom:15px;opacity:0.7;font-size:14px;">
                        ${
                          f.region
                            ? `<i class="fas fa-map-marker-alt"></i> ${f.region.replace(
                                "-",
                                " "
                              )}`
                            : ""
                        }
                        <span style="${
                          f.region ? "margin-left:15px;" : ""
                        }"><i class="fas fa-tag"></i> ${
          Array.isArray(f.category) ? f.category.join(", ") : f.category
        }</span>
                    </div>
                    <button class="add-to-cart" data-id="${f.id}">
                        <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  }
}
