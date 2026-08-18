export const categories = [
  ['all', 'All pieces', 'crop-1'],
  ['seating', 'Seating', 'crop-1'],
  ['lighting', 'Lighting', 'crop-2'],
  ['tabletop', 'Tabletop', 'crop-3'],
  ['textiles', 'Textiles', 'crop-4'],
  ['storage', 'Storage', 'crop-5'],
]

const names = {
  seating: ['Arc Lounge Chair', 'Lowline Reading Chair', 'Pebble Occasional Seat', 'Morrow Dining Chair', 'Cloud Bench', 'Cove Armchair', 'Felt Lounge Stool', 'Serein Daybed', 'Dune Club Chair', 'Plinth Seat'],
  lighting: ['Orlo Pendant', 'Halo Table Lamp', 'Vela Floor Light', 'Forma Wall Sconce', 'Noma Desk Light', 'Lune Pendant', 'Mica Lantern', 'Arc Rail Light', 'Sola Reading Lamp', 'Taper Candle Light'],
  tabletop: ['Silt Side Table', 'Pillar Travertine Table', 'Mesa Coffee Table', 'Onda Serving Bowl', 'Ridge Stone Tray', 'Contour Plinth', 'Mori Ceramic Set', 'Caldera Dining Table', 'Loom Side Table', 'Still Water Carafe'],
  textiles: ['Washed Linen Throw', 'Oat Cloud Cushion', 'Clay Stripe Blanket', 'Dawn Linen Sheet', 'Soft Form Cushion', 'Hearth Wool Rug', 'Quiet Cotton Robe', 'Tide Bath Towel', 'Loomed Bed Cover', 'Folded Linen Runner'],
  storage: ['Oakline Console', 'Raku Bedside Cabinet', 'Open Frame Shelf', 'Mori Media Unit', 'Tallboy Chest', 'Ledge Wall Shelf', 'Sora Sideboard', 'Cove Storage Bench', 'Stacked Drawer Unit', 'Pace Entry Cabinet'],
}

const basePrices = { seating: 620, lighting: 380, tabletop: 440, textiles: 310, storage: 780 }

export const products = Object.entries(names).flatMap(([category, list]) =>
  list.map((name, index) => ({
    id: `${category}-${index}`,
    category,
    name,
    price: basePrices[category] + index * 27,
    index,
    crop: `crop-${(index % 5) + 1}`,
  })),
)

export const legal = {
  payment: ['Payment', 'We accept PayPal, Visa and major credit cards through our secure checkout provider. Payment is captured when your order is confirmed.'],
  returns: ['Returns & refunds', 'Request a return within 14 days of delivery. Items must be unused, in original condition and safely packed. Refunds are issued to the original payment method after inspection. Custom or final-sale items are excluded.'],
  shipping: ['Shipping policy', 'Orders are dispatched from our fulfilment partners within 2–4 business days. Delivery estimates and applicable duties are shown at checkout. You will receive tracking by email.'],
  tracking: ['Order tracking', 'Use the tracking link in your dispatch email. For help, contact boyumaoyifazhan@outlook.com with your order number.'],
  cancellation: ['Cancellation policy', 'You may cancel before dispatch by emailing us. Once an order has shipped, our returns policy applies.'],
  privacy: ['Privacy policy', 'We use order and contact details only to provide the service, process payments, deliver purchases and improve our store. We do not sell personal information. Contact us for access or deletion requests.'],
  dmca: ['DMCA', 'If you believe content on this site infringes your copyright, send a notice with the work, location, contact details and a good-faith statement to boyumaoyifazhan@outlook.com.'],
  terms: ['Terms of Service', 'These Terms of Service govern use of the BOYUÉ store operated by 博裕貿易發展有限公司.'],
}

export const money = (value) => `$${value.toLocaleString('en-US')}`

export function productImageStyle(product) {
  if (product.id === 'tabletop-5') {
    return {
      backgroundImage: "url('/assets/contour-plinth.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }

  return {
    backgroundImage: `url('/assets/${product.category}-products.png')`,
    backgroundSize: '500% 200%',
    backgroundPosition: `${(product.index % 5) * 25}% ${product.index < 5 ? 0 : 100}%`,
  }
}

export function categoryLabel(category) {
  return category[0].toUpperCase() + category.slice(1)
}
