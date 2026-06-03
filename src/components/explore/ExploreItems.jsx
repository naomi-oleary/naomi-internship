import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import NewItemsCountdownTimer from "../UI/NewItemsCountdownTimer";

const ExploreItems = () => {
  const [loading, setLoading] = useState(true);
  const [exploreItems, setExploreItems] = useState([]);

  const fetchExploreItems = async () => {
    try {
      const exploreItemData = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`);
      setExploreItems(exploreItemData.data);
    }
    catch (error) {
      console.error("Error fetching card data:", error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect (() => {
    fetchExploreItems();
  }, [])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems.map((exploreItems, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${exploreItems.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={exploreItems.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <NewItemsCountdownTimer item={exploreItems} expiryDate={exploreItems.expiryDate} key={exploreItems.id} />

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
                <img src={exploreItems.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{exploreItems.title}</h4>
              </Link>
              <div className="nft__item_price">{exploreItems.price}</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{exploreItems.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
