import { Avatar as MuiAvatar } from "@material-ui/core";
import styled from "styled-components";

export interface AvatarProps {}

const StyledAvatar = styled(MuiAvatar)`
  transition: filter 0.25s;
  transition: transform 0.25s;

  &:hover {
    filter: brightness(50%);
    transform: scale(1.2);
  }
`;

export const Avatar: React.FC<AvatarProps> = ({}) => {
  return <StyledAvatar />;
};
