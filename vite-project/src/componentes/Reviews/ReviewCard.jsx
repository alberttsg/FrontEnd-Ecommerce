import { Rate, Skeleton, Card, Avatar, Input, Form, Row, Col, Button, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export function ReviewCard(props) {
  const { review, userId, onEdit, onDelete, isLoading = false } = props;
  const desc = ['Pésimo', 'Malo', 'No está mal', 'Bueno', '¡Fantástico!'];
  const [reviewInfo, setReviewInfo] = useState(review);
  const [loading, setLoading] = useState(isLoading);
  const [isAuthor, setEditButtons] = useState(false);
  const [editting, setEditting] = useState(false);

  const editReview = async (inputs) => {
    setLoading(true);
    setEditting(false);
    await onEdit(inputs);
    setLoading(false);
  }

  const deleteReview = async (inputs) => {
    setLoading(true);
    await onDelete(inputs);
    setLoading(false);
  }

  useEffect(() => {
    review.user._id === userId ? setEditButtons(true) : setEditButtons(false);
  }, [reviewInfo]);

  if (loading) return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }} >
          <Skeleton.Avatar shape='circle' active style={{ marginRight: '20px' }} size='medium' />
          <Skeleton active title={true} paragraph={false} loading={loading} />
        </div>
      }
    >
      <Skeleton active title={false} />
    </Card>
  )

  const { title, rating, commentary, postedAt, editedAt, user } = review;

  return (
    <Card
      title=
      {!editting &&

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }} >
          <Avatar shape='circle' style={{ margin: '0 20px 0 0' }} size='medium' src={'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'} />
          <span>{title}</span>
          <Rate style={{ marginLeft: '20px' }} allowHalf disabled value={rating} />
          <span className="ant-rate-text"><em>{desc[Math.floor(rating) - 1]}</em></span>
          {isAuthor &&
            <>
              <Tooltip title="Editar reseña" >
                <EditOutlined style={{ position: 'absolute', right: '20px' }} key="edit" onClick={() => setEditting(true)} />
              </Tooltip>
              <Tooltip title="Borrar reseña" >
                <DeleteOutlined style={{ position: 'absolute', right: '50px' }} key="delete" onClick={() => deleteReview()} />
              </Tooltip>

            </>}
        </div>
      }
    >
      <div style={{ display: 'flex', flexFlow: 'column', gap: '10px' }} >
        {editting ?
          <EditForm values={{ rating, title, commentary }} onFinish={editReview} />
          :
          <>
            <p style={{ marginBottom: '40px' }}>{commentary}</p>
            <span style={{ position: 'absolute', right: '30px', bottom: '20px' }}><em>{user.username}</em></span>
            <span style={{ position: 'absolute', left: '30px', bottom: '20px' }}><em>{postedAt && `Publicada: ${postedAt.substring(0, 10)} `} {editedAt && `(Editada: ${editedAt.substring(0, 10)})`}</em></span>
          </>
        }
      </div>
    </Card>
  )
}

export function EditForm(props) {
  const desc = ['Pésimo', 'Malo', 'No está mal', 'Bueno', '¡Fantástico!'];
  const { onFinish, values } = props;
  const { rating, title, commentary } = values;
  const [reviewRating, setReviewRating] = useState(rating);

  return (
    <>
      <Form
        initialValues={{
          'review-rating': rating,
          'review-title': title,
          'review-commentary': commentary
        }}
        layout='vertical'
        autoComplete="off"
        onFinish={(inputs) => { onFinish(inputs) }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='review-rating'
              label={<h3>Valoración general</h3>}
              rules={[{ required: true, message: 'Por favor, puntúa el producto.' }]}
            >
              <Rate allowHalf allowClear={true} tooltips={desc} onChange={setReviewRating} />
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
            <Button type="primary" htmlType="submit" >Editar reseña</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}
