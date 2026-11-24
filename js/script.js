/**
 * ============================================================================
 * CLARAELEN — LÓGICA PRINCIPAL DE LA TIENDA ONLINE (script.js)
 * Arquitectura Frontend ES6+ | Carrito LocalStorage, Filtros, Búsqueda y WhatsApp
 * ============================================================================
 */

'use strict';

/* ----------------------------------------------------------------------------
   1. CONFIGURACIÓN CENTRAL DE LA TIENDA (EDITABLE POR EL PROPIETARIO)
   ---------------------------------------------------------------------------- */
const STORE_CONFIG = {
  brandName: 'ClaraElen',
  currencySymbol: 'S/',
  whatsappNumber: '51977555420',
  whatsappDefaultMessage:
    '¡Hola! Estoy interesada en conocer los productos de ClaraElen. ¿Podrían brindarme información?',
  social: {
    facebook: 'https://web.facebook.com/profile.php?id=61567153204934',
    instagram: '', // Configurar URL oficial de Instagram cuando esté disponible
    tiktok: ''     // Configurar URL oficial de TikTok cuando esté disponible
  },
  payments: {
    yape: {
      name: 'Yape',
      status: 'pending',
      statusLabel: 'Pendiente de configuración',
      note: 'Configurar número y código QR oficial del comercio.'
    },
    plin: {
      name: 'Plin',
      status: 'pending',
      statusLabel: 'Pendiente de configuración',
      note: 'Configurar número y código QR oficial del comercio.'
    },
    culqi: {
      name: 'Tarjetas Visa / Mastercard (Culqi)',
      status: 'pending',
      statusLabel: 'Pasarela lista para integrar',
      note: 'Requiere llave pública/privada oficial de Culqi en producción.'
    },
    mercadopago: {
      name: 'Tarjetas Visa / Mastercard (Mercado Pago)',
      status: 'pending',
      statusLabel: 'Pasarela lista para integrar',
      note: 'Requiere credenciales oficiales de Mercado Pago Perú.'
    },
    izipay: {
      name: 'Tarjetas Visa / Mastercard (Izipay)',
      status: 'pending',
      statusLabel: 'Pasarela lista para integrar',
      note: 'Requiere credenciales oficiales de comercio Izipay.'
    },
    transferencia: {
      name: 'Transferencia Bancaria',
      status: 'pending',
      statusLabel: 'Cuentas por configurar',
      note: 'BCP / Interbank / BBVA / Scotiabank — cuentas por registrar.'
    },
    contraentrega: {
      name: 'Pago contra entrega',
      status: 'conditional',
      statusLabel: 'Sujeto a disponibilidad',
      note: 'Disponible únicamente en zonas con cobertura confirmada por WhatsApp.'
    }
  }
};

/* ----------------------------------------------------------------------------
   2. LAS 17 CATEGORÍAS OFICIALES DEL CATÁLOGO
   ---------------------------------------------------------------------------- */
const CATEGORIES = [
  { id: 'vestidos-casuales', name: 'Vestidos casuales', icon: 'bi-sun' },
  { id: 'vestidos-fiesta', name: 'Vestidos elegantes y de fiesta', icon: 'bi-stars' },
  { id: 'blusas-polos', name: 'Blusas y polos', icon: 'bi-flower1' },
  { id: 'camisas', name: 'Camisas femeninas', icon: 'bi-suit-heart' },
  { id: 'pantalones-jeans', name: 'Pantalones y jeans', icon: 'bi-layers' },
  { id: 'shorts', name: 'Shorts', icon: 'bi-brightness-high' },
  { id: 'faldas', name: 'Faldas', icon: 'bi-gem' },
  { id: 'conjuntos', name: 'Conjuntos de dos piezas', icon: 'bi-grid' },
  { id: 'deportiva', name: 'Ropa deportiva', icon: 'bi-lightning' },
  { id: 'oficina', name: 'Ropa de oficina', icon: 'bi-briefcase' },
  { id: 'invierno', name: 'Ropa de invierno', icon: 'bi-snow' },
  { id: 'chaquetas-abrigos', name: 'Chaquetas y abrigos', icon: 'bi-shield-check' },
  { id: 'lenceria-pijamas', name: 'Lencería y pijamas', icon: 'bi-moon-stars' },
  { id: 'playa-verano', name: 'Ropa de playa y verano', icon: 'bi-water' },
  { id: 'calzado', name: 'Calzado femenino', icon: 'bi-bag-heart' },
  { id: 'carteras-bolsos', name: 'Carteras y bolsos', icon: 'bi-handbag' },
  { id: 'accesorios', name: 'Accesorios y complementos', icon: 'bi-sparkles' }
];

/* ----------------------------------------------------------------------------
   3. CATÁLOGO DE PRODUCTOS DE DEMOSTRACIÓN (PRECIOS EDITABLES EN SOLES S/)
   Nota: Productos ilustrativos de demostración para estructura comercial.
   ---------------------------------------------------------------------------- */
const PRODUCTS_CATALOG = [
  {
    id: 'CE-001',
    name: 'Vestido Midi Floral Amatista',
    category: 'vestidos-casuales',
    price: 139.90,
    oldPrice: 169.90,
    badge: 'Oferta',
    isBestSeller: true,
    isNew: false,
    available: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Morado Imperial', hex: '#702C91' },
      { name: 'Lila Suave', hex: '#A66AC5' },
      { name: 'Marfil', hex: '#F6F2EA' }
    ],
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Vestido midi de caída fluida con escote sutil y cintura estilizada, ideal para salidas de día con un toque femenino y moderno.',
    details: ['Producto de demostración — Precio editable', 'Corte midi fluido', 'Tejido ligero de tacto suave']
  },
  {
    id: 'CE-002',
    name: 'Vestido de Gala Satinado Nocturne',
    category: 'vestidos-fiesta',
    price: 229.90,
    oldPrice: null,
    badge: 'Nuevo',
    isBestSeller: true,
    isNew: true,
    available: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Morado Oscuro', hex: '#46105D' },
      { name: 'Negro Elegante', hex: '#25212A' },
      { name: 'Vino Borgoña', hex: '#6E1D3A' }
    ],
    image: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Diseño largo con acabado satinado luminoso y abertura lateral discreta para eventos, recepciones y celebraciones especiales.',
    details: ['Producto de demostración — Precio editable', 'Acabado satinado elegante', 'Cierre posterior oculto']
  },
  {
    id: 'CE-003',
    name: 'Blusa Satinada Drapeada Elena',
    category: 'blusas-polos',
    price: 89.90,
    oldPrice: 109.90,
    badge: 'Más vendido',
    isBestSeller: true,
    isNew: false,
    available: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanco Perla', hex: '#FFFFFF' },
      { name: 'Lila', hex: '#A66AC5' },
      { name: 'Negro', hex: '#25212A' }
    ],
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Blusa femenina de cuello drapeado con caída delicada, versátil para combinar tanto con pantalones sastre como con jeans de tiro alto.',
    details: ['Producto de demostración — Precio editable', 'Cuello drapeado favorecedor', 'Fácil combinación día y noche']
  },
  {
    id: 'CE-004',
    name: 'Camisa Estructurada Popelina Clara',
    category: 'camisas',
    price: 109.90,
    oldPrice: null,
    badge: 'Nuevo',
    isBestSeller: false,
    isNew: true,
    available: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanco Puro', hex: '#FFFFFF' },
      { name: 'Lila Pastel', hex: '#D8BBE8' },
      { name: 'Celeste Suave', hex: '#B9D3EA' }
    ],
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Camisa femenina de corte contemporáneo con botones nacarados y puños definidos para un look pulcro y sofisticado.',
    details: ['Producto de demostración — Precio editable', 'Corte ligeramente entallado', 'Botones frontales delicados']
  },
  {
    id: 'CE-005',
    name: 'Pantalón Palazzo Tiro Alto Valeria',
    category: 'pantalones-jeans',
    price: 134.90,
    oldPrice: 159.90,
    badge: 'Más vendido',
    isBestSeller: true,
    isNew: false,
    available: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro Elegante', hex: '#25212A' },
      { name: 'Morado Oscuro', hex: '#46105D' },
      { name: 'Beige Arena', hex: '#D9CBB8' }
    ],
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Pantalón palazzo de pierna amplia y pinzas frontales que estiliza la silueta con máxima comodidad y elegancia.',
    details: ['Producto de demostración — Precio editable', 'Cintura de tiro alto', 'Caída amplia estilizada']
  },
  {
    id: 'CE-006',
    name: 'Short Sastre Cintura Alta Brisa',
    category: 'shorts',
    price: 84.90,
    oldPrice: null,
    badge: 'Nuevo',
    isBestSeller: false,
    isNew: true,
    available: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Blanco Marfil', hex: '#F7F5F0' },
      { name: 'Lila', hex: '#A66AC5' },
      { name: 'Negro', hex: '#25212A' }
    ],
    image: 'https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Short de corte sastre con pinzas delanteras y pretina estructurada, pensado para días cálidos sin perder distinción.',
    details: ['Producto de demostración — Precio editable', 'Bolsillos laterales funcionales', 'Corte sastre moderno']
  },
  {
    id: 'CE-007',
    name: 'Falda Midi Plisada Orquídea',
    category: 'faldas',
    price: 119.90,
    oldPrice: 145.00,
    badge: 'Oferta',
    isBestSeller: true,
    isNew: false,
    available: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Morado Principal', hex: '#702C91' },
      { name: 'Gris Perla', hex: '#D4CFD8' },
      { name: 'Negro', hex: '#25212A' }
    ],
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Falda midi de plisado fino con movimiento etéreo y pretina cómoda, perfecta para looks románticos o ejecutivos.',
    details: ['Producto de demostración — Precio editable', 'Plisado permanente delicado', 'Largo midi versátil']
  },
  {
    id: 'CE-008',
    name: 'Conjunto Dos Piezas Blazer & Pantalón Aura',
    category: 'conjuntos',
    price: 219.90,
    oldPrice: 259.90,
    badge: 'Más vendido',
    isBestSeller: true,
    isNew: true,
    available: true,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Lila EmPolvado', hex: '#A66AC5' },
      { name: 'Morado Oscuro', hex: '#46105D' },
      { name: 'Crema', hex: '#EFECE6' }
    ],
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Conjunto coordinado de blazer entallado y pantalón recto de tiro alto que proyecta seguridad y sofisticación.',
    details: ['Producto de demostración — Precio editable', 'Incluye blazer y pantalón', 'Silueta moderna estructurada']
  },
  {
    id: 'CE-009',
    name: 'Set Deportivo Seamless Violeta',
    category: 'deportiva',
    price: 124.90,
    oldPrice: null,
    badge: 'Nuevo',
    isBestSeller: false,
    isNew: true,
    available: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Morado Principal', hex: '#702C91' },
      { name: 'Negro', hex: '#25212A' },
      { name: 'Rosa Malva', hex: '#C48BA8' }
    ],
    image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Conjunto deportivo de soporte medio con top anatómico y legging de cintura alta que acompaña cada movimiento.',
    details: ['Producto de demostración — Precio editable', 'Tejido elástico transpirable', 'Cintura alta de sujeción suave']
  },
  {
    id: 'CE-010',
    name: 'Blazer Ejecutivo Sastre Sofía',
    category: 'oficina',
    price: 169.90,
    oldPrice: 199.90,
    badge: 'Oferta',
    isBestSeller: true,
    isNew: false,
    available: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro Elegante', hex: '#25212A' },
      { name: 'Morado Oscuro', hex: '#46105D' },
      { name: 'Marfil', hex: '#F5F2EB' }
    ],
    image: 'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Blazer de solapa clásica y hombros definidos que eleva al instante cualquier atuendo profesional.',
    details: ['Producto de demostración — Precio editable', 'Forro interior suave', 'Solapa clásica estilizada']
  },
  {
    id: 'CE-011',
    name: 'Chompa Tejida Cuello Alto Cashmere-Touch',
    category: 'invierno',
    price: 129.90,
    oldPrice: null,
    badge: 'Nuevo',
    isBestSeller: false,
    isNew: true,
    available: true,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Lila', hex: '#A66AC5' },
      { name: 'Blanco Invierno', hex: '#F7F6F8' },
      { name: 'Gris Topo', hex: '#8A818E' }
    ],
    image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Suéter de punto acanalado suave y abrigador, diseñado para brindar calidez sin perder ligereza ni estilo.',
    details: ['Producto de demostración — Precio editable', 'Punto acanalado de tacto suave', 'Cuello alto acogedor']
  },
  {
    id: 'CE-012',
    name: 'Abrigo Largo Entallado Imperial',
    category: 'chaquetas-abrigos',
    price: 249.90,
    oldPrice: 289.90,
    badge: 'Oferta',
    isBestSeller: true,
    isNew: false,
    available: true,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Morado Oscuro', hex: '#46105D' },
      { name: 'Negro', hex: '#25212A' },
      { name: 'Camel', hex: '#B8926A' }
    ],
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Abrigo estructurado de corte largo con cinturón desmontable que aporta presencia distinguida en temporada fría.',
    details: ['Producto de demostración — Precio editable', 'Cinturón ajustable incluido', 'Bolsillos laterales profundos']
  },
  {
    id: 'CE-013',
    name: 'Set Pijama Satinado Dos Piezas Sueño Lila',
    category: 'lenceria-pijamas',
    price: 104.90,
    oldPrice: null,
    badge: 'Nuevo',
    isBestSeller: false,
    isNew: true,
    available: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Lila Suave', hex: '#A66AC5' },
      { name: 'Champagne', hex: '#EFE3D4' },
      { name: 'Morado Oscuro', hex: '#46105D' }
    ],
    image: 'https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Conjunto de descanso con acabado sedoso y ribetes contrastantes para noches de confort y feminidad.',
    details: ['Producto de demostración — Precio editable', 'Textura satinada ligera', 'Pretina elástica cómoda']
  },
  {
    id: 'CE-014',
    name: 'Salida de Playa & Vestido Verano Sol',
    category: 'playa-verano',
    price: 94.90,
    oldPrice: 115.00,
    badge: 'Oferta',
    isBestSeller: false,
    isNew: false,
    available: true,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Blanco Puro', hex: '#FFFFFF' },
      { name: 'Lila', hex: '#A66AC5' },
      { name: 'Coral Suave', hex: '#E08A7E' }
    ],
    image: 'https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Prenda fresca de caída vaporosa ideal para días de sol, escapadas de verano y paseos frente al mar.',
    details: ['Producto de demostración — Precio editable', 'Tejido fresco y respirable', 'Diseño fluido de verano']
  },
  {
    id: 'CE-015',
    name: 'Stilettos Elegantes Punta Fina Celina',
    category: 'calzado',
    price: 159.90,
    oldPrice: null,
    badge: 'Más vendido',
    isBestSeller: true,
    isNew: true,
    available: true,
    sizes: ['36', '37', '38', '39'],
    colors: [
      { name: 'Negro Elegante', hex: '#25212A' },
      { name: 'Morado Oscuro', hex: '#46105D' },
      { name: 'Nude', hex: '#DFC3B0' }
    ],
    image: 'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Zapatos de tacón estilizado con plantilla acolchada que combinan presencia sofisticada y estabilidad al caminar.',
    details: ['Producto de demostración — Precio editable', 'Plantilla interior acolchada', 'Tacón estilizado de 7.5 cm']
  },
  {
    id: 'CE-016',
    name: 'Cartera Estructurada Monograma Clara',
    category: 'carteras-bolsos',
    price: 149.90,
    oldPrice: 179.90,
    badge: 'Oferta',
    isBestSeller: true,
    isNew: false,
    available: true,
    sizes: ['Única'],
    colors: [
      { name: 'Morado Principal', hex: '#702C91' },
      { name: 'Negro', hex: '#25212A' },
      { name: 'Marfil', hex: '#F4F1EA' }
    ],
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Cartera de mano con asa superior y correa desmontable, compartimentos interiores organizados y herrajes metálicos finos.',
    details: ['Producto de demostración — Precio editable', 'Correa larga ajustable incluida', 'Compartimento interior con cierre']
  },
  {
    id: 'CE-017',
    name: 'Set de Aretes y Collar Baño Dorado Amatista',
    category: 'accesorios',
    price: 69.90,
    oldPrice: null,
    badge: 'Nuevo',
    isBestSeller: false,
    isNew: true,
    available: true,
    sizes: ['Única'],
    colors: [
      { name: 'Dorado / Lila', hex: '#D4AF37' },
      { name: 'Plateado / Morado', hex: '#C0C0C0' }
    ],
    image: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Juego delicado de collar y aretes con destello sutil pensado para complementar vestidos y blusas de ocasión.',
    details: ['Producto de demostración — Precio editable', 'Acabado brillante delicado', 'Presentación lista para regalo']
  },
  {
    id: 'CE-018',
    name: 'Vestido Camisero Cinturón Valentina',
    category: 'vestidos-casuales',
    price: 149.90,
    oldPrice: null,
    badge: 'Nuevo',
    isBestSeller: false,
    isNew: true,
    available: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Lila', hex: '#A66AC5' },
      { name: 'Blanco', hex: '#FFFFFF' }
    ],
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Vestido camisero versátil con lazada en la cintura que permite ajustar la silueta según la ocasión.',
    details: ['Producto de demostración — Precio editable', 'Incluye cinturón del mismo tejido', 'Botones frontales']
  },
  {
    id: 'CE-019',
    name: 'Blusa Romántica Mangas Abullonadas',
    category: 'blusas-polos',
    price: 94.90,
    oldPrice: null,
    badge: null,
    isBestSeller: false,
    isNew: false,
    available: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Morado Principal', hex: '#702C91' },
      { name: 'Blanco Perla', hex: '#FFFFFF' }
    ],
    image: 'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Blusa femenina con mangas ligeramente abullonadas y puño delicado que aporta un aire romántico y contemporáneo.',
    details: ['Producto de demostración — Precio editable', 'Mangas con volumen sutil', 'Tejido suave y cómodo']
  },
  {
    id: 'CE-020',
    name: 'Jean Recto Tiro Alto Denim Boutique',
    category: 'pantalones-jeans',
    price: 129.90,
    oldPrice: 149.90,
    badge: 'Oferta',
    isBestSeller: true,
    isNew: false,
    available: true,
    sizes: ['26', '28', '30', '32'],
    colors: [
      { name: 'Azul Clásico', hex: '#3B5978' },
      { name: 'Negro Lavado', hex: '#2D2A32' }
    ],
    image: 'https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Jean de corte recto atemporal con calce favorecedor en cintura y cadera para el uso diario con estilo.',
    details: ['Producto de demostración — Precio editable', 'Tiro alto cómodo', 'Denim resistente con ligera elasticidad']
  },
  {
    id: 'CE-021',
    name: 'Conjunto Tejido Dos Piezas Armonía',
    category: 'conjuntos',
    price: 179.90,
    oldPrice: null,
    badge: 'Nuevo',
    isBestSeller: false,
    isNew: true,
    available: true,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Morado Oscuro', hex: '#46105D' },
      { name: 'Beige Suave', hex: '#DFD3C3' }
    ],
    image: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Conjunto de top sin mangas y falda midi coordinada de punto fino, ideal para un look pulido sin esfuerzo.',
    details: ['Producto de demostración — Precio editable', 'Dos piezas combinables por separado', 'Punto fino de alta suavidad']
  },
  {
    id: 'CE-022',
    name: 'Sandalias Tacón Bloque Luminosa',
    category: 'calzado',
    price: 144.90,
    oldPrice: 169.90,
    badge: 'Oferta',
    isBestSeller: false,
    isNew: false,
    available: true,
    sizes: ['36', '37', '38', '39'],
    colors: [
      { name: 'Lila Metálico', hex: '#A66AC5' },
      { name: 'Blanco Marfil', hex: '#F7F5F0' }
    ],
    image: 'https://images.pexels.com/photos/1445696/pexels-photo-1445696.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sandalias de tiras delicadas con tacón bloque cómodo para acompañar vestidos y conjuntos de día o noche.',
    details: ['Producto de demostración — Precio editable', 'Tacón bloque estable', 'Pulsera ajustable al tobillo']
  },
  {
    id: 'CE-023',
    name: 'Bolso Bandolera Acolchado Esencia',
    category: 'carteras-bolsos',
    price: 129.90,
    oldPrice: null,
    badge: 'Nuevo',
    isBestSeller: false,
    isNew: true,
    available: true,
    sizes: ['Única'],
    colors: [
      { name: 'Negro Elegante', hex: '#25212A' },
      { name: 'Lila', hex: '#A66AC5' }
    ],
    image: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Bolso bandolera compacto con textura acolchada y cadena metálica elegante para llevar tus esenciales con estilo.',
    details: ['Producto de demostración — Precio editable', 'Cierre seguro con solapa', 'Correa de cadena y eco-cuero']
  },
  {
    id: 'CE-024',
    name: 'Pañuelo Satinado Estampado Botánico',
    category: 'accesorios',
    price: 54.90,
    oldPrice: null,
    badge: null,
    isBestSeller: false,
    isNew: false,
    available: true,
    sizes: ['Única'],
    colors: [
      { name: 'Morado & Lila', hex: '#702C91' },
      { name: 'Marfil & Violeta', hex: '#EFE6F4' }
    ],
    image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Pañuelo cuadrado de tacto sedoso ideal para lucir en el cuello, el cabello o como detalle en tu cartera favorita.',
    details: ['Producto de demostración — Precio editable', 'Medidas 70 x 70 cm', 'Acabado satinado suave']
  }
];

/* ----------------------------------------------------------------------------
   4. TESTIMONIOS DE DEMOSTRACIÓN (EJEMPLOS ILUSTRATIVOS)
   ---------------------------------------------------------------------------- */
const DEMO_TESTIMONIALS = [
  {
    id: 'REV-DEMO-1',
    isDemo: true,
    name: 'Camila R. (Ejemplo ilustrativo)',
    location: 'Lima, Perú',
    rating: 5,
    garment: 'Vestido Midi Floral Amatista',
    comment: '“Me encantó la atención personalizada por WhatsApp para elegir mi talla. La presentación y los detalles de la tienda transmiten mucha confianza.”',
    date: 'Ejemplo de demostración · 2026',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'REV-DEMO-2',
    isDemo: true,
    name: 'Valeria M. (Ejemplo ilustrativo)',
    location: 'Trujillo, Perú',
    rating: 5,
    garment: 'Conjunto Dos Piezas Aura',
    comment: '“Excelente estética y prendas muy femeninas. Pude coordinar mi pedido de manera rápida y clara desde mi celular.”',
    date: 'Ejemplo de demostración · 2026',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'REV-DEMO-3',
    isDemo: true,
    name: 'Andrea S. (Ejemplo ilustrativo)',
    location: 'Arequipa, Perú',
    rating: 5,
    garment: 'Blusa Satinada Drapeada Elena',
    comment: '“Una experiencia de compra elegante y sencilla. Me gustó poder ver los colores y tallas disponibles antes de hacer mi consulta.”',
    date: 'Ejemplo de demostración · 2026',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

/* ----------------------------------------------------------------------------
   5. UTILIDADES DE FORMATO, RUTAS, WHATSAPP Y FALLBACK DE IMAGEN
   ---------------------------------------------------------------------------- */
function getBasePath() {
  return document.body.getAttribute('data-base-path') || './';
}

function formatPrice(amount) {
  const num = Number(amount) || 0;
  return `${STORE_CONFIG.currencySymbol} ${num.toFixed(2)}`;
}

function getCategoryName(slug) {
  const found = CATEGORIES.find((c) => c.id === slug);
  return found ? found.name : 'Moda Femenina';
}

function buildWhatsAppUrl(customText) {
  const text = encodeURIComponent(customText || STORE_CONFIG.whatsappDefaultMessage);
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${text}`;
}

function buildProductWhatsAppUrl(product, size, color) {
  const msg = `¡Hola ClaraElen! Estoy interesada en el producto:\n• Prenda: ${product.name} (${product.id})\n• Categoría: ${getCategoryName(product.category)}\n• Talla: ${size}\n• Color: ${color}\n• Precio referencial: ${formatPrice(product.price)}\n¿Podrían brindarme información sobre disponibilidad y envío?`;
  return buildWhatsAppUrl(msg);
}

// Fallback SVG elegante si alguna imagen externa no carga sin conexión
const FALLBACK_PRODUCT_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#46105D"/>
          <stop offset="100%" stop-color="#A66AC5"/>
        </linearGradient>
      </defs>
      <rect width="600" height="800" fill="url(#g)"/>
      <circle cx="300" cy="340" r="110" fill="rgba(255,255,255,0.12)"/>
      <text x="300" y="355" text-anchor="middle" font-family="Georgia, serif" font-size="56" font-weight="700" fill="#FFFFFF">CE</text>
      <text x="300" y="425" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#F5F3F6">ClaraElen Boutique</text>
      <text x="300" y="460" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="rgba(255,255,255,0.75)">Imagen ilustrativa de demostración</text>
    </svg>`
  );

window.handleImageFallback = function (imgEl) {
  if (!imgEl.dataset.fallbackApplied) {
    imgEl.dataset.fallbackApplied = 'true';
    imgEl.src = FALLBACK_PRODUCT_SVG;
  }
};

/* ----------------------------------------------------------------------------
   6. GESTIÓN DE CARRITO Y FAVORITOS (LOCALSTORAGE)
   ---------------------------------------------------------------------------- */
const CART_STORAGE_KEY = 'claraelen_cart_v1';
const WISHLIST_STORAGE_KEY = 'claraelen_wishlist_v1';
const ORDERS_STORAGE_KEY = 'claraelen_demo_orders_v1';

const StoreState = {
  cart: [],
  wishlist: [],
  cardSelections: {} // { [productId]: { size, color } }
};

function loadStoreState() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    StoreState.cart = Array.isArray(savedCart) ? savedCart : [];
  } catch (e) {
    StoreState.cart = [];
  }

  try {
    const savedWish = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY));
    StoreState.wishlist = Array.isArray(savedWish) ? savedWish : [];
  } catch (e) {
    StoreState.wishlist = [];
  }

  PRODUCTS_CATALOG.forEach((p) => {
    StoreState.cardSelections[p.id] = {
      size: p.sizes[0],
      color: p.colors[0].name
    };
  });
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(StoreState.cart));
  } catch (e) {
    console.warn('No se pudo guardar el carrito en LocalStorage:', e);
  }
  updateCartUI();
}

function saveWishlist() {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(StoreState.wishlist));
  } catch (e) {
    console.warn('No se pudo guardar favoritos en LocalStorage:', e);
  }
  updateWishlistUI();
}

function addToCart(productId, size, color, qty = 1) {
  const product = PRODUCTS_CATALOG.find((p) => p.id === productId);
  if (!product) return;

  const chosenSize = size || (StoreState.cardSelections[productId]?.size ?? product.sizes[0]);
  const chosenColor = color || (StoreState.cardSelections[productId]?.color ?? product.colors[0].name);
  const key = `${productId}__${chosenSize}__${chosenColor}`;

  const existingIndex = StoreState.cart.findIndex((item) => item.key === key);
  if (existingIndex > -1) {
    StoreState.cart[existingIndex].qty += qty;
  } else {
    StoreState.cart.push({
      key,
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      size: chosenSize,
      color: chosenColor,
      qty: qty
    });
  }

  saveCart();
  showToast(`“${product.name}” (Talla ${chosenSize}, ${chosenColor}) se agregó al carrito.`);
}

function updateCartItemQty(key, delta) {
  const idx = StoreState.cart.findIndex((item) => item.key === key);
  if (idx === -1) return;

  StoreState.cart[idx].qty += delta;
  if (StoreState.cart[idx].qty <= 0) {
    StoreState.cart.splice(idx, 1);
  }
  saveCart();
}

function removeFromCart(key) {
  StoreState.cart = StoreState.cart.filter((item) => item.key !== key);
  saveCart();
}

function clearCart() {
  StoreState.cart = [];
  saveCart();
}

function getCartTotals() {
  const totalItems = StoreState.cart.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = StoreState.cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  return {
    totalItems,
    subtotal,
    total: subtotal // Envío se coordina según destino en Perú
  };
}

function toggleWishlist(productId) {
  const product = PRODUCTS_CATALOG.find((p) => p.id === productId);
  if (!product) return;

  const idx = StoreState.wishlist.indexOf(productId);
  if (idx > -1) {
    StoreState.wishlist.splice(idx, 1);
    showToast(`Se quitó “${product.name}” de tus favoritos.`);
  } else {
    StoreState.wishlist.push(productId);
    showToast(`“${product.name}” guardado en tus favoritos.`);
  }
  saveWishlist();
}

/* ----------------------------------------------------------------------------
   7. NOTIFICACIONES TOAST ELEGANTES
   ---------------------------------------------------------------------------- */
function showToast(message) {
  let container = document.getElementById('ceToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ceToastContainer';
    container.className = 'toast-container position-fixed bottom-0 start-0 p-3';
    container.style.zIndex = '1080';
    document.body.appendChild(container);
  }

  const toastEl = document.createElement('div');
  toastEl.className = 'toast align-items-center text-white border-0 shadow-lg';
  toastEl.style.backgroundColor = '#46105D';
  toastEl.setAttribute('role', 'status');
  toastEl.setAttribute('aria-live', 'polite');
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body d-flex align-items-center gap-2">
        <i class="bi bi-check-circle-fill text-warning"></i>
        <span>${message}</span>
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
    </div>
  `;
  container.appendChild(toastEl);

  if (window.bootstrap && window.bootstrap.Toast) {
    const bsToast = new window.bootstrap.Toast(toastEl, { delay: 3200 });
    bsToast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
  } else {
    setTimeout(() => toastEl.remove(), 3200);
  }
}

/* ----------------------------------------------------------------------------
   8. RENDERIZADO DE COMPONENTES GLOBALES (HEADER, MODALES, DRAWER, FOOTER)
   ---------------------------------------------------------------------------- */
function renderGlobalLayout() {
  const base = getBasePath();
  const homeUrl = `${base}index.html`;
  const catalogUrl = `${base}pages/catalogo.html`;
  const aboutUrl = `${base}pages/nosotros.html`;
  const contactUrl = `${base}pages/contacto.html`;
  const cartUrl = `${base}pages/carrito.html`;
  const privacyUrl = `${base}pages/privacidad.html`;
  const termsUrl = `${base}pages/terminos.html`;
  const logoSrc = `${base}assets/img/logo-claraelen.png`;

  // 1) Inyectar Header si existe el contenedor #globalHeaderMount
  const headerMount = document.getElementById('globalHeaderMount');
  if (headerMount) {
    const categoriesCol1 = CATEGORIES.slice(0, 9)
      .map((c) => `<li><a class="dropdown-item" href="${catalogUrl}?cat=${c.id}">${c.name}</a></li>`)
      .join('');
    const categoriesCol2 = CATEGORIES.slice(9)
      .map((c) => `<li><a class="dropdown-item" href="${catalogUrl}?cat=${c.id}">${c.name}</a></li>`)
      .join('');

    headerMount.innerHTML = `
      <div class="top-announcement text-center">
        <div class="container d-flex flex-wrap justify-content-center justify-content-md-between align-items-center gap-2">
          <span><i class="bi bi-stars me-1"></i> Nueva colección femenina disponible · Envíos coordinados a todo el Perú</span>
          <a href="${buildWhatsAppUrl()}" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-whatsapp me-1"></i> Atención personalizada: +51 977 555 420
          </a>
        </div>
      </div>

      <header class="site-header" id="siteHeader">
        <nav class="navbar navbar-expand-xl py-2" aria-label="Navegación principal ClaraElen">
          <div class="container">
            <a class="navbar-brand brand-wrapper" href="${homeUrl}" aria-label="ClaraElen Inicio">
              <img src="${logoSrc}" alt="Logotipo oficial de ClaraElen" class="brand-logo-img" width="52" height="52">
              <div>
                <span class="brand-name-text">ClaraElen</span>
                <span class="brand-tagline">Moda Femenina</span>
              </div>
            </a>

            <div class="d-flex align-items-center gap-2 order-xl-3">
              <button type="button" class="header-action-btn" data-bs-toggle="modal" data-bs-target="#searchModal" aria-label="Buscar productos">
                <i class="bi bi-search"></i>
              </button>
              <button type="button" class="header-action-btn" data-bs-toggle="modal" data-bs-target="#userAccountModal" aria-label="Cuenta y favoritos">
                <i class="bi bi-person"></i>
                <span class="cart-badge-count d-none" id="wishlistBadgeCount">0</span>
              </button>
              <button type="button" class="header-action-btn" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas" aria-label="Abrir carrito de compras">
                <i class="bi bi-bag"></i>
                <span class="cart-badge-count" id="headerCartBadge">0</span>
              </button>
              <button class="navbar-toggler border-0 shadow-none ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNavOffcanvas" aria-controls="mobileNavOffcanvas" aria-label="Abrir menú">
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>

            <div class="collapse navbar-collapse order-xl-2 justify-content-center" id="desktopNavbar">
              <ul class="navbar-nav main-nav align-items-xl-center">
                <li class="nav-item"><a class="nav-link" href="${homeUrl}">Inicio</a></li>
                <li class="nav-item"><a class="nav-link" href="${catalogUrl}?filter=nuevo">Nueva colección</a></li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="${catalogUrl}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Ropa
                  </a>
                  <div class="dropdown-menu dropdown-menu-ce">
                    <div class="row g-2">
                      <div class="col-6">
                        <div class="fw-semibold small text-ce-purple px-2 mb-1">Prendas principales</div>
                        <ul class="list-unstyled mb-0">${categoriesCol1}</ul>
                      </div>
                      <div class="col-6">
                        <div class="fw-semibold small text-ce-purple px-2 mb-1">Especiales y complementos</div>
                        <ul class="list-unstyled mb-0">${categoriesCol2}</ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="nav-item"><a class="nav-link" href="${catalogUrl}?cat=vestidos-casuales">Vestidos</a></li>
                <li class="nav-item"><a class="nav-link" href="${catalogUrl}?cat=blusas-polos">Blusas</a></li>
                <li class="nav-item"><a class="nav-link" href="${catalogUrl}?cat=pantalones-jeans">Pantalones</a></li>
                <li class="nav-item"><a class="nav-link" href="${catalogUrl}?cat=faldas">Faldas</a></li>
                <li class="nav-item"><a class="nav-link" href="${catalogUrl}?cat=conjuntos">Conjuntos</a></li>
                <li class="nav-item"><a class="nav-link" href="${catalogUrl}?cat=calzado">Calzado</a></li>
                <li class="nav-item"><a class="nav-link" href="${catalogUrl}?cat=accesorios">Accesorios</a></li>
                <li class="nav-item"><a class="nav-link nav-link-offer" href="${catalogUrl}?filter=oferta">Ofertas</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <!-- Menú Móvil Offcanvas -->
      <div class="offcanvas offcanvas-start" tabindex="-1" id="mobileNavOffcanvas" aria-labelledby="mobileNavLabel">
        <div class="offcanvas-header border-bottom">
          <div class="d-flex align-items-center gap-2" id="mobileNavLabel">
            <img src="${logoSrc}" alt="ClaraElen" width="40" height="40" class="rounded-3">
            <span class="font-display fw-bold fs-4 text-ce-purple-dark">ClaraElen</span>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar menú"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="list-unstyled d-flex flex-column gap-2 mb-4">
            <li><a class="d-block py-2 fw-medium text-dark border-bottom" href="${homeUrl}">Inicio</a></li>
            <li><a class="d-block py-2 fw-medium text-dark border-bottom" href="${catalogUrl}?filter=nuevo">Nueva colección</a></li>
            <li><a class="d-block py-2 fw-medium text-dark border-bottom" href="${catalogUrl}">Catálogo completo (17 categorías)</a></li>
            <li><a class="d-block py-2 fw-medium text-dark border-bottom" href="${catalogUrl}?cat=vestidos-casuales">Vestidos</a></li>
            <li><a class="d-block py-2 fw-medium text-dark border-bottom" href="${catalogUrl}?cat=blusas-polos">Blusas</a></li>
            <li><a class="d-block py-2 fw-medium text-dark border-bottom" href="${catalogUrl}?cat=pantalones-jeans">Pantalones</a></li>
            <li><a class="d-block py-2 fw-medium text-dark border-bottom" href="${catalogUrl}?cat=faldas">Faldas</a></li>
            <li><a class="d-block py-2 fw-medium text-dark border-bottom" href="${catalogUrl}?cat=conjuntos">Conjuntos</a></li>
            <li><a class="d-block py-2 fw-medium text-dark border-bottom" href="${catalogUrl}?cat=calzado">Calzado</a></li>
            <li><a class="d-block py-2 fw-medium text-dark border-bottom" href="${catalogUrl}?cat=accesorios">Accesorios</a></li>
            <li><a class="d-block py-2 fw-semibold text-ce-purple border-bottom" href="${catalogUrl}?filter=oferta">Ofertas</a></li>
            <li><a class="d-block py-2 fw-medium text-dark border-bottom" href="${aboutUrl}">Nosotros</a></li>
            <li><a class="d-block py-2 fw-medium text-dark border-bottom" href="${contactUrl}">Contacto</a></li>
          </ul>
          <a href="${buildWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp w-100">
            <i class="bi bi-whatsapp"></i> Consultar por WhatsApp
          </a>
        </div>
      </div>
    `;
  }

  // 2) Inyectar Footer si existe #globalFooterMount
  const footerMount = document.getElementById('globalFooterMount');
  if (footerMount) {
    footerMount.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="row g-4 pb-4 border-bottom border-secondary border-opacity-25">
            <div class="col-lg-4">
              <div class="footer-logo-frame mb-3">
                <img src="${logoSrc}" alt="Logotipo ClaraElen" width="48" height="48" class="rounded-3">
                <div>
                  <div class="font-display fw-bold fs-4 text-white lh-1">ClaraElen</div>
                  <small class="text-ce-lilac text-uppercase" style="letter-spacing:0.16em;font-size:0.65rem;">Moda Femenina Perú</small>
                </div>
              </div>
              <p class="small text-white-50 mb-3">
                Boutique online de moda femenina pensada para realzar tu esencia, elegancia y estilo en cada momento. Atención personalizada y envíos coordinados a todo el Perú.
              </p>
              <div class="d-flex align-items-center gap-2">
                <a href="${STORE_CONFIG.social.facebook}" target="_blank" rel="noopener noreferrer" class="social-circle-link" aria-label="Facebook oficial ClaraElen">
                  <i class="bi bi-facebook"></i>
                </a>
                <a href="#instagram" onclick="handleUnconfiguredSocial(event, 'Instagram')" class="social-circle-link" aria-label="Instagram ClaraElen (Configurable)">
                  <i class="bi bi-instagram"></i>
                </a>
                <a href="#tiktok" onclick="handleUnconfiguredSocial(event, 'TikTok')" class="social-circle-link" aria-label="TikTok ClaraElen (Configurable)">
                  <i class="bi bi-tiktok"></i>
                </a>
                <a href="${buildWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" class="social-circle-link" aria-label="WhatsApp ClaraElen">
                  <i class="bi bi-whatsapp"></i>
                </a>
              </div>
            </div>

            <div class="col-6 col-md-4 col-lg-2">
              <h3 class="footer-title">Enlaces rápidos</h3>
              <ul class="footer-links">
                <li><a href="${homeUrl}">Inicio</a></li>
                <li><a href="${catalogUrl}">Catálogo completo</a></li>
                <li><a href="${catalogUrl}?filter=nuevo">Nueva colección</a></li>
                <li><a href="${catalogUrl}?filter=oferta">Ofertas</a></li>
                <li><a href="${aboutUrl}">Sobre ClaraElen</a></li>
                <li><a href="${contactUrl}">Contacto</a></li>
              </ul>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
              <h3 class="footer-title">Categorías</h3>
              <ul class="footer-links">
                <li><a href="${catalogUrl}?cat=vestidos-casuales">Vestidos casuales</a></li>
                <li><a href="${catalogUrl}?cat=vestidos-fiesta">Vestidos de fiesta</a></li>
                <li><a href="${catalogUrl}?cat=blusas-polos">Blusas y polos</a></li>
                <li><a href="${catalogUrl}?cat=pantalones-jeans">Pantalones y jeans</a></li>
                <li><a href="${catalogUrl}?cat=conjuntos">Conjuntos de dos piezas</a></li>
                <li><a href="${catalogUrl}?cat=calzado">Calzado y carteras</a></li>
              </ul>
            </div>

            <div class="col-md-4 col-lg-3">
              <h3 class="footer-title">Atención y políticas</h3>
              <ul class="footer-links mb-3">
                <li>
                  <a href="${buildWhatsAppUrl()}" target="_blank" rel="noopener noreferrer">
                    <i class="bi bi-whatsapp text-success me-1"></i> +51 977 555 420
                  </a>
                </li>
                <li><span class="small text-white-50"><i class="bi bi-geo-alt me-1"></i> Tienda online · Cobertura nacional en Perú</span></li>
                <li><a href="${privacyUrl}">Políticas de privacidad</a></li>
                <li><a href="${termsUrl}">Términos y condiciones</a></li>
                <li><a href="${termsUrl}#cambios">Política de cambios y devoluciones</a></li>
                <li><a href="${termsUrl}#envios">Información de envíos</a></li>
              </ul>
            </div>
          </div>

          <div class="pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <p class="small text-white-50 mb-0">
              &copy; 2026 <strong>ClaraElen</strong>. Todos los derechos reservados.
            </p>
            <div class="d-flex flex-wrap justify-content-center gap-2" aria-label="Métodos de pago aceptados en Perú">
              <span class="footer-payment-chip"><i class="bi bi-phone"></i> Yape</span>
              <span class="footer-payment-chip"><i class="bi bi-phone"></i> Plin</span>
              <span class="footer-payment-chip"><i class="bi bi-credit-card"></i> Visa</span>
              <span class="footer-payment-chip"><i class="bi bi-credit-card-2-front"></i> Mastercard</span>
              <span class="footer-payment-chip"><i class="bi bi-bank"></i> Transferencia</span>
              <span class="footer-payment-chip"><i class="bi bi-cash-coin"></i> Contra entrega*</span>
            </div>
          </div>
        </div>
      </footer>

      <!-- Botón Flotante Oficial de WhatsApp -->
      <a href="${buildWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" class="whatsapp-float-btn" aria-label="Contactar a ClaraElen por WhatsApp">
        <i class="bi bi-whatsapp"></i>
        <span>¿Necesitas ayuda? Escríbenos</span>
      </a>
    `;
  }

  // 3) Inyectar Modales Globales y Carrito Lateral si no existen
  if (!document.getElementById('cartOffcanvas')) {
    const modalsWrap = document.createElement('div');
    modalsWrap.innerHTML = `
      <!-- Carrito Lateral (Offcanvas) -->
      <div class="offcanvas offcanvas-end" tabindex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel" style="width: 420px; max-width: 95vw;">
        <div class="offcanvas-header border-bottom">
          <h2 class="offcanvas-title font-display fs-4 fw-bold" id="cartOffcanvasLabel">
            Tu Bolsa ClaraElen <span class="badge rounded-pill bg-ce-purple-main fs-6 ms-1" id="drawerCartCount">0</span>
          </h2>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar carrito"></button>
        </div>
        <div class="offcanvas-body d-flex flex-column">
          <div id="drawerCartItems" class="flex-grow-1 overflow-auto pe-1"></div>
          <div id="drawerCartFooter" class="border-top pt-3 mt-3"></div>
        </div>
      </div>

      <!-- Modal de Búsqueda Instantánea -->
      <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content border-0 rounded-4 shadow-lg">
            <div class="modal-header border-bottom-0 pb-0">
              <h2 class="modal-title font-display fs-4 fw-bold" id="searchModalLabel">Buscar en ClaraElen</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar búsqueda"></button>
            </div>
            <div class="modal-body">
              <div class="input-group input-group-lg mb-3">
                <span class="input-group-text bg-ce-light border-end-0"><i class="bi bi-search text-ce-purple"></i></span>
                <input type="search" id="globalSearchInput" class="form-control bg-ce-light border-start-0" placeholder="Busca vestidos, blusas, pantalones, conjuntos..." aria-label="Término de búsqueda">
              </div>
              <div id="globalSearchResults" class="row g-3" style="max-height: 380px; overflow-y: auto;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de Detalles del Producto (Quick View) -->
      <div class="modal fade" id="productDetailModal" tabindex="-1" aria-labelledby="productDetailModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
            <div class="modal-header border-bottom">
              <h2 class="modal-title font-display fs-4 fw-bold" id="productDetailModalLabel">Detalle de prenda</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar detalle"></button>
            </div>
            <div class="modal-body p-4" id="productDetailModalBody"></div>
          </div>
        </div>
      </div>

      <!-- Modal de Cuenta de Usuario y Favoritos -->
      <div class="modal fade" id="userAccountModal" tabindex="-1" aria-labelledby="userAccountModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 rounded-4 shadow-lg">
            <div class="modal-header border-bottom">
              <h2 class="modal-title font-display fs-4 fw-bold" id="userAccountModalLabel">Mi Espacio ClaraElen</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body p-4">
              <ul class="nav nav-pills mb-3 gap-2" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="filter-tab-btn active" data-bs-toggle="pill" data-bs-target="#tabFavoritos" type="button">
                    <i class="bi bi-heart-fill text-danger me-1"></i> Mis Favoritos
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="filter-tab-btn" data-bs-toggle="pill" data-bs-target="#tabCuentaInfo" type="button">
                    <i class="bi bi-person-badge me-1"></i> Acceso Clientes
                  </button>
                </li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tabFavoritos">
                  <div id="wishlistModalList"></div>
                </div>
                <div class="tab-pane fade" id="tabCuentaInfo">
                  <div class="demo-disclaimer-banner mb-3">
                    <strong>Módulo preparado para producción:</strong> El inicio de sesión real y el historial sincronizado en la nube requieren conexión con backend (Firebase Auth, Supabase o API propia).
                  </div>
                  <p class="small text-ce-muted mb-3">
                    Actualmente tus favoritos y tu bolsa de compras se conservan automáticamente en este navegador mediante LocalStorage.
                  </p>
                  <a href="${buildWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp w-100">
                    <i class="bi bi-whatsapp"></i> Consultar estado de pedido por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalsWrap);
  }
}

window.handleUnconfiguredSocial = function (event, platformName) {
  event.preventDefault();
  const url = STORE_CONFIG.social[platformName.toLowerCase()];
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    showToast(`Enlace oficial de ${platformName} pendiente de configuración por el propietario.`);
  }
};

/* ----------------------------------------------------------------------------
   9. TARJETA DE PRODUCTO REUTILIZABLE Y MODAL DE DETALLE
   ---------------------------------------------------------------------------- */
function createProductCardHTML(product) {
  const sel = StoreState.cardSelections[product.id] || {
    size: product.sizes[0],
    color: product.colors[0].name
  };
  const isFav = StoreState.wishlist.includes(product.id);

  let badgeHTML = '';
  if (product.badge === 'Nuevo') {
    badgeHTML = `<span class="product-badge badge-nuevo">Nuevo</span>`;
  } else if (product.badge === 'Oferta') {
    badgeHTML = `<span class="product-badge badge-oferta">Oferta</span>`;
  } else if (product.badge === 'Más vendido') {
    badgeHTML = `<span class="product-badge badge-mas-vendido">Más vendido</span>`;
  }

  const sizesHTML = product.sizes
    .map(
      (sz) => `
      <button type="button" class="size-pill ${sz === sel.size ? 'active' : ''}"
              onclick="selectCardSize('${product.id}', '${sz}', this)">
        ${sz}
      </button>`
    )
    .join('');

  const colorsHTML = product.colors
    .map(
      (col) => `
      <button type="button" class="color-swatch ${col.name === sel.color ? 'active' : ''}"
              style="background-color: ${col.hex};"
              title="${col.name}"
              aria-label="Color ${col.name}"
              onclick="selectCardColor('${product.id}', '${col.name}', this)">
      </button>`
    )
    .join('');

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-img-wrap">
        ${badgeHTML}
        <div class="product-floating-actions">
          <button type="button" class="product-icon-btn ${isFav ? 'is-favorite' : ''}"
                  onclick="toggleWishlist('${product.id}')"
                  aria-label="Guardar ${product.name} en favoritos"
                  title="Favoritos">
            <i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i>
          </button>
          <button type="button" class="product-icon-btn"
                  onclick="openProductDetail('${product.id}')"
                  aria-label="Ver detalles de ${product.name}"
                  title="Ver detalles">
            <i class="bi bi-eye"></i>
          </button>
        </div>
        <a href="javascript:void(0)" onclick="openProductDetail('${product.id}')" aria-label="Ver ${product.name}">
          <img src="${product.image}" alt="${product.name} - ${getCategoryName(product.category)} ClaraElen" loading="lazy" onerror="handleImageFallback(this)">
        </a>
      </div>

      <div class="product-body">
        <div class="product-cat-label">${getCategoryName(product.category)}</div>
        <h3 class="product-title">
          <a href="javascript:void(0)" onclick="openProductDetail('${product.id}')" class="text-dark">
            ${product.name}
          </a>
        </h3>

        <div class="product-price-row">
          <span class="product-price">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
        </div>

        <span class="selector-label-sm">Talla:</span>
        <div class="size-pills-group" role="group" aria-label="Seleccionar talla">${sizesHTML}</div>

        <span class="selector-label-sm">Color: <strong class="selected-color-text text-dark">${sel.color}</strong></span>
        <div class="color-swatches-group" role="group" aria-label="Seleccionar color">${colorsHTML}</div>

        <div class="product-card-actions">
          <button type="button" class="btn-add-cart-sm" onclick="addToCart('${product.id}')">
            <i class="bi bi-bag-plus"></i> Agregar al carrito
          </button>
          <a href="${buildProductWhatsAppUrl(product, sel.size, sel.color)}"
             target="_blank" rel="noopener noreferrer"
             class="btn-wa-product-sm product-wa-link"
             title="Consultar prenda por WhatsApp"
             aria-label="Consultar ${product.name} por WhatsApp">
            <i class="bi bi-whatsapp"></i>
          </a>
        </div>
      </div>
    </article>
  `;
}

window.selectCardSize = function (productId, size, btnEl) {
  if (!StoreState.cardSelections[productId]) {
    StoreState.cardSelections[productId] = {};
  }
  StoreState.cardSelections[productId].size = size;

  const card = btnEl.closest('.product-card');
  if (card) {
    card.querySelectorAll('.size-pill').forEach((el) => el.classList.remove('active'));
    btnEl.classList.add('active');
    updateCardWhatsAppLink(card, productId);
  }
};

window.selectCardColor = function (productId, colorName, btnEl) {
  if (!StoreState.cardSelections[productId]) {
    StoreState.cardSelections[productId] = {};
  }
  StoreState.cardSelections[productId].color = colorName;

  const card = btnEl.closest('.product-card');
  if (card) {
    card.querySelectorAll('.color-swatch').forEach((el) => el.classList.remove('active'));
    btnEl.classList.add('active');
    const label = card.querySelector('.selected-color-text');
    if (label) label.textContent = colorName;
    updateCardWhatsAppLink(card, productId);
  }
};

function updateCardWhatsAppLink(card, productId) {
  const product = PRODUCTS_CATALOG.find((p) => p.id === productId);
  const sel = StoreState.cardSelections[productId];
  const waBtn = card.querySelector('.product-wa-link');
  if (product && sel && waBtn) {
    waBtn.href = buildProductWhatsAppUrl(product, sel.size, sel.color);
  }
}

window.openProductDetail = function (productId) {
  const product = PRODUCTS_CATALOG.find((p) => p.id === productId);
  if (!product) return;

  const sel = StoreState.cardSelections[product.id] || {
    size: product.sizes[0],
    color: product.colors[0].name
  };

  const modalBody = document.getElementById('productDetailModalBody');
  const modalTitle = document.getElementById('productDetailModalLabel');
  if (!modalBody || !modalTitle) return;

  modalTitle.textContent = product.name;

  const sizesOptions = product.sizes
    .map((s) => `<option value="${s}" ${s === sel.size ? 'selected' : ''}>Talla ${s}</option>`)
    .join('');

  const colorsOptions = product.colors
    .map((c) => `<option value="${c.name}" ${c.name === sel.color ? 'selected' : ''}>${c.name}</option>`)
    .join('');

  const detailsList = product.details.map((d) => `<li><i class="bi bi-check2 text-ce-purple me-1"></i> ${d}</li>`).join('');

  modalBody.innerHTML = `
    <div class="row g-4 align-items-center">
      <div class="col-md-5">
        <img src="${product.image}" alt="${product.name}" class="w-100 rounded-4 shadow-sm" style="aspect-ratio:3/4;object-fit:cover;" onerror="handleImageFallback(this)">
      </div>
      <div class="col-md-7">
        <span class="badge bg-ce-light text-ce-purple-dark mb-2">${getCategoryName(product.category)} · Código ${product.id}</span>
        <h3 class="font-display fw-bold mb-2">${product.name}</h3>
        <div class="d-flex align-items-baseline gap-2 mb-3">
          <span class="fs-3 fw-bold text-ce-purple-dark">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="text-muted text-decoration-line-through">${formatPrice(product.oldPrice)}</span>` : ''}
        </div>
        <p class="text-ce-muted small mb-3">${product.description}</p>
        <ul class="list-unstyled small mb-3">${detailsList}</ul>

        <div class="row g-2 mb-3">
          <div class="col-6">
            <label for="modalSizeSelect" class="form-label small fw-semibold">Talla</label>
            <select id="modalSizeSelect" class="form-select">${sizesOptions}</select>
          </div>
          <div class="col-6">
            <label for="modalColorSelect" class="form-label small fw-semibold">Color</label>
            <select id="modalColorSelect" class="form-select">${colorsOptions}</select>
          </div>
        </div>

        <div class="d-flex flex-wrap gap-2">
          <button type="button" class="btn-ce-primary flex-grow-1" id="modalAddToCartBtn">
            <i class="bi bi-bag-plus"></i> Agregar al carrito
          </button>
          <a href="${buildProductWhatsAppUrl(product, sel.size, sel.color)}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp" id="modalWaBtn">
            <i class="bi bi-whatsapp"></i> Consultar prenda
          </a>
        </div>
      </div>
    </div>
  `;

  const sizeSelect = document.getElementById('modalSizeSelect');
  const colorSelect = document.getElementById('modalColorSelect');
  const waBtn = document.getElementById('modalWaBtn');

  function syncModalSelection() {
    const s = sizeSelect.value;
    const c = colorSelect.value;
    StoreState.cardSelections[product.id] = { size: s, color: c };
    waBtn.href = buildProductWhatsAppUrl(product, s, c);
  }

  sizeSelect.addEventListener('change', syncModalSelection);
  colorSelect.addEventListener('change', syncModalSelection);

  document.getElementById('modalAddToCartBtn').addEventListener('click', () => {
    addToCart(product.id, sizeSelect.value, colorSelect.value, 1);
    const modalInstance = window.bootstrap?.Modal.getInstance(document.getElementById('productDetailModal'));
    if (modalInstance) modalInstance.hide();
  });

  if (window.bootstrap && window.bootstrap.Modal) {
    const modal = new window.bootstrap.Modal(document.getElementById('productDetailModal'));
    modal.show();
  }
};

/* ----------------------------------------------------------------------------
   10. ACTUALIZACIÓN DE UI DEL CARRITO (BADGE, DRAWER Y PÁGINA CARRITO)
   ---------------------------------------------------------------------------- */
function updateCartUI() {
  const { totalItems, subtotal, total } = getCartTotals();
  const base = getBasePath();

  // Badges de conteo
  const headerBadge = document.getElementById('headerCartBadge');
  const drawerBadge = document.getElementById('drawerCartCount');
  if (headerBadge) headerBadge.textContent = totalItems;
  if (drawerBadge) drawerBadge.textContent = totalItems;

  // Contenido del Drawer lateral
  const drawerItemsEl = document.getElementById('drawerCartItems');
  const drawerFooterEl = document.getElementById('drawerCartFooter');

  if (drawerItemsEl && drawerFooterEl) {
    if (StoreState.cart.length === 0) {
      drawerItemsEl.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-bag-heart display-4 text-ce-lilac"></i>
          <h3 class="font-display fs-5 mt-3">Tu bolsa está vacía</h3>
          <p class="small text-ce-muted mb-3">Explora nuestras prendas y descubre piezas diseñadas para ti.</p>
          <a href="${base}pages/catalogo.html" class="btn-ce-primary btn-sm">Explorar catálogo</a>
        </div>
      `;
      drawerFooterEl.innerHTML = '';
    } else {
      drawerItemsEl.innerHTML = StoreState.cart
        .map(
          (item) => `
          <div class="d-flex gap-3 py-3 border-bottom align-items-center">
            <img src="${item.image}" alt="${item.name}" width="64" height="82" class="rounded-3 object-fit-cover" onerror="handleImageFallback(this)">
            <div class="flex-grow-1">
              <div class="fw-semibold small lh-sm mb-1">${item.name}</div>
              <div class="text-ce-muted" style="font-size:0.75rem;">Talla: ${item.size} · Color: ${item.color}</div>
              <div class="fw-bold text-ce-purple-dark small mt-1">${formatPrice(item.price * item.qty)}</div>
              <div class="d-flex align-items-center gap-2 mt-2">
                <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="updateCartItemQty('${item.key}', -1)" aria-label="Reducir cantidad">-</button>
                <span class="small fw-semibold">${item.qty}</span>
                <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="updateCartItemQty('${item.key}', 1)" aria-label="Aumentar cantidad">+</button>
                <button type="button" class="btn btn-sm text-danger ms-auto p-0" onclick="removeFromCart('${item.key}')" aria-label="Eliminar producto">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        `
        )
        .join('');

      drawerFooterEl.innerHTML = `
        <div class="d-flex justify-content-between small mb-1">
          <span class="text-ce-muted">Subtotal:</span>
          <span class="fw-semibold">${formatPrice(subtotal)}</span>
        </div>
        <div class="d-flex justify-content-between small mb-2">
          <span class="text-ce-muted">Envío nacional:</span>
          <span class="text-ce-purple">Según destino en Perú</span>
        </div>
        <div class="d-flex justify-content-between fw-bold fs-5 mb-3">
          <span>Total estimado:</span>
          <span class="text-ce-purple-dark">${formatPrice(total)}</span>
        </div>
        <div class="d-grid gap-2">
          <a href="${base}pages/checkout.html" class="btn-ce-primary">Continuar al pago</a>
          <a href="${base}pages/carrito.html" class="btn-ce-outline py-2">Ver carrito completo</a>
        </div>
      `;
    }
  }

  // Si estamos en pages/carrito.html, renderizar vista completa
  renderFullCartPage();
  // Si estamos en pages/checkout.html, actualizar resumen
  renderCheckoutSummary();
}

function updateWishlistUI() {
  const badge = document.getElementById('wishlistBadgeCount');
  if (badge) {
    badge.textContent = StoreState.wishlist.length;
    badge.classList.toggle('d-none', StoreState.wishlist.length === 0);
  }

  const listEl = document.getElementById('wishlistModalList');
  if (listEl) {
    if (StoreState.wishlist.length === 0) {
      listEl.innerHTML = `<p class="small text-ce-muted text-center py-4 mb-0">Aún no has guardado prendas en tus favoritos. Haz clic en el ícono de corazón en cualquier producto.</p>`;
    } else {
      const favProducts = PRODUCTS_CATALOG.filter((p) => StoreState.wishlist.includes(p.id));
      listEl.innerHTML = favProducts
        .map(
          (p) => `
          <div class="d-flex align-items-center gap-3 py-2 border-bottom">
            <img src="${p.image}" alt="${p.name}" width="52" height="66" class="rounded-3 object-fit-cover" onerror="handleImageFallback(this)">
            <div class="flex-grow-1">
              <div class="fw-semibold small">${p.name}</div>
              <div class="text-ce-purple-dark fw-bold small">${formatPrice(p.price)}</div>
            </div>
            <button type="button" class="btn btn-sm btn-ce-primary py-1 px-3" onclick="addToCart('${p.id}')">Agregar</button>
            <button type="button" class="btn btn-sm text-danger" onclick="toggleWishlist('${p.id}')" aria-label="Quitar de favoritos"><i class="bi bi-x-lg"></i></button>
          </div>
        `
        )
        .join('');
    }
  }

  // Actualizar corazones en tarjetas visibles
  document.querySelectorAll('.product-card').forEach((card) => {
    const pid = card.getAttribute('data-product-id');
    const favBtn = card.querySelector('.product-icon-btn');
    if (pid && favBtn) {
      const isFav = StoreState.wishlist.includes(pid);
      favBtn.classList.toggle('is-favorite', isFav);
      const icon = favBtn.querySelector('i');
      if (icon) {
        icon.className = isFav ? 'bi bi-heart-fill' : 'bi bi-heart';
      }
    }
  });
}

/* ----------------------------------------------------------------------------
   11. BÚSQUEDA INSTANTÁNEA EN MODAL GLOBAL
   ---------------------------------------------------------------------------- */
function initGlobalSearch() {
  const input = document.getElementById('globalSearchInput');
  const resultsEl = document.getElementById('globalSearchResults');
  if (!input || !resultsEl) return;

  function renderSearchMatches(query) {
    const q = (query || '').trim().toLowerCase();
    const matches = q
      ? PRODUCTS_CATALOG.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            getCategoryName(p.category).toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        )
      : PRODUCTS_CATALOG.slice(0, 4);

    if (matches.length === 0) {
      resultsEl.innerHTML = `<div class="col-12 text-center py-4 text-ce-muted small">No se encontraron prendas para “${query}”. Prueba con vestido, blusa, pantalón o conjunto.</div>`;
      return;
    }

    resultsEl.innerHTML = matches
      .slice(0, 6)
      .map(
        (p) => `
        <div class="col-md-6">
          <div class="d-flex align-items-center gap-3 p-2 border rounded-3 bg-white">
            <img src="${p.image}" alt="${p.name}" width="58" height="74" class="rounded-2 object-fit-cover" onerror="handleImageFallback(this)">
            <div class="flex-grow-1">
              <div class="small text-ce-purple fw-semibold">${getCategoryName(p.category)}</div>
              <div class="fw-semibold small lh-sm">${p.name}</div>
              <div class="fw-bold text-ce-purple-dark small mt-1">${formatPrice(p.price)}</div>
            </div>
            <button type="button" class="btn btn-sm btn-ce-outline py-1 px-2" onclick="openProductDetail('${p.id}')">Ver</button>
          </div>
        </div>
      `
      )
      .join('');
  }

  renderSearchMatches('');
  input.addEventListener('input', (e) => renderSearchMatches(e.target.value));
}

/* ----------------------------------------------------------------------------
   12. INICIALIZACIÓN DE SECCIONES EN INICIO (index.html)
   ---------------------------------------------------------------------------- */
function initHomePage() {
  // 1) Explorador de las 17 categorías
  const catGrid = document.getElementById('homeCategoriesGrid');
  if (catGrid) {
    catGrid.innerHTML = CATEGORIES.map(
      (cat) => `
      <div class="col-6 col-sm-4 col-md-3 col-lg-2" data-aos="fade-up">
        <a href="pages/catalogo.html?cat=${cat.id}" class="category-pill-card">
          <div class="category-icon-circle">
            <i class="bi ${cat.icon}"></i>
          </div>
          <h3 class="category-pill-title">${cat.name}</h3>
        </a>
      </div>
    `
    ).join('');
  }

  // 2) Catálogo destacado con filtros rápidos y búsqueda
  const featuredGrid = document.getElementById('homeFeaturedProductsGrid');
  if (featuredGrid) {
    let activeTab = 'todos';
    let quickQuery = '';

    function renderFeatured() {
      let filtered = [...PRODUCTS_CATALOG];

      if (activeTab === 'nuevo') {
        filtered = filtered.filter((p) => p.isNew);
      } else if (activeTab === 'mas-vendido') {
        filtered = filtered.filter((p) => p.isBestSeller);
      } else if (activeTab === 'oferta') {
        filtered = filtered.filter((p) => p.oldPrice !== null || p.badge === 'Oferta');
      } else if (activeTab !== 'todos') {
        filtered = filtered.filter((p) => p.category === activeTab);
      }

      if (quickQuery) {
        const q = quickQuery.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            getCategoryName(p.category).toLowerCase().includes(q)
        );
      }

      const toShow = filtered.slice(0, 8);
      if (toShow.length === 0) {
        featuredGrid.innerHTML = `<div class="col-12 text-center py-5 text-ce-muted">No hay prendas que coincidan con este filtro rápido.</div>`;
        return;
      }

      featuredGrid.innerHTML = toShow
        .map((p) => `<div class="col-12 col-sm-6 col-lg-3">${createProductCardHTML(p)}</div>`)
        .join('');
    }

    renderFeatured();

    document.querySelectorAll('[data-home-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-home-filter]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeTab = btn.getAttribute('data-home-filter');
        renderFeatured();
      });
    });

    const homeSearch = document.getElementById('homeQuickSearch');
    if (homeSearch) {
      homeSearch.addEventListener('input', (e) => {
        quickQuery = e.target.value.trim();
        renderFeatured();
      });
    }
  }

  // 3) Testimonios de demostración
  const reviewsGrid = document.getElementById('homeTestimonialsGrid');
  if (reviewsGrid) {
    reviewsGrid.innerHTML = DEMO_TESTIMONIALS.map((rev) => {
      const stars = '<i class="bi bi-star-fill text-warning"></i>'.repeat(rev.rating);
      return `
        <div class="col-md-4" data-aos="fade-up">
          <article class="testimonial-card d-flex flex-column">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div class="d-flex gap-1" aria-label="Calificación ${rev.rating} de 5 estrellas">${stars}</div>
              <span class="badge bg-ce-light text-ce-purple-dark" style="font-size:0.68rem;">Ejemplo demo</span>
            </div>
            <p class="small text-dark flex-grow-1 mb-3">${rev.comment}</p>
            <div class="small text-ce-purple fw-medium mb-3">Prenda: ${rev.garment}</div>
            <div class="d-flex align-items-center gap-3 pt-3 border-top">
              <img src="${rev.avatar}" alt="${rev.name}" class="testimonial-avatar" loading="lazy" onerror="handleImageFallback(this)">
              <div>
                <div class="fw-semibold small">${rev.name}</div>
                <div class="text-ce-muted" style="font-size:0.75rem;">${rev.location} · ${rev.date}</div>
              </div>
            </div>
          </article>
        </div>
      `;
    }).join('');
  }
}

/* ----------------------------------------------------------------------------
   13. PÁGINA CATÁLOGO COMPLETO CON FILTROS AVANZADOS (pages/catalogo.html)
   ---------------------------------------------------------------------------- */
function initCatalogPage() {
  const catalogGrid = document.getElementById('catalogProductsGrid');
  if (!catalogGrid) return;

  const params = new URLSearchParams(window.location.search);
  const state = {
    category: params.get('cat') || 'all',
    filterTag: params.get('filter') || 'all', // 'nuevo', 'oferta', 'mas-vendido', 'all'
    search: params.get('q') || '',
    size: 'all',
    color: 'all',
    minPrice: '',
    maxPrice: '',
    onlyAvailable: false,
    sort: 'featured'
  };

  // Poblar selector de categorías
  const categorySelect = document.getElementById('filterCategorySelect');
  if (categorySelect) {
    categorySelect.innerHTML =
      `<option value="all">Todas las categorías (17)</option>` +
      CATEGORIES.map((c) => `<option value="${c.id}" ${c.id === state.category ? 'selected' : ''}>${c.name}</option>`).join('');
    categorySelect.addEventListener('change', (e) => {
      state.category = e.target.value;
      applyFilters();
    });
  }

  // Poblar filtros de talla
  const sizesList = ['XS', 'S', 'M', 'L', 'XL', '36', '37', '38', '39', 'Única'];
  const sizeContainer = document.getElementById('filterSizesContainer');
  if (sizeContainer) {
    sizeContainer.innerHTML = sizesList
      .map((sz) => `<button type="button" class="size-pill" data-filter-size="${sz}">${sz}</button>`)
      .join('');
    sizeContainer.querySelectorAll('[data-filter-size]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-filter-size');
        if (state.size === val) {
          state.size = 'all';
          btn.classList.remove('active');
        } else {
          sizeContainer.querySelectorAll('[data-filter-size]').forEach((b) => b.classList.remove('active'));
          state.size = val;
          btn.classList.add('active');
        }
        applyFilters();
      });
    });
  }

  // Poblar filtros de color
  const colorFilterOptions = [
    { name: 'Morado', hex: '#702C91' },
    { name: 'Lila', hex: '#A66AC5' },
    { name: 'Negro', hex: '#25212A' },
    { name: 'Blanco', hex: '#FFFFFF' },
    { name: 'Marfil', hex: '#F6F2EA' },
    { name: 'Beige', hex: '#D9CBB8' },
    { name: 'Azul', hex: '#3B5978' },
    { name: 'Dorado', hex: '#D4AF37' }
  ];
  const colorContainer = document.getElementById('filterColorsContainer');
  if (colorContainer) {
    colorContainer.innerHTML = colorFilterOptions
      .map(
        (c) =>
          `<button type="button" class="color-swatch" style="background-color:${c.hex};" title="${c.name}" aria-label="Filtrar por color ${c.name}" data-filter-color="${c.name}"></button>`
      )
      .join('');
    colorContainer.querySelectorAll('[data-filter-color]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-filter-color');
        if (state.color === val) {
          state.color = 'all';
          btn.classList.remove('active');
        } else {
          colorContainer.querySelectorAll('[data-filter-color]').forEach((b) => b.classList.remove('active'));
          state.color = val;
          btn.classList.add('active');
        }
        applyFilters();
      });
    });
  }

  // Inputs de búsqueda, precio, disponibilidad y orden
  const searchInput = document.getElementById('catalogSearchInput');
  const minPriceInput = document.getElementById('filterMinPrice');
  const maxPriceInput = document.getElementById('filterMaxPrice');
  const tagSelect = document.getElementById('filterTagSelect');
  const availCheckbox = document.getElementById('filterAvailableCheck');
  const sortSelect = document.getElementById('catalogSortSelect');
  const resetBtn = document.getElementById('resetCatalogFiltersBtn');

  if (searchInput) {
    searchInput.value = state.search;
    searchInput.addEventListener('input', (e) => {
      state.search = e.target.value.trim();
      applyFilters();
    });
  }
  if (minPriceInput) {
    minPriceInput.addEventListener('input', (e) => {
      state.minPrice = e.target.value;
      applyFilters();
    });
  }
  if (maxPriceInput) {
    maxPriceInput.addEventListener('input', (e) => {
      state.maxPrice = e.target.value;
      applyFilters();
    });
  }
  if (tagSelect) {
    tagSelect.value = state.filterTag;
    tagSelect.addEventListener('change', (e) => {
      state.filterTag = e.target.value;
      applyFilters();
    });
  }
  if (availCheckbox) {
    availCheckbox.addEventListener('change', (e) => {
      state.onlyAvailable = e.target.checked;
      applyFilters();
    });
  }
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sort = e.target.value;
      applyFilters();
    });
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.category = 'all';
      state.filterTag = 'all';
      state.search = '';
      state.size = 'all';
      state.color = 'all';
      state.minPrice = '';
      state.maxPrice = '';
      state.onlyAvailable = false;
      state.sort = 'featured';

      if (categorySelect) categorySelect.value = 'all';
      if (tagSelect) tagSelect.value = 'all';
      if (searchInput) searchInput.value = '';
      if (minPriceInput) minPriceInput.value = '';
      if (maxPriceInput) maxPriceInput.value = '';
      if (availCheckbox) availCheckbox.checked = false;
      if (sortSelect) sortSelect.value = 'featured';
      document.querySelectorAll('[data-filter-size], [data-filter-color]').forEach((b) => b.classList.remove('active'));
      applyFilters();
    });
  }

  function applyFilters() {
    let list = [...PRODUCTS_CATALOG];

    if (state.category !== 'all') {
      list = list.filter((p) => p.category === state.category);
    }

    if (state.filterTag === 'nuevo') {
      list = list.filter((p) => p.isNew);
    } else if (state.filterTag === 'oferta') {
      list = list.filter((p) => p.oldPrice !== null || p.badge === 'Oferta');
    } else if (state.filterTag === 'mas-vendido') {
      list = list.filter((p) => p.isBestSeller);
    }

    if (state.search) {
      const q = state.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          getCategoryName(p.category).toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (state.size !== 'all') {
      list = list.filter((p) => p.sizes.includes(state.size));
    }

    if (state.color !== 'all') {
      const cLow = state.color.toLowerCase();
      list = list.filter((p) => p.colors.some((col) => col.name.toLowerCase().includes(cLow)));
    }

    if (state.minPrice !== '' && !isNaN(Number(state.minPrice))) {
      list = list.filter((p) => p.price >= Number(state.minPrice));
    }

    if (state.maxPrice !== '' && !isNaN(Number(state.maxPrice))) {
      list = list.filter((p) => p.price <= Number(state.maxPrice));
    }

    if (state.onlyAvailable) {
      list = list.filter((p) => p.available);
    }

    // Ordenamiento
    if (state.sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (state.sort === 'bestseller') {
      list.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
    } else if (state.sort === 'newest') {
      list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    }

    const countEl = document.getElementById('catalogResultsCount');
    if (countEl) {
      countEl.textContent = `Mostrando ${list.length} de ${PRODUCTS_CATALOG.length} prendas de demostración`;
    }

    if (list.length === 0) {
      catalogGrid.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-search display-4 text-ce-lilac"></i>
          <h3 class="font-display fs-4 mt-3">No encontramos prendas con esos filtros</h3>
          <p class="small text-ce-muted">Intenta ampliar el rango de precios o restablecer los filtros seleccionados.</p>
        </div>
      `;
      return;
    }

    catalogGrid.innerHTML = list
      .map((p) => `<div class="col-12 col-sm-6 col-xl-4">${createProductCardHTML(p)}</div>`)
      .join('');
  }

  applyFilters();
}

/* ----------------------------------------------------------------------------
   14. PÁGINA CARRITO COMPLETO (pages/carrito.html)
   ---------------------------------------------------------------------------- */
function renderFullCartPage() {
  const container = document.getElementById('fullCartPageContainer');
  if (!container) return;

  const { totalItems, subtotal, total } = getCartTotals();

  if (StoreState.cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5 bg-ce-light rounded-4 p-4">
        <i class="bi bi-bag-heart display-3 text-ce-purple"></i>
        <h2 class="font-display fs-3 mt-3">Tu carrito de compras está vacío</h2>
        <p class="text-ce-muted mb-4">Explora nuestras 17 categorías de moda femenina y elige tus prendas favoritas.</p>
        <a href="catalogo.html" class="btn-ce-primary">Ir al catálogo</a>
      </div>
    `;
    return;
  }

  const rowsHTML = StoreState.cart
    .map(
      (item) => `
      <div class="card border-0 shadow-sm rounded-4 mb-3">
        <div class="card-body p-3 p-md-4">
          <div class="row g-3 align-items-center">
            <div class="col-3 col-md-2">
              <img src="${item.image}" alt="${item.name}" class="w-100 rounded-3 object-fit-cover" style="aspect-ratio:3/4;" onerror="handleImageFallback(this)">
            </div>
            <div class="col-9 col-md-4">
              <span class="small text-ce-purple fw-semibold">${getCategoryName(item.category)}</span>
              <h3 class="font-display fs-5 fw-bold mb-1">${item.name}</h3>
              <div class="small text-ce-muted">Talla: <strong>${item.size}</strong> · Color: <strong>${item.color}</strong></div>
              <div class="small text-ce-muted mt-1">Precio unitario: ${formatPrice(item.price)}</div>
            </div>
            <div class="col-6 col-md-3">
              <div class="d-inline-flex align-items-center border rounded-pill px-2 py-1">
                <button type="button" class="btn btn-sm border-0" onclick="updateCartItemQty('${item.key}', -1)" aria-label="Disminuir cantidad">−</button>
                <span class="px-3 fw-semibold">${item.qty}</span>
                <button type="button" class="btn btn-sm border-0" onclick="updateCartItemQty('${item.key}', 1)" aria-label="Aumentar cantidad">+</button>
              </div>
            </div>
            <div class="col-6 col-md-3 text-end">
              <div class="fw-bold fs-5 text-ce-purple-dark mb-1">${formatPrice(item.price * item.qty)}</div>
              <button type="button" class="btn btn-sm text-danger p-0" onclick="removeFromCart('${item.key}')">
                <i class="bi bi-trash me-1"></i> Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  const waCartLines = StoreState.cart
    .map((i) => `• ${i.qty}x ${i.name} (Talla ${i.size}, ${i.color}) - ${formatPrice(i.price * i.qty)}`)
    .join('\n');
  const waCartMsg = `¡Hola ClaraElen! Deseo consultar/coordinar el siguiente pedido desde mi carrito:\n${waCartLines}\nTotal referencial: ${formatPrice(total)}`;

  container.innerHTML = `
    <div class="row g-4">
      <div class="col-lg-8">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="fw-semibold">${totalItems} ${totalItems === 1 ? 'prenda seleccionada' : 'prendas seleccionadas'}</span>
          <button type="button" class="btn btn-sm btn-outline-danger rounded-pill" onclick="clearCart()">Vaciar carrito</button>
        </div>
        ${rowsHTML}
      </div>
      <div class="col-lg-4">
        <div class="bg-ce-light rounded-4 p-4 border">
          <h3 class="font-display fs-4 fw-bold mb-3">Resumen de compra</h3>
          <div class="d-flex justify-content-between mb-2">
            <span class="text-ce-muted">Subtotal (${totalItems} productos):</span>
            <span class="fw-semibold">${formatPrice(subtotal)}</span>
          </div>
          <div class="d-flex justify-content-between mb-3 pb-3 border-bottom">
            <span class="text-ce-muted">Envío en Perú:</span>
            <span class="small text-end text-ce-purple fw-medium">Por confirmar según destino</span>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-4">
            <span class="fw-bold fs-5">Total referencial:</span>
            <span class="fw-bold fs-4 text-ce-purple-dark">${formatPrice(total)}</span>
          </div>
          <div class="d-grid gap-2">
            <a href="checkout.html" class="btn-ce-primary">Continuar al proceso de pago</a>
            <a href="${buildWhatsAppUrl(waCartMsg)}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
              <i class="bi bi-whatsapp"></i> Coordinar pedido por WhatsApp
            </a>
            <a href="catalogo.html" class="btn-ce-outline">Seguir comprando</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ----------------------------------------------------------------------------
   15. PÁGINA CHECKOUT Y MÉTODOS DE PAGO PERÚ (pages/checkout.html)
   ---------------------------------------------------------------------------- */
function renderCheckoutSummary() {
  const summaryEl = document.getElementById('checkoutOrderSummary');
  if (!summaryEl) return;

  const { totalItems, subtotal, total } = getCartTotals();

  if (StoreState.cart.length === 0) {
    summaryEl.innerHTML = `
      <p class="small text-ce-muted mb-3">No tienes productos en tu carrito actualmente.</p>
      <a href="catalogo.html" class="btn-ce-primary w-100">Explorar catálogo</a>
    `;
    return;
  }

  const itemsList = StoreState.cart
    .map(
      (item) => `
      <div class="d-flex justify-content-between align-items-start gap-2 py-2 border-bottom small">
        <div>
          <div class="fw-semibold">${item.qty}x ${item.name}</div>
          <div class="text-ce-muted" style="font-size:0.75rem;">Talla ${item.size} · ${item.color}</div>
        </div>
        <span class="fw-semibold">${formatPrice(item.price * item.qty)}</span>
      </div>
    `
    )
    .join('');

  summaryEl.innerHTML = `
    <div class="mb-3">${itemsList}</div>
    <div class="d-flex justify-content-between small mb-2">
      <span class="text-ce-muted">Subtotal (${totalItems} prendas):</span>
      <span class="fw-semibold">${formatPrice(subtotal)}</span>
    </div>
    <div class="d-flex justify-content-between small mb-3 pb-3 border-bottom">
      <span class="text-ce-muted">Costo de envío:</span>
      <span class="text-ce-purple">Sujeto a departamento/distrito</span>
    </div>
    <div class="d-flex justify-content-between fw-bold fs-5">
      <span>Total a coordinar:</span>
      <span class="text-ce-purple-dark">${formatPrice(total)}</span>
    </div>
  `;
}

function initCheckoutPage() {
  const checkoutForm = document.getElementById('checkoutForm');
  if (!checkoutForm) return;

  renderCheckoutSummary();

  // Mostrar aviso dinámico según método de pago seleccionado
  const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
  const paymentNoticeBox = document.getElementById('selectedPaymentNotice');

  function updatePaymentNotice() {
    const selected = document.querySelector('input[name="paymentMethod"]:checked');
    if (!selected || !paymentNoticeBox) return;
    const info = STORE_CONFIG.payments[selected.value];
    if (info) {
      paymentNoticeBox.innerHTML = `
        <div class="demo-disclaimer-banner mt-3">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <strong>${info.name}</strong>
            <span class="payment-status-pill">${info.statusLabel}</span>
          </div>
          <p class="mb-0 small">${info.note} En esta interfaz no se solicitan ni almacenan datos bancarios o de tarjetas.</p>
        </div>
      `;
    }
  }

  paymentRadios.forEach((r) => r.addEventListener('change', updatePaymentNotice));
  updatePaymentNotice();

  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!checkoutForm.checkValidity()) {
      checkoutForm.classList.add('was-validated');
      return;
    }

    if (StoreState.cart.length === 0) {
      showToast('Agrega al menos un producto al carrito antes de generar tu solicitud de pedido.');
      return;
    }

    const fullName = document.getElementById('chkFullName').value.trim();
    const phone = document.getElementById('chkPhone').value.trim();
    const email = document.getElementById('chkEmail').value.trim();
    const department = document.getElementById('chkDepartment').value;
    const district = document.getElementById('chkDistrict').value.trim();
    const address = document.getElementById('chkAddress').value.trim();
    const paymentKey = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'yape';
    const paymentLabel = STORE_CONFIG.payments[paymentKey]?.name || paymentKey;

    const { total } = getCartTotals();
    const orderCode = `CE-${Date.now().toString().slice(-6)}`;

    const itemsSummary = StoreState.cart
      .map((i) => `• ${i.qty}x ${i.name} (Talla: ${i.size}, Color: ${i.color}) = ${formatPrice(i.price * i.qty)}`)
      .join('\n');

    const waOrderMessage =
      `¡Hola ClaraElen! Generé una solicitud de pedido en la web:\n` +
      `• Código de referencia: ${orderCode}\n` +
      `• Cliente: ${fullName}\n` +
      `• Teléfono: ${phone}\n` +
      `• Destino: ${district}, ${department} (${address})\n` +
      `• Método de pago elegido: ${paymentLabel}\n` +
      `• Detalle:\n${itemsSummary}\n` +
      `• Total referencial: ${formatPrice(total)}`;

    const resultBox = document.getElementById('checkoutConfirmationBox');
    if (resultBox) {
      resultBox.classList.remove('d-none');
      resultBox.innerHTML = `
        <div class="alert alert-light border border-2 rounded-4 p-4 shadow-sm" style="border-color: var(--ce-purple-main) !important;">
          <div class="d-flex align-items-center gap-2 text-ce-purple-dark mb-2">
            <i class="bi bi-check-circle-fill fs-4"></i>
            <h3 class="font-display fs-4 fw-bold mb-0">Solicitud de pedido registrada (${orderCode})</h3>
          </div>
          <p class="small text-ce-muted mb-3">
            Gracias, <strong>${fullName}</strong>. Como las pasarelas de pago se encuentran en modo de configuración previa a producción, no se ha realizado ningún cobro automático. Puedes enviar tu resumen directamente a nuestro WhatsApp oficial para confirmar stock, envío a <strong>${district}, ${department}</strong> y completar el pago por <strong>${paymentLabel}</strong>.
          </p>
          <div class="d-flex flex-wrap gap-2">
            <a href="${buildWhatsAppUrl(waOrderMessage)}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
              <i class="bi bi-whatsapp"></i> Confirmar pedido por WhatsApp (+51 977 555 420)
            </a>
            <button type="button" class="btn-ce-outline" onclick="clearCart(); window.location.href='../index.html';">
              Finalizar y volver al inicio
            </button>
          </div>
        </div>
      `;
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

/* ----------------------------------------------------------------------------
   16. FORMULARIO DE CONTACTO CON VALIDACIÓN (pages/contacto.html)
   ---------------------------------------------------------------------------- */
function initContactPage() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.classList.add('was-validated');
      return;
    }

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value.trim();

    const waText = `¡Hola ClaraElen! Soy ${name} (${email}${phone ? ', Tel: ' + phone : ''}). Motivo: ${subject}. Consulta: ${message}`;

    const feedback = document.getElementById('contactFormFeedback');
    if (feedback) {
      feedback.classList.remove('d-none');
      feedback.innerHTML = `
        <div class="demo-disclaimer-banner">
          <strong>¡Mensaje validado correctamente, ${name}!</strong>
          <p class="small mb-2 mt-1">Este sitio funciona actualmente en arquitectura frontend estática (sin servidor de correo backend configurado). Para recibir respuesta inmediata de nuestro equipo, envía tu consulta directamente a nuestro WhatsApp oficial:</p>
          <a href="${buildWhatsAppUrl(waText)}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-sm">
            <i class="bi bi-whatsapp"></i> Enviar consulta por WhatsApp
          </a>
        </div>
      `;
    }
    contactForm.reset();
    contactForm.classList.remove('was-validated');
  });
}

/* ----------------------------------------------------------------------------
   17. EFECTO SCROLL EN HEADER Y ARRANQUE DE APLICACIÓN
   ---------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  loadStoreState();
  renderGlobalLayout();
  updateCartUI();
  updateWishlistUI();
  initGlobalSearch();
  initHomePage();
  initCatalogPage();
  initCheckoutPage();
  initContactPage();

  // Sombra dinámica en encabezado al hacer scroll
  const headerEl = document.getElementById('siteHeader');
  if (headerEl) {
    window.addEventListener(
      'scroll',
      () => {
        headerEl.classList.toggle('is-scrolled', window.scrollY > 24);
      },
      { passive: true }
    );
  }

  // Inicializar AOS (Animate On Scroll) si está cargado
  if (window.AOS) {
    window.AOS.init({
      duration: 700,
      once: true,
      offset: 60
    });
  }
});
