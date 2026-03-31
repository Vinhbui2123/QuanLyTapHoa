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
      cash: "Tiền mặt",
      transfer: "Chuyển khoản",
      momo: "MoMo",
      zalopay: "ZaloPay",
    }

    return labels[paymentMethod] || paymentMethod || "-"
  }

  function getStatusLabel(status) {
    const labels = {
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
      pending: "Chờ xử lý",
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
                <div class="invoice-preview-meta">
                    <div class="preview-meta-card">
                        <span class="preview-section-label">Mã hóa đơn</span><br>
                        <strong>${escapeHtml(invoice.invoiceCode)}</strong>
                    </div>
                    <div class="preview-meta-card">
                        <span class="preview-section-label">Thời gian</span><br>
                        <strong>${escapeHtml(invoice.dateText)}</strong>
                    </div>
                    <div class="preview-meta-card">
                        <span class="preview-section-label">Nhân viên</span><br>
                        <strong>${escapeHtml(invoice.cashier)}</strong>
                    </div>
                    <div class="preview-meta-card">
                        <span class="preview-section-label">Thanh toán</span><br>
                        <strong>${escapeHtml(invoice.paymentMethodLabel)}</strong>
                    </div>
                </div>
                <div class="">
                    <div class="preview-panel">
                        <div class="preview-panel-header">
                            <span class="preview-section-label">Khách hàng</span>
                        </div>
                        <div class="preview-contact-name">${escapeHtml(invoice.customer)}</div>
                    </div>
                 </div>
                <div class="preview-table-wrap">
                    <table class="table preview-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th class="text-center">SL</th>
                                <th class="text-right">Đơn giá</th>
                                <th class="text-right">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemRows || '<tr><td colspan="4" class="text-center text-muted">Khong co san pham</td></tr>'}
                        </tbody>
                    </table>
                </div>
                <div class="preview-panel">
                        <div class="preview-panel-header">
                            <span class="preview-section-label">Tổng kết thanh toán</span>
                        </div>
                        <div class="preview-summary-row"><span>Tổng tiền </span><strong>${escapeHtml(invoice.totalAmountText)}</strong></div>
                        <div class="preview-summary-row"><span>Khách đưa </span><strong>${escapeHtml(invoice.amountPaidText)}</strong></div>
                        <div class="preview-summary-row accent"><span>Tiền thừa </span><strong>${escapeHtml(invoice.changeText)}</strong></div>
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
