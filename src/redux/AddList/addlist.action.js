import { ITEMCLICK } from './addlist.types';
export const itemClick = (value) => {
    return {
        type: ITEMCLICK,
        getItem: value
    };
};