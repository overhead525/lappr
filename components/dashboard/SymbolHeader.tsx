import styled from "styled-components";

export interface SymbolHeaderProps {
  symbol: string;
  price: number;
  theme: "light" | "dark";
}

const StyledSymbolHeaderContentWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap");

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  font-family: "Inter", sans-serif;
  font-weight: 900;
  color: ${(props) => {
      const options = {
        light: "#000000;",
        dark: "#FFFFFF;",
      };
      return options[props.theme] ? options[props.theme] : options.light;
    }}
    h1 {
    font-size: 5.9vw;
  }
`;

export const SymbolHeader: React.FC<SymbolHeaderProps> = ({
  symbol,
  price,
  theme,
}) => {
  const parsedPrice: string = "$" + price.toLocaleString();

  return (
    <StyledSymbolHeaderContentWrapper theme={theme}>
      <h1>{symbol}</h1>
      <h1>{parsedPrice}</h1>
    </StyledSymbolHeaderContentWrapper>
  );
};
