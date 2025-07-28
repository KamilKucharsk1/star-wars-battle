
"use client";

import { Typography, Paper, Box } from "@mui/material";
import type { Resource } from "@/types";

interface ResourceDetailsProps {
  resource: Resource | null;
}

export function ResourceDetails({ resource }: ResourceDetailsProps) {
  if (!resource) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          height: "fit-content",
          minHeight: { xs: 200, md: 300 }
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
        >
          Resource Details
        </Typography>
        <Typography 
          color="text.secondary"
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          Select a resource to view details
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        height: "fit-content",
        minHeight: { xs: 200, md: 300 }
      }}
    >
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
      >
        {resource.name}
      </Typography>
      <Box sx={{ mt: { xs: 1, sm: 2 } }}>
        {Object.entries(resource)
          .filter(([key]) => key !== "id" && key !== "name")
          .map(([key, value]) => (
            <Typography 
              key={key} 
              variant="body2" 
              sx={{ 
                mb: 1,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                lineHeight: 1.4
              }}
            >
              <strong style={{ 
                textTransform: 'capitalize',
                marginRight: '8px'
              }}>
                {key}:
              </strong>
              {String(value)}
            </Typography>
          ))}
      </Box>
    </Paper>
  );
} 