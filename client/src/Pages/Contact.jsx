"use client";

import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../api";
import { toast } from "react-toastify";
import { Upload, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    itemName: "",
    description: "",
    proposedPrice: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(prev => [...prev, ...newImages].slice(0, 8)); // max 8 images
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Veuillez uploader au moins une image");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("itemName", form.itemName);
    formData.append("description", form.description);
    formData.append("proposedPrice", form.proposedPrice);

    images.forEach(img => formData.append("images", img.file));

    try {
      await axios.post(`${API_BASE_URL}/sell-requests`, formData);
      toast.success("Proposition envoyée avec succès ! Nous vous contacterons bientôt.");
      // Reset form
      setForm({ name: "", email: "", phone: "", itemName: "", description: "", proposedPrice: "" });
      setImages([]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-stone-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Hero Explanation */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-5 py-2 rounded-3xl text-sm font-medium mb-6">
            💼 Vous avez des articles à vendre ?
          </div>
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight text-stone-900 leading-none">
            Vendez-nous vos produits
          </h1>
          <p className="mt-8 text-xl text-stone-600 leading-relaxed">
            Vous avez des coffres-forts, portes blindées, armoires fortes, systèmes de sécurité ou tout autre article de protection ?<br />
            <span className="font-medium text-stone-800">Proposez-les directement à notre magasin !</span><br />
            Nous achetons régulièrement des produits de qualité pour enrichir notre catalogue.
          </p>
          <p className="mt-6 text-stone-500 flex items-center justify-center gap-2">
            <ArrowRight className="w-5 h-5" />
            Remplissez le formulaire ci-dessous et joignez des photos claires
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Votre nom complet *"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-5 border border-stone-200 rounded-2xl text-lg focus:border-black outline-none"
              />
              <input
                type="email"
                placeholder="Votre email *"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-5 border border-stone-200 rounded-2xl text-lg focus:border-black outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="tel"
                placeholder="Numéro de téléphone *"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-5 border border-stone-200 rounded-2xl text-lg focus:border-black outline-none"
              />
              <input
                type="text"
                placeholder="Nom de l'article à vendre *"
                required
                value={form.itemName}
                onChange={(e) => setForm({ ...form, itemName: e.target.value })}
                className="w-full p-5 border border-stone-200 rounded-2xl text-lg focus:border-black outline-none"
              />
            </div>

            <input
              type="number"
              placeholder="Prix proposé (DA) *"
              required
              value={form.proposedPrice}
              onChange={(e) => setForm({ ...form, proposedPrice: e.target.value })}
              className="w-full p-5 border border-stone-200 rounded-2xl text-lg focus:border-black outline-none"
            />

            <textarea
              placeholder="Description détaillée de l'article (état, marque, année, etc.) *"
              rows={5}
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-5 border border-stone-200 rounded-2xl text-lg focus:border-black outline-none resize-y"
            />

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">
                Photos de l'article (au moins 1) *
              </label>
              <div className="border-2 border-dashed border-stone-300 rounded-3xl p-8 text-center hover:border-blue-700 transition cursor-pointer">
                <Upload className="mx-auto w-10 h-10 text-stone-400" />
                <p className="mt-3 text-stone-600">Cliquez ou glissez vos images ici</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="mt-4 inline-block px-6 py-3 bg-stone-900 text-white rounded-2xl cursor-pointer hover:bg-blue-800"
                >
                  Choisir des fichiers
                </label>
              </div>

              {/* Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-6">
                  {images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={img.preview}
                        alt=""
                        className="w-full aspect-square object-cover rounded-2xl"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full py-6 bg-black hover:bg-blue-800 text-white text-xl font-medium rounded-3xl transition disabled:opacity-70"
            >
              {loading ? "Envoi en cours..." : "Envoyer ma proposition"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}