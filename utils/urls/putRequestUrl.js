import baseUrl from './baseUrl'
export default {
    // USERS
    CHANGE_CUSTOMER_STATUS: baseUrl + '/api/users/status/id/customer-only/',

    DELETE_PRODUCT: baseUrl + '/api/products/delete-product/',
    UPDATE_Order_STATUS: baseUrl + '/api/orders/user-order-status/',
    UPDATE_USER_STATUS: baseUrl + '/api/users/user-status/',
    UPDATE_USER_PROFILE: baseUrl + '/api/users/profile/id/update-all/',
    REMOVE_ITEM_TO_WISHLIST: baseUrl + '/api/users/remove/id/wishlist/obj-id/',

    // Slider
    UPDATE_SLIDER: baseUrl + '/api/sliders/slider/',

    // Category
    UPDATE_CATEGORY: baseUrl + '/api/categories/category/id/update/by-id/',

    // Sub Category
    UPDATE_SUB_CATEGORY: baseUrl + '/api/categories/sub-category/update/by-id/',

    // Cart
    ADD_TO_CART: baseUrl + '/api/users/cart/id/add/',
    CLEAR_CART: baseUrl + '/api/users/clear-cart-obj/id/clear-by-id/',

    // Rating Review
    ADD_RATING_REVIEW: baseUrl + '/api/products/add/review/rating/',
}
