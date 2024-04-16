import {useState,useEffect,memo,useCallback} from "react";
const data = [
    {
        id:1,
        img:"https://cdn.pixabay.com/photo/2022/08/16/04/52/jewel-7389356_640.jpg",
        title:"Diamond Ring",
        price:20000,
        qty:1
    },
    {
        id:2,
        img:"https://cdn.pixabay.com/photo/2016/09/15/07/05/ring-1671094_640.jpg",
        title:"Gold Ring",
        price:10000,
        qty:1
    },
    {
        id:3,
        img:"https://cdn.pixabay.com/photo/2013/04/03/19/28/rings-100181_640.jpg",
        title:"Wooden Ring",
        price:5000,
        qty:1
    }
]
const SingleItem = memo(({id,img,title,price,qty,updateCart}) => {
    console.log("App > ShoppingCart > SingleItem");
    if(qty <= 0){
        return false;
    }
    return(
        <div className="row my-2 align-items-center text-center border-bottom pb-3">
            <div className="col">
                <img width="150px" className="rounded" src={`${img}`} alt={`${title}`} />
            </div>
            <div className="col"><h4>{title}</h4></div>
            <div className="col">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={() => updateCart(id,"INCDEC",-1)} className="btn btn-primary">-</button>
                    <button type="button" className="btn btn-primary">{qty}</button>
                    <button type="button" onClick={() => updateCart(id,"INCDEC",1)} className="btn btn-primary">+</button>
                </div>
            </div>
            <div className="col"><b>₹{qty*price}</b></div>
            <div className="col"><button type="button" onClick={() => updateCart(id,"DEL")} className="btn btn-danger">DEL</button></div>
        </div>
    )
})
const cartCalculation = (cartData) => {
    return cartData.reduce((prev,cur) => {
        let {qty,price} = cur;
        prev.totalCount += qty;
        prev.totalAmount += qty * price;
        return prev;
    },{totalCount:0,totalAmount:0});
}
const initialState = {data:[],totalCount:0,totalAmount:0}
const ShoppingCart = () => {
    console.log("App > ShoppingCart");
    const [items,chItems] = useState(initialState);
    useEffect(() => {
        chItems(old => {
            const {totalCount,totalAmount} = cartCalculation(data);
            return {data,totalCount,totalAmount}
        });
    },[]);
    const updateCart = useCallback((id,action,quantity) => {
        switch(action){
            case "INCDEC":
                chItems(old => {
                    let updatedData = old.data.map(obj => obj.id === id ? {...obj,qty:obj.qty+quantity}:obj);
                    return {data:updatedData,...cartCalculation(updatedData)}
                });
            break;
            case "DEL":
                chItems(old => {
                    let updatedData = old.data.filter(obj => obj.id !== id);
                    return {data:updatedData,...cartCalculation(updatedData)}
                });
            break;
            case "RESET":
                chItems(old => {
                    const {totalCount,totalAmount} = cartCalculation(data);
                    return {data,totalCount,totalAmount}
                });
            break;
            case "CLEAR":
                chItems(initialState);
            break;
            default:
                alert("thats not possible to alert this.");
        }
    },[]);
    return(
        <div className="container my-3">
            <div className="row py-2 text-bg-primary justify-content-between align-items-center">
                <div className="col-md-4">
                    <h2>Shopping Cart</h2>
                </div>
                <div className="col-md-4 text-end">
                    <button type="button" className="btn btn-dark position-relative me-3">Cart
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-light">{items.totalCount}</span>
                    </button>
                </div>
            </div>
            {items.data.map(itm => <SingleItem key={itm.id} {...itm} updateCart={updateCart} />)}
            <div className="row my-3">
                <div className="col-md-5 ms-auto text-center">
                    <h5>Cart total: ₹{items.totalAmount}</h5>
                    <button type="button" onClick={() => updateCart(null,"RESET")} className="btn btn-success me-3">Reset All</button>
                    <button type="button" onClick={() => updateCart(null,"CLEAR")} className="btn btn-danger">Clear All</button>
                </div>
            </div>
        </div>
    )
}
export default ShoppingCart;