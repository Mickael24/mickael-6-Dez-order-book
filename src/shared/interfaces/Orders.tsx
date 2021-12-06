/**
 * Orders 
 *
 * Context with all props and functions to share in Order Book
 *
 * @author Mickael da Costa
 */

export interface OrdersInterface {
    price: string,
    size: string,
    total?: number,
}

export interface OrderTableColumn {
    id: string,
    key: string,
    title: string,
    className: string,
}

export interface OrderReceivedInterface {
    asks:  Array<OrdersInterface> | [],
    bids:  Array<OrdersInterface> | [],
    product_id?: string,
    spread: number
  }