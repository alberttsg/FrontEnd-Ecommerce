import { useParams } from 'react-router-dom';
import './SearchResult.scss';
import { Products } from '../componentes/Products/Products';

export function SearchResult() {
  const { search } = useParams();

  return (
    <div className='scroll-items'>
      <Products search={search} route='search' />
    </div>
  )
};
