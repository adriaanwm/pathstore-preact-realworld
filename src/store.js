import {useEffect, useState, useRef} from 'preact/hooks'
import {createStore} from 'pathstore'
import {currentRoute} from '/components/router/definitionMatch'
import {useRequest} from '/utils/useRequest'

export const store = createStore({useEffect, useState, useRef, reduxDevtools: true})

store.useRequest = useRequest(store)

store.set([], {
  route: currentRoute() || {},
  token: localStorage.getItem('token')
})
