import React, { useState } from 'react'
import "./PaymentPage.css"
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { emptyCart } from '../../Redux/Cart/Action';

export default function PaymentPage() {
  const navigate = useNavigate()

  const data = useSelector((store) => store.cart.cart)

  const shippingAddress = useSelector((store) => store.shippingAddress.ShippingAddress)


  var totalPrice = 0;
  var fullPrice = 0;
  var numberOfItems = data.length

  for (var i = 0; i < data.length; i++) {
    totalPrice += (data[i].price.sp *  data[i].qty)
    fullPrice += (data[i].price.mrp *  data[i].qty)
  }

  const dispatch = useDispatch()
 

  const handleOrder = async () => {
    try {
      const orderUrl = "http://localhost:8080/api/order";

      const orderItems = data.map(item => ({
        itemId: item.id,
        itemPrice: item.price.sp,
        amount: item.qty
      }));

      const order = {
        items: orderItems,
        shippingAddress: shippingAddress
      };

      await axios.post(orderUrl, order)

      console.log("Order submitted successfully!");
      navigate("/");
      dispatch(emptyCart());
      toast.success("Order submitted successfully!");

    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Error submitting order. Please try again.");
    }
  };




  return (
    <div className='PaymentPageMain'>
      

      <div className='PaymentPageFlex'>

        <div className='PaymentDetailsDiv'>
          <div className='bankOfferDiv'>
            <div><p className='totolAmt'>Bank Offer</p></div>
            <div><p>10% off Instant Discount on Kotak Debit Cards on a min spend of RSD 3,000. TCA</p></div>
            <div><p className='redText'>Show more</p></div>
          </div>

          <div className='totolAmt chosePaymentopt'><p>Choose Payment Mode</p></div>

          <div className='PaymentModeSelectdiv'>
            <div className='MultiplePayOptions'>
              <div>
                <div><p>Cash On Delivery (Cash/Card/UPI)</p></div>

                <div><p>Credit/Debit Card</p></div>

                <div><p>PhonePe/Google Pay/Bhim/UPI</p></div>

                <div><p>PayTm/Payzapp/Wallets</p></div>

                <div><p>Net Banking</p></div>

              </div>
            </div>


            <div className='payOptionDetails'>
              <div>
                <div className='totolAmt paymentHeading'><p>Send order</p></div>

             
                <div><button onClick={handleOrder}>Send Now</button></div>

              </div>
            </div>
          </div>

          <div className='GiftCardDiv'>

            <div className='GiftCardDiv1d totolAmt'><p>Have a Gift Card?</p></div>

            <div className='GiftCardDiv2d redText'><p>APPLY GIFT CARD</p></div>

          </div>
        </div>

        <div className='ProductPricesDiv'>

{
  data.length !==0 ? <div className='ProductPricesDivInside' onClick={() => navigate("/cart")} >
  <div className='priceDiv'><p>PRICE DETAILS({numberOfItems} item)</p></div>

  <div className='ProductFlex'>
    <div><p>Total MRP</p></div>
    <div><p>${fullPrice}</p></div>
  </div>

  <div className='ProductFlex'>
    <div><p>Discount on MRP</p></div>
    <div className='greenText'><p>-${fullPrice - totalPrice}</p></div>
  </div>

  <div className='ProductFlex marginBtm'>
    <div><p>Convenience Fee  <span className='redText'> Know More</span> </p></div>
    <div><p><span className='LineonText'>$99</span> <span className='greenText'>FREE</span></p></div>
  </div>

  <div className='ProductFlex totolAmt'>
    <div><p>Total Amount</p></div>
    <div><p>${totalPrice}</p></div>
  </div>


</div> : 
<div className='ProductPricesDivInside'><p className='noCartDataFound totolAmt'>Your Cart is Empty</p></div>
}



{
  shippingAddress.length === undefined ? <div className='ShippingAddress'>
  <div className='totolAmt'><p>{shippingAddress.name}</p></div>

  <div><p>{shippingAddress.address}</p></div>

  <div><p>{shippingAddress.locality}</p></div>

  <div><p>{shippingAddress.city}</p></div>

  <div><p>{shippingAddress.state}</p></div>

  <div><p>{shippingAddress.pincode}</p></div>

  <div className='totolAmt'><p>{shippingAddress.mobile}</p></div>
</div> : 
<div className='ShippingAddress'><p className='noAddressFound totolAmt'>Shipping Address Not Found</p></div>
}

          
          
        </div>

      </div>
    </div>
  )
}
