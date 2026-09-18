import { Navigate, useLocation } from 'react-router-dom'

export default function CheckAuth({ loading, user, children }) {
  const location = useLocation();
  // Wait until localStorage is checked
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl font-semibold text-amber-700 animate-pulse">Loading System Context...</div>
      </div>
    );
  }

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  // Login / Signup
  if (
    (location.pathname === "/login" ||
      location.pathname === "/signup") &&
    isAuthenticated
  ) {
    return (
      <Navigate
        to={isAdmin ? "/admin/dashboard" : "/home"}
        replace
      />
    );
  }

  // Admin pages
  if (location.pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
      return <Navigate to="/unauth-page" replace />;
    }
  }

  // User protected pages
  const protectedRoutes = [
    "/cart",
    "/account",
    "/checkout",
    "/order",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    isAuthenticated && 
    isAdmin && 
    (location.pathname === "/" || location.pathname.startsWith("/home") || isProtectedRoute)
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}