import { useState, useEffect, useContext } from 'react';
import { ReviewCard } from './ReviewCard';
import { Space, Spin, Form, Row, Col, Input, Button, Divider, Rate } from 'antd';
import axios from 'axios';
import { UserContext } from '../../context/UserContext/UserState';
import { DrawerContext } from './ReviewsDrawer';

export function ReviewForm(props) {
  const { isOpen, product, userReview, setUserReview } = props;
  const { userInfo } = useContext(UserContext);
  const { desc, review, setReview } = useContext(DrawerContext);
  const [reviewRating, setReviewRating] = useState(3);
  const [loading, setLoading] = useState(false);

  const postReview = async (inputs) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem('token'));
    const config = { headers: { 'Authorization': token } };
    const body = {
      rating: inputs['review-rating'],
      title: inputs['review-title'],
      commentary: inputs['review-commentary'],
    }
    const res = await axios.post(`https://backend-ecommerce-production-ce12.up.railway.app/products/reviews/${product._id}`, body, config);
    const review = res.data.reviews.find(i => i.user._id === userInfo._id);
    if (review) { setUserReview(review) }
    else { setUserReview(null) }
    setLoading(false);
  }

  if (review) return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Spin tip="Publicando" spinning={loading} >
        <h3>Tus reseñas</h3>
        <ReviewCard review={userReview} loading={loading} />
      </Spin>
    </Space>
  )

  if (!isOpen) return null;

  return (
    <>
      <Form layout='vertical'
        autoComplete="off"
        onFinish={(inputs) => postReview(inputs)}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='review-rating'
              label={<h3>Valoración general</h3>}
              rules={[{ required: true, message: 'Por favor, puntúa el producto.' }]}
            >
              <Rate allowHalf allowClear={true} tooltips={desc} onChange={setReviewRating} value={reviewRating} />
            </Form.Item>
            <Form.Item
              name='review-title'
              label={<h3>Añade un título</h3>}
              rules={[{ required: true, message: 'Por favor, escribe un título' }]}
            >
              <Input placeholder="¿Qué es lo más importante?" showCount={true} maxLength={80} />
            </Form.Item>
            <Form.Item
              name='review-commentary'
              label={<h3>Añadir una reseña escrita</h3>}
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 3 }} placeholder="¿Qué te ha gustado y qué no? ¿Para qué usaste este producto?" showCount={true} maxLength={255} />
            </Form.Item>
            <Button type="primary" htmlType="submit">Publicar reseña</Button>
          </Col>
        </Row>
      </Form>
      <Divider />
    </>
  )
}
