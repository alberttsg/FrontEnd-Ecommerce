import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SearchResult.scss';
import axios from 'axios';

export default function SearchResult() {
  const [searchResult, setSearchResult] = useState([]);
  const { search } = useParams();

  useEffect(() => {
    const getProducts = async () => {
      await axios.get(`https://backend-ecommerce-production-ce12.up.railway.app/products/search/${search}`)
        .then(res => console.log(res.data));
    }
    getProducts();
  }, [search])

  return (
    <div className='search-container'>
      {searchResult.length > 0 ? searchResult.map((i, ind) =>
        <div className="product-container" key={ind}>
          {i.name}
          <img src={i.image} alt="" />
        </div>
      ) : <div className="no-results">No results found</div>}
    </div>
  );
};
