import styled from "styled-components";
import { Avatar } from "./Avatar";

export interface PodiumProps {
  position: 1 | 2 | 3 | 4 | 5;
}

const positionMatches = {
  1: 3,
  2: 2,
  3: 4,
  4: 1,
  5: 5,
};

export interface StageProps {
  podiums: JSX.Element[];
}

const StyledPodium = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap");

  background-color: #2266ff;
  text-align: center;
  padding-top: 1vw;
  font-size: 3.5vw;
  font-weight: 700;
  font-family: "Inter", sans-serif;
  color: #ffffff;

  flex-grow: 1;
`;

const StyledPodiumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  grid-column: ${(props) => positionMatches[props.position]} / span 1;
  grid-row-start: ${(props) => props.position};
  grid-row-end: 6;
`;

const StyledAvatarWrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

const StyledStage = styled.div`
  width: 100%;
  height: 52vw;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 3fr;

  margin-bottom: 3vw;
`;

export const Podium: React.FC<PodiumProps> = ({ position }) => {
  return (
    <StyledPodiumWrapper position={position}>
      <StyledAvatarWrapper>
        <Avatar username={"roboMan"} profilePictureURL={null} />
      </StyledAvatarWrapper>
      <StyledPodium>{position}</StyledPodium>
    </StyledPodiumWrapper>
  );
};

export const Stage: React.FC<StageProps> = ({ podiums }) => {
  return <StyledStage>{podiums}</StyledStage>;
};
