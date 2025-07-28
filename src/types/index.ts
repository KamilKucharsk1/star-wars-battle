// Base types for the application
export interface CardData {
  id: number | string;
  name: string;
  mass?: number;
  crew?: number;
  height?: number;
  gender?: string;
  model?: string;
  manufacturer?: string;
  type?: "people" | "starships";
}

export interface BattleResult {
  winner: string;
  leftValue: number;
  rightValue: number;
}

// Legacy Resource interface for compatibility
export interface Resource {
  id: number;
  name: string;
  [key: string]: string | number;
}

export interface QueryData {
  [key: string]: Resource[];
}

export interface ResolverArgs {
  id: number;
}

 