import React from "react";
import { OrderReceivedInterface } from "../interfaces/Orders";

/**
 * OrderBook Context
 *
 * Context with all props and functions to share in Order Book
 *
 * @author Mickael da Costa
 */

export interface OrderBookContextInterface {
    closeService:() => void,
    changeService: (market: string) => void,
    market: string,
    orders: OrderReceivedInterface
}

export default React.createContext<OrderBookContextInterface | null>(null);
