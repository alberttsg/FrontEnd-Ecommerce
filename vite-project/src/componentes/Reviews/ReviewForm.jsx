import axios from 'axios';
import { useState } from 'react';
import { Form, Row, Col, Input, Button, Divider, Rate } from 'antd';

export function ReviewForm(props) {
  const desc = ['Pésimo', 'Malo', 'No está mal', 'Bueno', '¡Fantástico!'];
  const { isOpen, product } = props;
  const [reviewRating, setReviewRating] = useState(3);


  const postReview = async (inputs) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = { headers: { 'Authorization': token } };
    const body = {
      rating: inputs['review-rating'],
      title: inputs['review-title'],
      commentary: inputs['review-commentary'],
    }
    await axios.post(`https://backend-ecommerce-production-ce12.up.railway.app/products/reviews/${product._id}`, body, config);
  }

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
