import cx from "classnames";

import CS from "metabase/css/core/index.css";
import { PLUGIN_LOGO_ICON_COMPONENTS } from "metabase/plugins";

import logoLight from "metabase/assets/logo-light-128x32.png";
import logoDark from "metabase/assets/logo-dark-128x32.png";

interface LogoIconProps {
  width?: number;
  height?: number;
  dark?: boolean;
  fill?: string;
}

export const DefaultLogoIcon = ({
  dark,
  height = 32,
  width,
}: LogoIconProps) => {
  return (
    <img
      className={cx("Icon")}
      src={dark ? logoDark : logoLight}
      height={height}
      width={width}
      style={{ 
        display: "block", 
        objectFit: "contain",
        height: height ? `${height}px` : "32px",
        width: width ? `${width}px` : "auto",
        maxWidth: "100%"
      }}
      alt="TenvioX Logo"
      data-testid="main-logo"
    />
  );
};


export function LogoIcon(props: LogoIconProps) {
  const [Component = DefaultLogoIcon] = PLUGIN_LOGO_ICON_COMPONENTS;
  return <Component {...props} />;
}
