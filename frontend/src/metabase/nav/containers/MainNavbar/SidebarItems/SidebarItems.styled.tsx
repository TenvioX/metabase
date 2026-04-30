// eslint-disable-next-line no-restricted-imports
import { css } from "@emotion/react";
// eslint-disable-next-line no-restricted-imports
import styled from "@emotion/styled";
import type { ComponentProps } from "react";
import { forwardRef } from "react";

import { Link } from "metabase/common/components/Link";
import { TreeNode } from "metabase/common/components/tree/TreeNode";
import { NAV_SIDEBAR_WIDTH } from "metabase/nav/constants";
import type { IconProps } from "metabase/ui";
import { Icon, Tooltip } from "metabase/ui";
import type { ColorName } from "metabase/ui/colors/types";
import { color } from "metabase/ui/utils/colors";

export const SidebarIcon = styled(
  forwardRef<SVGSVGElement, IconProps & { isSelected: boolean }>(
    function SidebarIcon({ isSelected, ...props }, ref) {
      return <Icon {...props} size={props.size ?? 16} ref={ref} />;
    },
  ),
)<{
  color?: ColorName | string;
  isSelected: boolean;
}>`
  ${(props) =>
    !props.color &&
    css`
      color: #94a3b8;
    `}
`;

export const ExpandToggleButton = styled(TreeNode.ExpandToggleButton)`
  padding: 4px 0 4px 2px;
  color: #94a3b8;
`;

const activeColorCSS = css`
  color: var(--mb-color-brand);
`;

function getTextColor(isSelected: boolean) {
  return isSelected ? color("brand") : "#64748b";
}

type NodeRootProps = ComponentProps<typeof TreeNode.Root> & {
  hasDefaultIconStyle?: boolean;
};

export const NodeRoot = styled(TreeNode.Root)<NodeRootProps>`
  color: ${(props) => getTextColor(props.isSelected)};
  background-color: ${(props) =>
    props.isSelected ? "rgba(239, 246, 255, 0.5)" : "transparent"};
  padding-left: ${(props) => props.depth}rem;
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: 8px;
  transition: all 200ms ease;
  margin-bottom: 2px;
  ${(props) =>
    props.isSelected &&
    css`
      border-right: 4px solid #2563eb;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      margin-right: -1px;
      box-shadow: inset 0 1px 3px rgba(0, 82, 255, 0.05);
      font-weight: 500;
    `}

  &:focus-within {
    outline: 2px solid var(--mb-color-focus);
    outline-offset: -2px;
  }

  ${ExpandToggleButton} {
    ${(props) => props.isSelected && activeColorCSS}
  }

  &:hover {
    background-color: #f1f5f9;
    color: var(--mb-color-brand);
    padding-left: ${(props) => (props.depth || 0)}rem;

    ${ExpandToggleButton} {
      color: var(--mb-color-brand);
    }
  }

  &:hover,
  &:focus,
  &:focus-within {
    ${SidebarIcon} {
      ${({ hasDefaultIconStyle = true }) =>
        hasDefaultIconStyle && activeColorCSS};
    }
  }
`;

const collectionDragAndDropHoverStyle = css`
  color: var(--mb-color-text-primary-inverse);
  background-color: var(--mb-color-brand);
`;

export const CollectionNodeRoot = styled(NodeRoot)<{ hovered?: boolean }>`
  ${(props) => props.hovered && collectionDragAndDropHoverStyle}
`;

const itemContentStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const FullWidthButton = styled.button<{ isSelected: boolean }>`
  color: inherit;
  cursor: pointer;

  ${itemContentStyle}
  ${TreeNode.NameContainer} {
    font-weight: 700;
    color: ${(props) => (props.isSelected ? color("brand") : "inherit")};
    text-align: start;

    &:hover {
      color: var(--mb-color-brand);
    }
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

export const FullWidthLink = styled(Link)`
  ${itemContentStyle}

  &:focus,
  &:focus-visible {
    outline: none !important;
  }
`;

const ITEM_NAME_LENGTH_TOOLTIP_THRESHOLD = 35;
const ITEM_NAME_LABEL_WIDTH = Math.round(parseInt(NAV_SIDEBAR_WIDTH, 10) * 0.7);

export const ItemName = styled(TreeNode.NameContainer)`
  width: ${ITEM_NAME_LABEL_WIDTH}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function NameContainer({ children: itemName }: { children: string }) {
  if (itemName.length >= ITEM_NAME_LENGTH_TOOLTIP_THRESHOLD) {
    return (
      <Tooltip label={itemName} withArrow maw="none">
        <ItemName>{itemName}</ItemName>
      </Tooltip>
    );
  }
  return <TreeNode.NameContainer>{itemName}</TreeNode.NameContainer>;
}

export const LeftElementContainer = styled.div``;
export const RightElementContainer = styled.div``;
