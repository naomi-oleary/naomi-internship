import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Skeleton from "../components/UI/Skeleton";

const Author = () => {

  const { authorId } = useParams();
  const [authorItems, setAuthorItems] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAuthors = async () => {
    try {
      const authorItemData = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
      setAuthorItems(authorItemData.data);
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

  console.log(authorItems.nftCollection)

  return (
    <div id="wrapper">
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
                { loading ? (
                  <Skeleton width="200px" height="42px" />
                ) : 
                  (<div className="d_profile de-flex" key={authorItems.id} >
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorItems.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorItems.authorName}
                            <span className="profile_username">@{authorItems.tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {authorItems.address}
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
                        <div className="profile_follower">{authorItems.followers} followers</div>
                        <Link to="#" className="btn-main">
                          Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                {loading ? (
                  <Skeleton width="116px" height="24px" />
                ) : (
                authorItems.nftCollection && authorItems.nftCollection.length > 0 ? (
                  authorItems.nftCollection.map((nft) => (
                    <div className="de_tab tab_simple" key={nft.id}>
                        <AuthorItems items={nft} loading={loading} />
                    </div>
                  ))) : (
                  <div> none found </div>
                  )
                )}
              </div>

            </div>
          </div>
        </section>
      </div> 
    </div>
  );
};

export default Author;
