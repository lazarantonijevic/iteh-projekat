import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Footer.css"

export default function Footer() {
    const navigate = useNavigate()

    const goToTop = () => {
        window.scrollTo(0, 0)
      }
      

    return (
        <div className='Footer'>

            <div className='bottomborder'></div>

            <div className='Footer2'>
                <div>
                    <p className='FontStyleNav' id='nametag'>Projekat</p>
                </div>

                <div>
                    <p onClick={() => { navigate("/category/men-jeans/products") ; goToTop() }} id='shopmen' >Shop Men </p>

                    <div>
                        <p>Clothing Fashion</p>
                        <p>Winter</p>
                        <p>Summer</p>
                        <p>Formal</p>
                        <p>Casual</p>
                    </div>
                </div>

                <div>
                    <p onClick={() => { navigate("/category/women-tops/products") ; goToTop() }}>Shop Women</p>
                    <div>
                        <p>Clothing Fashion</p>
                        <p>Winter</p>
                        <p>Summer</p>
                        <p>Formal</p>
                        <p>Casual</p>
                    </div>
                </div>

                <div>
                    <p onClick={() => { navigate("/category/baby-wears/products") ; goToTop() }} id='baby' >Baby Collection</p>
                    <div>
                        <p>Clothing Fashion</p>
                        <p>Winter</p>
                        <p>Summer</p>
                        <p>Formal</p>
                        <p>Casual</p>
                    </div>
                </div>

                <div>
                    <p id='quick'>Quick Links</p>
                    <div>
                        <p>Track Your Order</p>
                        <p>Support</p>
                        <p>FAQ</p>
                        <p>Carrier</p>
                        <p>About</p>
                        <p>Contact Us</p>
                    </div>
                </div>

            </div>

            <div className='bottomborder'></div>

            <div className='Foote3'>
                <div>
                    <p>Copyright ©2023 All rights reserved</p>
                </div>
            </div>
        </div>
    )
}

