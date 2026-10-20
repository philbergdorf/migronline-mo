import { createContext, useContext } from 'react'

export const FreshDesignContext = createContext(false)
export const useFreshDesign = () => useContext(FreshDesignContext)
