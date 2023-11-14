import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ArrowBackOutlined, ContactPhoneOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const apiUrl = process.env.REACT_APP_API_URL;

function ProfilePage() {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const id = useSelector((state) => state.global.id);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  
  useEffect(() => {
    const getUser = async () => {
      try{
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
               "Cache-Control": "no-cache",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
        const {picture, firstName, lastName, contact, location, occupation } = data;
        dispatch(
          setUser({picture, firstName, lastName, contact, location, occupation })
          );
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
    };
    getUser();
  }, [id, dispatch]);

   return(
    <> 
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
      <Box flexBasis={isNonMobileScreens ? "50%" : undefined}>
      <WidgetWrapper>
        {/* FIRST ROW */}
        <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/dashboard")}
            startIcon={<ArrowBackOutlined />}
        >
          Back
        </Button>
        <Box p="0.5rem 0" />
        <Divider/>
        <Box p="0.5rem 0" />
        <Typography
              variant="h4"
              color="primary"
              textAlign="center"
            >
              Profile
            </Typography>
        <Box p="0.5rem 0" />
        <Typography
              variant="h4"
              color="secondary"
              textAlign="center"
            >
              {id}
            </Typography>
       <FlexBetween
                 gap="0.5rem"
                 pb="1.1rem"
          >
        <FlexBetween gap="5rem">
          <Box 
              component="img"
              alt="user"
              src={`data:image/*;base64,${user?.picture || ''}`}
              width="70px" 
              height="70px"
              borderRadius="50%"
              sx={{ objectFit: "cover" }}
            />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="bold"
              fontSize="0.85rem"
            >
              {user ? `${user.firstName} ${user.lastName}` : "loading"}
            </Typography>
          </Box>
          </FlexBetween>
          <Button
            variant="contained"
            color="neutral"
            sx={{ color: medium }}
            onClick={() => navigate(`/update/${id}`)}
            startIcon={<EditOutlined />}
        >
          Edit
        </Button>
        </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
      <Box display="flex" alignItems="center" gap="2rem" mb="0.5rem">
          <ContactPhoneOutlined fontSize="large" sx={{ color: main }} />
          <Typography fontSize="0.75rem" color={main}>{user ? `${user.contact}` : "loading"}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="2rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography fontSize="0.75rem" color={main}>{user ? `${user.location}` : "loading"}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="2rem" mb="0.5rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography fontSize="0.75rem" color={main}>{user ? `${user.occupation}` : "loading"}</Typography>
        </Box>
      </Box>

      </WidgetWrapper>
      </Box>
      </Box>
    </>
 );
}

export default ProfilePage;