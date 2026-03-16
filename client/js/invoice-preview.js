;(function (globalScope) {
  function formatCurrencyText(amount) {
    return new Intl.NumberFormat("vi-VN").format(Number(amount) || 0) + " d"
  }

  function formatDateTimeText(value) {
    if (!value) {
      return "-"
    }

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) {
      return "-"
    }

    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  function getPaymentMethodLabel(paymentMethod) {
    const labels = {
      cash: "Tien mat",
      transfer: "Chuyen khoan",
      momo: "MoMo",
      zalopay: "ZaloPay",
    }

    return labels[paymentMethod] || paymentMethod || "-"
  }

  function getStatusLabel(status) {
    const labels = {
      completed: "Hoan thanh",
      cancelled: "Da huy",
      pending: "Cho xu ly",
    }

    return labels[status] || status || "-"
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
  }

  function normalizeInvoicePreviewData(invoice) {
    const items = Array.isArray(invoice.items) ? invoice.items : []

    return {
      id: invoice.id,
      storeName: invoice.storeName || "Cua hang Tap Hoa",
      invoiceCode: `#${invoice.id ?? "-"}`,
      dateText: formatDateTimeText(invoice.date || invoice.created_at),
      cashier:
        invoice.cashier || invoice.cashier_name || invoice.user_name || "-",
      customer: invoice.customer || invoice.customer_name || "Khach le",
      customerPhone: invoice.customerPhone || invoice.customer_phone || "",
      paymentMethod: invoice.paymentMethod || invoice.payment_method,
      paymentMethodLabel: getPaymentMethodLabel(
        invoice.paymentMethod || invoice.payment_method,
      ),
      status: invoice.status || "pending",
      statusLabel: getStatusLabel(invoice.status || "pending"),
      totalAmountText: formatCurrencyText(
        invoice.totalAmount ?? invoice.total_amount,
      ),
      amountPaidText: formatCurrencyText(
        invoice.amountPaid ?? invoice.amount_paid,
      ),
      changeText: formatCurrencyText(invoice.change),
      note: invoice.note || "",
      items: items.map((item) => ({
        name: item.name || item.product_name || `SP #${item.product_id ?? ""}`,
        unitText: item.unit || "",
        quantity: item.quantity || 0,
        priceText: formatCurrencyText(item.price),
        subtotalText: formatCurrencyText(item.subtotal),
      })),
    }
  }

  function buildInvoicePreviewHtml(invoice) {
    const itemRows = invoice.items
      .map(
        (item) => `
            <tr>
                <td>
                    <div class="preview-item-name">${escapeHtml(item.name)}</div>
                    ${item.unitText ? `<div class="preview-item-meta">${escapeHtml(item.unitText)}</div>` : ""}
                </td>
                <td class="text-center">${escapeHtml(item.quantity)}</td>
                <td class="text-right">${escapeHtml(item.priceText)}</td>
                <td class="text-right">${escapeHtml(item.subtotalText)}</td>
            </tr>
        `,
      )
      .join("")

    const noteBlock = invoice.note
      ? `
                <div class="invoice-preview-note">
                    <div class="preview-section-label">Ghi chu</div>
                    <p>${escapeHtml(invoice.note)}</p>
                </div>
            `
      : ""

    return `
            <div class="invoice-preview-shell">
                <div class="invoice-preview-hero">
                    <div>
                        <div class="preview-eyebrow">Chi tiet hoa don</div>
                        <h3>${escapeHtml(invoice.storeName)}</h3>
                        <p>Theo doi hoa don ban hang tren man hinh</p>
                    </div>
                    <div class="preview-status ${escapeHtml(invoice.status)}">${escapeHtml(invoice.statusLabel)}</div>
                </div>
                <div class="invoice-preview-meta">
                    <div class="preview-meta-card">
                        <span class="preview-section-label">Ma hoa don</span>
                        <strong>${escapeHtml(invoice.invoiceCode)}</strong>
                    </div>
                    <div class="preview-meta-card">
                        <span class="preview-section-label">Thời gian</span>
                        <strong>${escapeHtml(invoice.dateText)}</strong>
                    </div>
                    <div class="preview-meta-card">
                        <span class="preview-section-label">Nhan vien</span>
                        <strong>${escapeHtml(invoice.cashier)}</strong>
                    </div>
                    <div class="preview-meta-card">
                        <span class="preview-section-label">Thanh toan</span>
                        <strong>${escapeHtml(invoice.paymentMethodLabel)}</strong>
                    </div>
                </div>
                <div class="invoice-preview-grid">
                    <div class="preview-panel">
                        <div class="preview-panel-header">
                            <span class="preview-section-label">Khach hang</span>
                        </div>
                        <div class="preview-contact-name">${escapeHtml(invoice.customer)}</div>
                        <div class="preview-contact-meta">${escapeHtml(invoice.customerPhone || "Khong co so dien thoai")}</div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-panel-header">
                            <span class="preview-section-label">Tong ket thanh toan</span>
                        </div>
                        <div class="preview-summary-row"><span>Tong tien</span><strong>${escapeHtml(invoice.totalAmountText)}</strong></div>
                        <div class="preview-summary-row"><span>Khach dua</span><strong>${escapeHtml(invoice.amountPaidText)}</strong></div>
                        <div class="preview-summary-row accent"><span>Tien thua</span><strong>${escapeHtml(invoice.changeText)}</strong></div>
                    </div>
                </div>
                <div class="preview-table-wrap">
                    <table class="table preview-table">
                        <thead>
                            <tr>
                                <th>San pham</th>
                                <th class="text-center">SL</th>
                                <th class="text-right">Don gia</th>
                                <th class="text-right">Thanh tien</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemRows || '<tr><td colspan="4" class="text-center text-muted">Khong co san pham</td></tr>'}
                        </tbody>
                    </table>
                </div>
                ${noteBlock}
            </div>
        `
  }

  const exportsObject = {
    normalizeInvoicePreviewData,
    buildInvoicePreviewHtml,
    getPaymentMethodLabel,
    getStatusLabel,
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = exportsObject
  }

  globalScope.InvoicePreview = exportsObject
})(typeof window !== "undefined" ? window : globalThis)
