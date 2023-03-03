import { useEffect, useState } from 'react';
import { ReviewCard } from './ReviewCard';
import { postProductReview, getUserReview } from '../../logic/fetch';
import { Space, Spin, Form, Row, Col, Input, Button, Divider, Rate } from 'antd';

export function ReviewForm(props) {
  const { isOpen, product } = props;
  const [reviewRating, setReviewRating] = useState(3);
  const [hasReviewed, setUserReview] = useState();
  const [loading, setLoading] = useState(false);
  const desc = ['Pésimo', 'Malo', 'No está mal', 'Bueno', '¡Fantástico!']

  useEffect(() => {
    async function getData() {
      const getReview = await getUserReview(product);
      setUserReview(getReview.data);
    };
    getData();
  }, [])

  const postReview = async (inputs) => {
    setLoading(true);
    await postProductReview(product, inputs);
    const getReview = await getUserReview(product);
    setUserReview(getReview.data);
    setLoading(false);
  }

  if (!isOpen) return null;

  if (loading) return (
    <Space direction="vertical" style={{ width: '100%' }}>
        <Spin tip="Publicando">
          <h3>Tus reseñas</h3>
          <ReviewCard review={hasReviewed} loading={loading} />
        </Spin>
    </Space>
  )

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
