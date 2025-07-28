import { describe, it, expect } from '@jest/globals';
import { CardData } from "@/types";
import { determineBattleWinner, selectRandomCards } from "../battle-logic";

export function isCardCompatible(card: CardData, battleType: "people" | "starships"): boolean {
  if (battleType === "people") {
    return card.mass !== undefined;
  } else {
    return card.crew !== undefined;
  }
}

describe('Battle Logic', () => {
  describe('determineBattleWinner', () => {
    it('should determine winner for people battle based on mass', () => {
      const leftCard: CardData = { id: '1', name: 'Luke Skywalker', mass: 77 };
      const rightCard: CardData = { id: '2', name: 'Darth Vader', mass: 136 };
      
      const result = determineBattleWinner(leftCard, rightCard, 'people');
      
      expect(result.winner).toBe('Right card wins!');
      expect(result.leftValue).toBe(77);
      expect(result.rightValue).toBe(136);
    });

    it('should determine winner for starships battle based on crew', () => {
      const leftCard: CardData = { id: '1', name: 'X-wing', crew: 1 };
      const rightCard: CardData = { id: '2', name: 'Imperial Star Destroyer', crew: 47060 };
      
      const result = determineBattleWinner(leftCard, rightCard, 'starships');
      
      expect(result.winner).toBe('Right card wins!');
      expect(result.leftValue).toBe(1);
      expect(result.rightValue).toBe(47060);
    });

    it('should handle draw when values are equal', () => {
      const leftCard: CardData = { id: '1', name: 'Character A', mass: 80 };
      const rightCard: CardData = { id: '2', name: 'Character B', mass: 80 };
      
      const result = determineBattleWinner(leftCard, rightCard, 'people');
      
      expect(result.winner).toBe("It's a draw!");
      expect(result.leftValue).toBe(80);
      expect(result.rightValue).toBe(80);
    });

    it('should handle missing mass values as 0', () => {
      const leftCard: CardData = { id: '1', name: 'Character A' };
      const rightCard: CardData = { id: '2', name: 'Character B', mass: 80 };
      
      const result = determineBattleWinner(leftCard, rightCard, 'people');
      
      expect(result.winner).toBe('Right card wins!');
      expect(result.leftValue).toBe(0);
      expect(result.rightValue).toBe(80);
    });

    it('should handle missing crew values as 0', () => {
      const leftCard: CardData = { id: '1', name: 'Ship A' };
      const rightCard: CardData = { id: '2', name: 'Ship B', crew: 100 };
      
      const result = determineBattleWinner(leftCard, rightCard, 'starships');
      
      expect(result.winner).toBe('Right card wins!');
      expect(result.leftValue).toBe(0);
      expect(result.rightValue).toBe(100);
    });
  });

  describe('selectRandomCards', () => {
    const mockCards: CardData[] = [
      { id: '1', name: 'Card 1', mass: 80 },
      { id: '2', name: 'Card 2', mass: 90 },
      { id: '3', name: 'Card 3', mass: 70 },
      { id: '4', name: 'Card 4', mass: 85 },
    ];

    it('should return requested number of cards', () => {
      const result = selectRandomCards(mockCards, 2);
      expect(result).toHaveLength(2);
    });

    it('should return different cards each time (with enough runs)', () => {
      const results = Array.from({ length: 10 }, () => 
        selectRandomCards(mockCards, 2).map(card => card.id).sort().join(',')
      );
      
      // With randomization, we should get some variety
      const uniqueResults = new Set(results);
      expect(uniqueResults.size).toBeGreaterThan(1);
    });

    it('should return empty array when not enough cards available', () => {
      const result = selectRandomCards([mockCards[0]], 2);
      expect(result).toEqual([]);
    });

    it('should return all cards when count equals available cards', () => {
      const singleCard = [mockCards[0]];
      const result = selectRandomCards(singleCard, 1);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockCards[0]);
    });
  });

  describe('isCardCompatible', () => {
    it('should return true for people card with mass in people battle', () => {
      const card: CardData = { id: '1', name: 'Luke', mass: 77 };
      expect(isCardCompatible(card, 'people')).toBe(true);
    });

    it('should return false for people card without mass in people battle', () => {
      const card: CardData = { id: '1', name: 'Luke' };
      expect(isCardCompatible(card, 'people')).toBe(false);
    });

    it('should return true for starship card with crew in starships battle', () => {
      const card: CardData = { id: '1', name: 'X-wing', crew: 1 };
      expect(isCardCompatible(card, 'starships')).toBe(true);
    });

    it('should return false for starship card without crew in starships battle', () => {
      const card: CardData = { id: '1', name: 'X-wing' };
      expect(isCardCompatible(card, 'starships')).toBe(false);
    });
  });
}); 