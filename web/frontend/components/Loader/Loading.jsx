import { Spinner } from '@shopify/polaris'
import '../../Styles/Loading.css';

const Loading = () => {
  return (
    <>
        <div className='loaderBlock'>
        <Spinner accessibilityLabel="Spinner example" size="large"/>
            <h1>Loading...</h1>
        </div>
    </>
  )
}

export default Loading