import { useState, useEffect } from 'react';
import { ReviewForm } from './ReviewForm';
import { UserReviews } from './UserReviews';
import { Rate, Drawer, Space, Button, Spin } from 'antd';
import { ReviewCard } from './ReviewCard';
import axios from 'axios';

export function ReviewsDrawer(props) {
  const { product, isOpen, toClose } = props;
  const [isFormOpen, setFormOpen] = useState(false);
  const [userId, setUserId] = useState();
  const [userReview, setUserReview] = useState();

  useEffect(() => {
    async function getData() {
      const token = JSON.parse(localStorage.getItem('token'));
      const config = { headers: { 'Authorization': token } };
      await axios.get('https://backend-ecommerce-production-ce12.up.railway.app/users/id/', config)
        .then(res => res.data._id)
        .then(set => setUserId(set))
        .catch(e => setUserId())
    };
    getData();
  }, [])

  useEffect(() => {
    if (!product.reviews) return;
    const review = product.reviews.find(i => i.user._id == userId);
    setUserReview(review);
  }, [userId])

  const openForm = () => {
    setFormOpen(true);
  };

  const onFormClose = () => {
    setFormOpen(false);
  };

  return (
    <Drawer title={<DrawerTitle product={product} />}
      width={720}
      onClose={toClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
      closable={false}
      extra={
        <Space>
          {!userReview &&
            <Button onClick={isFormOpen ? onFormClose : openForm} type="primary">{isFormOpen ? 'Cancelar' : 'Publicar reseña'}</Button>
          }
          <Button onClick={toClose} type="primary">Cerrar</Button>
        </Space>
      }
    >
      {userReview &&
        <Space direction="vertical" style={{ width: '100%' }}>
          <Spin tip="Publicando" spinning={false} >
            <h3>Tus reseñas</h3>
            <ReviewCard review={userReview} loading={false} />
          </Spin>
        </Space>}
      <ReviewForm isOpen={isFormOpen} product={product} />
      <UserReviews product={product} />
    </Drawer>
  )
}

function DrawerTitle(props) {
  const { product } = props;
  const { overallRating } = product;
  const desc = ['Pésimo', 'Malo', 'No está mal', 'Bueno', '¡Fantástico!'];

  return (
    <div>
      <span>Reseñas de usuarios</span>
      <Rate style={{ marginLeft: '20px' }} allowHalf disabled value={product.overallRating} />
      <span className="ant-rate-text"><em>{overallRating == 0 ? 'Sin reseñas' : desc[Math.floor(overallRating) - 1]}</em></span>
    </div>
  )
}