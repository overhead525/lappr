import { Typography } from "@material-ui/core";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

interface GrainularitySelectorProps {
  intervalStateUpdateFunction: (...args) => void;
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled(Typography)`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100&display=swap");
  font-family: "Inter", sans-serif;
  text-align: center;
  padding: 0.7vw 1.3vw;
  cursor: pointer;

  color: rgba(255, 255, 255, ${(props) => (props.on ? 1 : 0.56)});

  ${(props) =>
    props.on
      ? `
      box-shadow: inset 0.3vw 0.3vw 1vw #000000, inset -0.3vw -0.3vw 1vw #202324;
      border-radius: 0.5vw;
      `
      : null}
`;

export const GrainularitySelector: React.FC<GrainularitySelectorProps> = ({
  intervalStateUpdateFunction,
}) => {
  const [hoverState, setHoverState] = useState({
    "1m": "on",
    "5m": null,
    "15m": null,
    "1hr": null,
    "6hr": null,
    "1d": null,
  });

  const handleClick = (e: React.MouseEvent) => {
    const hoverStateCopy = { ...hoverState };
    Object.keys(hoverStateCopy).forEach((key) => (hoverStateCopy[key] = null));
    hoverStateCopy[e.currentTarget.textContent] = "on";
    intervalStateUpdateFunction(e.currentTarget.textContent);
    setHoverState(hoverStateCopy);
  };

  return (
    <StyledWrapper>
      <StyledText variant="caption" on={hoverState["1m"]} onClick={handleClick}>
        1m
      </StyledText>
      <StyledText variant="caption" on={hoverState["5m"]} onClick={handleClick}>
        5m
      </StyledText>
      <StyledText
        variant="caption"
        on={hoverState["15m"]}
        onClick={handleClick}
      >
        15m
      </StyledText>
      <StyledText
        variant="caption"
        on={hoverState["1hr"]}
        onClick={handleClick}
      >
        1hr
      </StyledText>
      <StyledText
        variant="caption"
        on={hoverState["6hr"]}
        onClick={handleClick}
      >
        6hr
      </StyledText>
      <StyledText variant="caption" on={hoverState["1d"]} onClick={handleClick}>
        1d
      </StyledText>
    </StyledWrapper>
  );
};
