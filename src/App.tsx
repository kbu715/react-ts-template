import './styles.css'
import IMAGE from './react.png'
import LOGO from './logo.svg'
import { Counter } from './Counter'

export const App = () => {
  return (
    <>
      <Counter />
      <img src={LOGO} alt="React Logo" width="100px" />
      <img src={IMAGE} alt="React Logo" width="200px" />
      <h1>♦ React Typescript Webpack Starter Template ♦</h1>
      <h3>ENV: {process.env.NODE_ENV}</h3>
      <h3>NAME: {process.env.name}</h3>
    </>
  )
}
