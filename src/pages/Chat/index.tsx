import React, { FunctionComponent, useState, useEffect, useCallback } from 'react'
import axios, { AxiosInstance } from 'axios'

const ChatComponent:FunctionComponent = () => {
  interface State {
    [propName: string]: any
  }
  
  const [data, setData] = useState<State>({})
  
  const apiCall = useCallback(async (): Promise<AxiosInstance> => {
    const response = await axios.get('/Hello')
    try {
      return response.data
    } catch(err) {
      throw new Error(err)
    }
  }, [])
  
  useEffect(() => {
    apiCall().then((data) => {
      setData(data)
    })
  },[ apiCall ])
  
  return (
    <>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  )
}

export default ChatComponent
