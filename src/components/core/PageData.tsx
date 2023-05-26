/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface PageLink {
  title: string;
  path: string;
  isActive: boolean;
  isSeparator?: boolean;
}

export interface PageDataContextModel {
  pageTitle?: string;
  setPageTitle: (_title: string) => void;
  idCreateButton?: string;
  setIdCreateButton: (_title: string) => void;
  pageDescription?: string;
  setPageDescription: (_description: string) => void;
  hideButton?: boolean;
  setHideButton: (_hide: boolean) => void;
  pageBreadcrumbs?: Array<PageLink>;
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void;
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => {},
  setIdCreateButton: (_idCreateButton: string) => {},
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
  setPageDescription: (_description: string) => {},
  setHideButton: (_hide: boolean) => {},
});

const PageDataProvider: React.FC = ({ children }) => {
  const [pageTitle, setPageTitle] = useState<string>("");
  const [idCreateButton, setIdCreateButton] = useState<string>("");
  const [pageDescription, setPageDescription] = useState<string>("");
  const [hideButton, setHideButton] = useState<boolean>(false);
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([]);
  const value: PageDataContextModel = {
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription,
    pageBreadcrumbs,
    setPageBreadcrumbs,
    idCreateButton,
    setIdCreateButton,
    hideButton,
    setHideButton,
  };
  return (
    <PageDataContext.Provider value={value}>
      {children}
    </PageDataContext.Provider>
  );
};

function usePageData() {
  return useContext(PageDataContext);
}

type Props = {
  description?: string;
  idCreateButton?: string;
  breadcrumbs?: Array<PageLink>;
  hideButton?: boolean;
};

const PageTitle: FC<Props> = ({
  children,
  description,
  breadcrumbs,
  idCreateButton,
  hideButton,
}) => {
  const {
    setPageTitle,
    setPageDescription,
    setPageBreadcrumbs,
    setIdCreateButton,
    setHideButton,
  } = usePageData();
  useEffect(() => {
    if (children) {
      // console.log('children', children.toString())
      setPageTitle(children.toString());
    }
    return () => {
      setPageTitle("");
    };
  }, [children]);
  useEffect(() => {
    if (idCreateButton) {
      setIdCreateButton(idCreateButton);
    }
    return () => {
      setIdCreateButton("");
    };
  }, [idCreateButton]);

  useEffect(() => {
    if (description) {
      setPageDescription(description);
    }
    return () => {
      setPageDescription("");
    };
  }, [description]);

  useEffect(() => {
    if (hideButton) {
      setHideButton(hideButton);
    }
    return () => {
      setHideButton(false);
    };
  }, [hideButton]);

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs);
    }
    return () => {
      setPageBreadcrumbs([]);
    };
  }, [breadcrumbs]);

  return <></>;
};

const PageDescription: React.FC = ({ children }) => {
  const { setPageDescription } = usePageData();
  useEffect(() => {
    if (children) {
      setPageDescription(children.toString());
    }
    return () => {
      setPageDescription("");
    };
  }, [children]);
  return <></>;
};

export { PageDescription, PageTitle, PageDataProvider, usePageData };
