import { OrdersInterface } from "../interfaces/Orders";

/**
 * Function to helper 
 *
 *
 * @author Mickael da Costa
 */

/**
 * Sort to HighPrice the order returned by WebSocket
 *
 * @param {Array<string>} orders - the orders to be sorted
 * @returns {Array<string>}
 */
export const sortByHighPrice = (orders:Array<string> ) : Array<string>  => {
    const newOrders = [...orders];
    return newOrders.sort((a: string, b: string) => parseFloat(b) - parseFloat(a));
}

/**
 * Sort to LowPrice the order returned by WebSocket
 *
 * @param {Array<string>} orders - the orders to be sorted
 * @returns {Array<string>}
 */
export const sortByLowPrice = (orders : Array<string>) : Array<string> => {
    const newOrders = [...orders];
    return newOrders.sort((a, b) => parseFloat(a) - parseFloat(b));
}

/**
 * Sort to High the order in Historic
 *
 * @param {Array<string>} orders - the orders to be sorted
 * @returns {Array<string>}
 */
export const sortByHighPriceOrders = (orders:Array<OrdersInterface> ) : Array<OrdersInterface>  => {
    const newOrders = [...orders];
    return newOrders.sort((a: OrdersInterface, b: OrdersInterface) => parseFloat(b.price) - parseFloat(a.price));
}

/**
 * Sort to High the order in Historic
 *
 * @param {Array<string>} orders - the orders to be sorted
 * @returns {Array<string>}
 */
export const sortByLowPriceOrders = (orders : Array<OrdersInterface>) : Array<OrdersInterface> => {
    const newOrders = [...orders];
    return newOrders.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
}

/**
 * Create the orders received with correct structure
 *
 * @param {Array<string>} orders - the orders to create with correct structure
 * @returns {Array<OrdersInterface>}
 */
export const createOrders = (orders : Array<string> = []) : Array<OrdersInterface> => {
    const copyOfOrders = [...orders];
    let newOrders: Array<OrdersInterface> = [];
    let total: number = 0;

    copyOfOrders.forEach((order) => {
        total = total + parseInt(order[1]);
        newOrders.push({
            price: order[0],
            size: order[1],
            total
        });
    });

    return newOrders;
}

/**
 * Update the orders saved with the new updates
 *
 * @param {Array<OrdersInterface>} orders - the orders to create with correct structure
 * @param {Array<string>} newOrders - the orders to create with correct structure
 * @returns {Array<OrdersInterface>}
 */
export const updateOrders = (orders : Array<OrdersInterface> = [], newOrders : Array<string> = []) : Array<OrdersInterface> => {
    let updatedOrders: Array<OrdersInterface> = [];
    let total: number = 0;
    
    orders.forEach((order) => {

        const orderFind = newOrders.find((newOrder) => order.price === newOrder[0]);
        let price = order.price;
        let size = order.size;

        if(Array.isArray(orderFind)) {
            price = orderFind[0] || 0;
            size = orderFind[1] || 0;
        }

        total = total  + parseInt(size);

        if(parseInt(size) !== 0) {
            updatedOrders.push({
                price,
                size,
                total
            })
        }
    })

    return updatedOrders;
}

/**
 * Set the market url to subscribe
 *
 * @param {string} market
 * @returns {string}
 */
export const getSubscribeUrl = (market: string) : string => {
    return `{"event":"subscribe","feed":"book_ui_1","product_ids":["${market}"]}`;
}

/**
 * Set the market url to unsubscribe
 *
 * @param {string} market
 * @returns {string}
 */
export const getUnSubscribeUrl = (market: string) : string => {
    return `{"event":"unsubscribe","feed":"book_ui_1","product_ids":["${market}"]}`;
}