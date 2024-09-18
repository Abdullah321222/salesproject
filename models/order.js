const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.ObjectId, required: true },
        id: { type: String, required: true },
        email: { type: String, required: true },
        // closed_at: { type: Date, default: null },
        number: { type: Number, required: true },
        note: { type: String },
        token: { type: String },
        gateway: { type: String, required: true },
        test: { type: Boolean },
        total_price: { type: String, required: true },
        subtotal_price: { type: String, required: true },
        total_weight: { type: Number },
        total_tax: { type: String, required: true },
        taxes_included: { type: Boolean },
        currency: { type: String, required: true },
        financial_status: { type: String, required: true },
        confirmed: { type: Boolean },
        total_discounts: {
            type: String
        },
        buyer_accepts_marketing: { type: Boolean },
        name: { type: String, required: true },
        referring_site: { type: String },
        landing_site: { type: String },
        cancelled_at: { type: Date },
        cancel_reason: { type: String },
        reference: { type: String },
        user_id: { type: String },
        location_id: { type: String },
        source_identifier: { type: String },
        source_url: { type: String },
        device_id: { type: String },
        phone: { type: String },
        customer_locale: {
            type: String
        },
        app_id: { type: Number, required: true },
        browser_ip: { type: String },
        landing_site_ref: { type: String },
        order_number: { type: String, required: true },
        discount_applications: { type: Array },
        discount_codes: { type: Array },
        note_attributes: { type: Array },
        payment_gateway_names: { type: String, required: true },
        processing_method: { type: String, required: true },
        source_name: { type: String, required: true },
        fulfillment_status: { type: String },
        tax_lines: { type: Array },
        tags: { type: String },
        contact_email: { type: String },
        order_status_url: { type: String },
        presentment_currency: {
            type: String
        },
        total_line_items_price_set: { type: Object },
        total_discounts_set: { type: Object },
        total_shipping_price_set: { type: Object },
        subtotal_price_set: { type: Object },
        total_price_set: { type: Object },
        total_tax_set: { type: Object },
        line_items: { type: Array, required: true },
        shipping_lines: { type: Array },
        billing_address: { type: Object },
        shipping_address: { type: Object },
        fulfillments: { type: Array },
        client_details: { type: Object },
        refunds: { type: Array },
        customer: { type: Object, required: true },
        total_line_items_price: { type: String, required: true }
    },
    { timestamps: true }
)

const Order = mongoose.model('shopifyOrder', orderSchema);
module.exports = Order