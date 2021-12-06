import { Fragment } from "react";
import {OrdersInterface, OrderTableColumn} from "../../../interfaces/Orders";
import styles from "./OrderColumn.module.css";
import classnames from "classnames";


interface OrderColumnInterface {
    orders: Array<OrdersInterface> | [],
    columns: Array<OrderTableColumn> | [],
}

function OrderColumn({ orders = [], columns = []}: OrderColumnInterface) {
    return (
        <Fragment>
            {
                orders.map((order) => {
                    return (
                        <Fragment key={order["price"]}>
                            {
                                columns.map((column: OrderTableColumn) => {
                                    return (
                                        <span className={classnames(styles.column, column.className)}>{order[column.key as keyof OrdersInterface]}</span>
                                    )
                                })
                            }
                        </Fragment>
                    )
                })
            }
        </Fragment>
    )
}

export default OrderColumn;