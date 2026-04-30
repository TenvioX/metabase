// eslint-disable-next-line no-restricted-imports
import styled from "@emotion/styled";

import { NAV_SIDEBAR_WIDTH } from "metabase/nav/constants";
import {
  breakpointMaxSmall,
  breakpointMinSmall,
} from "metabase/styled-components/theme";
import { Box, type BoxProps } from "metabase/ui";

import { SidebarLink } from "./SidebarItems";
import { ExpandToggleButton } from "./SidebarItems/SidebarItems.styled";

export const Sidebar = styled.aside<{
  isOpen: boolean;
  side: "left" | "right";
  width?: string;
}>`
  ${({ isOpen }) => (isOpen ? "" : "display: none")};

  height: 100%;
  position: relative;
  flex-shrink: 0;
  align-items: center;
  background-color: #F8FAFC;
  z-index: 4;
  width: ${(props) => props.width ?? NAV_SIDEBAR_WIDTH};
  box-shadow: 4px 0 24px rgba(0, 82, 255, 0.05);
  ${(props) =>
    props.side === "left"
      ? "border-inline-end: 1px solid #e2e8f0;"
      : "border-inline-start: 1px solid #e2e8f0;"}

  ${breakpointMaxSmall} {
    width: 90vw;
    position: absolute;
    top: 0;
    ${(props) =>
      props.side === "left" ? "inset-inline-start: 0;" : "inset-inline-end: 0;"}
  }
`;

export const NavRoot = styled.nav<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: var(--mantine-spacing-sm);
  height: 100%;
  background-color: transparent;
  overflow-x: hidden;
  overflow-y: auto;

  ${breakpointMinSmall} {
    width: ${(props) => (props.isOpen ? NAV_SIDEBAR_WIDTH : 0)};
  }

  ${breakpointMaxSmall} {
    width: ${(props) => (props.isOpen ? "90vw" : 0)};
  }
`;

export const SidebarContentRoot = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const SidebarSection = styled(Box)<BoxProps>`
  margin-top: var(--mantine-spacing-sm);
  margin-bottom: var(--mantine-spacing-sm);
  padding-top: var(--mantine-spacing-xs);
  padding-bottom: var(--mantine-spacing-sm);
  padding-inline-start: var(--mantine-spacing-md);
  padding-inline-end: var(--mantine-spacing-md);
` as unknown as typeof Box;

export const TrashSidebarSection = styled(SidebarSection)`
  ${ExpandToggleButton} {
    width: 12px;
  }
` as unknown as typeof Box;

export const SidebarHeading = styled.h4`
  color: #94a3b8;
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding-inline-start: var(--mantine-spacing-md);
`;

export const LoadingAndErrorContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LoadingAndErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--mb-color-brand);
  text-align: center;
`;

export const PaddedSidebarLink = styled(SidebarLink)`
  padding-inline-start: 12px;
`;
