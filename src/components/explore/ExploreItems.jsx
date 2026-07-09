import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Skeleton from "../UI/Skeleton";
import NftCard from "../UI/NftCard";

const ExploreItems = () => {
  const [loading, setLoading] = useState(true);
  const [exploreItems, setExploreItems] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(8)
  const [filterValue, setFilterValue] = useState('');

  const loadMoreButton = () => {
    setCardsToShow((prevCount) => prevCount + 4);
  }

  const selectFilter = (event) => {
    setFilterValue(event.target.value)
  }

  const fetchExploreItems = async () => {
    try {
      const exploreItemData = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`);
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
  }, [filterValue])

  return (
    <>
      {loading
        ? <>
            <Skeleton width="200px" height="40px" borderRadius="4px" />
            <div className="skeleton__explore--layout">
              <Skeleton width="228px" height="442px" />
              <Skeleton width="228px" height="442px" />
              <Skeleton width="228px" height="442px" />
              <Skeleton width="228px" height="442px" />
              <Skeleton width="228px" height="442px" />
              <Skeleton width="228px" height="442px" />
              <Skeleton width="228px" height="442px" />
              <Skeleton width="228px" height="442px" />
            </div>
        </>
        : <div>
            <select id="filter-items" defaultValue={filterValue} onChange={selectFilter}>
              <option value="">Default</option>
              <option value="price_low_to_high">Price, Low to High</option>
              <option value="price_high_to_low">Price, High to Low</option>
              <option value="likes_high_to_low">Most liked</option>
            </select>
          </div>
      }
      {exploreItems.slice(0, cardsToShow).map((exploreItems, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        > 
          <NftCard items={exploreItems} key={exploreItems.id} expiryDate={exploreItems.expiryDate} />
        </div>
      ))}
      <div className="col-md-12 text-center">
        {cardsToShow < exploreItems.length && (
          <Link to="" id="loadmore" className="btn-main lead" onClick={loadMoreButton}>
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
