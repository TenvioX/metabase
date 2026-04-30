// eslint-disable-next-line no-restricted-imports
import styled from "@emotion/styled";

import { Link } from "metabase/common/components/Link";
import {
  breakpointMinLarge,
  breakpointMinSmall,
} from "metabase/styled-components/theme";
import { alpha } from "metabase/ui/colors";

export const CardRoot = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #E2E8F0;
  border-radius: 0.75rem;
  background: linear-gradient(to bottom, #FFFFFF, rgba(248, 250, 252, 0.5));
  box-shadow: 0 4px 12px rgba(0, 62, 199, 0.05);
  max-width: 100%;
  transition: box-shadow 200ms ease, transform 200ms ease;

  ${breakpointMinSmall} {
    max-width: 50%;
  }

  ${breakpointMinLarge} {
    padding: 1.5rem;
  }

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 62, 199, 0.1);
    transform: translateY(-1px);
  }
`;
