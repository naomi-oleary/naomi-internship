import React, { useEffect, useState } from "react";
import axios from 'axios';
import NftCard from "../UI/NftCard";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ( authorItems ) => {

  const [authorItemsById, setAuthorItemsById] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthorsById = async () => {
    try {
      const authorItemData = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/${authorItemsById.authorId}`)
      setAuthorItemsById(authorItemData.data);
      console.log(authorItemData.data)
    }
    catch (error) {
      console.error("Error fetching author information:", error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect (() => {
    fetchAuthorsById();
  }, [])

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={authorItemsById.id}>
              {loading ? (
                <Skeleton width="100px" height="72px" />
              ) : (
                <NftCard items={authorItemsById} key={authorItemsById.id} expiryDate={authorItemsById.expiryDate} />
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
