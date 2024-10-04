import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { User } from "../types/User";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: Omit<User, "id">, id?: number) => void;
  editingUser?: User;
}

const UserForm: React.FC<UserFormProps> = ({
  open,
  onClose,
  onSubmit,
  editingUser,
}) => {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<Omit<User, "id">>({
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      age: 0,
      marital_status: "unmarried",
      is_employed: false,
      is_founder: false,
    },
  });

  useEffect(() => {
    if (editingUser) {
      reset({
        first_name: editingUser.first_name,
        last_name: editingUser.last_name,
        username: editingUser.username,
        age: editingUser.age,
        marital_status: editingUser.marital_status,
        is_employed: editingUser.is_employed,
        is_founder: editingUser.is_founder,
      });
    } else {
      reset({
        first_name: "",
        last_name: "",
        username: "",
        age: 0,
        marital_status: "unmarried",
        is_employed: false,
        is_founder: false,
      });
    }
  }, [editingUser, reset]);

  const onFormSubmit = (data: Omit<User, "id">) => {
    onSubmit(data, editingUser?.id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent>
        <form>
          <Controller
            name="first_name"
            control={control}
            rules={{ required: "First name is required" }}
            render={({ field, fieldState }) => (
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            rules={{ required: "Last name is required" }}
            render={({ field, fieldState }) => (
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="username"
            control={control}
            rules={{ required: "Username is required" }}
            render={({ field, fieldState }) => (
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="age"
            control={control}
            rules={{
              required: "Age is required",
              min: { value: 0, message: "Age cannot be negative" },
            }}
            render={({ field, fieldState }) => (
              <TextField
                label="Age"
                type="number"
                fullWidth
                margin="normal"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Marital Status</InputLabel>
            <Controller
              name="marital_status"
              control={control}
              render={({ field }) => (
                <Select label="Marital Status" {...field}>
                  <MenuItem value="married">Married</MenuItem>
                  <MenuItem value="unmarried">Unmarried</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Controller
                name="is_employed"
                control={control}
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value} />
                )}
              />
            }
            label="Employed"
          />
          <FormControlLabel
            control={
              <Controller
                name="is_founder"
                control={control}
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value} />
                )}
              />
            }
            label="Founder"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onFormSubmit)} variant="contained">
          {editingUser ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
