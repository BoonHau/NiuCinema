import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '../../redux/store';

// Variable that hodls app dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Variable that hodls app selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
