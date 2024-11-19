import './App.css'
import Giphy from './Pages/Giphy';
import { queryClient } from "./util/http.js";
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const router = createBrowserRouter([
  { path: "/giphy", element: <Giphy /> }
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  )
}

export default App;
