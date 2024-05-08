import { useState } from "react"

import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
} from "./counterSlice"
import { useAppDispatch, useAppSelector } from "./hooks"

export function Counter() {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState("2")

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-zinc-200 py-3">
      <div className="flex items-center justify-center gap-3 text-2xl">
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
          className="btn-outline btn border-transparent"
        >
          -
        </button>
        <span className="font-medium">{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          className="btn-ghost btn"
        >
          +
        </button>
      </div>
      <input
        type={"number"}
        aria-label="Set increment amount"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(e.target.value)}
        className="rounded p-2 font-bold text-black"
      />
      <div className="flex gap-3">
        <button
          onClick={() => dispatch(incrementByAmount(incrementValue))}
          className="btn-primary btn"
        >
          Add Amount
        </button>
        <button
          onClick={() => dispatch(incrementAsync(incrementValue))}
          className="btn-primary btn"
        >
          Add Async
        </button>
        <button
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
          className="btn-primary btn"
        >
          Add If Odd
        </button>
      </div>
    </div>
  )
}
