import React, { useState, useMemo, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import useWindowFocus from 'use-window-focus';
import OrderBookContext from "./OrderBookContext";
import { MARKET_XBT_USD, URL_WEB_SERVICE} from "../../environment/environment";
import { sortByHighPrice, sortByLowPrice, createOrders, updateOrders, getSubscribeUrl, getUnSubscribeUrl, sortByHighPriceOrders, sortByLowPriceOrders } from "../utils/helpers";
import { OrderReceivedInterface } from "../interfaces/Orders";

/**
 * OrderBook Provider
 *
 * Context with all props and functions to share in Order Book
 *
 * @author Mickael da Costa
 */

interface OrderBookProviderInterface {
  market?: string;
  children: React.ReactNode;
}

function OrderBookProvider({
  market = MARKET_XBT_USD,
  children,
}: OrderBookProviderInterface) {
  const [marketReference, setMarketReference] = useState(market);
  const [messageHistory, setMessageHistory] = useState([]);
  const [subscribeUrl, setSubscribeUrl] = useState(getSubscribeUrl(market))
  const [orders, setOrders] = useState<OrderReceivedInterface>({ bids: [], asks: [], spread: 0 });
  const setorderDebounce = debounce(setOrders, 3000);
  const windowFocused = useWindowFocus();


  const ws = useRef<WebSocket | null>(null);
  const [isPaused, setPause] = useState(false);

  useEffect(() => {
    const webService: WebSocket = new WebSocket(URL_WEB_SERVICE);

    ws.current = webService;
    ws.current.onopen = sendMessageWebService;
    ws.current.onclose = () => console.log("ws closed");

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      if (isPaused) return;
      const newOrders = JSON.parse(e.data);

      if(newOrders.bids) {
        setMessageHistory(msgs => msgs.concat(newOrders));
      }
    };
  }, [isPaused]);

  useEffect(() => {
    if(messageHistory.length > 0) {
      onMessage(messageHistory[messageHistory.length -1]);
    }
  }, [messageHistory]);

  useEffect(() => {
    setPause(!windowFocused);

    return () => {
      setPause(true);
    }
  }, [windowFocused]);

  useEffect(() => {

    if (ws?.current?.readyState !== 1) return;

    setMessageHistory([]);
    setorderDebounce({ bids: [], asks: [], spread: 0 });
    setSubscribeUrl(getSubscribeUrl(marketReference));
    sendMessageWebService();
    setPause(false);

  }, [marketReference])

/**
 * Messages Received by WebSocket
 *
 */
  const onMessage = ({ asks = [] , bids = [], product_id = '' }) => {
    if(orders.bids.length === 0 || orders.asks.length === 0) {
      const sortedAsks = sortByLowPrice(asks);
      const sortedBids = sortByHighPrice(bids);

      setOrders({
        bids: createOrders(sortedBids),
        asks: createOrders(sortedAsks),
        product_id,
        spread: 0
      })
    }
    else {
      const updadedBids = updateOrders(orders.bids, bids);
      const updatedAsks = updateOrders(orders.asks, asks);

      
      const bidsSorted = sortByHighPriceOrders(updadedBids);
      const asksSorted = sortByLowPriceOrders(updatedAsks);
      const spread : number = parseInt(bidsSorted[bidsSorted.length -1].price) - parseInt(asksSorted[asksSorted.length - 1].price);

      setorderDebounce({
        bids: bidsSorted,
        asks: asksSorted,
        product_id,
        spread,
      })
    }
  };

  function sendMessageWebService() {
    ws.current?.send(subscribeUrl);
  }

  function unsubscribeWebservice(unsubscribeUrl: string) {
    ws.current?.send(unsubscribeUrl);
  }

  function changeService(market: string = marketReference) {
    setPause(true);
    unsubscribeWebservice(getUnSubscribeUrl(marketReference));
    setMarketReference(market);
  }

  function closeWebSocket() {
    ws.current?.close();
  }

  const stateMemo = useMemo(() => {
    return {
      market: marketReference,
      changeMarket: setMarketReference,
      closeService: closeWebSocket,
      changeService: changeService,
      orders: orders
    };
  }, [marketReference, orders]);

  return (
    <OrderBookContext.Provider value={stateMemo}>
      {children}
    </OrderBookContext.Provider>
  );
}

export default OrderBookProvider;
