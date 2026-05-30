import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import NewItemsCountdownTimer from './NewItemsCountdownTimer';

const NewItemsCarousel = ({ items, isLoading }) => {
    const [slidesToShow, setSlidesToShow] = useState(4);

    const displayItems = isLoading
        ? new Array(4).fill({ id: '', authorId: '', authorImage: '', nftImage: '', nftId: '', title: '', price: '', likes: '', expiryDate: '' })
         : items;
    
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
                {displayItems.map((item, index) => (
                    <div className="nft__card" key={index}>
                        <div className="nft__item">
                            <div className="author_list_pp">
                                <Link
                                to="/author"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Creator: Monica Lucas">
                                    <img className="author__img lazy" src={item.authorImage} alt="" />
                                    <i className="fa fa-check"></i>
                                </Link>
                            </div>

                            <NewItemsCountdownTimer item={item} key={item.id}/>

                            <div className="nft__item_wrap">
                                <div className="nft__item_extra">
                                    <div className="nft__item_buttons">
                                        <button>Buy Now</button>
                                        <div className="nft__item_share">
                                        <h4>Share</h4>
                                        <a href="" target="_blank" rel="noreferrer">
                                            <i className="fa fa-facebook fa-lg"></i>
                                        </a>
                                        <a href="" target="_blank" rel="noreferrer">
                                            <i className="fa fa-twitter fa-lg"></i>
                                        </a>
                                        <a href="">
                                            <i className="fa fa-envelope fa-lg"></i>
                                        </a>
                                        </div>
                                    </div>
                                </div>

                                <Link to="/item-details">
                                <img
                                    src={item.nftImage}
                                    className="lazy nft__item_preview"
                                    alt=""
                                />
                                </Link>
                            </div>
                            <div className="nft__item_info">
                                <Link to="/item-details">
                                <h4>{item.title}</h4>
                                </Link>
                                <div className="nft__item_price">{item.price}</div>
                                <div className="nft__item_like">
                                <i className="fa fa-heart"></i>
                                <span>{item.likes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        )
}

export default NewItemsCarousel;