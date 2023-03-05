import { useEffect, useState, useContext, createContext } from 'react';
import { ReviewForm } from './ReviewForm';
import { UserReviews } from './UserReviews';
import { Rate, Drawer, Space, Button } from 'antd';
import { UserContext } from '../../context/UserContext/UserState';
export const DrawerContext = createContext();

export function ReviewsDrawer(props) {
  const [review, setReview] = useState(null);
  const desc = ['Pésimo', 'Malo', 'No está mal', 'Bueno', '¡Fantástico!'];

  const { product, isOpen, toClose } = props;
  const { userInfo } = useContext(UserContext);
  const [isFormOpen, setFormOpen] = useState(false);

  useEffect(() => {
    if (!userInfo) return setReview(null);
    const getReview = product.reviews.find(i => i.user._id === userInfo._id);
    if (getReview) { setReview(getReview) }
    else { setReview(null) }
  }, [])

  const openForm = () => {
    setFormOpen(true);
  };

  const onFormClose = () => {
    setFormOpen(false);
  };

  return (
    <DrawerContext.Provider value={{ review, setReview, desc }}>
      <Drawer
        title={
          <>
            <span>Reseñas de usuarios</span>
            <Rate style={{ marginLeft: '20px' }} allowHalf disabled value={product.overallRating} />
            <span className="ant-rate-text"><em>{product.overallRating == 0 ? 'Sin reseñas' : desc[Math.floor(product.overallRating) - 1]}</em></span>
          </>
        }
        width={720}
        onClose={toClose}
        open={isOpen}
        bodyStyle={{ paddingBottom: 80 }}
        closable={false}
        extra={
          <Space>
            {!review &&
              <Button onClick={isFormOpen ? onFormClose : openForm} type="primary">{isFormOpen ? 'Cancelar' : 'Publicar reseña'}</Button>
            }
            <Button onClick={toClose} type="primary">Cerrar</Button>
          </Space>
        }
      >
        <ReviewForm isOpen={isFormOpen} product={product} />
        <UserReviews product={product} />
      </Drawer>
    </DrawerContext.Provider>
  )
}