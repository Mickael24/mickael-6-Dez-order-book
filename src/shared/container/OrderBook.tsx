import React, { useContext } from "react";
import styles from "./OrderBook.module.css";
import Header from "../components/Header";
import Table from "../components/OrderTable";
import { OrderBookContext } from "../context";
import { OrderTableColumn } from "../interfaces/Orders";
import { MARKET_ETH_USD, MARKET_XBT_USD} from "../../environment/environment";

const Order_BID = "bids";
const Order_asks = "asks";

const OrderBookContainer = () => {
    const context = useContext(OrderBookContext);

    function getColumnsOrderBook(isBids: boolean = true): Array<OrderTableColumn> {
        const columnsOrderBook: Array<OrderTableColumn> = [
            {
                id:"total_order",
                key: "total",
                title: "TOTAL",
                className: styles.total,
            },
            {
                id:"size_order",
                key: "size",
                title: "SIZE",
                className: styles.size,
            },
            {
                id:"price_order",
                key: "price",
                title: "PRICE",
                className: isBids ? styles.price_bids : styles.price_asks,
            }
        ]
        return isBids ? [...columnsOrderBook] : [...columnsOrderBook].reverse();
    }

    function changeMarket() {
        context?.market === MARKET_XBT_USD ? context?.changeService(MARKET_ETH_USD) : context?.changeService(MARKET_XBT_USD);
    }

    return (
        <div className={styles.container}>
            <Header spread={context?.orders.spread || 0} market={context?.market || MARKET_XBT_USD}/>
            <div className={styles.tables}>
                <Table columns={getColumnsOrderBook()} orders={context?.orders[Order_BID] || []}/>
                <Table columns={getColumnsOrderBook(false)} orders={context?.orders[Order_asks] || []}/>
            </div>
            <footer className={styles.footer}>
                <button className={styles.toogleButton} onClick={() => changeMarket()}> Toogle Feed </button>
            </footer>
        </div>
    )
}

export default OrderBookContainer;