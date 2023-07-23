import { ReactNode, createContext, useMemo, useReducer, useState } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  finishCurrentCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/cycles/actions'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextData {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountOfCyclesPassed: number
  cycles: Cycle[]
  markCurrentCycleAsFinished(): void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  handleStopCycle: () => void
}
export const CyclesContext = createContext({} as CyclesContextData)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountOfCyclesPassed, setAmountOfCyclesPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountOfCyclesPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(finishCurrentCycleAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(addNewCycleAction(newCycle))
    setAmountOfCyclesPassed(0)
  }

  function handleStopCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  const contextValue = useMemo(
    () => ({
      activeCycle,
      activeCycleId,
      amountOfCyclesPassed,
      cycles,
      createNewCycle,
      handleStopCycle,
      markCurrentCycleAsFinished,
      setSecondsPassed,
    }),
    [activeCycle, activeCycleId, amountOfCyclesPassed, cycles],
  )

  return (
    <CyclesContext.Provider value={contextValue}>
      {children}
    </CyclesContext.Provider>
  )
}
