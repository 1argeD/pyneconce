import {useEffect, useRef, useState} from "react"
import {useRouter} from "next/router"
import {E, connect, updateState} from "/utils/state"
import "focus-visible/dist/focus-visible"
import {Button, HStack, Text} from "@chakra-ui/react"
import NextHead from "next/head"

const EVENT = "ws://localhost:8000/event"
export default function Component() {
const [calculator, setCalculator] = useState({"count": 0, "events": [{"name": "calculator.hydrate"}]})
const [result, setResult] = useState({"state": null, "events": [], "processing": false})
const router = useRouter()
const socket = useRef(null)
const { isReady } = router;
const Event = events => setCalculator({
  ...calculator,
  events: [...calculator.events, ...events],
})
useEffect(() => {
  if(!isReady)
    return;
  if (!socket.current) {
    connect(socket, calculator, result, setResult, router, EVENT)
  }
  const update = async () => {
    if (result.state != null) {
      setCalculator({
        ...result.state,
        events: [...calculator.events, ...result.events],
      })
      setResult({
        state: null,
        events: [],
        processing: false,
      })
    }
    await updateState(calculator, result, setResult, router, socket.current)
  }
  update()
})
return (
<HStack sx={{"padding": "50px"}}>
<Button colorScheme="red"
onClick={() => Event([E("calculator.decrement", {})])}
sx={{"borderRadius": "2em"}}>
{`minus`}</Button>
<Text>
{calculator.count}</Text>
<Button colorScheme="green"
onClick={() => Event([E("calculator.increment", {})])}
sx={{"borderRadius": "2em"}}>
{`plus`}</Button>
<NextHead>
<title>{`Pynecone App`}</title>
<meta content="A Pynecone app."
name="description"/>
<meta content="favicon.ico"
property="og:image"/></NextHead></HStack>
)
}