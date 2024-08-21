// src/types/types.ts

export interface Banner {
    id: number;
    image: string;
  }
  
  export interface Movie {
    id: number;
    title: string;
    image: string;
    dangChieu: boolean;
  }
  
  export interface Event {
    title: string | undefined;
    id: number;
    image: string;
  }
  
  export interface Service {
    title: string | undefined;
    id: number;
    image: string;
  }
  
  export interface LeftSmallBanner {
    id: number;
    image: string;
  }
  
  export interface RightSmallBanner {
    id: number;
    image: string;
  }
  
  export interface PopupBanner {
    id: number;
    image: string;
  }
  
  export interface GifBanner {
    id: number;
    image: string;
  }
  
  export interface Voucher {
    title: string;
    id: number;
    image: string;
  }
  