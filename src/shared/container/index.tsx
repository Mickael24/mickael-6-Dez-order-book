import { OrderBookProvider } from "../context";
import OrderBookContainer from "./OrderBook";

const ConnectedOrderBook = () => {
  return (
    <OrderBookProvider>
      <OrderBookContainer />
    </OrderBookProvider>
  );
};

export default ConnectedOrderBook;
