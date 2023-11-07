import { useState, useEffect } from "react";
import { Box, Stack, Typography, Modal } from "@mui/material";
import { Sidebar, Videos } from "../components";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#000",
  border: "2px solid #f00",
  p: 4,
};

const Feed = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {
        setVideos(data.items);
      })
      .catch((error) => {
        handleOpen();

        // alert("API call limit exceeded. Please head back");
        // window.history.back();
      });
  }, [selectedCategory]);
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            color={"#fff"}
            component="h2"
          >
            API calls exceeded. Come back tommorow
          </Typography>
          <button
            style={{
              padding: "10px 15px",
              marginLeft: "75%",
              marginRight: "5px",
              marginTop: "10px",
              backgroundColor: "#f00",
              color: "#fff",
              border: "none",
              outline: "none",
              fontWeight: "900",
            }}
            onClick={() => {
              window.history.back();
            }}
          >
            Go Back
          </button>
        </Box>
      </Modal>
      <Stack
        sx={{
          flexDirection: { sx: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            height: { sx: "auto", md: "92vh" },
            borderRight: "1px solid #3d3d3d",
            px: { sx: 0, md: 2 },
            overflowY: "auto",
          }}
        >
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Typography
            className="copyright"
            variant="body2"
            sx={{ my: 1.5, color: "#fff" }}
          >
            Copyright 2023{" "}
            
          </Typography>
        </Box>
        <Box p={1} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{ color: "white" }}
          >
            {selectedCategory} <span style={{ color: "#f31503" }}>Videos</span>
          </Typography>
          <Videos videos={videos} />
        </Box>
      </Stack>
    </>
  );
};

export default Feed;