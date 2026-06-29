import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Chatbot from './components/chat/ChatBot';
import ReviewList from './components/reviews/ReviewList';
import { productsApi } from './components/reviews/productsApi';

function App() {
   const [explicitlySelectedId, setExplicitlySelectedId] = useState<
      number | null
   >(null);

   const productsQuery = useQuery({
      queryKey: ['products'],
      queryFn: productsApi.fetchProducts,
   });

   const selectedProductId =
      explicitlySelectedId ?? productsQuery.data?.[0]?.id;

   const location = useLocation();

   return (
      <div className="p-4 h-screen w-full flex flex-col bg-gray-50">
         <header className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
               AI-Powered E-Commerce Tools
            </h1>
            {location.pathname.startsWith('/reviews') && (
               <div className="flex items-center gap-4 mb-4">
                  <span className="font-semibold">Select a product:</span>
                  {productsQuery.isLoading && <span>Loading products...</span>}
                  {productsQuery.isError && (
                     <span className="text-red-500">
                        Could not fetch products.
                     </span>
                  )}
                  {productsQuery.data?.map((product) => (
                     <button
                        key={product.id}
                        onClick={() => setExplicitlySelectedId(product.id)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                           selectedProductId === product.id
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-white text-gray-700 hover:bg-gray-100 border'
                        }`}
                     >
                        {product.name}
                     </button>
                  ))}
               </div>
            )}
            <nav className="flex items-center gap-4 border-b pb-2">
               <Link
                  to="/reviews"
                  className={`px-4 py-2 rounded-t-lg transition-colors text-lg ${
                     location.pathname.startsWith('/reviews')
                        ? 'border-b-2 border-blue-600 font-semibold text-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                  }`}
               >
                  Reviews
               </Link>
               <Link
                  to="/chatbot"
                  className={`px-4 py-2 rounded-t-lg transition-colors text-lg ${
                     location.pathname.startsWith('/chatbot')
                        ? 'border-b-2 border-blue-600 font-semibold text-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                  }`}
               >
                  Chatbot
               </Link>
            </nav>
         </header>
         <main className="grow pt-4">
            <Routes>
               <Route
                  path="/reviews"
                  element={
                     selectedProductId ? (
                        <ReviewList productId={selectedProductId} />
                     ) : null
                  }
               />
               <Route path="/chatbot" element={<Chatbot />} />
               <Route path="*" element={<Navigate to="/reviews" replace />} />
            </Routes>
         </main>
      </div>
   );
}

export default App;
