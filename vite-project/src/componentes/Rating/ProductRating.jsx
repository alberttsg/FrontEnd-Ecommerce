import { useEffect, useState } from 'react';
import { Rate, Drawer, Skeleton, Space, Button, Form, Row, Col, Input, Divider, Card, Avatar, Table } from 'antd';

const customReview = {
  user: {
    name: 'Pepe el enfadao',
    avatar: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'
  },
  title: 'Este producto es una mierda',
  rating: 2,
  commentary: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis quo animi blanditiis possimus doloremque. Quos ullam odit, recusandae modi possimus voluptatum. Quas eveniet laudantium consectetur magnam iure ad enim voluptatem.'
}

export function ProductRating(props) {
  const { product } = props;
  const [overallRating, setOverallRating] = useState(3);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const desc = ['Pésimo', 'Malo', 'No está mal', 'Bueno', '¡Fantástico!']
  const loading = false;

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  const openForm = () => {
    setFormOpen(true);
  };

  const onFormClose = () => {
    setFormOpen(false);
  };


  return (
    <>
      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '-20px' }} onClick={openDrawer} >
        <Rate disabled allowHalf value={overallRating} />
      </span>
      <Drawer
        title={
          <>
            <span>Reseñas de usuarios</span>
            <Rate style={{ marginLeft: '20px' }} allowHalf disabled value={overallRating} />
            {overallRating ? <span className="ant-rate-text"><em>{desc[Math.floor(overallRating) - 1]}</em></span> : ''}
          </>
        }
        width={720}
        onClose={onDrawerClose}
        open={isDrawerOpen}
        bodyStyle={{ paddingBottom: 80 }}
        closable={false}
        extra={
          <Space>
            <Button onClick={isFormOpen ? onFormClose : openForm} type="primary">{isFormOpen ? 'Cancelar' : 'Publicar reseña'}</Button>
            <Button onClick={onDrawerClose} type="primary">Cerrar</Button>
          </Space>
        }
      >
        <ReviewForm open={isFormOpen} />
        <UserReviews />
      </Drawer>
    </>
  )
}

export function ReviewForm(props) {
  const { open } = props;
  const [reviewRating, setReviewRating] = useState(3);
  const desc = ['Pésimo', 'Malo', 'No está mal', 'Bueno', '¡Fantástico!']

  if (!open) return null;

  return (
    <>
      <Form layout='vertical'
        autoComplete="off"
        onFinish={(e) => console.log(e)}
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

export function UserReviews(props) {
  const [userReview, setUserReview] = useState(customReview);

  return (
    <Space direction='vertical' style={{ display: 'flex' }} >
      <Table
        showHeader={false}
      />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
    </Space>
  )
}

export function ReviewCard(props) {
  const { review } = props;
  const { user, rating, title, commentary } = review;
  const loading = false;
  const desc = ['Pésimo', 'Malo', 'No está mal', 'Bueno', '¡Fantástico!']

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }} >
          {loading ?
            <Skeleton.Avatar shape='circle' active style={{ marginRight: '20px' }} size='medium' />
            :
            <Avatar shape='circle' style={{ margin: '0 20px 0 0' }} size='medium' src={user.avatar} />
          }
          <Skeleton active title={true} paragraph={false} loading={loading}>
            <span>{title}</span>
            <Rate style={{ marginLeft: '20px' }} allowHalf disabled value={rating} />
            <span className="ant-rate-text"><em>{desc[Math.floor(rating) - 1]}</em></span>
          </Skeleton>
        </div>
      }
    >
      <Skeleton active
        title={false}
        loading={loading}
      >
        <div style={{ display: 'flex', flexFlow: 'column', gap: '10px' }} >
          <p>{commentary}</p>
          <p><em>{user.name}</em></p>
        </div>
      </Skeleton>
    </Card>
  )
}