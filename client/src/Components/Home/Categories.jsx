"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../api";

const containerVariants = {

};

const titleVariants = {
 
};

const cardVariants = {
  hidden: {  scale: 0.95 },
  show: {
  
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 ">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xl text-stone-500">Chargement des catégories...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-stone-950">
            Nos solutions de sécurité
          </h2>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète d’équipements conçus pour protéger vos biens et assurer votre sécurité.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat._id}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="group bg-white border border-stone-100 rounded-3xl overflow-hidden hover:border-stone-300 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-stone-100">
                {cat.image?.url ? (
                  <motion.img
                    src={cat.image.url}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400">
                    Pas d'image
                  </div>
                )}

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/20"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="text-xl font-semibold text-stone-900">
                  {cat.name}
                </h3>

                {cat.description && (
                  <p className="mt-3 text-stone-600 text-sm leading-relaxed">
                    {cat.description}
                  </p>
                )}

                {/* CTA Link */}
                <Link
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-stone-900 hover:text-blue-700 transition-colors border-b border-stone-900 hover:border-blue-700 pb-0.5"
                >
                  Découvrir cette catégorie
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}