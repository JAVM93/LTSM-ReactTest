import { Box } from "@mui/material";
import { useApi } from "../../context";

const UserImage = ({ image, size = "60px" }) => {
  const { apiBaseUrl } = useApi();
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${apiBaseUrl}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
