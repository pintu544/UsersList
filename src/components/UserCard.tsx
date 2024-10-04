import React from "react";
import { User } from "../types/User";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

// Styled card component for custom UI improvements
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));

// Styled button to align with modern UI principles
const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
}));

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <StyledCard variant="outlined">
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            alt={user.username}
            //src={user.profile_image || "/placeholder-avatar.png"}
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography color="textSecondary">@{user.username}</Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="textSecondary">
          Age: {user.age}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Marital Status: {user.marital_status}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Employment Status: {user.is_employed ? "Employed" : "Unemployed"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Founder: {user.is_founder ? "Yes" : "No"}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <StyledButton size="small" onClick={() => onEdit(user)}>
          Edit
        </StyledButton>
        <StyledButton
          size="small"
          color="error"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </StyledButton>
      </CardActions>
    </StyledCard>
  );
};

export default UserCard;
