import {useEffect, useState, useRef} from 'preact/hooks'
import {createStore} from '@adriaanwm/pathstore'
import {useRequest} from '/utils/useRequest'
import {createInit} from '/store/init'

export const store = createStore({useEffect, useState, useRef, reduxDevtools: true})

store.useRequest = useRequest(store)
store.init = createInit(store)
store.init()
