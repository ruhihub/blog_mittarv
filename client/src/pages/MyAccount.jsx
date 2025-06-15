import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Avatar,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "../styles/MyAccount.scss";
import { updateProfile } from "../features/auth/authActions";

const MyAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    await dispatch(updateProfile({ bio, username }));
    setLoading(false);
    setSuccessMsg(" Profile updated successfully!");
  };

  if (!user) return <Box className="myaccount-loading"><CircularProgress /></Box>;

  return (
    <Card className="my-account-card">
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar sx={{ width: 60, height: 60, bgcolor: "#00bcd4" }}>
            {user.username?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <Box>
            <Typography variant="h5">{user?.name}</Typography>
            <Typography variant="body2" color="textSecondary">{user?.email}</Typography>
          </Box>
        </Box>

        <form onSubmit={handleUpdate}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            variant="outlined"
            value={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Bio"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            value={user.bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
          />
         <Button
  type="submit"
  variant="contained"
  color="secondary"
  disabled={loading}
  fullWidth
  sx={{
    mt: 2,
    borderRadius: 2,
    backgroundColor: '#0ad346',
    color: 'white',
    '&:hover': { backgroundColor: '#0ab13d' },
  }}
>
  {loading ? "Updating..." : "Update Profile"}
</Button>

        </form>

        {successMsg && (
          <Typography className="success-msg">
            {successMsg}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MyAccount;
