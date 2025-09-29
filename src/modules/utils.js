export function formatCurrency(amount) {
  return "Rp " + amount.toLocaleString("id-ID");
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function showToast(message, type = "success") {
  const existing = document.querySelectorAll(".toast");
  existing.forEach((t) => t.remove());

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
  if (type === "error") {
    toast.innerHTML = `<i class="fas fa-times-circle"></i> ${message}`;
  }
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}
