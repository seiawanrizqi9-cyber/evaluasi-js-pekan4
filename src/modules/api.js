export class APIManager {
  constructor() {
    this.cache = null;
  }

  async getFoodData() {
    // Tidak ada API fetch, return empty array
    // User akan menambahkan data manual lewat admin panel
    return [];
  }
}
