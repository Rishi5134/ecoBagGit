import '../../Styles/NoOrdersFound.css'
import {
    OrderStatusMinor
} from '@shopify/polaris-icons';
const NoOrdersFound = () => {
  return (
    <>
        <div className='noOrders'>
        <OrderStatusMinor className='noOrdersIcon'/>
            <h1>No Orders Found</h1>
        </div>
    </>
  )
}

export default NoOrdersFound