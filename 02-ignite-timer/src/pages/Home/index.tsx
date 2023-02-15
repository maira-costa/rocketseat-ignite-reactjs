import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod' // A biblioteca não tem export default, então usamo essa sintaxe para exportar tudo da biblioteca zod
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

// Validação do formulário com a biblioteca zod
// Podemos atribuir valores mínimos, máximos e mensagens de validação
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

// Podemos validar o typescript de duas formas:

// Criando uma interface:
// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }

// Ou inferindo os tipos por meio da biblioteca zod
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]) // Guarda todos os ciclos criados
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null) // Guarda o ID do ciclo ativo
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0) // Guarda quantos segundos se passaram desde a criação do ciclo atual

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      // O useForm premite a atribuição de valores iniciais às propriedades do ciclo
      task: '',
      minutesAmount: 0,
    },
  })

  // Para sabermos qual o ciclo é o atual, percorremos a lista de ciclos para encontrar o id do ciclo que seja igual ao id do ciclo ativo ()ver handleCreayeNewCycle)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // Usamos o método useEffect para diminuir os segundos do countdown do ciclo ativo
  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        // O método setInterval não é exato, portanto, devemos fazer a comparação entre a data atual e a data de criação do ciclo ativo para termos o valor do segundos de forma mais precisa
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }

    return () => {
      // O método useEffect tem como retorno uma função que pode ser usada para resetar intervalos
      clearInterval(interval)
      // Dessa forma, sempre que um novo ciclo é criado, o intervalo reinicia
    }
  }, [activeCycle]) // Sempre que uma variável externa é utilizada no useEffect devemos adicioná-la como dependência

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(), // Precisamos da data para saber quantos segundos se passaram entre a criação do novo ciclo e a data atual
    }

    setCycles((state) => [...state, newCycle]) // Guarda o novo ciclo na lista de ciclos. Usamos state em uma função porque precisamos guardar o novo ciclo assim que for criado (ver clojures em react)
    setActiveCycleId(id) // O id do novo ciclo é atribuído ao ciclo ativo
    setAmountSecondsPassed(0) // Sempre que um novo ciclo é criado o número de segundos passados é resetado para 0

    reset() // reseta para os defaultValues
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 // Se houver um ciclo ativos, pegamos o valor de minutesAmount inserido em minutesAmountInput e multiplicamos por 60 para convertê-lo para segundos

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 // Para sabermos em quantos segundos o ciclo está, subtraímos os segundos que se passaram do total de segundos

  const minutesAmount = Math.floor(currentSeconds / 60) // Dividimos os segundos atuais por 60 para convertê-los para minutos, arredondando para baixo
  const secondsAmount = currentSeconds % 60 // O resto da divisão por 60 correponde aos segundos

  const minutes = String(minutesAmount).padStart(2, '0') // padStart indica que os minutos devem ter 2 caracteres e, caso não tenha, deverá ser acrescentado 0 a partir do início até ficar com 2 caracteres
  const seconds = String(secondsAmount).padStart(2, '0')
  // Os valores de minutos e segundos são convertidos para string para podermos separar por caracteres no countdown

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle]) // Mostra o countdown na aba da janela

  const task = watch('task')
  const isSubmitDisable = !task // variável auxiliar que ajuda na leitura do código

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')} // permite que se utilize todos métodos de register no input task
          />

          <datalist id="task-suggestions">
            <option value="Projeto 01" />
            <option value="Projeto 02" />
            <option value="Projeto 03" />
            <option value="Blabs" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })} // valueAsNumber converte o dado de string para number
          />
          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisable}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
