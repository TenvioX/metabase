import type { ReactNode } from "react";
import { useState } from "react";
import { t } from "ttag";

import { useHasTokenFeature, useSetting } from "metabase/common/hooks";
import { useSelector } from "metabase/redux";
import { getUser, getUserIsAdmin } from "metabase/selectors/user";
import { Box, Button, Icon, Tooltip } from "metabase/ui";

import { CustomHomePageModal } from "../CustomHomePageModal";
import { EmbeddingHubHomePage } from "../EmbeddingHubHomePage";

interface HomeLayoutProps {
  children?: ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps): ReactNode => {
  const [showModal, setShowModal] = useState(false);
  const isAdmin = useSelector(getUserIsAdmin);

  const user = useSelector(getUser);
  const embeddingHomepage = useSetting("embedding-homepage");
  const isSimpleEmbeddingAvailable = useHasTokenFeature("embedding_simple");

  if (
    embeddingHomepage === "visible" &&
    user?.is_superuser &&
    isSimpleEmbeddingAvailable
  ) {
    return <EmbeddingHubHomePage />;
  }

  return (
    <Box
      data-testid="home-page"
      pos="relative"
      p={{
        base: "1.25rem",
        md: "2rem 2.5rem",
        lg: "2.5rem 3rem",
        xl: "3rem 4rem",
      }}
      mih="100%"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      {isAdmin && (
        <Tooltip label={t`Pick a dashboard to serve as the homepage`}>
          <Button
            pos="absolute"
            top="0.75rem"
            right="1rem"
            variant="subtle"
            leftSection={<Icon name="pencil" />}
            onClick={() => setShowModal(true)}
          >
            {t`Customize`}
          </Button>
        </Tooltip>
      )}
      <Box
        pos="relative"
        mt={{
          base: "1.5rem",
          md: "2rem",
          lg: "2.5rem",
        }}
      >
        {children}
      </Box>
      <CustomHomePageModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </Box>
  );
};
