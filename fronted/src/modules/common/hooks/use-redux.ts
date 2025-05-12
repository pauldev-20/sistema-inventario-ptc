import { useDispatch, useSelector, useStore, type TypedUseSelectorHook } from 'react-redux'
import { type AppDispatch, type AppStore, type RootState } from '../store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
