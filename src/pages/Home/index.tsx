import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/CountDown'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormSchema = zod.object({
  task: zod.string().min(3, 'A tarefa deve conter no mínimo 3 caracteres'),
  minutesAmount: zod.number().min(1).max(60, 'Informe no máximo 60 minutos'),
})

type INewCycleForm = zod.infer<typeof newCycleFormSchema>

export function Home() {
  const { activeCycle, handleStopCycle, createNewCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<INewCycleForm>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, reset, watch } = newCycleForm

  function handleCreateNewCycle(data: INewCycleForm) {
    createNewCycle(data)
    reset()
  }

  const { task } = watch()
  const isSubmiteDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleStopCycle}>
            <HandPalm size={24} />
            PARAR
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmiteDisabled}>
            <Play size={24} />
            COMEÇAR
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
