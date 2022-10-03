import {
  DiamondAlertMajor
} from '@shopify/polaris-icons';
import '../../Styles/LoadError.css'

const LoadError = () => {
  return (
    <>
        <div className="errorBlock">
        <DiamondAlertMajor/>
            <h1>Something Went Wrong!!</h1>
            <p>Try again</p>
        </div>
    </>
  )
}

export default LoadError