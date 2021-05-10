import styled from "styled-components";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

export interface ActionsMenuProps {}

const StyledActionMenu = styled.div`
  width: 100%;
  padding: 1vw 0;
  color: white;
  border-radius: 2vw 2vw 0 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #3388ff;
`;

export const ActionsMenu: React.FC<ActionsMenuProps> = () => {
  return (
    <StyledActionMenu>
      <ArrowUpwardIcon color="inherit" />
    </StyledActionMenu>
  );
};
