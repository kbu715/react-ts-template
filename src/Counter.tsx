import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState<number>(0)
  return (
    <div>
      <h3>Update the count and edit src/App.tsx, and Check whether state is preserved</h3>
      <button onClick={() => setCount((c) => c + 1)}>clicked {count} times</button>
    </div>
  )
}