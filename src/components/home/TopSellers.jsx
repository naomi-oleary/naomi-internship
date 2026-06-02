import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = ({ isLoading }) => {

  const [loading, setLoading] = useState(true);
  const [topSellers, setTopSellers] = useState([]);

  const displayItems = isLoading
    ? new Array(12).fill({ authorId: '', authorImage: '', authorName: '', id: '', price: ''})
    : topSellers;

  const fetchTopSellersData = async () => {
    try {
      const topSellerData = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)
      setTopSellers(topSellerData.data);
      setLoading(false);
    } 
    catch (error) {
      console.error("Error fetching Top Seller data:", error);
      setLoading(false);
    }
  }

  useEffect (() => {
    fetchTopSellersData();
  }, [])

  return (
        <section id="section-popular" className="pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <h2>Top Sellers</h2>
                  <div className="small-border bg-color-2"></div>
                </div>
              </div>
              <div className="col-md-12">
                <ol className="author_list">
                  {topSellers.map((topSellers, index) => (
                    <li className={`${isLoading ? 'skeleton-box' : ''}`} key={topSellers.authorId}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-author"
                            src={topSellers.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${topSellers.authorId}`}>{topSellers.authorName}</Link>
                        <span>{topSellers.price}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
  );
};

export default TopSellers;
