import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/home";
import ProductListPage from "./pages/category";
import CartPage from "./pages/cart";
import { ThemeProvider } from "./components/theme-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <div className="container mx-auto py-8">Về chúng tôi</div>,
      },
      {
        path: "blog",
        element: <div className="container mx-auto py-8">Bài viết</div>,
      },
      {
        path: "category",
        element: <ProductListPage />,
      },
      {
        path: "contact",
        element: <div className="container mx-auto py-8">Liên hệ</div>,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "account",
        element: <div className="container mx-auto py-8">Tài khoản</div>,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
