import { Rate, Tooltip } from 'antd';

export function ProductRating(props) {
  const { product, onClick } = props;
  const { overallRating, reviewsCount } = product;

  return (
    <>
      <Tooltip placement="bottom" title="Ver reseñas" onClick={() => onClick(product)} >
        <Rate disabled allowHalf value={overallRating} />
        <span style={{ margin: '0 10px', cursor: 'pointer'}}>({reviewsCount} {reviewsCount == 1 ? 'reseña' : 'reseñas'})</span>
      </Tooltip>
    </>
  )
}