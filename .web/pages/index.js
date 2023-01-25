import {useEffect, useRef, useState} from "react"

import {useRouter} from "next/router"

import {E, connect, updateState} from "/utils/state"

import "focus-visible/dist/focus-visible"

import {Button, HStack, Text} from "@chakra-ui/react"

import NextHead from "next/head"



const EVENT = "ws://localhost:8000/event"

export default function Component() {

const [state, setState] = useState({"count": 0, "events": [{"name": "state.hydrate"}]})

const [result, setResult] = useState({"state": null, "events": [], "processing": false})

const router = useRouter()

const socket = useRef(null)

const { isReady } = router;

const Event = events => setState({

  ...state,

  events: [...state.events, ...events],

})

useEffect(() => {

  if(!isReady)

    return;

  if (!socket.current) {

    connect(socket, state, result, setResult, router, EVENT)

  }

  const update = async () => {

    if (result.state != null) {

      setState({

        ...result.state,

        events: [...state.events, ...result.events],

      })

      setResult({

        state: null,

        events: [],

        processing: false,

      })

    }

    await updateState(state, result, setResult, router, socket.current)

  }

  update()

})

return (

<HStack>

<Button onClick={() => Event([E("state.decrement", {})])}>

{`감소`}</Button>

<Text>

{state.count}</Text>

<Button onClick={() => Event([E("state.increment", {})])}>

{`증가`}</Button>

<NextHead>

<title>{`Pynecone App`}</title>

<meta name="description"

content="A Pynecone app."/>

<meta property="og:image"

content="favicon.ico"/></NextHead></HStack>

)

}