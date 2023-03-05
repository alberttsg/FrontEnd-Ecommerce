import { Rate } from 'antd';

export function ProductRating(props) {
  const { product, callback } = props;
  const { overallRating, reviewsCount } = product;

  return (
    <>
      <span onClick={() => callback(product)} >
        <Rate disabled allowHalf value={overallRating} />
        <span style={{ margin: '0 10px' }} >({reviewsCount} {reviewsCount == 1 ? 'reseña' : 'reseñas'})</span>
      </span>
    </>
  )
}