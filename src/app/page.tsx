"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import { AddResourceForm } from "@/components/AddResourceForm";
import { ResourceList } from "@/components/ResourceList";
import { processBattle } from "@/lib/battle-logic";
import type { CardData } from "@/types";

async function fetcher(query: string) {
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const { data } = await res.json();
  return data;
}

export default function Home() {
  const [battleType, setBattleType] = useState<"people" | "starships">("people");
  const [cards, setCards] = useState<CardData[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [scores, setScores] = useState({ left: 0, right: 0 });

  // Fetch both people and starships data for battle
  const { data: peopleData, isLoading: peopleLoading } = useQuery<{
    people: CardData[];
  }>({
    queryKey: ["people"],
    queryFn: () => fetcher("query { people { id name mass } }"),
  });

  const { data: starshipsData, isLoading: starshipsLoading } = useQuery<{
    starships: CardData[];
  }>({
    queryKey: ["starships"],
    queryFn: () => fetcher("query { starships { id name crew } }"),
  });

  const isLoading = peopleLoading || starshipsLoading;

  const handlePlay = useCallback(() => {
    let allCards: CardData[] = [];
    
    if (battleType === "people" && peopleData?.people) {
      // Filter cards that have the required attribute (mass)
      allCards = peopleData.people
        .filter(card => card.mass !== undefined && card.mass !== null)
        .map(card => ({ ...card, type: "people" as const }));
    } else if (battleType === "starships" && starshipsData?.starships) {
      // Filter cards that have the required attribute (crew)
      allCards = starshipsData.starships
        .filter(card => card.crew !== undefined && card.crew !== null)
        .map(card => ({ ...card, type: "starships" as const }));
    }

    const battleResult = processBattle(allCards, battleType);
    
    if (battleResult) {
      const { selectedCards, result } = battleResult;
      setCards(selectedCards);
      setWinner(result.winner);
      
      if (result.winner === "Left card wins!") {
        setScores((s) => ({ ...s, left: s.left + 1 }));
      } else if (result.winner === "Right card wins!") {
        setScores((s) => ({ ...s, right: s.right + 1 }));
      }
      // No score change for draw
    }
  }, [battleType, peopleData, starshipsData]);

  // Only trigger initial game when data loads, not when battleType changes
  useEffect(() => {
    if (!isLoading && peopleData && starshipsData) {
      handlePlay();
    }
  }, [peopleData, starshipsData, isLoading, handlePlay]);

  const handleBattleTypeChange = useCallback((
    event: React.MouseEvent<HTMLElement>,
    newBattleType: string | null
  ) => {
    // Prevent selecting the same battle type twice
    if (!newBattleType || newBattleType === battleType) {
      return;
    }
    
    // Change battle type first
    setBattleType(newBattleType as "people" | "starships");
    
    
    let allCards: CardData[] = [];
    
    if (newBattleType === "people" && peopleData?.people) {
      // Filter cards that have the required attribute (mass)
      allCards = peopleData.people
        .filter(card => card.mass !== undefined && card.mass !== null)
        .map(card => ({ ...card, type: "people" as const }));
    } else if (newBattleType === "starships" && starshipsData?.starships) {
      // Filter cards that have the required attribute (crew)
      allCards = starshipsData.starships
        .filter(card => card.crew !== undefined && card.crew !== null)
        .map(card => ({ ...card, type: "starships" as const }));
    }

    const battleResult = processBattle(allCards, newBattleType as "people" | "starships");
    
    if (battleResult) {
      const { selectedCards, result } = battleResult;
      setCards(selectedCards);
      setWinner(result.winner);
      
      if (result.winner === "Left card wins!") {
        setScores((s) => ({ ...s, left: s.left + 1 }));
      } else if (result.winner === "Right card wins!") {
        setScores((s) => ({ ...s, right: s.right + 1 }));
      }
      // No score change for draw
    } else {
      // If no battle could be processed, clear cards and winner
      setCards([]);
      setWinner(null);
    }
  }, [battleType, peopleData, starshipsData]);

  const getCardAttribute = useMemo(() => {
    return (card: CardData) => {
      if (battleType === "people") {
        const mass = card.mass;
        return { 
          label: "Mass", 
          value: mass !== undefined ? mass : "N/A",
          isCompatible: mass !== undefined
        };
      } else {
        const crew = card.crew;
        return { 
          label: "Crew", 
          value: crew !== undefined ? crew : "N/A",
          isCompatible: crew !== undefined
        };
      }
    };
  }, [battleType]);

  // Check if current cards are compatible with selected battle type
  const areCardsCompatible = useMemo(() => {
    if (cards.length !== 2) return true;
    
    return cards.every(card => {
      if (battleType === "people") {
        return card.mass !== undefined;
      } else {
        return card.crew !== undefined;
      }
    });
  }, [cards, battleType]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{
          fontSize: { xs: '1.875rem', sm: '3rem' }, // Responsive font size
          mb: { xs: 2, sm: 3 }
        }}
      >
        Star Wars Battle
      </Typography>
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        mb: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 0 }
      }}>
        <ToggleButtonGroup
          value={battleType}
          exclusive
          onChange={handleBattleTypeChange}
          aria-label="battle type"
          sx={{
            '& .MuiToggleButton-root': {
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }
          }}
        >
          <ToggleButton value="people" aria-label="people">
            People
          </ToggleButton>
          <ToggleButton value="starships" aria-label="starships">
            Starships
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          px: { xs: 1, sm: 0 }
        }}
      >
        {isLoading && <CircularProgress />}

        {cards.length === 2 && (
          <Grid container spacing={{ xs: 2, sm: 4 }} justifyContent="center">
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <Card 
                data-testid="battle-card"
                sx={{ 
                  height: { xs: 180, sm: 200 }, 
                  width: { xs: '100%', sm: 300 },
                  maxWidth: { xs: 280, sm: 300 },
                  display: 'flex', 
                  flexDirection: 'column',
                  mx: 'auto'
                }}
              >
                <CardContent 
                  sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: { xs: 2, sm: 3 }
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: { xs: 1, sm: 2 }, 
                      fontWeight: 'bold',
                      fontSize: { xs: '1.125rem', sm: '1.5rem' }
                    }}
                  >
                    {cards[0].name}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="primary"
                    sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                  >
                    {getCardAttribute(cards[0]).label}: {" "}
                    <span style={{ 
                      color: getCardAttribute(cards[0]).isCompatible ? 'inherit' : '#f44336',
                      fontStyle: getCardAttribute(cards[0]).isCompatible ? 'normal' : 'italic'
                    }}>
                      {getCardAttribute(cards[0]).value}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <Card 
                data-testid="battle-card"
                sx={{ 
                  height: { xs: 180, sm: 200 }, 
                  width: { xs: '100%', sm: 300 },
                  maxWidth: { xs: 280, sm: 300 },
                  display: 'flex', 
                  flexDirection: 'column',
                  mx: 'auto'
                }}
              >
                <CardContent 
                  sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: { xs: 2, sm: 3 }
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: { xs: 1, sm: 2 }, 
                      fontWeight: 'bold',
                      fontSize: { xs: '1.125rem', sm: '1.5rem' }
                    }}
                  >
                    {cards[1].name}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="primary"
                    sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                  >
                    {getCardAttribute(cards[1]).label}: {" "}
                    <span style={{ 
                      color: getCardAttribute(cards[1]).isCompatible ? 'inherit' : '#f44336',
                      fontStyle: getCardAttribute(cards[1]).isCompatible ? 'normal' : 'italic'
                    }}>
                      {getCardAttribute(cards[1]).value}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        <Typography
          variant="h4"
          component="p"
          gutterBottom
          align="center"
          sx={{ 
            mt: { xs: 1, sm: 2 },
            minHeight: { xs: '2rem', sm: '2.5rem' }, // Ensure consistent height
            visibility: (winner && areCardsCompatible) ? 'visible' : 'hidden',
            fontSize: { xs: '1.5rem', sm: '2.125rem' },
            px: { xs: 1, sm: 0 }
          }}
        >
          {(winner && areCardsCompatible) ? winner : 'Placeholder'}
        </Typography>

        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          gap: { xs: 2, sm: 4 },
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'center',
          px: { xs: 1, sm: 0 }
        }}>
          <Typography 
            variant="body1"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            Left wins: {scores.left}
          </Typography>
          <Button
            variant="contained"
            onClick={handlePlay}
            disabled={isLoading}
            sx={{
              minWidth: { xs: '140px', sm: '160px' },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Play Again
          </Button>
          <Typography 
            variant="body1"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            Right wins: {scores.right}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: { xs: 3, sm: 4 } }} />

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', lg: 'row' },
        gap: { xs: 3, sm: 4 },
        alignItems: { xs: 'stretch', lg: 'flex-start' }
      }}>
        <Box sx={{ flex: 1 }}>
          <AddResourceForm
            resourceType="people"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <ResourceList />
        </Box>
      </Box>
    </Container>
  );
}
