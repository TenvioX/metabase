import type { Location } from "history";
import { t } from "ttag";
import _ from "underscore";

import { usePageTitle } from "metabase/hooks/use-page-title";
import type { AuthProvider } from "metabase/plugins/types";
import { useSelector } from "metabase/redux";
import { getApplicationName } from "metabase/selectors/whitelabel";
import { Box, Divider } from "metabase/ui";
import { LogoIcon } from "metabase/common/components/LogoIcon";

import { getAuthProviders } from "../../selectors";
import { AuthLayout } from "../AuthLayout";

interface LoginQueryString {
  redirect?: string;
}

interface LoginQueryParams {
  provider?: string;
}

interface LoginProps {
  params?: LoginQueryParams;
  location?: Location<LoginQueryString>;
}

export const Login = ({ params, location }: LoginProps): JSX.Element => {
  const providers = useSelector(getAuthProviders);
  const selection = getSelectedProvider(providers, params?.provider);
  const redirectUrl = location?.query?.redirect;
  const applicationName = useSelector(getApplicationName);

  usePageTitle(t`Login`);

  const [passwordProvider, otherProviders] = _.partition(
    providers,
    (provider) => provider.name === "password",
  );
  return (
    <AuthLayout>
      <Box ta="center" mb="2rem">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <LogoIcon height={48} />
        </div>
        <Box
          role="heading"
          fz="1.5rem"
          fw="bolder"
          lh="2rem"
          c="#0f172a"
        >
          {t`Sign in to ${applicationName}`}
        </Box>
        <Box mt="0.5rem" fz="0.875rem" c="#64748b">
          欢迎回来，请输入您的凭证以继续
        </Box>
      </Box>
      {selection && selection.Panel && (
        <Box mt="2.5rem">
          <selection.Panel redirectUrl={redirectUrl} />
        </Box>
      )}
      {!selection && (
        <Box mt="3.5rem">
          {otherProviders.map((provider) => (
            <Box key={provider.name} mt="2rem" ta="center">
              <provider.Button isCard={true} redirectUrl={redirectUrl} />
            </Box>
          ))}
          {passwordProvider.map((provider) => (
            <>
              <Divider mt="2rem" />
              <Box key={provider.name} mt="1rem" ta="center">
                <provider.Button isCard={true} redirectUrl={redirectUrl} />
              </Box>
            </>
          ))}
        </Box>
      )}
    </AuthLayout>
  );
};

const getSelectedProvider = (
  providers: AuthProvider[],
  providerName?: string,
): AuthProvider | undefined => {
  const provider =
    providers.length > 1
      ? providers.find((p) => p.name === providerName)
      : providers[0];

  return provider?.Panel ? provider : undefined;
};
