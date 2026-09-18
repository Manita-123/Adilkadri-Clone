import React, { useState } from "react";
import { Search, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductList from "../component/ProductList";
import ComboProduct from "../component/ComboProducts";
import { products as allProducts, ComboProducts as allCombos } from "../data";

export default function SearchFilter({ placeholder = "Search products..." }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null); // null = no search yet, [] = searched no matches
  const navigate = useNavigate();

  const submit = (e) => {
    if (e) e.preventDefault();
    const q = query.trim().toLowerCase();

    if (!q) {
      // empty search -> clear results (or show all if you prefer)
      setResults(null);
      return;
    }

    // search both products and combos (title OR category match)
    const matchedProducts = allProducts.filter(
      (p) =>
        String(p.title || "").toLowerCase().includes(q) ||
        String(p.category || "").toLowerCase().includes(q)
    );

    const matchedCombos = allCombos.filter(
      (p) =>
        String(p.title || "").toLowerCase().includes(q) ||
        String(p.category || "").toLowerCase().includes(q)
    );

    // Combine results (if you want to keep them separate you can)
    const combined = [...matchedProducts, ...matchedCombos];

    setResults(combined);
  };

  const clear = () => {
    setQuery("");
    setResults(null);
  };

  return (
    <div className="container mx-auto px-4 md:px-10">
      <form onSubmit={submit} className="mx-6 my-10">
        <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Go home"
            className="p-2 text-amber-950 bg-amber-50 border border-amber-300 rounded-l-xl hover:bg-amber-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button type="submit" aria-label="Search" className="p-2 text-gray-700 hover:text-amber-950">
            <Search className="w-5 h-5" />
          </button>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label="Search Products"
            className="flex-1 px-3 py-2 bg-transparent outline-none"
          />

          {query && (
            <button type="button" aria-label="Clear search" onClick={clear} className="p-2 text-gray-700 hover:text-amber-950">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* If no search yet, show existing sections */}
      {results === null ? (
        <>
          <ProductList />
          <ComboProduct title="Combo" />
        </>
      ) : (
        // Show search results
        <div className="mx-6 mb-12">
          {results.length === 0 ? (
            <p className="text-center text-gray-600">No results for “{query}”</p>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Results for “{query}”</h2>

              <div className="grid   sm:grid-cols-2 md:grid-cols-3 gap-8">
                {results.map((p, i) => (
                  <div key={p.id ?? `r-${i}`} className="bg-white rounded-lg  flex flex-col items-center">
                    {/* product.img in your data is an imported image module */}
                    <img src={p.img} alt={p.title} className="w-full mt-5 object-contain rounded-2xl" />
                    <div className=" text-center font-medium text-xl mt-3">{p.title}</div>
                    <div className="text-xs text-gray-500">{p.category}</div>
                    <div className="mt-2 text-amber-950 font-semibold">₹{p.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}