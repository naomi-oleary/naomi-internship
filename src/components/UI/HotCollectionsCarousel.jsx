import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Slider from "react-slick";

const Carousel = ({ items, loading }) => {

    const [slidesToShow, setSlidesToShow] = useState(4);

    useEffect(() => {
        const updateSlidesToShow = () => {
            if (window.innerWidth <= 550) {
                setSlidesToShow(1)
            } else if (window.innerWidth <= 768) {
                setSlidesToShow(2)
            }
            else {
                setSlidesToShow(4)
            }
            loading = false;
        }
        
        window.addEventListener('resize', updateSlidesToShow);
        updateSlidesToShow();


        return () => {
            window.removeEventListener('resize', updateSlidesToShow)
        }
    }, [])

    const sliderSettings = {
        dots: false, 
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        arrows: true 
    };

    return (
        <Slider {...sliderSettings} >
            {items.map((items, index) => (
                <div className="carousel-item" key={index}>
                    <div className="card" >
                        <div className="card-body">
                            <Link to={`/item-details/${items.nftId}`} key={items.nftId} >
                                <img src={items.nftImage} className="slide-img" alt="" />
                            </Link>
                        </div>
                        <div className="avatar">
                            <Link to={`/author/${items.authorId}`}>
                                <img className="avatar--img" src={items.authorImage} alt="" />
                            </Link>
                            <i className="fa fa-check"></i>
                        </div>
                        <div className="card-info">
                            <Link to="/explore">
                                <h4>{items.title}</h4>
                            </Link>
                            <span>ERC-{items.code}</span>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    )
  }

export default Carousel;