import baseUrl from './baseUrl'

export default {
    // Customers
    DISCARD_NEW_CUSTOMER: baseUrl + '/api/users/discard/new-customer/by-id/',
    DELETE_SLIDER: baseUrl + '/api/sliders/slider/id/remove/by-id/',

    // Category
    DELETE_HOME_CATEGORY: baseUrl + '/api/categories/home-category/',

    // Sub Category
    DELETE_SUB_CATEGORY: baseUrl + '/api/categories/sub-category/',

    // Cart
    DELETE_CART: baseUrl + '/api/delete-cart/id/delete-cart-by-id/',
}