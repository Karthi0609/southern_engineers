/* ============================================================
   data.js — the only file the client needs to touch
   ------------------------------------------------------------
   1. SITE      → company details, phone, WhatsApp, address
   2. PRODUCTS  → items for sale
   3. SERVICES  → work carried out
   4. PROJECTS  → gallery
   Add an object, the page renders it. Nothing else to change.
   ============================================================ */

/* ---------- 1. COMPANY DETAILS ---------- */
const SITE = {
  companyName: 'Southern Engineers',
  business: 'All Industrial Products Sales & Service',
  tagline: 'Your Trusted Partner in Industrial Solutions',
  phone: '+91 81446 79525',
  phoneDial: '+919629669602',
  phone2: '+91 88704 18345',
  phone3: '+91 96298 69180',
  whatsapp: '919629669602',
  whatsappDisplay: '+91 81446 79525',
  email: 'southernengineers21@gmail.com',
  address: 'Shop No. 37 A, RS Colony, Papanasam Main Road, Near Vikas School',
  city: 'Ambasamudram',
  district: '',
  state: 'Tamil Nadu',
  pincode: '627401',
  gstin: '33AAWIPM7339L1Z2',
  hours: '',
  domain: 'southernengineers.online'
};

/* Kept as a separate constant because the brief asks for it by name. */
const WHATSAPP_NUMBER = SITE.whatsapp;

/* ---------- 2. PRODUCTS ---------- */
/* group → used by the filter buttons. category → shown on the card. */
const products = [
  {
    id: 'control-valve',
    name: 'Control Valve',
    category: 'Industrial Valves',
    group: 'Valves',
    code: 'VLV-01',
    description: 'A control valve for regulating pressure and flow in an industrial process line.',
    image: 'assets/images/local-service/pressure-control-valve.png',
    tags: ['valve', 'control', 'actuator', 'flow control', 'pneumatic'],
    type: 'product'
  },
  {
    id: 'ball-valve',
    name: 'Ball Valve',
    category: 'Industrial Valves',
    group: 'Valves',
    code: 'VLV-02',
    description: 'A compact ball valve body with a quarter-turn shut-off design for reliable isolation.',
    image: 'assets/images/local-service/images.jpg',
    tags: ['valve', 'ball', 'isolation', 'lever', 'shut off'],
    type: 'product'
  },
  {
    id: 'globe-valve',
    name: 'Globe Valve',
    category: 'Industrial Valves',
    group: 'Valves',
    code: 'VLV-03',
    description: 'A globe valve assembly for throttling and flow regulation on service lines.',
    image: 'assets/images/local-service/images (1).jpg',
    tags: ['valve', 'globe', 'throttle', 'regulating'],
    type: 'product'
  },
  {
    id: 'gate-valve',
    name: 'Gate Valve',
    category: 'Industrial Valves',
    group: 'Valves',
    code: 'VLV-04',
    description: 'A flanged gate valve for full-open and full-close isolation service in piping systems.',
    image: 'assets/images/local-service/wipro-gate-valve-flange-g-3700-2-inch-dn-50.jpg',
    tags: ['valve', 'gate', 'isolation', 'wedge', 'handwheel'],
    type: 'product'
  },
  {
    id: 'check-valve',
    name: 'Check Valve',
    category: 'Industrial Valves',
    group: 'Valves',
    code: 'VLV-05',
    description: 'A swing check valve that allows forward flow and prevents reverse flow in the line.',
    image: 'assets/images/local-service/images (2).jpg',
    tags: ['valve', 'check', 'non return', 'nrv', 'reverse flow'],
    type: 'product'
  },
  {
    id: 'pressure-gauge',
    name: 'Compressor',
    category: 'Instrumentation',
    group: 'Instrumentation',
    code: 'INS-01',
    description: 'A compressor assembly for pressurizing air or gas in industrial applications.',
    image: 'assets/images/local-service/images (3).jpg',
    tags: ['gauge', 'pressure', 'bourdon', 'instrument', 'manometer'],
    type: 'product'
  },
  {
    id: 'flow-meter',
    name: 'Generator',
    category: 'Instrumentation',
    group: 'Instrumentation',
    code: 'INS-02',
    description: 'A generator pressure gauge is a heavy-duty mechanical indicator designed to monitor critical fluid and gas pressures within a generator system.',
    image: 'assets/images/local-service/images (4).jpg',
    tags: ['flow', 'meter', 'measurement', 'instrument', 'water'],
    type: 'product'
  },
  {
    id: 'rtd',
    name: 'Resistance Temperature Detector (RTD)',
    category: 'Instrumentation',
    group: 'Instrumentation',
    code: 'INS-03',
    description: 'An RTD temperature-sensing element used with a thermowell and instrumentation head.',
    image: 'assets/images/local-service/images (5).jpg',
    tags: ['rtd', 'temperature', 'pt100', 'sensor', 'instrument'],
    type: 'product'
  },
  {
    id: 'thermocouple',
    name: 'Thermocouple',
    category: 'Instrumentation',
    group: 'Instrumentation',
    code: 'INS-04',
    description: 'A thermocouple sensor for high-temperature process measurement and thermal monitoring.',
    image: 'assets/images/local-service/images (6).jpg',
    tags: ['thermocouple', 'temperature', 'type k', 'sensor', 'instrument'],
    type: 'product'
  },
  {
    id: 'pid-controller',
    name: 'PID Controller',
    category: 'Instrumentation',
    group: 'Instrumentation',
    code: 'INS-05',
    description: 'A PID panel controller for temperature, process and loop-control applications.',
    image: 'assets/images/local-service/images (7).jpg',
    tags: ['pid', 'controller', 'panel', 'process control', 'instrument'],
    type: 'product'
  },
  {
    id: 'pumps',
    name: 'pressure reducing valve (PRV)',
    category: 'Industrial Equipment',
    group: 'Equipment',
    code: 'EQP-01',
    description: 'A pressure reducing valve (PRV) gauge is a mechanical indicator mounted directly onto a regulator or piping system to monitor both incoming high pressure and regulated downstream pressure.',
    image: 'assets/images/local-service/images (8).jpg',
    tags: ['pump', 'motor', 'water', 'centrifugal', 'equipment'],
    type: 'product'
  },
  {
    id: 'air-compressor',
    name: 'Air Compressor',
    category: 'Industrial Equipment',
    group: 'Equipment',
    code: 'EQP-02',
    description: 'An air compressor unit for workshop, service and industrial compressed-air requirements.',
    image: 'assets/images/local-service/images (9).jpg',
    tags: ['compressor', 'air', 'receiver', 'workshop', 'equipment'],
    type: 'product'
  },
  {
    id: 'generator',
    name: 'PID Controller',
    category: 'Industrial Equipment',
    group: 'Equipment',
    code: 'EQP-03',
    description: 'A PID Controller pressure gauge (or transmitter-indicator) is a high-precision monitoring instrument that measures system pressure and transmits real-time data to a Proportional-Integral-Derivative (PID) controller.',
    image: 'assets/images/local-service/images (10).jpg',
    tags: ['generator', 'genset', 'dg set', 'power', 'backup', 'equipment'],
    type: 'product'
  }
];

/* ---------- 3. SERVICES ---------- */
const services = [
  {
    id: 'roofing',
    name: 'Roofing Work',
    category: 'Roofing & Sheeting',
    group: 'Roofing',
    code: 'SRV-01',
    description: 'Industrial, commercial and structural roofing based on site requirements.',
    image: 'assets/images/local-service/steel-a-type-metal-roofing-shed-fabrication-work-500x500.webp',
    tags: ['roof', 'roofing', 'sheet', 'truss', 'purlin', 'shed roof'],
    type: 'service'
  },
  {
    id: 'sheet-fabrication',
    name: 'Sheet Making / Sheet Fabrication',
    category: 'Sheet Metal Work',
    group: 'Fabrication',
    code: 'SRV-02',
    description: 'Sheet cutting, forming and fabrication work as per project requirement.',
    image: 'assets/images/local-service/steel-a-type-metal-roofing-shed-fabrication-work-500x500.webp',
    tags: ['sheet', 'sheet metal', 'bending', 'cutting', 'forming', 'roofing sheet'],
    type: 'service'
  },
  {
    id: 'cow-shed',
    name: 'Cow Shed / Cattle Shed',
    category: 'Structural Fabrication',
    group: 'Structural Work',
    code: 'SRV-03',
    description: 'Fabrication and roofing solutions for cattle shed and farm structures.',
    image: 'assets/images/local-service/cow-shed-500x500.webp',
    tags: ['cow shed', 'cattle shed', 'farm', 'agricultural', 'dairy', 'shed'],
    type: 'service'
  },
  {
    id: 'grill-work',
    name: 'Grill Work',
    category: 'Metal Fabrication',
    group: 'Fabrication',
    code: 'SRV-04',
    description: 'Metal grill fabrication for residential, commercial and industrial use.',
    image: 'assets/images/local-service/grill-fabrication-work-500x500.webp',
    tags: ['grill', 'window grill', 'gate', 'railing', 'ms grill', 'ss grill'],
    type: 'service'
  },
  {
    id: 'welding',
    name: 'Welding Work',
    category: 'Metal Fabrication',
    group: 'Fabrication',
    code: 'SRV-05',
    description: 'General welding and fabrication support at workshop or site.',
    image: 'assets/images/local-service/welder.jpg',
    tags: ['welding', 'arc', 'mig', 'tig', 'gas welding', 'site welding'],
    type: 'service'
  },
  {
    id: 'fabrication',
    name: 'Fabrication Work',
    category: 'Structural Fabrication',
    group: 'Structural Work',
    code: 'SRV-06',
    description: 'Custom metal and structural fabrication based on project requirement.',
    image: 'assets/images/local-service/steel-a-type-metal-roofing-shed-fabrication-work-500x500.webp',
    tags: ['fabrication', 'structure', 'steel', 'beam', 'custom', 'workshop'],
    type: 'service'
  },
  {
    id: 'equipment-sales',
    name: 'Industrial Equipment Sales',
    category: 'Sales & Supply',
    group: 'Industrial Service',
    code: 'SRV-07',
    description: 'Supply of industrial equipment, valves and instrumentation against requirement.',
    image: 'assets/images/local-service/08.png',
    tags: ['sales', 'supply', 'equipment', 'dealer', 'purchase'],
    type: 'service'
  },
  {
    id: 'equipment-service',
    name: 'Industrial Equipment Service',
    category: 'Equipment Service',
    group: 'Industrial Service',
    code: 'SRV-08',
    description: 'Inspection, checking and service support for industrial equipment.',
    image: 'assets/images/local-service/08.png',
    tags: ['service', 'inspection', 'equipment', 'checking', 'support'],
    type: 'service'
  },
  {
    id: 'equipment-installation',
    name: 'Industrial Equipment Installation',
    category: 'Equipment Service',
    group: 'Industrial Service',
    code: 'SRV-09',
    description: 'Erection, alignment and commissioning support for supplied equipment.',
    image: 'assets/images/local-service/08.png',
    tags: ['installation', 'erection', 'commissioning', 'alignment', 'fitting'],
    type: 'service'
  },
  {
    id: 'equipment-maintenance',
    name: 'Industrial Equipment Maintenance',
    category: 'Equipment Service',
    group: 'Industrial Service',
    code: 'SRV-10',
    description: 'Periodic maintenance support to keep equipment in working condition.',
    image: 'assets/images/local-service/wipro-gate-valve-flange-g-3700-2-inch-dn-50.jpg',
    tags: ['maintenance', 'preventive', 'amc', 'servicing', 'periodic'],
    type: 'service'
  },
  {
    id: 'equipment-repair',
    name: 'Industrial Equipment Repair',
    category: 'Equipment Service',
    group: 'Industrial Service',
    code: 'SRV-11',
    description: 'Breakdown attending and repair work for industrial equipment.',
    image: 'assets/images/local-service/welder.jpg',
    tags: ['repair', 'breakdown', 'overhaul', 'rebuild', 'fault'],
    type: 'service'
  }
];

/* ---------- 4. PROJECT GALLERY ---------- */
/* Work photos are assigned directly in the local image catalogue
   and surfaced through the gallery renderer. */
const projects = [
  { title: 'Industrial Roofing Work',      category: 'Roofing',              image: 'assets/images/local-service/steel-a-type-metal-roofing-shed-fabrication-work-500x500.webp', placeholder: false },
  { title: 'Roofing Sheet Work',           category: 'Roofing',              image: 'assets/images/local-service/steel-a-type-metal-roofing-shed-fabrication-work-500x500.webp', placeholder: false },
  { title: 'Structural Fabrication',       category: 'Fabrication',          image: 'assets/images/local-service/images.jfif', placeholder: false },
  { title: 'Sheet Fabrication Work',       category: 'Fabrication',          image: 'assets/images/local-service/images.jfif', placeholder: false },
  { title: 'Cattle Shed Fabrication',      category: 'Cattle Shed',          image: 'assets/images/local-service/cow-shed-500x500.webp', placeholder: false },
  { title: 'Cattle Shed Roofing',          category: 'Cattle Shed',          image: 'assets/images/local-service/cow-shed-500x500.webp', placeholder: false },
  { title: 'Window & Gate Grill Work',     category: 'Grill Work',           image: 'assets/images/local-service/grill-fabrication-work-500x500.webp', placeholder: false },
  { title: 'Railing & Grill Fabrication',  category: 'Grill Work',           image: 'assets/images/local-service/grill-fabrication-work-500x500.webp', placeholder: false },
  { title: 'Site Welding Work',            category: 'Welding',              image: 'assets/images/local-service/welder.jpg', placeholder: false },
  { title: 'Workshop Welding & Repair',    category: 'Welding',              image: 'assets/images/local-service/welder.jpg', placeholder: false },
  { title: 'Pump Set Supply',              category: 'Industrial Equipment', image: 'assets/images/local-service/08.png', placeholder: false },
  { title: 'Generator Set Supply',         category: 'Industrial Equipment', image: 'assets/images/local-service/images (10).jpg', placeholder: false }
];

/* ---------- 5. SUPPORTING CONTENT ---------- */
const featured = [
  { title: 'Industrial Equipment', text: 'Pumps, compressors, generators and related equipment.', image: 'assets/images/local-service/08.png', target: '#products' },
  { title: 'Industrial Valves',    text: 'Control, ball, globe, gate and check valves.',          image: 'assets/images/local-service/wipro-gate-valve-flange-g-3700-2-inch-dn-50.jpg', target: '#products' },
  { title: 'Roofing Solutions',    text: 'Roofing and structural sheet solutions.',               image: 'assets/images/local-service/steel-a-type-metal-roofing-shed-fabrication-work-500x500.webp', target: '#services' },
  { title: 'Fabrication',          text: 'Custom metal and structural fabrication.',              image: 'assets/images/local-service/images.jfif', target: '#services' },
  { title: 'Cattle Shed',          text: 'Cattle shed and agricultural structure fabrication.',   image: 'assets/images/local-service/cow-shed-500x500.webp', target: '#services' },
  { title: 'Welding',              text: 'General industrial welding and fabrication.',           image: 'assets/images/local-service/welder.jpg', target: '#services' }
];

const industries = [
  'Industrial Facilities', 'Manufacturing', 'Commercial Buildings', 'Agricultural Requirements',
  'Workshops', 'Warehouses', 'Construction & Structural Work', 'Industrial Maintenance'
];

/* ---------- Shared namespace ----------
   Later this whole block can be replaced by a fetch() from an API
   without touching any rendering file:

     APP.data = await (await fetch('/api/catalogue')).json();
------------------------------------------------------------------ */
window.APP = window.APP || {};
window.APP.data = { SITE, WHATSAPP_NUMBER, products, services, projects, featured, industries };
window.APP.catalogue = products.concat(services);
