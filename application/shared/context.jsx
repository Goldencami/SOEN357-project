import { createContext } from 'react';

export const roundContext = createContext(); // Gets round #
export const buttonContext = createContext(); // when going to another page, use this context to notify children to save data
