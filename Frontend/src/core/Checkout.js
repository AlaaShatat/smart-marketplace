import React, { useState, useEffect } from 'react';
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import { getPurchaseHistory } from '../user/apiUser';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

// import "braintree-web"; // not using this package
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: '',
        shipping: 0,
        govern:'',
        phone:0,
        comment:''
    });
    const [history, setHistory] = useState([]);

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
                setData({ ...data, error: data.error });
            } else {
                console.log(data);
                setData({ clientToken: data.clientToken });
                setData({ shipping: 0 });
            }
        });
    };
    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };
    useEffect(() => {
        getToken(userId, token);
        init(userId, token);
    }, []);
    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'cairo', text: 'Cairo'},
        {value: 'giza', text: 'Giza'},
        {value: 'alex', text: 'Alex'},
        {value: 'aswan', text: 'Aswan'}
      ];
    
      const [selected, setSelected] = useState(options.value);
    
      const handleShipping = event => {
        console.log(event.target.value);
        if (event.target.value === "cairo") setData({ ...data, shipping: 5});
        else if (event.target.value === "giza") setData({ ...data, shipping: 6});
        else if (event.target.value === "alex") setData({ ...data, shipping: 8});
        else if (event.target.value === "aswan") setData({ ...data, shipping: 9});
        else setData({ ...data, shipping: 0});
        
      };

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const handleNumber = event => {
        setData({ ...data, phone: event.target.value });
    };

    const handleComment = event => {
        setData({ ...data, comment: event.target.value });
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue,shipping) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    let deliveryAddress = data.address;
    let deliveryPhone = data.phone;
    let deliveryComment = data.comment;
    let deliveryShipping = getTotal(products) > 50 ? 0 : data.shipping;
    let discount = history.length > 10 ? -2 : 0;
        
    const buy = () => {
        setData({ loading: true });
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                // console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
                // and also total to be charged
                // console.log(
                //     "send nonce and total to process: ",
                //     nonce,
                //     getTotal(products)
                // );
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products) + deliveryShipping + discount
                };

                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response);
                        // empty cart
                        // create order

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress,
                            phone: deliveryPhone,
                            comment: deliveryComment
                        };

                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    setRun(!run); // run useEffect in parent Cart
                                    console.log('payment success and empty cart');
                                    setData({
                                        loading: false,
                                        success: true
                                    });
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    };
    const buyCash = () => {
        setData({ loading: true });
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        const createOrderData = {
            products: products,
            shipping: true,
            amount: getTotal(products) + deliveryShipping + discount,
            address: deliveryAddress,
            phone: deliveryPhone,
            comment: deliveryComment
        };

        createOrder(userId, token, createOrderData)
            .then(response => {
                emptyCart(() => {
                    setRun(!run); // run useEffect in parent Cart
                    console.log('payment success and empty cart');
                    setData({
                        loading: false,
                        success: true,
                        shipping:0
                    });
                });
            })
            .catch(error => {
                console.log(error);
                setData({ loading: false });
            });
            
    
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <div>
                            <label className="mr-2">Select governorate </label>
                            <select value={selected} defaultValue={''} onChange={handleShipping}>
                            {options.map(option => (
                            <option key={option.value} value={option.value}>
                            {option.text}
                            </option>
                            ))}
                            </select>
                        </div>
                            <label className="text-muted">Delivery address:</label>
                            <textarea
                                onChange={handleAddress}
                                className="form-control mb-4"
                                value={data.address}
                                placeholder="Type your delivery address here..."
                                required
                            />
                            
                            <label className="text-muted">Phone Number:</label>
                            <textarea
                                onChange={handleNumber}
                                className="form-control mb-4"
                                value={data.phone}
                                placeholder="Type your phone number here..."
                                required
                            />
                            
                            <label className="text-muted">Comments:</label>
                            <textarea
                                onChange={handleComment}
                                className="form-control mb-4"
                                value={data.comment}
                                placeholder="Add any further comments..."
                            />
                    </div>
                        

                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance => (data.instance = instance)}
                        placeholder= "alaa"
                    />
                    <button onClick={buy} className="btn btn-success btn-block">
                        Pay using credit
                    </button>
                    <button onClick={buyCash} className="btn btn-success btn-block">
                        Pay cash
                    </button>
                </div>
            ) : null}
        </div>
    );

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks! Successful Order!
        </div>
    );

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;
    
    
    return (
        <div>
            <h2> {deliveryShipping == 0 && getTotal(products) > 50? "Enjoy your free shipping!": "" } </h2>
            <h2> {discount != 0? "Congrats! you are a special customer, enjoy your $2 discount!": "" } </h2>
            <h2>Total: ${getTotal() ==0? 0 : getTotal() + deliveryShipping + discount }</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        
        </div>
    );
};

export default Checkout;
