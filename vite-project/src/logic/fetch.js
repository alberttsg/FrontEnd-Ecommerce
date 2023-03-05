import axios from 'axios';

export async function getOverallRating(productId) {
  const getRating = await axios.get(`https://backend-ecommerce-production-ce12.up.railway.app/reviews/rating/${productId}`);
  return getRating.data;
}

export async function getProductReviews(productId) {
  const res = await axios.get(`https://backend-ecommerce-production-ce12.up.railway.app/reviews/id/${productId}`);
  return res.data;
}

export async function getUserReview(productId) {
  const res = await axios.get(`https://backend-ecommerce-production-ce12.up.railway.app/reviews/all/${productId}`);
  return res.data;
}

export async function postProductReview(productId, inputs) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNmN2RhZTU3OGRhNWJkNGRhNmRkYzhhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc3ODU1MjE0LCJleHAiOjE2Nzc5NDE2MTR9.C9ZmHNpi96oSDtxDlE3gZb_cIbl_GtVE03J8fy51ujg'
    }
  };
  const body = {
    rating: inputs['review-rating'],
    title: inputs['review-title'],
    commentary: inputs['review-commentary'],
  };
  const res = await axios.post(`https://backend-ecommerce-production-ce12.up.railway.app/reviews/id/${productId}`, body, config);
  return res;
}