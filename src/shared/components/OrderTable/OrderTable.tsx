import { Fragment } from "react";
import styles from "./OrderTable.module.css";
import { OrderTableColumn, OrdersInterface } from "../../interfaces/Orders";
import OrderColumn from "./OrderColumn";

interface OrderTableInterface {
    columns: Array<OrderTableColumn> | [],
    orders: Array<OrdersInterface> | [],
}

function OrderTable({ columns = [], orders = [] }: OrderTableInterface) {
    return (
        <div className={styles.table}>
            {
                columns.map((column) => {
                    return (
                        <Fragment key={column.key}>
                            <h2 className={styles.nameColumn}>{column.title}</h2>
                        </Fragment>
                    )
                })
            }
            <OrderColumn columns={columns || []} orders={orders} />
        </div>
    )
}

export default OrderTable;