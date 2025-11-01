"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type AsideItem = {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: { id: string; label: string; href?: string }[];
};

type AsideProps = {
  items?: AsideItem[];
  defaultCollapsed?: boolean;
  className?: string;
  onCollapseChange?: (collapsed: boolean) => void;
};

const defaultItems: AsideItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
   {
    id: "Auth",
    label: "Auth",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM8 11c1.657 0 3-1.567 3-3.5S9.657 4 8 4 5 5.567 5 7.5 6.343 11 8 11zM8 13c-2.33 0-7 1.167-7 3.5V20h14v-3.5c0-2.333-4.67-3.5-7-3.5zM16 13c-.29 0-.59.02-.89.05 1.16.86 1.89 1.98 1.89 3.45V20h6v-3.5c0-2.333-4.67-3.5-7-3.5z" strokeWidth="0.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
     children: [
      { id: "users", label: "Users", href: "/a" },
      { id: "subscribers", label: "News Letter Subscribers", href: "/a" },
    ],
  },
  {
    id: "DGMagazine",
    label: "DGMagazine",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 7h18M3 12h18M3 17h18" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    children: [
      { id: "article", label: "Create Article", href: "/a" },
      { id: "news", label: "Create News", href: "/a" },
      { id: "awareness", label: "Create Awareness", href: "/D" },
      { id: "comments", label: "Moderate Comments", href: "/D" },
    ],
  },
  {
    id: "DGAcademy",
    label: "DGAcademy",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM8 11c1.657 0 3-1.567 3-3.5S9.657 4 8 4 5 5.567 5 7.5 6.343 11 8 11zM8 13c-2.33 0-7 1.167-7 3.5V20h14v-3.5c0-2.333-4.67-3.5-7-3.5zM16 13c-.29 0-.59.02-.89.05 1.16.86 1.89 1.98 1.89 3.45V20h6v-3.5c0-2.333-4.67-3.5-7-3.5z" strokeWidth="0.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
  },
  {
    id: "DGCloud",
    label: "DGCloud",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM8 11c1.657 0 3-1.567 3-3.5S9.657 4 8 4 5 5.567 5 7.5 6.343 11 8 11zM8 13c-2.33 0-7 1.167-7 3.5V20h14v-3.5c0-2.333-4.67-3.5-7-3.5zM16 13c-.29 0-.59.02-.89.05 1.16.86 1.89 1.98 1.89 3.45V20h6v-3.5c0-2.333-4.67-3.5-7-3.5z" strokeWidth="0.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
  },
  {
    id: "DGMedia",
    label: "DGMedia",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM8 11c1.657 0 3-1.567 3-3.5S9.657 4 8 4 5 5.567 5 7.5 6.343 11 8 11zM8 13c-2.33 0-7 1.167-7 3.5V20h14v-3.5c0-2.333-4.67-3.5-7-3.5zM16 13c-.29 0-.59.02-.89.05 1.16.86 1.89 1.98 1.89 3.45V20h6v-3.5c0-2.333-4.67-3.5-7-3.5z" strokeWidth="0.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    children: [
      { id: "event", label: "Create Event", href: "/a" },
    ],
  },
 
];

export default function Aside({ 
  items, 
  defaultCollapsed = false, 
  className = "",
  onCollapseChange 
}: AsideProps) {
  const navItems = items ?? defaultItems;
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Auto-open parent items when child is active
  useEffect(() => {
    const newOpenItems = new Set<string>();
    navItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => 
          child.href && isActive(child.href)
        );
        if (hasActiveChild) {
          newOpenItems.add(item.id);
        }
      }
    });
    setOpenItems(newOpenItems);
  }, [pathname, navItems]);

  // Close mobile when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Keyboard and click outside handlers
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);

  // Collapse change callback
  useEffect(() => {
    onCollapseChange?.(collapsed);
  }, [collapsed, onCollapseChange]);

  const toggleOpen = useCallback((id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const toggleCollapse = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const isActive = useCallback((href?: string) => {
    if (!href) return false;
    return pathname === href || pathname?.startsWith(href + "/");
  }, [pathname]);

  const isItemOpen = useCallback((id: string) => {
    return openItems.has(id);
  }, [openItems]);

  // Navigation item component
  const NavItem = ({ item }: { item: AsideItem }) => {
    const hasChildren = !!item.children?.length;
    const itemActive = isActive(item.href);
    const isOpen = isItemOpen(item.id);

    return (
      <li className="rounded-lg" role="none">
        <div className={`flex items-center justify-between gap-2 ${collapsed ? "py-2 px-2" : "py-2 px-3"}`}>
          {/* Main link/button */}
          {hasChildren ? (
            <button
              onClick={() => toggleOpen(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleOpen(item.id);
                }
              }}
              className={`flex items-center gap-3 w-full text-sm font-medium rounded-md p-2 transition-colors duration-150 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 ${
                collapsed ? "justify-center" : "justify-start"
              } ${itemActive ? "font-semibold bg-black/5" : ""}`}
              aria-expanded={isOpen}
              aria-controls={`${item.id}-submenu`}
              role="button"
            >
              <span className="flex-none" aria-hidden="true">
                {item.icon}
              </span>
              {!collapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}
            </button>
          ) : (
            <Link
              href={item.href ?? "#"}
              className={`flex items-center gap-3 w-full text-sm font-medium rounded-md p-2 transition-colors duration-150 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 ${
                collapsed ? "justify-center" : "justify-start"
              } ${itemActive ? "font-semibold bg-black/5" : ""}`}
              aria-current={itemActive ? "page" : undefined}
            >
              <span className="flex-none" aria-hidden="true">
                {item.icon}
              </span>
              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </Link>
          )}

          {/* Chevron for items with children */}
          {hasChildren && !collapsed && (
            <button
              onClick={() => toggleOpen(item.id)}
              aria-label={isOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
              className="p-1 rounded-md hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors duration-150"
              aria-expanded={isOpen}
            >
              <svg 
                className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Dropdown panel */}
        {hasChildren && (
          <div
            id={`${item.id}-submenu`}
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } ${collapsed ? "hidden" : ""}`}
            aria-hidden={!isOpen}
            role="menu"
          >
            <ul className={`mt-1 ml-8 mr-2 mb-2 space-y-1`}>
              {item.children!.map((child) => {
                const childActive = isActive(child.href);
                return (
                  <li key={child.id} role="none">
                    <Link
                      href={child.href ?? "#"}
                      className={`block text-sm px-3 py-2 rounded-md transition-colors duration-150 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 ${
                        childActive ? "font-semibold bg-black/5" : ""
                      }`}
                      role="menuitem"
                      aria-current={childActive ? "page" : undefined}
                    >
                      {child.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </li>
    );
  };

  return (
    <>
      {/* Mobile header controls */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-sidebar"
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg border border-black/20 bg-white text-black shadow-sm hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors duration-150"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Desktop sidebar wrapper with hover detection */}
      <div 
        className={`hidden md:flex ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <aside
          ref={sidebarRef}
          aria-label="Main navigation"
          className={`relative shrink-0 flex-col bg-white text-black border-r border-black/20 min-h-screen transition-all duration-300 ${
            collapsed ? "w-16" : "w-64"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-black/10">
            <div className="flex items-center gap-3 min-w-0">
              {/* <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold bg-black text-white"
                aria-hidden="true"
              >
                DG
              </div> */}
              {!collapsed && (
                <span className="text-xl font-bold text-black truncate">
                  DGHub
                </span>
              )}
            </div>

            {/* Collapse/expand button - Always visible when expanded, visible on hover when collapsed */}
            <button
              aria-pressed={collapsed}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={toggleCollapse}
              className={`p-1.5 rounded-md hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors duration-150 ${
                collapsed ? (isHovered ? "opacity-100" : "opacity-100") : "opacity-100"
              }`}
              title={collapsed ? "Expand" : "Collapse"}
            >
              <svg 
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  collapsed ? "rotate-0" : "rotate-180"
                }`} 
                viewBox="0 0 24 24" 
                fill="none" 
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1" role="menubar" aria-orientation="vertical">
              {navItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-black/10">
            <button
              className={`w-full text-sm py-2.5 px-3 rounded-lg border border-black/20 bg-white text-black hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors duration-150 ${
                collapsed ? "flex justify-center" : ""
              }`}
              onClick={() => alert("Help & feedback — dummy action")}
            >
              {!collapsed ? "Help & feedback" : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </aside>
      </div>

      {/* Mobile overlay and drawer */}
      {mobileOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div 
            className="absolute inset-0 bg-black/40 transition-opacity duration-300"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          
          <aside
            ref={sidebarRef}
            id="mobile-sidebar"
            className="absolute left-0 top-0 bottom-0 w-80 bg-white text-black border-r border-black/20 shadow-xl p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out"
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold bg-black text-white">
                  DG
                </div>
                <span className="text-sm font-semibold text-black">DGHub</span>
              </div>

              <button 
                onClick={() => setMobileOpen(false)} 
                aria-label="Close navigation menu"
                className="p-1.5 rounded-md hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors duration-150"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Mobile navigation */}
            <nav>
              <ul className="space-y-1" role="menubar" aria-orientation="vertical">
                {navItems.map((item) => {
                  const hasChildren = !!item.children?.length;
                  const itemActive = isActive(item.href);
                  const isOpen = isItemOpen(item.id);

                  return (
                    <li key={item.id} className="rounded-lg" role="none">
                      <div className="flex items-center justify-between gap-2 py-1">
                        {hasChildren ? (
                          <button
                            onClick={() => toggleOpen(item.id)}
                            className={`flex items-center gap-3 w-full text-sm font-medium rounded-md p-2 transition-colors duration-150 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 ${
                              itemActive ? "font-semibold bg-black/5" : ""
                            }`}
                            aria-expanded={isOpen}
                            aria-controls={`mobile-${item.id}-submenu`}
                          >
                            <span className="flex-none" aria-hidden="true">
                              {item.icon}
                            </span>
                            <span className="truncate flex-1 text-left">{item.label}</span>
                          </button>
                        ) : (
                          <Link 
                            href={item.href ?? "#"} 
                            className={`flex items-center gap-3 w-full text-sm font-medium rounded-md p-2 transition-colors duration-150 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 ${
                              itemActive ? "font-semibold bg-black/5" : ""
                            }`}
                            onClick={() => setMobileOpen(false)}
                            aria-current={itemActive ? "page" : undefined}
                          >
                            <span className="flex-none" aria-hidden="true">
                              {item.icon}
                            </span>
                            <span className="truncate">{item.label}</span>
                          </Link>
                        )}

                        {hasChildren && (
                          <button 
                            onClick={() => toggleOpen(item.id)}
                            aria-label={isOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
                            className="p-1 rounded-md hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors duration-150"
                            aria-expanded={isOpen}
                          >
                            <svg 
                              className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              aria-hidden="true"
                            >
                              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {hasChildren && (
                        <div
                          id={`mobile-${item.id}-submenu`}
                          className={`overflow-hidden transition-all duration-200 ease-in-out ${
                            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          }`}
                          aria-hidden={!isOpen}
                          role="menu"
                        >
                          <ul className="ml-8 mt-1 space-y-1">
                            {item.children!.map((child) => {
                              const childActive = isActive(child.href);
                              return (
                                <li key={child.id} role="none">
                                  <Link
                                    href={child.href ?? "#"}
                                    className={`block text-sm px-3 py-2 rounded-md transition-colors duration-150 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 ${
                                      childActive ? "font-semibold bg-black/5" : ""
                                    }`}
                                    onClick={() => setMobileOpen(false)}
                                    role="menuitem"
                                    aria-current={childActive ? "page" : undefined}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}