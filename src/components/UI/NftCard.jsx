import React from "react";
import { Link } from "react-router-dom";
import NewItemsCountdownTimer from "./NewItemsCountdownTimer";
import Skeleton from "./Skeleton";
import AOS from 'aos';
import 'aos/dist/aos.css';

const NftCard = ({ items, authorImage, loading }) => {
    
    AOS.init({
        duration: 800
    });

    return (
        <> 
            { loading ? (
                <Skeleton width="228px" height="442px" />
            ) : (
            <div data-aos="fade" className="nft__item author__nftCard" key={items.id}>
                    <div className="author_list_pp">
                        <Link to={`/author/${items.authorId}`}>
                        <img className="lazy" src={items.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        </Link>
                    </div>
                    <div className="newItems__countdownTimer">
                        {items.expiryDate ? (
                            <NewItemsCountdownTimer expiryDate={items.expiryDate} />
                        ) : (
                            <span></span>
                        )}
                    </div>
                    <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                                <button>Buy Now</button>
                                <div className="nft__item_share">
                                    <h4>Share</h4>
                                    <button href="" target="_blank" rel="noreferrer">
                                        <i className="fa fa-facebook fa-lg"></i>
                                    </button>
                                    <button href="" target="_blank" rel="noreferrer">
                                        <i className="fa fa-twitter fa-lg"></i>
                                    </button>
                                    <button href="">
                                        <i className="fa fa-envelope fa-lg"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Link to={`/item-details/${items.nftId}`}>
                            <img
                                src={items.nftImage}
                                className="lazy nft__item_preview"
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="nft__item_info">
                        <Link to="/item-details">
                            <h4>{items.title}</h4>
                        </Link>
                        <div className="nft__item_price">{items.price}</div>
                        <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{items.likes}</span>
                        </div>
                    </div>
                </div>
                )
            }
        </>
    );
};

export default NftCard;