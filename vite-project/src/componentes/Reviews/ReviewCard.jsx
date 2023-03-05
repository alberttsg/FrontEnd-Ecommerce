import { Rate, Skeleton, Card, Avatar } from 'antd';


export function ReviewCard(props) {
  const desc = ['Pésimo', 'Malo', 'No está mal', 'Bueno', '¡Fantástico!'];
  const { review, loading } = props;
  const { user, rating, title, commentary } = review;

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }} >
          {loading ?
            <Skeleton.Avatar shape='circle' active style={{ marginRight: '20px' }} size='medium' />
            :
            <Avatar shape='circle' style={{ margin: '0 20px 0 0' }} size='medium' src={'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'} />
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
          <p><em>{user.username}{review.postedAt}</em></p>
        </div>
      </Skeleton>
    </Card>
  )
}