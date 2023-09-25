//***************************************

import React, { ReactNode } from 'react';

// * AuthContext*************************
export type authStateType = {
  currentPage: JSX.Element;
};
//****************************************
export type authContextType = {
  authPage: authStateType;
  setAuthPage: Function;
};

export type ThemeContextType = {
  mode: boolean;
  setmode: Function;
};

export type PageContextType = {
  page: ReactNode;
  setPage: Function;
};

export type RefContextType = {
  reft: string;
  setreft: Function;
  updateRef: Function;
};
