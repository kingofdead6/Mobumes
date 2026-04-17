"use client";

import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../api";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../../../translations";

const SimilarProductsGrid = ({ currentProductId, category }) => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].productDetail || {};
  const isRTL = lang === "ar";

  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      if (!currentProductId || !category) return;

      try {
        const res = await axios.get(
          `${API_BASE_URL}/products?category=${encodeURIComponent(category)}`
        );

        // Filter out current product and limit to 6
        const filtered = res.data
          .filter(p => p._id !== currentProductId)
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);

        setSimilarProducts(filtered);
      } catch (err) {
        console.error("Failed to load similar products");
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [currentProductId, category]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-stone-100 animate-pulse rounded-2xl aspect-square" />
        ))}
      </div>
    );
  }

  if (similarProducts.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10" dir={isRTL ? "rtl" : "ltr"}>
      {similarProducts.map(product => (
        <div
          key={product._id}
          className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-blue-500/50 transition-all duration-400 hover:shadow-xl hover:shadow-blue-100/30"
        >
          <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden">
            <img
              src={product.images?.[0]?.url || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>

          <div className="p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-light text-stone-800 line-clamp-2 min-h-[1.8em] leading-tight">
              {product.name}
            </h3>
            <p className="text-xl sm:text-2xl font-medium text-blue-700 tracking-wide mt-1">
              {product.price.toLocaleString()} DA
            </p>

            <Link to={`/product/${product._id}`}>
              <button className="cursor-pointer mt-4 w-full py-3.5 bg-stone-900 hover:bg-blue-800 text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                {t.viewDetails || "Voir Détails"}
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ProductDetailsPage() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].productDetail || {};
  const isRTL = lang === "ar";
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAddedPopup, setShowAddedPopup] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const handleCartAdded = () => {
      setShowAddedPopup(true);
      setTimeout(() => setShowAddedPopup(false), 2800);
    };
    window.addEventListener("cartAdded", handleCartAdded);
    return () => window.removeEventListener("cartAdded", handleCartAdded);
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/products/${id}`);
      setProduct(res.data);
      setSelectedImageIndex(0);
    } catch (err) {
      toast.error(t.notFound || "Produit non trouvé");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-3xl font-light text-blue-800/80 animate-pulse tracking-wide">
          {t.loading || "Chargement du produit..."}
        </div>
      </div>
    );
  }

  if (!product || !product.images?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5 sm:px-8">
        <p className="text-2xl font-light text-stone-500 text-center">
          {t.notFound || "Produit non trouvé"}
        </p>
      </div>
    );
  }

  const selectedImage = product.images[selectedImageIndex];

  const handleAddToCart = () => {
    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: selectedImage.url,
      imageIndex: selectedImageIndex,
      quantity: quantity,
      addedAt: new Date().toISOString(),
    };

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = cart.findIndex(
      item => item.productId === cartItem.productId && item.imageIndex === cartItem.imageIndex
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new CustomEvent("cartAdded"));

    toast.success(t.addedToCart || "Ajouté au panier !");
    setQuantity(1);
  };

  return (
    <div className="min-h-screen pt-24 pb-20" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-blue-800 mb-8 transition-colors text-base font-light tracking-wide"
        >
          <ArrowLeft size={20} />
          {t.backToShop || "Retour à la collection"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images Section */}
          <div className="space-y-8">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden bg-white border border-stone-100 shadow-sm">
              <img
                src={selectedImage?.url || "/placeholder.jpg"}
                alt={product.name}
                className="w-full aspect-[4/5] sm:aspect-square lg:aspect-[5/6] object-cover object-center"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="overflow-x-auto pb-4 -mx-2 px-2">
                <div className="flex gap-4 min-w-max">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === i
                          ? "border-blue-700 shadow-md scale-105"
                          : "border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`Vue ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-stone-950 leading-tight">
                {product.name}
              </h1>

              <p className="text-3xl sm:text-4xl font-medium text-blue-700 tracking-wide">
                {product.price.toLocaleString()} DA
              </p>

              <p className="text-lg text-stone-600">{product.category}</p>
            </div>

            {product.description && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-3">
                  Description
                </h3>
                <p className="text-stone-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-4">
                {t.quantity || "Quantité"}
              </h3>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-12 h-12 rounded-xl border border-stone-300 text-stone-700 hover:border-blue-500 hover:text-blue-700 transition text-2xl flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-3xl font-light w-16 text-center text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-12 h-12 rounded-xl border border-stone-300 text-stone-700 hover:border-blue-500 hover:text-blue-700 transition text-2xl flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full py-5 bg-stone-900 hover:bg-blue-800 text-white text-lg font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {t.addToCart || "Ajouter au panier"}
            </button>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-24 lg:mt-32">
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-stone-950 text-center mb-12 lg:mb-16">
            {t.youMightLike || "Vous pourriez aussi aimer"}
          </h2>
          <SimilarProductsGrid currentProductId={product._id} category={product.category} />
        </div>
      </div>

      {/* Added to Cart Popup */}
      <div
        className={`fixed inset-x-4 bottom-6 md:inset-x-auto md:bottom-10 md:left-1/2 md:-translate-x-1/2 z-50 transition-all duration-500 pointer-events-none ${
          showAddedPopup ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
        }`}
      >
        <div className="bg-stone-900 text-white px-5 py-4 md:px-7 md:py-5 rounded-2xl shadow-2xl flex items-center gap-4 md:gap-6 max-w-md mx-auto pointer-events-auto">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 border-blue-600/40 flex-shrink-0">
            <img src={selectedImage?.url} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-base md:text-lg">{t.addedToCart || "Ajouté au panier !"}</p>
            <p className="text-sm md:text-base opacity-90 truncate">
              {product.name} × {quantity}
            </p>
          </div>
          <svg className="w-7 h-7 md:w-8 md:h-8 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}