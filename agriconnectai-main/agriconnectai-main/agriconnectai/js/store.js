/**
 * AgriConnect AI - Data Store & Local Storage Persistence
 * Manages initial seed records, reactive CRUD operations, and current user session.
 */

const STORAGE_KEYS = {
  USERS: 'agri_users',
  CURRENT_USER: 'agri_current_user',
  PRODUCTS: 'agri_products',
  ORDERS: 'agri_orders',
  MARKET_PRICES: 'agri_market_prices',
  NOTIFICATIONS: 'agri_notifications'
};

// Initial Seed Data matching the project requirements & reference diagram
const SEED_USERS = [
  {
    id: 'farmer-1',
    name: 'Ramesh',
    fullName: 'Ramesh Patel',
    email: 'ramesh@agri.com',
    role: 'Farmer',
    phone: '+91 98765 43210',
    location: 'Mysuru, Karnataka',
    bio: 'Organic vegetable farmer specializing in heirloom tomatoes and indigenous red onions.'
  },
  {
    id: 'buyer-1',
    name: 'Priya',
    fullName: 'Priya Sharma',
    email: 'priya@freshmart.com',
    role: 'Buyer',
    phone: '+91 91234 56780',
    location: 'Bengaluru, Karnataka',
    bio: 'Procurement manager for fresh supermarket chains and direct bulk produce buyer.'
  },
  {
    id: 'admin-1',
    name: 'Platform Admin',
    fullName: 'AgriConnect Administrator',
    email: 'admin@agriconnect.ai',
    role: 'Admin',
    phone: '+91 90000 00000',
    location: 'Bengaluru, Karnataka',
    bio: 'Platform oversight and marketplace compliance administrator.'
  },
  {
    id: 'farmer-2',
    name: 'Suresh',
    fullName: 'Suresh Gowda',
    email: 'suresh@agri.com',
    role: 'Farmer',
    phone: '+91 98451 23456',
    location: 'Mandya, Karnataka',
    bio: 'Grain and root vegetable cultivator focusing on sustainable zero-chemical farming.'
  }
];

const SEED_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Tomato',
    category: 'Vegetables',
    variety: 'Heirloom Organic',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh',
    quantity: 500,
    unit: 'kg',
    price: 25,
    location: 'Mysuru, Karnataka',
    harvestDate: '2026-10-10',
    quality: 'Grade A',
    status: 'Active',
    description: 'Fresh and organic ripe tomatoes direct from farm. Grown without synthetic pesticides, picked at peak freshness for maximum sweetness and shelf life.',
    image: 'images/tomatoes.jpg'
  },
  {
    id: 'prod-002',
    name: 'Onion',
    category: 'Vegetables',
    variety: 'Red Nasik',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh',
    quantity: 300,
    unit: 'kg',
    price: 35,
    location: 'Mysuru, Karnataka',
    harvestDate: '2026-10-08',
    quality: 'Grade A',
    status: 'Active',
    description: 'Crisp medium-sized red onions with strong aroma and long storage stability. Thoroughly sun-cured and graded.',
    image: 'images/onions.jpg'
  },
  {
    id: 'prod-003',
    name: 'Potato',
    category: 'Vegetables',
    variety: 'Kufri Jyoti Organic',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh',
    quantity: 400,
    unit: 'kg',
    price: 20,
    location: 'Mysuru, Karnataka',
    harvestDate: '2026-10-09',
    quality: 'Grade A',
    status: 'Active',
    description: 'Clean, firm farm-fresh potatoes ideal for culinary and commercial food preparation. Low moisture skin.',
    image: 'images/potatoes.jpg'
  },
  {
    id: 'prod-004',
    name: 'Carrot',
    category: 'Vegetables',
    variety: 'Ooty Super Sweet',
    farmerId: 'farmer-2',
    farmerName: 'Suresh',
    quantity: 150,
    unit: 'kg',
    price: 30,
    location: 'Mandya, Karnataka',
    harvestDate: '2026-10-11',
    quality: 'Grade A',
    status: 'Active',
    description: 'Freshly harvested crunchy orange carrots with tender cores. High beta-carotene, washed and ready for consumption.',
    image: 'images/carrots.jpg'
  },
  {
    id: 'prod-005',
    name: 'Wheat',
    category: 'Grains & Cereals',
    variety: 'Sharbati Golden',
    farmerId: 'farmer-2',
    farmerName: 'Suresh',
    quantity: 1000,
    unit: 'kg',
    price: 32,
    location: 'Mandya, Karnataka',
    harvestDate: '2026-09-28',
    quality: 'Premium Grade',
    status: 'Active',
    description: 'Premium golden Sharbati wheat grains, machine-cleaned, whole grain with high protein and excellent flour yield.',
    image: 'images/wheat.jpg'
  }
];

const SEED_ORDERS = [
  {
    id: '#001',
    orderId: 'ORD-001',
    productId: 'prod-001',
    productName: 'Tomato',
    quantity: 50,
    unit: 'kg',
    unitPrice: 25,
    totalPrice: 1250,
    buyerId: 'buyer-1',
    buyerName: 'Priya',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh',
    deliveryLocation: 'FreshMart Depot, Indiranagar, Bengaluru',
    date: '2026-10-11',
    status: 'Pending',
    message: 'Please ensure safe wooden crate packaging.'
  },
  {
    id: '#002',
    orderId: 'ORD-002',
    productId: 'prod-002',
    productName: 'Onion',
    quantity: 20,
    unit: 'kg',
    unitPrice: 35,
    totalPrice: 700,
    buyerId: 'buyer-1',
    buyerName: 'Priya',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh',
    deliveryLocation: 'FreshMart Depot, Indiranagar, Bengaluru',
    date: '2026-10-10',
    status: 'Accepted',
    message: 'Confirmed for delivery by Wednesday morning.'
  },
  {
    id: '#003',
    orderId: 'ORD-003',
    productId: 'prod-003',
    productName: 'Potato',
    quantity: 15,
    unit: 'kg',
    unitPrice: 20,
    totalPrice: 300,
    buyerId: 'buyer-1',
    buyerName: 'Priya',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh',
    deliveryLocation: 'FreshMart Central Store, Bengaluru',
    date: '2026-10-08',
    status: 'Completed',
    message: 'Delivered and inspected. Payment processed.'
  }
];

const SEED_MARKET_PRICES = [
  {
    crop: 'Tomato',
    currentPrice: 25,
    prevPrice: 22,
    unit: 'kg',
    change: '+13.6%',
    trend: 'up',
    market: 'Mysuru APMC',
    lastUpdated: 'Today, 06:30 AM',
    history: [18, 19, 21, 22, 23, 24, 25]
  },
  {
    crop: 'Onion',
    currentPrice: 35,
    prevPrice: 38,
    unit: 'kg',
    change: '-7.9%',
    trend: 'down',
    market: 'Nasik / Bengaluru APMC',
    lastUpdated: 'Today, 07:00 AM',
    history: [42, 40, 39, 38, 37, 36, 35]
  },
  {
    crop: 'Potato',
    currentPrice: 20,
    prevPrice: 20,
    unit: 'kg',
    change: '0.0%',
    trend: 'stable',
    market: 'Hassan / Mysuru APMC',
    lastUpdated: 'Today, 06:15 AM',
    history: [20, 20, 21, 20, 20, 20, 20]
  },
  {
    crop: 'Wheat',
    currentPrice: 32,
    prevPrice: 31,
    unit: 'kg',
    change: '+3.2%',
    trend: 'up',
    market: 'Mandya Market Yard',
    lastUpdated: 'Yesterday',
    history: [29, 30, 30, 31, 31, 31, 32]
  },
  {
    crop: 'Rice',
    currentPrice: 45,
    prevPrice: 46,
    unit: 'kg',
    change: '-2.1%',
    trend: 'down',
    market: 'Raichur Grain Market',
    lastUpdated: 'Today, 08:00 AM',
    history: [48, 47, 47, 46, 46, 45, 45]
  },
  {
    crop: 'Carrot',
    currentPrice: 30,
    prevPrice: 28,
    unit: 'kg',
    change: '+7.1%',
    trend: 'up',
    market: 'Ooty / Bengaluru Market',
    lastUpdated: 'Today, 06:45 AM',
    history: [26, 27, 27, 28, 29, 29, 30]
  }
];

const SEED_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'New order received for Tomato (50 kg)',
    time: '5 mins ago',
    type: 'order',
    targetRole: 'Farmer',
    read: false,
    icon: '📦'
  },
  {
    id: 'notif-2',
    title: 'Market price of Tomato increased by 12%',
    time: '2 hours ago',
    type: 'market',
    targetRole: 'All',
    read: false,
    icon: '📈'
  },
  {
    id: 'notif-3',
    title: 'Order #002 has been accepted',
    time: '3 hours ago',
    type: 'order',
    targetRole: 'Buyer',
    read: true,
    icon: '✅'
  },
  {
    id: 'notif-4',
    title: 'AI Suggestion: Best time to sell Onion',
    time: '1 day ago',
    type: 'ai',
    targetRole: 'Farmer',
    read: true,
    icon: '🤖'
  },
  {
    id: 'notif-5',
    title: 'New user registered: Suresh (Farmer)',
    time: '2 days ago',
    type: 'admin',
    targetRole: 'Admin',
    read: true,
    icon: '👤'
  }
];

// AI Prediction Intelligence Model Parameters & Rule Engine
const AI_CROP_INTELLIGENCE = {
  Tomato: {
    crop: 'Tomato',
    currentPrice: 25,
    predictedPrice: 30,
    changePercent: '+20%',
    direction: 'up',
    decision: 'WAIT TO SELL',
    badgeClass: 'wait',
    summary: 'Price is expected to increase in the next 5-7 days due to anticipated local market supply shortages and high festive demand.',
    confidence: '88% Confidence',
    factors: [
      'Demand surges in regional mandi markets (+18%)',
      'Arrival volumes dropped 14% across neighboring districts',
      'Favorable weather forecasted, maintaining fruit harvest quality',
      'Historical price seasonality indicates mid-October peak'
    ],
    trendDays: ['Today', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    trendPrices: [25, 25.8, 26.5, 27.4, 28.5, 29.2, 30.0]
  },
  Onion: {
    crop: 'Onion',
    currentPrice: 35,
    predictedPrice: 31.5,
    changePercent: '-10%',
    direction: 'down',
    decision: 'SELL NOW',
    badgeClass: 'sell-now',
    summary: 'Price is expected to decline in the coming week as heavy fresh buffer stocks from neighboring states arrive in wholesale hubs.',
    confidence: '84% Confidence',
    factors: [
      'New crop arrivals increasing by 28% in major APMCs',
      'Wholesale traders actively destocking existing godowns',
      'High ambient humidity posing storage rot risk',
      'Immediate liquidation guarantees peak margin capture'
    ],
    trendDays: ['Today', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    trendPrices: [35, 34.2, 33.6, 33.0, 32.4, 31.8, 31.5]
  },
  Potato: {
    crop: 'Potato',
    currentPrice: 20,
    predictedPrice: 20.5,
    changePercent: '+2.5%',
    direction: 'stable',
    decision: 'HOLD STABLE',
    badgeClass: 'wait',
    summary: 'Market price is expected to remain stable with minor seasonal fluctuations. No urgent liquidation required.',
    confidence: '91% Confidence',
    factors: [
      'Cold storage reserves at balanced 62% capacity',
      'Stable processing unit purchase contracts in place',
      'Consistent retail demand in Tier-1 consumer belts',
      'Low volatility anticipated over the 14-day horizon'
    ],
    trendDays: ['Today', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    trendPrices: [20, 20.1, 20.2, 20.3, 20.4, 20.5, 20.5]
  },
  Carrot: {
    crop: 'Carrot',
    currentPrice: 30,
    predictedPrice: 34,
    changePercent: '+13.3%',
    direction: 'up',
    decision: 'WAIT TO SELL',
    badgeClass: 'wait',
    summary: 'Expected uptrend over the next 6 days driven by hospitality sector demand and limited regional hill arrivals.',
    confidence: '82% Confidence',
    factors: [
      'High grade sweet carrot procurement orders up 22%',
      'Rainfall in Nilgiri belts slightly delaying harvest transit',
      'Wholesale quotes rising by ₹1-2 per kg daily'
    ],
    trendDays: ['Today', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    trendPrices: [30, 30.5, 31.2, 32.0, 32.8, 33.5, 34.0]
  },
  Wheat: {
    crop: 'Wheat',
    currentPrice: 32,
    predictedPrice: 33,
    changePercent: '+3.1%',
    direction: 'up',
    decision: 'SELL NOW',
    badgeClass: 'sell-now',
    summary: 'Grain spot prices are steady at seasonal highs. Excellent liquidity with millers purchasing aggressively.',
    confidence: '89% Confidence',
    factors: [
      'Steady MSP benchmark baseline supported by state centers',
      'Flour milling demand strong across south consumer hubs',
      'Zero storage degradation when sold immediately'
    ],
    trendDays: ['Today', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    trendPrices: [32, 32.2, 32.4, 32.6, 32.7, 32.9, 33.0]
  }
};

// Store Manager Class
class AgriStore {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(SEED_PRODUCTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(SEED_ORDERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MARKET_PRICES)) {
      localStorage.setItem(STORAGE_KEYS.MARKET_PRICES, JSON.stringify(SEED_MARKET_PRICES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
    }
    // Default logged in user: Ramesh (Farmer) as seen in reference diagram Screen 4
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(SEED_USERS[0]));
    }
  }

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) || SEED_USERS[0];
    } catch {
      return SEED_USERS[0];
    }
  }

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }

  switchRole(role) {
    const users = this.getUsers();
    const user = users.find(u => u.role.toLowerCase() === role.toLowerCase()) || users[0];
    this.setCurrentUser(user);
    return user;
  }

  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || SEED_USERS;
    } catch {
      return SEED_USERS;
    }
  }

  saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  updateProfile(profileData) {
    const current = this.getCurrentUser();
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === current.id);
    const updated = { ...current, ...profileData };
    if (index !== -1) {
      users[index] = updated;
      this.saveUsers(users);
    }
    this.setCurrentUser(updated);
    return updated;
  }

  login(email, role) {
    const users = this.getUsers();
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      // Auto-fallback/create for easy test
      const roleName = role || 'Farmer';
      user = {
        id: 'usr-' + Date.now(),
        name: email.split('@')[0],
        fullName: email.split('@')[0],
        email: email,
        role: roleName,
        phone: '+91 98765 00000',
        location: 'Bengaluru, Karnataka',
        bio: `${roleName} member on AgriConnect AI`
      };
      users.push(user);
      this.saveUsers(users);
    }
    this.setCurrentUser(user);
    return user;
  }

  register(userData) {
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email already exists.');
    }
    const newUser = {
      id: 'usr-' + Date.now(),
      name: userData.fullName.split(' ')[0],
      fullName: userData.fullName,
      email: userData.email,
      role: userData.role || 'Farmer',
      phone: userData.phone || '+91 90000 00000',
      location: userData.location || 'Karnataka',
      bio: `${userData.role} member on AgriConnect AI`
    };
    users.push(newUser);
    this.saveUsers(users);
    this.setCurrentUser(newUser);
    
    // Add notification
    this.addNotification({
      title: `New user registered: ${newUser.fullName} (${newUser.role})`,
      time: 'Just now',
      type: 'admin',
      targetRole: 'Admin',
      icon: '👤'
    });

    return newUser;
  }

  logout() {
    // Keep seed data, set guest or redirect
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  // Products CRUD
  getProducts(filters = {}) {
    let prods = [];
    try {
      prods = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || SEED_PRODUCTS;
    } catch {
      prods = SEED_PRODUCTS;
    }

    if (filters.farmerId) {
      prods = prods.filter(p => p.farmerId === filters.farmerId);
    }
    if (filters.category && filters.category !== 'All' && filters.category !== 'All Crops') {
      prods = prods.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.location && filters.location !== 'All Locations') {
      prods = prods.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      prods = prods.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (filters.maxPrice) {
      prods = prods.filter(p => p.price <= Number(filters.maxPrice));
    }
    return prods;
  }

  getProductById(id) {
    const prods = this.getProducts();
    return prods.find(p => p.id === id);
  }

  addProduct(productData) {
    const prods = this.getProducts();
    const currentUser = this.getCurrentUser();
    const newProd = {
      id: 'prod-' + Date.now(),
      name: productData.name,
      category: productData.category || 'Vegetables',
      variety: productData.variety || 'Farm Fresh',
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      quantity: Number(productData.quantity) || 100,
      unit: productData.unit || 'kg',
      price: Number(productData.price) || 25,
      location: productData.location || currentUser.location,
      harvestDate: productData.harvestDate || new Date().toISOString().split('T')[0],
      quality: productData.quality || 'Grade A',
      status: 'Active',
      description: productData.description || 'Fresh agricultural produce direct from farm.',
      image: productData.image || 'images/tomatoes.jpg'
    };
    prods.unshift(newProd);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(prods));

    this.addNotification({
      title: `New product listed: ${newProd.name} by ${newProd.farmerName}`,
      time: 'Just now',
      type: 'market',
      targetRole: 'All',
      icon: '🌱'
    });

    return newProd;
  }

  updateProduct(id, updatedData) {
    const prods = this.getProducts();
    const idx = prods.findIndex(p => p.id === id);
    if (idx !== -1) {
      prods[idx] = { ...prods[idx], ...updatedData };
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(prods));
      return prods[idx];
    }
    return null;
  }

  deleteProduct(id) {
    let prods = this.getProducts();
    prods = prods.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(prods));
  }

  // Orders Management
  getOrders(filters = {}) {
    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || SEED_ORDERS;
    } catch {
      orders = SEED_ORDERS;
    }

    if (filters.farmerId) {
      orders = orders.filter(o => o.farmerId === filters.farmerId);
    }
    if (filters.buyerId) {
      orders = orders.filter(o => o.buyerId === filters.buyerId);
    }
    return orders;
  }

  getOrderById(id) {
    const orders = this.getOrders();
    return orders.find(o => o.id === id || o.orderId === id);
  }

  placeOrder(orderData) {
    const orders = this.getOrders();
    const currentUser = this.getCurrentUser();
    const product = this.getProductById(orderData.productId);
    
    if (!product) {
      throw new Error('Product not found');
    }
    if (Number(orderData.quantity) > product.quantity) {
      throw new Error(`Requested quantity exceeds available stock (${product.quantity} ${product.unit} available)`);
    }

    const orderNum = orders.length + 1;
    const newOrder = {
      id: `#00${orderNum}`,
      orderId: `ORD-00${orderNum}`,
      productId: product.id,
      productName: product.name,
      quantity: Number(orderData.quantity),
      unit: product.unit,
      unitPrice: product.price,
      totalPrice: Number(orderData.quantity) * product.price,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      farmerId: product.farmerId,
      farmerName: product.farmerName,
      deliveryLocation: orderData.deliveryLocation || currentUser.location,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      message: orderData.message || ''
    };

    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    // Update stock quantity
    this.updateProduct(product.id, {
      quantity: product.quantity - newOrder.quantity
    });

    // Notify farmer
    this.addNotification({
      title: `New order received for ${product.name} (${newOrder.quantity} ${product.unit})`,
      time: 'Just now',
      type: 'order',
      targetRole: 'Farmer',
      icon: '📦'
    });

    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId || o.orderId === orderId);
    if (order) {
      order.status = newStatus;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

      // Notification
      this.addNotification({
        title: `Order ${order.id} has been marked as ${newStatus}`,
        time: 'Just now',
        type: 'order',
        targetRole: 'Buyer',
        icon: newStatus === 'Accepted' ? '✅' : newStatus === 'Completed' ? '🎉' : '⚠️'
      });
      return order;
    }
    return null;
  }

  // Market Prices & AI
  getMarketPrices() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.MARKET_PRICES)) || SEED_MARKET_PRICES;
    } catch {
      return SEED_MARKET_PRICES;
    }
  }

  getAiPrediction(cropName = 'Tomato') {
    return AI_CROP_INTELLIGENCE[cropName] || AI_CROP_INTELLIGENCE['Tomato'];
  }

  // Notifications
  getNotifications(role = 'All') {
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) || SEED_NOTIFICATIONS;
    } catch {
      list = SEED_NOTIFICATIONS;
    }
    if (role && role !== 'All') {
      list = list.filter(n => n.targetRole === 'All' || n.targetRole.toLowerCase() === role.toLowerCase());
    }
    return list;
  }

  addNotification(notif) {
    const list = this.getNotifications('All');
    const newNotif = {
      id: 'notif-' + Date.now(),
      title: notif.title,
      time: notif.time || 'Just now',
      type: notif.type || 'info',
      targetRole: notif.targetRole || 'All',
      read: false,
      icon: notif.icon || '🔔'
    };
    list.unshift(newNotif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    return newNotif;
  }

  markNotificationsRead() {
    const list = this.getNotifications('All');
    list.forEach(n => n.read = true);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
  }

  resetToDefaults() {
    localStorage.clear();
    this.init();
  }
}

// Global store singleton instance
window.store = new AgriStore();
