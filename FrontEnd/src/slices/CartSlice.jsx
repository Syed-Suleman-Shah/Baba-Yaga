import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    products:[]
}

const CartSlice =createSlice({
    name : 'products',
    initialState,
    reducers : {
        addToCart(state, action){
            const newItem = action.payload;
            const itemIndex = state.products.find((item) => item.id === newItem.id)
            if(itemIndex){
                itemIndex.quantity++;
                itemIndex.totalPrice += newItem.price
            }
            else{
                state.products.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    image: newItem.image

                })
            }
            state.totalPrice += newItem.price;
            state.totalQuantity++;
        }
        },
})

export const {addToCart} = CartSlice.actions;
export default CartSlice.reducer;