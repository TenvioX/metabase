import type { ReactNode } from "react";

import { useSelector } from "metabase/redux";
import { getLoginPageIllustration } from "metabase/selectors/whitelabel";

import {
  LayoutBody,
  LayoutCard,
  LayoutIllustration,
  LayoutRoot,
} from "./AuthLayout.styled";
interface AuthLayoutProps {
  children?: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps): JSX.Element => {
  const loginPageIllustration = useSelector(getLoginPageIllustration);

  return (
    <LayoutRoot data-testid="login-page">
      <LayoutBody>
        {/* We place the logo directly inside the card in the modern design, 
            or handled by the child component. But we can leave an anchor here if needed. 
            For the modern look, we let Login.tsx render the title. */}
        <LayoutCard>{children}</LayoutCard>
      </LayoutBody>
    </LayoutRoot>
  );
};
