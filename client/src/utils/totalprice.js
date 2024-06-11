/**
 *  Esta funcion se usa para calcular el total del precio en una rray de productos
 * @param {Array} products Lista de productos de la API
 * @returns {number} Precio total
 */


export const updateTotalPrice = (products) => {
    const total = products.reduce((accumulator, product) => accumulator + (product.price * product.quantity), 0);
    return Number(total.toFixed(2));
}