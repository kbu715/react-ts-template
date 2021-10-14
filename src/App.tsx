import './styles.css';
import IMAGE from './react.png';
import LOGO from './logo.svg';

export const App = () => {
  return (
    <>
      <img src={LOGO} alt="React Logo" width="100px" />
      <img src={IMAGE} alt="React Logo" width="200px" />
      <h1>React Typescript Webpack Starter Template</h1>
    </>
  )
}