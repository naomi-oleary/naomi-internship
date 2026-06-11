import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import NewItemsCarousel from '../UI/NewItemsCarousel';
import Skeleton from "../UI/Skeleton";

const NewItems = () => {

  const [loading, setLoading] = useState(true);
  const [newItems, setNewItems] = useState([]);


  const fetchNewItemsData = async () => {
    try {
      const newItemData = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
      setNewItems(newItemData.data);
      setLoading(false);
    }
    catch (error) {
      console.error("Error fetching card data:", error);
      setLoading(false);
    }
  }

  useEffect (() => {
    fetchNewItemsData();
  }, [])

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
                <Skeleton width="100px" height="72px" />
              ) : (
                <NewItemsCarousel className="newItems__carousel" items={newItems} key={newItems.id} expiryDate={newItems.expiryDate} isLoading={loading} />
              )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
