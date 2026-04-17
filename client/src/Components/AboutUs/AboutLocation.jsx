"use client";

import React from "react";

export default function AboutLocation() {
  return (
    <section className="py-24 px-6 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-stone-950">
            Venez nous rendre visite
          </h2>
          <p className="mt-4 text-xl text-stone-600 max-w-2xl mx-auto">
            Notre showroom et nos bureaux sont situés au cœur de Staoueli, Alger.
          </p>
        </div>

        <div className="gap-10 items-start">
         

          {/* Google Map */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-stone-100 h-[460px] lg:h-[520px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3629.603761466908!2d2.8844288762748764!3d36.75340567226039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fbbc549a01687%3A0xcba6b4972e143d48!2sMagasin%20Mobumes!5e1!3m2!1sen!2sdz!4v1776454893199!5m2!1sen!2sdz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation MOBUMES Staoueli"
              />
            </div>
            
            <p className="text-center text-sm text-stone-500 mt-4">
              43, Rue Gaci Amar – Staoueli, Alger
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}