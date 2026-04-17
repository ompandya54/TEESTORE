"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ALL_COLORS = ["Black", "White", "Blue", "Red", "Green", "Orange"];
const ALL_SIZES  = ["S", "M", "L", "XL", "XXL"];

// Extracted outside — never re-created on render
function FilterSections({ cats, setCats, cols, setCols, szs, setSzs, isMobile, onReset, allCategories }) {
  const toggle = (state, setState, value) =>
    setState(state.includes(value) ? state.filter(i => i !== value) : [...state, value]);

  const activeCount = cats.length + cols.length + szs.length;

  return (
    <div className={`space-y-10 ${isMobile ? "pb-24" : ""}`}>
      {/* Category */}
      <div>
        <h3 className="text-sm font-bold tracking-widest text-zinc-100 uppercase mb-4 border-b border-zinc-800 pb-2">Category</h3>
        <div className="space-y-3">
          {allCategories.map(category => (
            <label key={category} className="flex items-center cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" className="sr-only" checked={cats.includes(category)} onChange={() => toggle(cats, setCats, category)} />
                <div className={`w-5 h-5 border ${cats.includes(category) ? "bg-zinc-100 border-zinc-100" : "border-zinc-700 bg-zinc-900 group-hover:border-zinc-500"} transition-colors flex items-center justify-center`}>
                  {cats.includes(category) && (
                    <svg className="w-3 h-3 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>
              </div>
              <span className={`ml-3 text-sm ${cats.includes(category) ? "text-zinc-100 font-medium" : "text-zinc-400"}`}>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h3 className="text-sm font-bold tracking-widest text-zinc-100 uppercase mb-4 border-b border-zinc-800 pb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map(color => (
            <button key={color} onClick={() => toggle(cols, setCols, color)}
              className={`px-3 py-1.5 text-xs font-medium border rounded-full transition-all ${cols.includes(color) ? "bg-zinc-100 text-zinc-950 border-zinc-100" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200"}`}>
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="text-sm font-bold tracking-widest text-zinc-100 uppercase mb-4 border-b border-zinc-800 pb-2">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {ALL_SIZES.map(size => (
            <button key={size} onClick={() => toggle(szs, setSzs, size)}
              className={`py-2 text-xs font-bold border transition-all ${szs.includes(size) ? "bg-zinc-100 text-zinc-950 border-zinc-100 shadow-inner" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200"}`}>
              {size}
            </button>
          ))}
        </div>
      </div>

      {activeCount > 0 && (
        <button onClick={onReset} className="w-full py-3 text-xs font-bold uppercase tracking-widest text-red-500 border border-red-500/20 hover:bg-red-500/10 transition-colors">
          Reset {isMobile ? "Selected" : "All"}
        </button>
      )}
    </div>
  );
}

export default function ProductCatalog({ initialProducts }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors,     setSelectedColors]     = useState([]);
  const [selectedSizes,      setSelectedSizes]      = useState([]);

  const [tempCategories, setTempCategories] = useState([]);
  const [tempColors,     setTempColors]     = useState([]);
  const [tempSizes,      setTempSizes]      = useState([]);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then(r => r.json())
      .then(data => setAllCategories(data.map(c => c.name)));
  }, []);

  const openMobileFilter = useCallback(() => {
    setTempCategories(selectedCategories);
    setTempColors(selectedColors);
    setTempSizes(selectedSizes);
    setIsMobileFilterOpen(true);
  }, [selectedCategories, selectedColors, selectedSizes]);

  const handleApply = useCallback(() => {
    setSelectedCategories(tempCategories);
    setSelectedColors(tempColors);
    setSelectedSizes(tempSizes);
    setIsMobileFilterOpen(false);
  }, [tempCategories, tempColors, tempSizes]);

  const handleReset = useCallback((isMobile = false) => {
    if (isMobile) {
      setTempCategories([]); setTempColors([]); setTempSizes([]);
    } else {
      setSelectedCategories([]); setSelectedColors([]); setSelectedSizes([]);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
      if (selectedColors.length > 0 && !product.colors.some(c => selectedColors.includes(c))) return false;
      if (selectedSizes.length > 0  && !product.sizes.some(s => selectedSizes.includes(s)))  return false;
      return true;
    });
  }, [initialProducts, selectedCategories, selectedColors, selectedSizes]);

  const activeFilterCount = selectedCategories.length + selectedColors.length + selectedSizes.length;

  return (
    <div className="bg-zinc-950 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-end border-b border-zinc-800 pb-6 mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-zinc-100 uppercase">The Collection</h1>
            <p className="mt-2 text-sm text-zinc-400 uppercase tracking-widest">{filteredProducts.length} Premium Pieces</p>
          </div>
          <button onClick={openMobileFilter}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-white text-xs font-black uppercase tracking-widest">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
            Refine {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <FilterSections
                cats={selectedCategories} setCats={setSelectedCategories}
                cols={selectedColors}     setCols={setSelectedColors}
                szs={selectedSizes}       setSzs={setSelectedSizes}
                isMobile={false}          onReset={() => handleReset(false)}
                allCategories={allCategories}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-zinc-500">
                <svg className="w-12 h-12 mb-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <p className="text-lg font-medium">No pieces match your exact criteria.</p>
                <button onClick={() => handleReset(false)} className="mt-4 text-sm font-bold border-b border-zinc-100 text-zinc-100 pb-1 hover:text-white">Reset Filters</button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map(product => (
                    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} key={product._id}>
                      <Link href={`/products/${product._id}`} className="group block">
                        <div className="relative w-full aspect-[3/4] bg-zinc-900 overflow-hidden rounded-sm border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                          <img src={product.images[0] || "/placeholder-tshirt.png"} alt={product.name} className="w-full h-full object-center object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" />
                          {product.stock < 10 && product.stock > 0 && (
                            <span className="absolute top-3 right-3 bg-red-600/90 backdrop-blur-sm text-white text-[8px] md:text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm">Few Left</span>
                          )}
                        </div>
                        <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-start px-1 gap-1">
                          <div>
                            <h3 className="text-xs md:text-sm font-medium text-zinc-100 group-hover:underline underline-offset-4 line-clamp-1">{product.name}</h3>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-tight">{product.category}</p>
                          </div>
                          <p className="text-sm font-bold text-zinc-100">${product.price.toFixed(2)}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="lg:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-zinc-950 p-8 shadow-2xl z-[101] overflow-y-auto">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-black uppercase tracking-tighter text-white">Refine</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-zinc-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <FilterSections
                cats={tempCategories} setCats={setTempCategories}
                cols={tempColors}     setCols={setTempColors}
                szs={tempSizes}       setSzs={setTempSizes}
                isMobile={true}       onReset={() => handleReset(true)}
                allCategories={allCategories}
              />

              <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-zinc-900 bg-zinc-950/90 backdrop-blur-lg w-[85%] max-w-sm">
                <button onClick={handleApply} className="w-full py-4 bg-zinc-100 text-zinc-950 text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform">
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
