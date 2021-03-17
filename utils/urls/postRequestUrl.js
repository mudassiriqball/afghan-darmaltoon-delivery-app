import baseUrl from './baseUrl'

export default {
    // USERS
    LOGIN: baseUrl + '/api/users/auth/login-user',
    SIGNUP: baseUrl + '/api/users/auth/register/register-user',
    CHANGE_CUSTOMER_STATUS: baseUrl + '/api/users/customer/status/change-customer-status/',

    // PRODUCTS
    NEW_PRODUCT: baseUrl + '/api/products/add-new/product/',

    // SLIDERS
    ADD_SLIDER: baseUrl + '/api/sliders/add-new/slider',

    // CATEGORIES
    ADD_CATEGORY: baseUrl + '/api/categories/add/new/category-subcategory',
    ADD_HOME_CATEGORY: baseUrl + '/api/categories/home-category',

    // ORDERS
    PLACE_ORDER: baseUrl + '/api/orders/place/order/id/user-order/',
    PICK_ORDER: baseUrl + '/api/orders/deliver/order/id/delivery-boy/pick-order',
    DROP_ORDER: baseUrl + '/api/orders/deliver/order-deliver/delivery-boy/deliver-order/to-customer',

    // PAYMENT
    MAKE_PAYMENT: baseUrl + '/api/paymants/add-payment/make-transaction/',

    // SMS
    SEND_ORDER_STATUS_CHANGED_SMS: baseUrl + '/api/sms/to-customer/order/status/update/sms',
}
