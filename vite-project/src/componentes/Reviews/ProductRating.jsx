import { Rate } from 'antd';

export function ProductRating(props) {
  const { product, onClick } = props;
  const { overallRating, reviewsCount } = product;

  return (
    <>
      <span onClick={() => onClick(product)} >
        <Rate disabled allowHalf value={overallRating} />
        <span style={{ margin: '0 10px'}}>({reviewsCount} {reviewsCount == 1 ? 'reseña' : 'reseñas'})</span>
      </span>
    </>
  )
}