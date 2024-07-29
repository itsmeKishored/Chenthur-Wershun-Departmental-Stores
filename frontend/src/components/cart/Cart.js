import { Fragment } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decreaseCartItemQty, increaseCartItemQty,removeItemFromCart} from '../../slices/cartSlice';
import { toast } from 'react-toastify';

export default function Cart() {
    const {items } = useSelector(state => state.cartState)
    const { isAuthenticated, user } = useSelector(state => state.authState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const increaseQty = (item) => {
        const count = item.quantity;
        if(item.stock ===0 ||  count >= item.stock) return;
        dispatch(increaseCartItemQty(item.product))
    }
    const decreaseQty = (item) => {
        const count = item.quantity;
        if(count === 1) return;
        dispatch(decreaseCartItemQty(item.product))
    }

    const checkoutHandler = () =>{
        //navigate('/login?redirect=shipping')
        // let message = 'Hi I want to order some products :\nOrder Details:\n';
        let message = `Hi I am ${user.name}, I want to order some products:\nOrder Details:\n`;
        items.forEach((item, index) => {
            const { name, quantity, price } = item;
            message += `${index + 1}. ${name}: ${quantity} x ₹${price} = ₹${quantity * price}\n`;
        });
        
        // items.forEach((item, index) => {
            //     const { name, quantity } = item;
            //     message += `${index + 1}. ${name}: ${quantity}\n`;
            // });
            // var price={items.reduce((acc, item)=>(acc + item.quantity * item.price), 0)}
            // items.forEach((item,index)=>{
                
                //     price+=item.price
                // })
        const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        message += `\nTotal price: ₹${totalPrice}\n`;
        console.log(items.length)
        console.log(items)
        console.log(message)
        const phoneNumber = '916374389691';
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url);
        //dispatch(createOrder({ user: user._id, items, totalPrice }));
        
        //toast.success("order successfully "+items.length)
        // const message='i want to buy things '
        // const phoneNumber = '916374389691'; // Replace with your phone number
        // const encodedMessage = encodeURIComponent(message);
        //  const url = `https://wa.me/${phoneNumber}?text=${message}`;
        //  window.location.href = url;
    }


    return (
        <Fragment>
            {items.length===0 ? 
                <h2 className="mt-5">Your Cart is Empty</h2> :
                <Fragment>
                     <h2 className="mt-5">Your Cart: <b>{items.length} items</b></h2>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {items.map(item => (
                                <Fragment key={item.product}>
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt={item.name} height="90" width="115"/>
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">₹ {item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                                                    <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                    <span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" onClick={() => dispatch(removeItemFromCart(item.product))} className="fa fa-trash btn btn-danger"></i>
                                            </div>

                                        </div>
                                    </div>
                                </Fragment>
                                )
                            )
                            }

                         
                            <hr />
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{items.reduce((acc, item)=>(acc + item.quantity), 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">₹ {items.reduce((acc, item)=>(acc + item.quantity * item.price), 0)}</span></p>
                
                                <hr />
                                <button id="checkout_btn" onClick={checkoutHandler} className="btn btn-primary btn-block">Check out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
           
        </Fragment>
    )
}