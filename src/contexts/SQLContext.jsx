import React, { createContext, useContext, useReducer, useEffect } from 'react';
import SQLEngine from '../utils/SQLEngine';

/* eslint-disable react-refresh/only-export-components */

const SQLContext = createContext();

const initialState = {
  sqlEngine: new SQLEngine(),
  currentDatabase: null,
  databases: [],
  tables: [],
  queryHistory: [],
  isLoading: false,
  error: null,
  lastResult: null
};

function sqlReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    case 'EXECUTE_QUERY_SUCCESS':
      return {
        ...state,
        lastResult: action.payload,
        queryHistory: state.sqlEngine.getQueryHistory(),
        currentDatabase: state.sqlEngine.getCurrentDatabase(),
        databases: state.sqlEngine.getDatabases(),
        tables: state.sqlEngine.getTablesInCurrentDatabase(),
        isLoading: false,
        error: null
      };

    case 'EXECUTE_QUERY_ERROR':
      return {
        ...state,
        lastResult: action.payload,
        queryHistory: state.sqlEngine.getQueryHistory(),
        isLoading: false,
        error: action.payload.error
      };

    case 'REFRESH_STATE':
      return {
        ...state,
        currentDatabase: state.sqlEngine.getCurrentDatabase(),
        databases: state.sqlEngine.getDatabases(),
        tables: state.sqlEngine.getTablesInCurrentDatabase(),
        queryHistory: state.sqlEngine.getQueryHistory()
      };

    default:
      return state;
  }
}

export function SQLProvider({ children }) {
  const [state, dispatch] = useReducer(sqlReducer, initialState);

  useEffect(() => {
    // Initialize state with error handling
    try {
      dispatch({ type: 'REFRESH_STATE' });
    } catch (error) {
      console.error('Failed to initialize SQL context:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize database engine' });
    }
  }, []);

  const executeQuery = async (query) => {
    if (!query || typeof query !== 'string') {
      const error = 'Invalid query: Query must be a non-empty string';
      dispatch({ type: 'SET_ERROR', payload: error });
      return { success: false, error, query: query || '', timestamp: new Date() };
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      // Simulate some delay for realistic feel
      await new Promise((resolve) => setTimeout(resolve, 100));

      const result = state.sqlEngine.executeQuery(query);

      if (result.success) {
        dispatch({ type: 'EXECUTE_QUERY_SUCCESS', payload: result });
      } else {
        dispatch({ type: 'EXECUTE_QUERY_ERROR', payload: result });
      }

      return result;
    } catch (error) {
      const errorResult = {
        success: false,
        error: error.message || 'Unknown error occurred',
        query,
        timestamp: new Date()
      };
      dispatch({ type: 'EXECUTE_QUERY_ERROR', payload: errorResult });
      return errorResult;
    }
  };

  const getTableSchema = (tableName) => {
    try {
      if (!tableName || typeof tableName !== 'string') {
        console.warn('Invalid table name provided to getTableSchema');
        return null;
      }
      return state.sqlEngine.getTableSchema(tableName);
    } catch (error) {
      console.error('Error getting table schema:', error);
      return null;
    }
  };

  const refreshState = () => {
    dispatch({ type: 'REFRESH_STATE' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue = {
    ...state,
    executeQuery,
    getTableSchema,
    refreshState,
    clearError
  };

  return <SQLContext.Provider value={contextValue}>{children}</SQLContext.Provider>;
}

export function useSQL() {
  const context = useContext(SQLContext);
  if (!context) {
    throw new Error('useSQL must be used within a SQLProvider');
  }
  return context;
}

export default SQLContext;
