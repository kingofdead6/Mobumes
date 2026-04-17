"use client";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../api";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Toutes les catégories");
  const [availableCategories, setAvailableCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const productsPerPage = 9;

  // Read category from URL
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    setSelectedCategory(categoryFromUrl || "Toutes les catégories");
  }, [searchParams]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/products/featured`);
        const allProducts = res.data || [];
        setProducts(allProducts);

        const uniqueCategories = [
          ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
        ];
        setAvailableCategories(["Toutes les catégories", ...uniqueCategories.sort()]);
      } catch (err) {
        toast.error("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);

    if (category === "Toutes les catégories") {
      navigate("/products", { replace: true });
    } else {
      navigate(`/products?category=${encodeURIComponent(category)}`, { replace: true });
    }
  };

  const filteredProducts = React.useMemo(() => {
    if (selectedCategory === "Toutes les catégories") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const clearFilters = () => {
    setSelectedCategory("Toutes les catégories");
    setCurrentPage(1);
    navigate("/products", { replace: true });
    setIsFilterOpen(false);
  };

  const hasActiveFilter = selectedCategory !== "Toutes les catégories";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-3xl font-light text-stone-600 animate-pulse">
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-25 "> {/* Extra bottom padding for mobile button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-950">
            Nos Produits
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-stone-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé
            {hasActiveFilter && ` dans "${selectedCategory}"`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-white rounded-3xl p-8 border border-stone-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Catégories</h3>
              <div className="space-y-1">
                {availableCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-stone-900 text-white"
                        : "hover:bg-stone-100 text-stone-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {hasActiveFilter && (
                <button
                  onClick={clearFilters}
                  className="mt-8 w-full py-3 text-red-600 font-medium hover:text-red-700"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {displayedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border">
                <p className="text-2xl">Aucun produit trouvé</p>
                <button onClick={clearFilters} className="mt-6 text-blue-700 underline">
                  Voir tous les produits
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {displayedProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-white rounded-3xl overflow-hidden border border-stone-100 hover:shadow-xl transition-all active:scale-[0.98]"
                    >
                      <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden">
                        <img
                          src={product.images?.[0]?.url || "/placeholder.jpg"}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </Link>
                      <div className="p-5">
                        <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                          {product.name}
                        </h3>
                        {product.category && (
                          <p className="text-xs text-blue-700 mt-1">{product.category}</p>
                        )}
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-2xl font-medium">
                            {product.price?.toLocaleString()} DA
                          </span>
                          <Link
                            to={`/product/${product._id}`}
                            className="text-blue-700 font-medium text-sm"
                          >
                            Détails →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-12 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        onClick={() => setCurrentPage(n)}
                        className={`w-10 h-10 rounded-2xl transition-all ${
                          n === currentPage
                            ? "bg-stone-900 text-white"
                            : "border hover:bg-stone-100"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* ==================== MOBILE FILTER BUTTON ==================== */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mt-8 md:hidden">
  <button
    onClick={() => setIsFilterOpen(true)}
    className="w-full py-4 bg-black border text-white border-black rounded-xl font-medium flex items-center justify-center gap-2.5  hover:shadow-md transition-all"
  >
    Filtrer par catégorie
  </button>
</div>

      {/* ==================== MOBILE FILTER DRAWER ==================== */}
      <AnimatePresence>
        {isFilterOpen && (
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
      onClick={() => setIsFilterOpen(false)}
    />

    {/* Drawer */}
    <div className="fixed inset-x-0 bottom-20 z-[1000] bg-white rounded-t-3xl max-h-[82vh] overflow-y-auto shadow-2xl border-t border-stone-200">
      <div className="p-6 pb-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-semibold text-stone-900">
            Catégories
          </h2>

          <button
            onClick={() => setIsFilterOpen(false)}
            className="p-3 hover:bg-stone-100 rounded-full transition"
          >
            ✕
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {availableCategories.length > 1 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-5">
                Catégorie
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {availableCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      handleCategoryChange(cat); // ✅ URL sync
                      setIsFilterOpen(false);
                    }}
                    className={`py-3.5 px-5 rounded-2xl text-sm font-medium transition-all border ${
                      selectedCategory === cat
                        ? "bg-blue-700 border-blue-600 text-white shadow-md"
                        : "bg-white border-stone-300 text-stone-700 hover:border-blue-500 hover:text-blue-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Clear */}
          {hasActiveFilter && (
            <button
              onClick={clearFilters}
              className="w-full py-4 bg-stone-900 hover:bg-blue-800 text-white rounded-2xl font-medium transition shadow-md"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      </div>
    </div>
  </>
)}
      </AnimatePresence>
    </div>
  );
}