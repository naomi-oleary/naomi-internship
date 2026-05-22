import React from 'react';
import { Link } from "react-router-dom";
import Slider from "react-slick";

const Carousel = ({ items, isLoading }) => {

    if (isLoading) return <p>Loading...</p>;
    if (!items) return <p>No data found.</p>

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true 
    };
    return (
        <Slider {...sliderSettings} >
            {items.map(item => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
                    <div className="nft_coll">
                    <div className="nft_wrap">
                        <Link to="/item-details">
                        <img src={item.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                    </div>
                    <div className="nft_coll_pp">
                        <Link to="/author">
                        <img className="lazy pp-coll" src={item.authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                        <Link to="/explore">
                        <h4>{item.title}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
                    </div>
                    </div>
                </div>
        ))}
    </Slider>
    )
  }

export default Carousel;