import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { User } from "./types/User";
import { fetchUsers } from "./api/users";
import { styled } from "@mui/material/styles";

// Custom styled button for enhanced UI
const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.shadows[2],
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[4],
  },
}));
const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const initialUsers = fetchUsers();
    setUsers(initialUsers);
  }, []);

  const handleAddUser = () => {
    setEditingUser(undefined);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleFormSubmit = (userData: Omit<User, "id">, id?: number) => {
    if (id !== undefined) {
      // Edit existing user
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, ...userData } : user
        )
      );
    } else {
      // Add new user
      const newUser: User = {
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        ...userData,
      };
      setUsers([...users, newUser]);
    }
  };

  return (
    <>
      {/* <AppBar position="static">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6">User Management App</Typography>
        </Toolbar>
      </AppBar> */}
      <Container sx={{ marginTop: 4 }}>
      <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3} // Adds some margin-bottom for better spacing
      p={2} // Adds padding for better separation
      sx={{
        backgroundColor: "#f5f5f5", // Light background for contrast
        borderRadius: 2, // Rounded corners for a modern look
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold", // Bold text for emphasis
          color: "#333", // Subtle color for the title
        }}
      >
        Users
      </Typography>
      <StyledButton variant="contained" onClick={handleAddUser}>
        Add User
      </StyledButton>
    </Box>
        <UserList
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
        <UserForm
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          editingUser={editingUser}
        />
      </Container>
    </>
  );
};

export default App;
