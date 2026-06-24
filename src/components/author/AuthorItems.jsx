import React, { useEffect, useState } from "react";
import axios from 'axios';
import NftCard from "../UI/NftCard";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ( items, loading ) => {

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              {loading ? (
                <Skeleton width="100px" height="72px" />
              ) : (
                <NftCard items={items} key={items.nftId} expiryDate={items.expiryDate} />
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
