import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Skeleton from "../components/UI/Skeleton";

const Author = () => {

  const { authorId } = useParams();

  const [authorItems, setAuthorItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthors = async () => {
    try {
      const authorItemData = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
      console.log(authorItemData.data.items)
      setAuthorItems(authorItemData.data.items);
    }
    catch (error) {
      console.error("Error fetching author information:", error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect (() => {
    fetchAuthors();
  }, [authorId])

  console.log('authorItems state:', authorItems)
  return (
    <div id="wrapper">
      {loading ? (
        <Skeleton width="100px" height="72px" />
      ) : (
      authorItems.length > 0 ? (authorItems.map((item) => (
        <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {item.authorName}
                          <span className="profile_username">@{item.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {item.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{item.followers} followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                    <AuthorItems items={authorItems} key={authorItems.id} expiryDate={authorItems.expiryDate} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> 
      ))) : (
        <p>No author items found.</p>
      ))}
    </div>
  );
};

export default Author;
