import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import NftCard from "./NftCard";
import Skeleton from './Skeleton';


const NewItemsCarousel = ({ items, authorImage, loading }) => {
    const [slidesToShow, setSlidesToShow] = useState(4);

    const displayItems = loading
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
                {displayItems.map((items, index) => (
                    <div className="nft__card" key={index}>
                        {loading ? (
                            <Skeleton width="186px" height="400px" />
                        ) : (
                            <NftCard items={items} key={items.id} authorImage={items.authorImage} expiryDate={items.expiryDate} />
                        )}
                    </div>
                ))}
            </Slider>
        )
}

export default NewItemsCarousel;