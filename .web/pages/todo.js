import {useEffect, useRef, useState} from "react"

import {useRouter} from "next/router"

import {E, connect, updateState} from "/utils/state"

import "focus-visible/dist/focus-visible"

import {Button, Container, HStack, Heading, Input, ListItem, OrderedList, Text, VStack} from "@chakra-ui/react"

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

<Container>

<VStack>

<Heading>

{`제 목`}</Heading>

<Input type="text"/>

<Button>

{`추 가`}</Button>

<OrderedList>

<ListItem>

<HStack>

<Button/>

<Text>

{`아침먹고 땡`}</Text></HStack></ListItem>

<ListItem>

<HStack>

<Button/>

<Text>

{`점심먹고 땡`}</Text></HStack></ListItem>

<ListItem>

<HStack>

<Button/>

<Text>

{`저녁먹고 땡`}</Text></HStack></ListItem></OrderedList></VStack>

<NextHead>

<title>{`Pynecone App`}</title>

<meta content="A Pynecone app."

name="description"/>

<meta content="favicon.ico"

property="og:image"/></NextHead></Container>

)

}