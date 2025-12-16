import React, { createContext, useContext, useState } from 'react';

type Currency = 'BDT' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number, sourceCurrency?: string) => string;
  convertPrice: (price: number, sourceCurrency?: string) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('BDT');

  // Exchange rate: 1 USD = 120 BDT
  const EXCHANGE_RATE = 120;

  const convertPrice = (price: number, sourceCurrency: string = 'BDT'): number => {
    if (sourceCurrency === currency) return price;
    
    if (sourceCurrency === 'BDT' && currency === 'USD') {
      return price / EXCHANGE_RATE;
    }
    
    if (sourceCurrency === 'USD' && currency === 'BDT') {
      return price * EXCHANGE_RATE;
    }
    
    return price;
  };

  const formatPrice = (price: number, sourceCurrency: string = 'BDT'): string => {
    const convertedPrice = convertPrice(price, sourceCurrency);
    
    // Manual formatting to ensure reliability
    const formattedNumber = Math.round(convertedPrice).toLocaleString('en-US');
    
    if (currency === 'USD') {
      return `$${formattedNumber}`;
    }
    
    return `BDT ${formattedNumber}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
