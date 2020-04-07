/*
 * Paginate need page, pageSize, totalItem
 */
exports.paginate = async(page = 1, pageSize = 10, total) => {
    const offset = (page-1) * pageSize;
    const limit = pageSize;
    const currentPage = page
    const pages = Math.ceil(total / pageSize) //return number of page for all item
    return { offset, limit, currentPage, pages};
}