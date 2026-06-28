import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {

  const [loading, setLoading] = useState(true);
  const [topSellers, setTopSellers] = useState([]);

  const fetchTopSellersData = async () => {
    try {
      const topSellerData = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)
      setTopSellers(topSellerData.data);
    } 
    catch (error) {
      console.error("Error fetching Top Seller data:", error);
    }
    finally {
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
                    <li key={topSellers.authorId}>
                      <div className="author_list_pp">
                        <Link to={`/author/${topSellers.authorId}`}>
                        {loading
                          ? (<Skeleton width="50px" height="50px" borderRadius="50%" />)
                          : (<img
                              className="lazy pp-author"
                              src={topSellers.authorImage}
                              alt=""
                            />)
                        }
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${topSellers.authorId}`}>
                          {loading
                            ? (<Skeleton width="108px" height="18px"/>)
                            : (<>{topSellers.authorName}</>)
                          }
                        </Link>
                        <span>
                          {loading
                            ? (<Skeleton width="24px" height="16px"/>)
                            : (<>{topSellers.price}</>)
                          }
                        </span>
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
