import React from 'react'
import "./LandingPage.css"
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { googleLogin } from '../../Redux/LoginUserData/Action';


import SimpleImageSlider from "react-simple-image-slider";

export default function LandingPage() {

  const images = [
    { url: "https://sslimages.shoppersstop.com/sys-master/root/h67/he6/27614151180318/women_carousel-web.jpg" },
    { url: "https://sslimages.shoppersstop.com/sys-master/root/hef/h2c/27608381587486/footwear_carousel-web.jpg" },
    { url: "https://sslimages.shoppersstop.com/sys-master/root/hbe/h36/27608381849630/private_carousel-web.jpg" },
    { url: "https://sslimages.shoppersstop.com/sys-master/root/hff/hcd/27599340339230/Denim-Fest-Main-Banner-Web.jpg" },
  ];
 

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const user = JSON.parse(urlParams.get('user'));
    const token = urlParams.get('token');

    if (user && token) {
      dispatch(googleLogin(user, token));
      urlParams.delete('user');
      urlParams.delete('token');
      const newUrl = `${window.location.pathname}${urlParams.toString()}`;
      window.history.replaceState(null, '', newUrl);
    }
  }, [dispatch, location.search]);

  return (
    <div className='LandingPage'>
      <div>
        <SimpleImageSlider
          width={"100%"}
          height={450}
          images={images}
          showBullets={false}
          showNavs={false}
          autoPlay={true}
        />
      </div>

    </div>
  )
}
