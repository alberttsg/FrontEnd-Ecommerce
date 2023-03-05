import { useState, useEffect } from 'react';
import { ReviewForm } from './ReviewForm';
import { UserReviews } from './UserReviews';
import { Rate, Drawer, Space, Button, Divider, Spin, Card, Skeleton } from 'antd';
import { ReviewCard } from './ReviewCard';
import { getUserData, getUserReview, postReview, editReview, deleteReview } from './reviewFetch';

export function ReviewsDrawer(props) {
  const { product, isOpen, toClose } = props;
  const [productInfo, setProductInfo] = useState(product);
  const [isFormOpen, setFormOpen] = useState(false);
  const [user, setUser] = useState({ _id: '', username: '' }); // userInfo
  const [userReview, setUserReview] = useState();
  const [loading, setLoading] = useState(false);
  const desc = ['Pésimo', 'Malo', 'No está mal', 'Bueno', '¡Fantástico!'];

  useEffect(() => {
    async function getData() {
      await getUserData(setUser);
    }
    getData();
  }, [])

  useEffect(() => {
    getUserReview(productInfo, user, setUserReview);
  }, [user, productInfo])

  const postUserReview = async (inputs) => {
    setLoading(true);
    await postReview(inputs, productInfo, setProductInfo);
    setLoading(false);
  };

  const editUserReview = async (inputs) => {
    setLoading(true);
    await editReview(inputs, productInfo, setProductInfo);
    setLoading(false);
  };

  const deleteUserReview = async () => {
    setLoading(true);
    await deleteReview(productInfo, setProductInfo);
    setLoading(false);
    setFormOpen(false);
  };

  const openForm = () => {
    setFormOpen(true);
  };

  const onFormClose = () => {
    setFormOpen(false);
  };


  return (
    <Drawer title={
      <>
        <span>Reseñas de usuarios</span>
        <Rate style={{ marginLeft: '20px' }} allowHalf disabled value={productInfo.overallRating} />
        <span className="ant-rate-text"><em>{productInfo.overallRating == 0 ? 'Sin valorar' : desc[Math.floor(productInfo.overallRating) - 1]}</em></span>
      </>
    }
      width={720}
      onClose={toClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
      closable={false}
      extra={
        <Space>
          {user && !userReview &&
            <Button onClick={isFormOpen ? onFormClose : openForm} type="primary">{isFormOpen ? 'Cancelar' : 'Publicar reseña'}</Button>
          }
          <Button onClick={toClose} type="primary">Cerrar</Button>
        </Space>
      }
    >
      {loading &&
        <Space direction="vertical" style={{ width: '100%' }}>
          <Spin tip="Publicando">
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
          </Spin>
          <Divider />
        </Space>}
      {userReview &&
        <Space direction="vertical" style={{ width: '100%' }}>
          <>
            <h3>Tus reseñas</h3>
            <ReviewCard review={userReview} userId={user._id} onEdit={editUserReview} onDelete={deleteUserReview} />
          </>
          <Divider />
          <h3>Reseñas de otros usuarios</h3>
        </Space>}

      {!loading && !userReview &&
        <ReviewForm isOpen={isFormOpen} product={productInfo} postReview={postUserReview} />}

      <UserReviews product={productInfo} user={user} />

    </Drawer>
  )
}