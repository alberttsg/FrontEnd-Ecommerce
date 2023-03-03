import { useEffect, useState, useContext } from 'react';
import { ReviewForm } from './ReviewForm';
import { UserReviews } from './UserReviews';
import { getOverallRating } from '../../logic/fetch';
import { Rate, Drawer, Space, Button } from 'antd';
import { UserContext } from '../../context/UserContext/UserState';

export function ReviewsDrawer(props) {
  const { product, isOpen, toClose } = props;
  const { user } = useContext(UserContext);
  const [overallRating, setOverallRating] = useState(0);
  const [isFormOpen, setFormOpen] = useState(false);
  const desc = ['Pésimo', 'Malo', 'No está mal', 'Bueno', '¡Fantástico!']

  useEffect(() => {
    async function getData() {
      const rating = await getOverallRating(product);
      setOverallRating(rating);
    };
    getData();
  }, [])

  const openForm = () => {
    setFormOpen(true);
  };

  const onFormClose = () => {
    setFormOpen(false);
  };

  return (
    <Drawer
      title={
        <>
          <span>Reseñas de usuarios</span>
          <Rate style={{ marginLeft: '20px' }} allowHalf disabled value={overallRating} />
          <span className="ant-rate-text"><em>{overallRating == 0 ? 'Sin reseñas' : desc[Math.floor(overallRating) - 1]}</em></span>
        </>
      }
      width={720}
      onClose={toClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
      closable={false}
      extra={
        <Space>
          <Button onClick={isFormOpen ? onFormClose : openForm} type="primary">{isFormOpen ? 'Cancelar' : 'Publicar reseña'}</Button>
          <Button onClick={toClose} type="primary">Cerrar</Button>
        </Space>
      }
    >
      <ReviewForm isOpen={isFormOpen} product={product} />
      <UserReviews product={product} />
    </Drawer>
  )
}