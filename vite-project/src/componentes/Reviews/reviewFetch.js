import axios from 'axios';

export async function getUserData(callback) {
  const token = JSON.parse(localStorage.getItem('token'));
  if (!token) return;
  const config = { headers: { 'Authorization': token } };
  const response = await axios.get('https://backend-ecommerce-production-ce12.up.railway.app/users/id/', config)
    .then(res => res.data)
  callback(response);
};

export async function postReview(inputs, product, callback) {
  const token = JSON.parse(localStorage.getItem('token'));
  const config = { headers: { 'Authorization': token } };
  const body = {
    rating: inputs['review-rating'],
    title: inputs['review-title'],
    commentary: inputs['review-commentary'],
  }
  const response = await axios.post(`https://backend-ecommerce-production-ce12.up.railway.app/products/reviews/${product._id}`, body, config)
    .then(res => res.data);
  callback(response);
}

export async function editReview(inputs, product, callback) {
  const token = JSON.parse(localStorage.getItem('token'));
  const config = { headers: { 'Authorization': token } };
  const body = {
    rating: inputs['review-rating'],
    title: inputs['review-title'],
    commentary: inputs['review-commentary'],
  }
  const response = await axios.put(`https://backend-ecommerce-production-ce12.up.railway.app/products/reviews/${product._id}`, body, config)
    .then(res => res.data);
  callback(response);
}

export async function deleteReview(product, callback) {
  const token = JSON.parse(localStorage.getItem('token'));
  const config = { headers: { 'Authorization': token } };
  const response = await axios.delete(`https://backend-ecommerce-production-ce12.up.railway.app/products/reviews/${product._id}`,config)
    .then(res => res.data);
  callback(response);
}

export function getUserReview(product, user, callback) {
  const userReview = product.reviews.find(rev => rev.user._id == user._id);
  callback(userReview);
}

export function getNonUserReviews(product, user, callback) {
  const reviews = product.reviews.filter(rev => rev.user._id != user._id);
  callback(reviews);
}