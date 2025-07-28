
"use client";

import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ResourceDetails } from "./ResourceDetails";
import type { Resource, QueryData } from "@/types";

async function fetcher(query: string) {
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const { data } = await res.json();
  return data;
}

const resourceTypes = ["people", "starships"];

const fields: { [key: string]: string } = {
  people: "id name height mass gender",
  starships: "id name crew model manufacturer",
  vehicles: "id name model manufacturer",
  species: "id name language",
  planets: "id name population",
};

export function ResourceList() {
  const [selectedCategory, setSelectedCategory] = useState(resourceTypes[0]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const { data, isLoading, error } = useQuery<QueryData>({
    queryKey: [selectedCategory],
    queryFn: () =>
      fetcher(`query { ${selectedCategory} { ${fields[selectedCategory]} } }`),
  });

  const handleCategoryChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setSelectedCategory(newValue);
    setSelectedResource(null);
  };

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: { xs: 'column', md: 'row' },
      gap: { xs: 2, sm: 3 },
      width: '100%'
    }}>
      <Paper
        elevation={3}
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          width: { xs: '100%', md: 350 }, 
          flexShrink: 0, 
          height: "fit-content",
          maxHeight: { xs: 'none', md: '600px' }
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
        >
          Existing Resources
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            aria-label="resource categories"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
                minWidth: { xs: 80, sm: 90 }
              }
            }}
          >
            {resourceTypes.map((type) => (
              <Tab key={type} label={type} value={type} />
            ))}
          </Tabs>
        </Box>
        <List sx={{ 
          maxHeight: { xs: 300, md: 400 }, 
          overflow: "auto",
          '& .MuiListItem-root': {
            py: { xs: 1, sm: 1.5 }
          }
        }}>
          {isLoading && (
            <ListItem>
              <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Loading...
              </Typography>
            </ListItem>
          )}
          {error && (
            <ListItem>
              <Typography 
                color="error"
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                Error loading data.
              </Typography>
            </ListItem>
          )}
          {data &&
            data[selectedCategory] &&
            data[selectedCategory].map((item: Resource) => (
              <ListItem
                key={item.id}
                onClick={() => setSelectedResource(item)}
                sx={{ 
                  cursor: 'pointer',
                  backgroundColor: selectedResource?.id === item.id ? 'action.selected' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  borderRadius: 1
                }}
              >
                <ListItemText 
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                />
              </ListItem>
            ))}
        </List>
      </Paper>
      <Box sx={{ 
        width: { xs: '100%', md: 350 }, 
        flexShrink: 0 
      }}>
        <ResourceDetails resource={selectedResource} />
      </Box>
    </Box>
  );
} 