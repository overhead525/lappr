import { Avatar as MuiAvatar } from "@material-ui/core";
import styled from "styled-components";

export interface AvatarProps {
  username: string;
  profilePictureURL: string; // URL to image hosted on s3
}

const StyledAvatar = styled(MuiAvatar)`
  transition: filter 0.25s;
  transition: transform 0.25s;
  width: 8.5vw !important;
  height: 8.5vw !important;

  &:hover {
    filter: brightness(50%);
    transform: scale(1.2);
  }
`;

export const Avatar: React.FC<AvatarProps> = ({
  username = "roboMan",
  profilePictureURL = null,
}) => {
  return <StyledAvatar alt={username} src={profilePictureURL} />;
};
