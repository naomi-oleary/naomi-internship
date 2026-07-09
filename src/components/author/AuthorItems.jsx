import React, { useEffect, useState } from "react";
import axios from 'axios';
import NftCard from "../UI/NftCard";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ items, loading, authorImage }) => {

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row authorItems__row">
              {loading ? (
                <Skeleton width="100px" height="72px" />
              ) : (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 author__nftCard--container">
                    <NftCard 
                      items={items} 
                      key={items.nftId} 
                      authorImage={authorImage}
                    />
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
