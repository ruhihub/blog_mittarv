import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authActions";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Navigate on successful registration
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // ✅ Correct

  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    console.log(formData, "Form data updated");

  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Create Account
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="username"
            name="username"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Create Account"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateAccount;
