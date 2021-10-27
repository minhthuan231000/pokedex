import { ITEMCLICK, DELCLICK } from './addlist.types';
export const itemClick = (value) => {
    return {
        type: ITEMCLICK,
        getItem: value
    };
};

export const delClick = (value) => {
    return {
        type: DELCLICK,
        getItem: value
    }
}