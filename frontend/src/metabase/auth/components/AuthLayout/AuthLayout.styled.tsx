// eslint-disable-next-line no-restricted-imports
import styled from "@emotion/styled";

import { breakpointMinSmall } from "metabase/styled-components/theme";

export const LayoutRoot = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #F8FAFC;
  overflow: hidden;
  
  /* Tech Blue Background Glow */
  &::before {
    content: '';
    position: absolute;
    top: -20%;
    left: -10%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, rgba(0, 82, 255, 0.1) 0%, rgba(0, 224, 255, 0.05) 50%, rgba(248, 250, 252, 0) 70%);
    border-radius: 50%;
    filter: blur(60px);
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20%;
    right: -10%;
    width: 50%;
    height: 50%;
    background: radial-gradient(circle, rgba(0, 82, 255, 0.08) 0%, rgba(248, 250, 252, 0) 70%);
    border-radius: 50%;
    filter: blur(80px);
    z-index: 0;
  }
`;

export const LayoutBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1.5rem 1rem 3rem;
  min-height: 100vh;
  z-index: 10;
`;

export const LayoutCard = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  padding: 3rem 2rem;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px);
  box-shadow: 0 12px 48px rgba(0, 82, 255, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 24px;
  position: relative;
  overflow: hidden;

  ${breakpointMinSmall} {
    width: 28rem;
    padding: 3.5rem 4rem;
  }
`;

export const LayoutIllustration = styled.div<{
  backgroundImageSrc: string;
}>`
  display: none; /* Hide default legacy illustrations for modern look */
`;
