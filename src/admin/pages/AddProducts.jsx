import React, { useState } from 'react';

function AddProducts({ onSubmit }) {
  // 1. Updated properties to exactly match your backend Schema properties
  const [formData, setFormData] = useState({
    title: '',
    tag: '⚡ New',
    category: 'ATTAR',
    price: '',
    oldPrice: '',
    discountPct: '0',
    description: '',
    stock: '20'
  });

  // Separate states for the actual binary file and its UI preview window
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // 2. Dynamic Input Handler with Clean Automatic Discount Computations
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      // Re-calculate the layout discount percentage dynamically when prices alter
      if (name === 'price' || name === 'oldPrice') {
        const currentPrice = parseFloat(name === 'price' ? value : prev.price) || 0;
        const originalPrice = parseFloat(name === 'oldPrice' ? value : prev.oldPrice) || 0;

        if (originalPrice > 0 && originalPrice > currentPrice) {
          updatedData.discountPct = Math.round(((originalPrice - currentPrice) / originalPrice) * 100).toString();
        } else {
          updatedData.discountPct = '0';
        }
      }

      return updatedData;
    });
  };

  // 3. File upload state converter
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Generates temporary preview link layout
    }
  };

  // 4. Form Pipeline Dispatcher
  function handleSubmit(e) {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload a product image!");
      return;
    }

    // Pack the raw values alongside the image object cleanly
    const finalData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      oldPrice: parseFloat(formData.oldPrice) || 0,
      discountPct: parseInt(formData.discountPct) || 0,
      stock: parseInt(formData.stock) || 20,
      image: imageFile // 💡 Handed over to your main page parent component for processing
    };

    if (onSubmit) {
      onSubmit(finalData);
    }
  }

  return (
    <div className="max-w-3xl mx-auto my-6 p-6 bg-white rounded-lg shadow-md max-h-[85vh] overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Add New Perfume Inventory</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ROW 1: TITLE & TAG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="Luxury Attar Perfume" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Custom Tag/Badge</label>
            <input type="text" name="tag" value={formData.tag} onChange={handleChange} placeholder="⚡ New, Best Seller" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber-600" />
          </div>
        </div>

        {/* ROW 2: CATEGORY & STOCK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-amber-600">
              <option value="ATTAR">ATTAR</option>
              <option value="PERFUME SPRAY">PERFUME SPRAY</option>
              <option value="INCENSE">INCENSE</option>
              <option value="COMBO">COMBO PACKS</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Units</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber-600" />
          </div>
        </div>

        {/* ROW 3: PRICING LOGIC METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-3 rounded border">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (INR)</label>
            <input type="number" name="price" required value={formData.price} onChange={handleChange} placeholder="399" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (INR)</label>
            <input type="number" name="oldPrice" value={formData.oldPrice} onChange={handleChange} placeholder="599" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Discount Auto-Calcs</label>
            <div className="w-full bg-gray-200 text-gray-700 font-bold text-center py-2 text-sm rounded border">
              {formData.discountPct}% OFF
            </div>
          </div>
        </div>

        {/* FRAGRANCE DESCRIPTION TEXTAREA */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fragrance Description Notes</label>
          <textarea name="description" rows="3" required value={formData.description} onChange={handleChange} placeholder="Enter perfume details, notes and dimensions..." className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber-600"></textarea>
        </div>

        {/* IMAGE UPLOADER DRAG/DROP CONTAINER */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-col items-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Perfume Bottle Photo</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-3 h-28 w-28 object-cover rounded-md border shadow" />
          )}
        </div>

        {/* CONTROLS */}
        <button type="submit" className="w-full bg-amber-600 text-white font-medium py-2 rounded-md hover:bg-amber-700 transition-colors text-sm shadow">
          Publish Perfume Entry
        </button>
      </form>
    </div>
  );
}

export default AddProducts;
