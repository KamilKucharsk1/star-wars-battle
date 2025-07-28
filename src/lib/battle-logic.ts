import { CardData, BattleResult } from "@/types";

/**
 * Determines the winner of a battle between two cards
 * @param leftCard - The left card in the battle
 * @param rightCard - The right card in the battle
 * @param battleType - The type of battle (people or starships)
 * @returns The battle result with winner and values
 */
export function determineBattleWinner(
  leftCard: CardData,
  rightCard: CardData,
  battleType: "people" | "starships"
): BattleResult {
  let leftValue: number;
  let rightValue: number;
  
  if (battleType === "people") {
    leftValue = leftCard.mass || 0;
    rightValue = rightCard.mass || 0;
  } else {
    leftValue = leftCard.crew || 0;
    rightValue = rightCard.crew || 0;
  }

  let winner: string;
  if (leftValue > rightValue) {
    winner = "Left card wins!";
  } else if (rightValue > leftValue) {
    winner = "Right card wins!";
  } else {
    winner = "It's a draw!";
  }

  return { winner, leftValue, rightValue };
}

/**
 * Selects random cards from an array
 * @param cards - Array of cards to select from
 * @param count - Number of cards to select (default: 2)
 * @returns Array of randomly selected cards
 */
export function selectRandomCards(cards: CardData[], count: number = 2): CardData[] {
  if (cards.length < count) {
    return [];
  }
  
  const shuffled = [...cards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Processes a battle with cards of the specified type
 * @param cards - Array of cards available for battle
 * @param battleType - Type of battle to perform
 * @returns Object with selected cards and battle result, or null if insufficient cards
 */
export function processBattle(
  cards: CardData[],
  battleType: "people" | "starships"
): { selectedCards: CardData[]; result: BattleResult } | null {
  const selectedCards = selectRandomCards(cards);
  
  if (selectedCards.length !== 2) {
    return null;
  }

  const result = determineBattleWinner(selectedCards[0], selectedCards[1], battleType);
  
  return { selectedCards, result };
} 