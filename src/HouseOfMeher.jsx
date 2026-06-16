import React, { useState } from 'react';
import { ShoppingBag, X, Menu, Home, Shirt, Heart, Leaf } from 'lucide-react';

export default function HouseOfMeher() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  const products = [
    {
      id: 1,
      name: 'Ivory Silk Farshi',
      category: 'farschi',
      price: 4500,
      image: '🧵',
      color: 'Ivory',
      featured: true,
    },
    {
      id: 2,
      name: 'Embroidered Kurti Set',
      category: 'coordsets',
      price: 6500,
      image: '✨',
      color: 'Charcoal',
      featured: true,
    },
    {
      id: 3,
      name: 'Cream Farshi Salwar',
      category: 'farschi',
      price: 3800,
      image: '🧵',
      color: 'Cream',
      featured: true,
    },
    {
      id: 4,
      name: 'Gold Kurti & Salwar',
      category: 'coordsets',
      price: 7200,
      image: '✨',
      color: 'Gold',
      featured: false,
    },
    {
      id: 5,
      name: 'Beige Everyday Farshi',
      category: 'farschi',
      price: 3200,
      image: '🧵',
      color: 'Beige',
      featured: false,
    },
    {
      id: 6,
      name: 'Wine Coordset',
      category: 'coordsets',
      price: 8500,
      image: '✨',
      color: 'Wine',
      featured: false,
    },
    {
      id: 7,
      name: 'Blush Kurti Set',
      category: 'kurtis',
      price: 2800,
      image: '👗',
      color: 'Blush',
      featured: false,
    },
    {
      id: 8,
      name: 'Navy Kurti',
      category: 'kurtis',
      price: 2500,
      image: '👗',
      color: 'Navy',
      featured: false,
    },
  ];

  const getProductsByCategory = (category) => {
    if (category === 'home') return products.filter(p => p.featured);
    return products.filter(p => p.category === category);
  };

  const displayProducts = getProductsByCategory(currentPage);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const initializeRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID',
        amount: cartTotal * 100,
        currency: 'INR',
        name: 'House of Meher',
        description: 'Premium Farshi Salwars & Kurtis',
        handler: function(response) {
          alert('Payment successful! Order ID: ' + response.razorpay_payment_id);
          setCart([]);
          setIsCartOpen(false);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9876543210',
        },
        theme: {
          color: '#3a3a3a',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };
    document.body.appendChild(script);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'kurtis', label: 'Kurtis', icon: Shirt },
    { id: 'coordsets', label: 'Kurti & Salwar Sets', icon: Shirt },
    { id: 'farschi', label: 'Farshi Salwars', icon: Shirt },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-gray-900 flex">
      {/* Left Sidebar Navigation */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 overflow-hidden fixed h-screen md:relative z-30`}>
        <div className="p-6 pt-8">
          {/* Logo in Sidebar */}
          <div className="text-center mb-8">
            <div className="text-4xl font-light tracking-wider mb-2">HM</div>
            <div className="text-xs text-gray-400 tracking-widest">HOUSE OF MEHER</div>
            <div className="flex justify-center mt-3">
              <Leaf size={16} className="text-amber-600" />
            </div>
          </div>

          <nav className="space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left flex items-center gap-3 py-2 px-3 rounded-lg transition ${
                    currentPage === item.id
                      ? 'bg-white text-gray-900'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-light text-sm tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="border-t border-gray-700 mt-12 pt-6">
            <p className="text-xs text-gray-400 tracking-widest">CRAFTED WITH</p>
            <p className="text-xs text-gray-400 tracking-widest mt-2">ELEGANCE & CARE</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-6 py-4 flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>

            <div className="flex-1 ml-4 md:ml-0">
              <h2 className="text-sm font-light tracking-widest text-gray-600">
                {currentPage === 'home' ? 'FEATURED COLLECTION' : currentPage.toUpperCase()}
              </h2>
            </div>

            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-light">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Products Grid */}
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-6xl">
            {currentPage === 'home' && (
              <div className="mb-12 text-center">
                <div className="text-6xl font-light tracking-wider mb-4">HM</div>
                <h1 className="text-3xl font-light tracking-widest text-gray-800 mb-4">HOUSE OF MEHER</h1>
                <p className="text-gray-600 font-light">Timeless Farshi Collections</p>
              </div>
            )}

            {displayProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products in this category yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group"
                  >
                    {/* Product Image */}
                    <div className="bg-gradient-to-br from-amber-50 to-gray-50 aspect-square flex items-center justify-center text-6xl group-hover:from-amber-100 transition relative">
                      {product.image}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition opacity-0 group-hover:opacity-100"
                      >
                        <Heart
                          size={18}
                          fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
                          color={wishlist.includes(product.id) ? 'red' : 'gray'}
                        />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-light text-sm tracking-wide mb-1">{product.name}</h3>
                      <p className="text-xs text-gray-500 mb-3">{product.color}</p>

                      {/* Price - Large & Clear */}
                      <p className="text-2xl font-light mb-4 text-gray-900">₹{product.price.toLocaleString()}</p>

                      {/* Add to Bag Button - Prominent */}
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-light tracking-wide hover:bg-gray-800 transition active:scale-95"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Shopping Bag Sidebar */}
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Cart Panel */}
          <div className="fixed right-0 top-0 h-screen w-full sm:w-96 bg-white shadow-2xl z-40 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-light">Your Bag</h2>
                <p className="text-xs text-gray-500 mt-1">{cart.length} items</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <ShoppingBag size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 text-center">Your bag is empty</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-light"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="mb-6 pb-6 border-b border-gray-200 flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <p className="font-light text-sm mb-1">{item.name}</p>
                        <p className="text-xs text-gray-500 mb-2">{item.color}</p>
                        <p className="text-lg font-light">₹{item.price.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-gray-400 hover:text-gray-600 p-1 ml-4"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="border-t border-gray-200 p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-light">₹{cartTotal.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Shipping</p>
                    <p className="font-light text-green-600">Free</p>
                  </div>

                  <div className="border-t pt-4 flex justify-between items-center text-lg">
                    <p className="font-light">Total</p>
                    <p className="font-light">₹{cartTotal.toLocaleString()}</p>
                  </div>

                  <button 
                    onClick={initializeRazorpay}
                    className="w-full bg-gray-900 text-white py-4 rounded-lg font-light tracking-wide hover:bg-gray-800 transition text-sm mt-6"
                  >
                    Pay with Razorpay
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full border border-gray-300 py-4 rounded-lg font-light text-gray-900 hover:bg-gray-50 transition text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
