"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { useState } from "react";

interface AddResourceFormProps {
  resourceType?: string;
}

export function AddResourceForm({ resourceType: initialResourceType = "people" }: AddResourceFormProps) {
  const [resourceType, setResourceType] = useState(initialResourceType);
  const [formData, setFormData] = useState<Record<string, string | number>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({});
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        height: "fit-content",
        width: '100%'
      }}
    >
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h6"
          sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
        >
          Add New Resource
        </Typography>
        <FormControl 
          fullWidth 
          sx={{ mt: { xs: 1.5, sm: 2 } }}
        >
          <InputLabel 
            id="resource-type-label"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            Resource Type
          </InputLabel>
          <Select
            labelId="resource-type-label"
            value={resourceType}
            label="Resource Type"
            onChange={(e) => setResourceType(e.target.value)}
            sx={{
              '& .MuiSelect-select': {
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }
            }}
          >
            <MenuItem value="people">People</MenuItem>
            <MenuItem value="starships">Starships</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: { xs: 1.5, sm: 2 } 
        }}>
          {resourceType === "people" && (
            <>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }
                }}
              />
              <TextField
                label="Height"
                type="number"
                variant="outlined"
                fullWidth
                value={formData.height || ""}
                onChange={(e) => handleInputChange("height", parseInt(e.target.value))}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }
                }}
              />
              <TextField
                label="Mass"
                type="number"
                variant="outlined"
                fullWidth
                value={formData.mass || ""}
                onChange={(e) => handleInputChange("mass", parseInt(e.target.value))}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }
                }}
              />
            </>
          )}

          {resourceType === "starships" && (
            <>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }
                }}
              />
              <TextField
                label="Crew"
                type="number"
                variant="outlined"
                fullWidth
                value={formData.crew || ""}
                onChange={(e) => handleInputChange("crew", parseInt(e.target.value))}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }
                }}
              />
              <TextField
                label="Model"
                variant="outlined"
                fullWidth
                value={formData.model || ""}
                onChange={(e) => handleInputChange("model", e.target.value)}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }
                }}
              />
            </>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: { xs: 1, sm: 2 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Add Resource
          </Button>
        </Box>
      </form>
    </Paper>
  );
} 