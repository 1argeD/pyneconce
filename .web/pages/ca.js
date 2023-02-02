import {useEffect, useRef, useState} from "react"
import {useRouter} from "next/router"
import {E, connect, updateState} from "/utils/state"
import "focus-visible/dist/focus-visible"
import {Button, HStack, Text} from "@chakra-ui/react"
import NextHead from "next/head"

const EVENT = "ws://localhost:8000/event"
export default function Component() {
const [base_state, setBase_state] = useState({"state": {"items": ["DDang", "asdf", "adssg"], "new_item": ""}, "events": [{"name": "base_state.hydrate"}]})
const [result, setResult] = useState({"state": null, "events": [], "processing": false})
const router = useRouter()
const socket = useRef(null)
const { isReady } = router;
const Event = events => setBase_state({
  ...base_state,
  events: [...base_state.events, ...events],
})
useEffect(() => {
  if(!isReady)
    return;
  if (!socket.current) {
    connect(socket, base_state, result, setResult, router, EVENT)
  }
  const update = async () => {
    if (result.state != null) {
      setBase_state({
        ...result.state,
        events: [...base_state.events, ...result.events],
      })
      setResult({
        state: null,
        events: [],
        processing: false,
      })
    }
    await updateState(base_state, result, setResult, router, socket.current)
  }
  update()
})
return (
<HStack sx={{"padding": "50px"}}>
<Button colorScheme="red"
onClick={() => Event([E("base_state.state.decrement", {})])}
sx={{"borderRadius": "2em"}}>
{`minus`}</Button>
<Text>
{base_state.state.count}</Text>
<Button colorScheme="green"
onClick={() => Event([E("base_state.state.increment", {})])}
sx={{"borderRadius": "2em"}}>
{`plus`}</Button>
<NextHead>
<title>{`Pynecone App`}</title>
<meta name="description"
content="A Pynecone app."/>
<meta content="favicon.ico"
property="og:image"/></NextHead></HStack>
)
}