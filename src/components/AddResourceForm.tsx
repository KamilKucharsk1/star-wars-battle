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
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createPerson, createStarship } from "@/lib/actions";

interface AddResourceFormProps {
  resourceType?: string;
}

export function AddResourceForm({ resourceType: initialResourceType = "people" }: AddResourceFormProps) {
  const [resourceType, setResourceType] = useState(initialResourceType);
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (resourceType === "people") {
        if (!formData.name || !formData.mass) {
          throw new Error("Name and Mass are required for people battles");
        }

        await createPerson({
          name: formData.name as string,
          mass: Number(formData.mass),
        });

        setMessage({ type: 'success', text: 'Person added successfully!' });
      } else if (resourceType === "starships") {
        if (!formData.name || !formData.crew) {
          throw new Error("Name and Crew are required for starship battles");
        }

        await createStarship({
          name: formData.name as string,
          crew: Number(formData.crew),
          model: formData.model as string || "Unknown",
          manufacturer: formData.manufacturer as string || "Unknown",
        });

        setMessage({ type: 'success', text: 'Starship added successfully!' });
      }

      await queryClient.invalidateQueries({ queryKey: ["people"] });
      await queryClient.invalidateQueries({ queryKey: ["starships"] });
      
      setFormData({});
    } catch (error) {
      console.error('Error adding resource:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to add resource' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (message) setMessage(null);
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
            onChange={(e) => {
              setResourceType(e.target.value);
              setFormData({}); // Reset form when switching type
              setMessage(null);
            }}
            disabled={loading}
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

      {message && (
        <Alert 
          severity={message.type} 
          sx={{ mb: 2 }}
          onClose={() => setMessage(null)}
        >
          {message.text}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: { xs: 1.5, sm: 2 } 
        }}>
          {resourceType === "people" && (
            <>
              <TextField
                label="Name *"
                variant="outlined"
                fullWidth
                required
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={loading}
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
                label="Mass (kg) *"
                type="number"
                variant="outlined"
                fullWidth
                required
                helperText="Required for battles"
                value={formData.mass || ""}
                onChange={(e) => handleInputChange("mass", e.target.value ? parseInt(e.target.value) : "")}
                disabled={loading}
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
                label="Name *"
                variant="outlined"
                fullWidth
                required
                helperText="Required for battles"
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={loading}
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
                label="Crew *"
                type="number"
                variant="outlined"
                fullWidth
                required
                helperText="Required for battles"
                value={formData.crew || ""}
                onChange={(e) => handleInputChange("crew", e.target.value ? parseInt(e.target.value) : "")}
                disabled={loading}
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
                helperText="Optional"
                value={formData.model || ""}
                onChange={(e) => handleInputChange("model", e.target.value)}
                disabled={loading}
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
                label="Manufacturer"
                variant="outlined"
                fullWidth
                helperText="Optional"
                value={formData.manufacturer || ""}
                onChange={(e) => handleInputChange("manufacturer", e.target.value)}
                disabled={loading}
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
            disabled={loading}
            sx={{
              mt: { xs: 1, sm: 2 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              position: 'relative'
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Adding...
              </>
            ) : (
              'Add Resource'
            )}
          </Button>
        </Box>
      </form>
    </Paper>
  );
} 