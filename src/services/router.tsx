import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type RouteType = "home" | "products" | "profile" | "directory" | "dashboard" | "admin" | "not-found";

export interface RouteInfo {
  path: string;
  route: RouteType;
  params: Record<string, string>;
  search: string;
}

interface RouterContextType {
  currentRoute: RouteInfo;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export function parseLocation(pathname: string, search: string = ""): RouteInfo {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  const queryParams: Record<string, string> = {};
  if (search) {
    try {
      const searchParams = new URLSearchParams(search);
      searchParams.forEach((val, key) => {
        queryParams[key] = val;
      });
    } catch (e) {
      // Ignore URLSearchParams error
    }
  }

  // Public Smart Profile: /profile, /profile/:slug, /p/:slug, or /p
  if (
    cleanPath === "/profile" ||
    cleanPath.startsWith("/profile/") ||
    cleanPath.startsWith("/p/") ||
    cleanPath === "/p"
  ) {
    let slug = "";
    if (cleanPath.startsWith("/p/")) {
      slug = cleanPath.slice(3).split("/")[0];
    } else if (cleanPath.startsWith("/profile/")) {
      slug = cleanPath.slice(9).split("/")[0];
    }
    return {
      path: cleanPath,
      route: "profile",
      params: { ...queryParams, slug: slug || "al-yasmeen" },
      search
    };
  }

  // NFC Products Store: /products
  if (cleanPath === "/products") {
    return {
      path: cleanPath,
      route: "products",
      params: { ...queryParams },
      search
    };
  }

  // Syrian Business Directory: /directory
  if (cleanPath === "/directory") {
    return {
      path: cleanPath,
      route: "directory",
      params: { ...queryParams },
      search
    };
  }

  // Customer Dashboard: /dashboard
  if (cleanPath === "/dashboard") {
    return {
      path: cleanPath,
      route: "dashboard",
      params: { ...queryParams },
      search
    };
  }

  // Admin Dashboard: /admin
  if (cleanPath === "/admin") {
    return {
      path: cleanPath,
      route: "admin",
      params: { ...queryParams },
      search
    };
  }

  // Default: Main SHAM360 Website
  return {
    path: "/",
    route: "home",
    params: { ...queryParams },
    search
  };
}

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<RouteInfo>(() =>
    parseLocation(window.location.pathname, window.location.search)
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(parseLocation(window.location.pathname, window.location.search));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to.startsWith("http://") || to.startsWith("https://") || to.startsWith("//")) {
      window.location.href = to;
      return;
    }

    const [pathname, search = ""] = to.split("?");
    window.history.pushState(null, "", to);
    setCurrentRoute(parseLocation(pathname, search ? `?${search}` : ""));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <RouterContext.Provider value={{ currentRoute, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter(): RouterContextType {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, children, onClick, ...rest }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      if (href.startsWith("/") && !href.startsWith("//")) {
        e.preventDefault();
        navigate(href);
      }
    }
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export interface NavLinkProps extends Omit<LinkProps, "children"> {
  activeClassName?: string;
  exact?: boolean;
  children: ReactNode | ((props: { isActive: boolean }) => ReactNode);
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = "",
  activeClassName = "",
  exact = false,
  ...rest
}) => {
  const { currentRoute } = useRouter();
  const isActive = exact
    ? currentRoute.path === href
    : href === "/"
    ? currentRoute.path === "/"
    : currentRoute.path === href || currentRoute.path.startsWith(`${href}/`);

  const combinedClassName = `${className} ${isActive ? activeClassName : ""}`.trim();

  return (
    <Link href={href} className={combinedClassName} {...rest}>
      {typeof children === "function" ? children({ isActive }) : children}
    </Link>
  );
};
