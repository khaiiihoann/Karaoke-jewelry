import { createClient } from '@sanity/client';

const token = process.env.SANITY_TOKEN;
if (!token) { console.error('Missing SANITY_TOKEN env var'); process.exit(1); }

const client = createClient({
  projectId: 'idm6zp0i',
  dataset: 'production',
  apiVersion: '2021-10-21',
  token,
  useCdn: false,
});

const FEATURED = [36, 39, 10, 3, 13, 15, 40, 6];

const products = [
  {id:1,  cat:'Bông tai',   name:'Bông Móng Ngựa',  price:'675.000',   sizes:[],          imgA:'https://i.ibb.co/p6Lp0h2t/Untitled-Catalog1279.png',imgB:'https://i.ibb.co/rR4bKs1z/Untitled-Catalog1266.png'},
  {id:2,  cat:'Dây Chuyền', name:'Chuyền Cá Ngựa',  price:'2.640.000', sizes:[],          imgA:'https://cdn2-retail-images.kiotviet.vn/2026/03/13/tskaraoke/e720f3fb29cb4d189f3ad219e0aa02f0.png',imgB:''},
  {id:3,  cat:'Charm',      name:'Cá Ngựa Charm',   price:'3.500.000', sizes:[],          imgA:'https://i.ibb.co/xttGJSJz/Screenshot-2026-04-22-173503.png',imgB:'https://i.ibb.co/PnG321W/Untitled-Catalog1175.png'},
  {id:4,  cat:'Nhẫn',       name:'Nhẫn Cà Rá',      price:'1.650.000', sizes:['S','M'],   imgA:'https://framerusercontent.com/images/FmgnNcI1oJR5Bg5QCCoqSwbhwc.png',imgB:''},
  {id:5,  cat:'Bông tai',   name:'Bông Kim Uốn',    price:'1.500.000', sizes:[],          imgA:'https://framerusercontent.com/images/DMXDggiNTUkw0Pe1mZps5F5DGHs.png',imgB:'https://framerusercontent.com/images/PsENHslvQMvNWbE18oZwMVZih8.png'},
  {id:6,  cat:'Dây Chuyền', name:'Chuyền Gạch Ống', price:'3.060.000', sizes:[],          imgA:'https://framerusercontent.com/images/iNjzNy72oYy9EChaXD9jwrXPvAM.png',imgB:'https://framerusercontent.com/images/Bjxo6wcZEuGFHJYILOs1AMendkY.png'},
  {id:7,  cat:'Dây Chuyền', name:'Chuyền Gạch',     price:'3.125.000', sizes:[],          imgA:'https://framerusercontent.com/images/OXOySkgKmAJvpKmwh8J24CyUJww.png',imgB:''},
  {id:8,  cat:'Charm',      name:'Charm Mặt Gạch',  price:'1.800.000', sizes:[],          imgA:'https://framerusercontent.com/images/OXOySkgKmAJvpKmwh8J24CyUJww.png',imgB:''},
  {id:9,  cat:'Charm',      name:'Charm Gạch Ống',  price:'2.500.000', sizes:[],          imgA:'https://framerusercontent.com/images/iNjzNy72oYy9EChaXD9jwrXPvAM.png',imgB:''},
  {id:10, cat:'Nhẫn',       name:'Nhẫn Gạch Nhất',  price:'2.100.000', sizes:['S','M'],   imgA:'https://framerusercontent.com/images/iZsJhSaKJXM9TZHFA8hLFUk4oRw.png',imgB:'https://framerusercontent.com/images/mlhK7Ariz8L3ylzn0GmKoK697zc.png'},
  {id:11, cat:'Nhẫn',       name:'Nhẫn Gạch Nam',   price:'2.800.000', sizes:['S','M'],   imgA:'https://framerusercontent.com/images/25qyKQkXNfh7QZtXNM0cmEgxN04.png',imgB:'https://framerusercontent.com/images/iWD7gGFl8OMV2SHTI5drNcQVEa8.png'},
  {id:12, cat:'Bông tai',   name:'Bông Kim Cúc',    price:'1.500.000', sizes:[],          imgA:'https://framerusercontent.com/images/DMXDggiNTUkw0Pe1mZps5F5DGHs.png',imgB:'https://framerusercontent.com/images/PsENHslvQMvNWbE18oZwMVZih8.png'},
  {id:13, cat:'Dây Chuyền', name:'Chuyền Kim Uốn',  price:'1.900.000', sizes:[],          imgA:'https://i.ibb.co/NnSDPLqq/bong-kim-cuc-bg.png',imgB:'https://i.ibb.co/TZQLg82/image.png'},
  {id:14, cat:'Charm',      name:'Charm Kim Uốn',   price:'1.300.000', sizes:[],          imgA:'',imgB:''},
  {id:15, cat:'Nhẫn',       name:'Nhẫn Kim Uốn',    price:'1.550.000', sizes:['S','M'],   imgA:'https://framerusercontent.com/images/0IV5Slovo4NM2aaduep6WsMF6z4.png',imgB:''},
  {id:16, cat:'Charm',      name:'Charm Kim Cúc',   price:'1.300.000', sizes:[],          imgA:'',imgB:''},
  {id:17, cat:'Nhẫn',       name:'Nhẫn Kim Cúc',    price:'1.320.000', sizes:['S','M'],   imgA:'https://framerusercontent.com/images/st6vjpLEbAW6C7TQ4gWxw0RdXM.png',imgB:'https://framerusercontent.com/images/E7z9NTEWhx1BE8u9npnBpqVJ3o.png'},
  {id:18, cat:'Nhẫn',       name:'Nhẫn Kim Nữ',     price:'1.150.000', sizes:['S','M'],   imgA:'https://framerusercontent.com/images/9OZ91GZ9OsHG2SZQPmdsueAT4Y.png',imgB:'https://framerusercontent.com/images/llevzRIhG90jLtsQT6vBBj8Y.png'},
  {id:19, cat:'Nhẫn',       name:'Nhẫn Kim Nam',    price:'1.800.000', sizes:['S','M'],   imgA:'https://framerusercontent.com/images/4of5Wew2wsWsPr4mgv6iXCWDI.png',imgB:'https://framerusercontent.com/images/QKOGsfbYZuZoh1GAqdzV0Q7MQ.png'},
  {id:20, cat:'Bông tai',   name:'Bông Nhện',       price:'900.000',   sizes:[],          imgA:'https://framerusercontent.com/images/luPOvhY5pN6vuVDCSxdaHxrNJE.png',imgB:'https://framerusercontent.com/images/fPWJo0n4bvJJcYn86iu80ZOK30.png'},
  {id:21, cat:'Nhẫn',       name:'Nhẫn Trứng',      price:'2.100.000', sizes:['S','M'],   imgA:'https://framerusercontent.com/images/0kLFzRyVfeqACuJSpXoyLHZf68.jpg',imgB:'https://framerusercontent.com/images/em8WfMJgZUmRIVXrUKoe9sEdpk.png'},
  {id:22, cat:'Nhẫn',       name:'Nhẫn Trăng',      price:'1.750.000', sizes:['S','M'],   imgA:'https://framerusercontent.com/images/nd9yDZtv8s0Gcs468tkrkTww.jpg',imgB:'https://framerusercontent.com/images/YO3Rmg4RjlPNoPYlrBpyfxxl6c.png'},
  {id:23, cat:'Vòng Tay',   name:'Bay Lắc',         price:'3.700.000', sizes:['S','M','L'],imgA:'https://framerusercontent.com/images/5Wck3AUWdv2JXnAtOsrxp5SOI.jpg',imgB:'https://framerusercontent.com/images/Ii8b1P4vWchaMxrvjGa9JTPA8.png'},
  {id:24, cat:'Charm',      name:'Charm Cá',        price:'1.780.000', sizes:[],          imgA:'https://framerusercontent.com/images/uwnE6jG06ZQjE2uILuU3okyc.jpg',imgB:'https://framerusercontent.com/images/6zQU5LNYMOj535KzxVuapw7PHk.png'},
  {id:25, cat:'Charm',      name:'Charm Lon',       price:'1.700.000', sizes:[],          imgA:'https://framerusercontent.com/images/EP5XJ9jnFPo7BFum7ZAvtKM.jpg',imgB:'https://framerusercontent.com/images/E9I7cgSOdUA1jDhSJlkkEQwE8.jpg'},
  {id:26, cat:'Bông tai',   name:'Bông Lon',        price:'1.800.000', sizes:[],          imgA:'',imgB:''},
  {id:27, cat:'Bông tai',   name:'Khoen Tròn',      price:'250.000',   sizes:[],          imgA:'',imgB:''},
  {id:28, cat:'Dây Chuyền', name:'Dây Mì Nhỏ',      price:'625.000',   sizes:[],          imgA:'',imgB:''},
  {id:29, cat:'Bông tai',   name:'Bông Ốc Len',     price:'950.000',   sizes:[],          imgA:'https://framerusercontent.com/images/vC46TZneo6eWBS5HMCbY6wCHk.png',imgB:'https://framerusercontent.com/images/pON5GpBmkrvakoF96dgIgfHS5Y.jpg'},
  {id:30, cat:'Charm',      name:'Mặt Ốc Len',      price:'850.000',   sizes:[],          imgA:'https://framerusercontent.com/images/vC46TZneo6eWBS5HMCbY6wCHk.png',imgB:'https://framerusercontent.com/images/pON5GpBmkrvakoF96dgIgfHS5Y.jpg'},
  {id:31, cat:'Dây Chuyền', name:'Chuyền Ốc Len',   price:'1.150.000', sizes:[],          imgA:'https://framerusercontent.com/images/v3OIGpzPhFrqyIQE0sW44q06EhE.png',imgB:'https://framerusercontent.com/images/bd3X504afeqDPCpoIyHYzsPVL4.jpg'},
  {id:32, cat:'Dây Chuyền', name:'Chuyền Ghẹ',      price:'1.700.000', sizes:[],          imgA:'https://framerusercontent.com/images/Yhw4Opm6BDOOgnKh3iwRNvAMBVY.png',imgB:'https://framerusercontent.com/images/PdBcyQ6jgKTNYQMCC24ggtdHDKA.jpg'},
  {id:33, cat:'Bông tai',   name:'Bông Ghẹ Nhỏ',    price:'450.000',   sizes:[],          imgA:'https://framerusercontent.com/images/8CZSFEHIjiIx9uC9rF4OpyJM2Ow.png',imgB:''},
  {id:34, cat:'Bông tai',   name:'Bông Ghẹ To',     price:'1.300.000', sizes:[],          imgA:'https://framerusercontent.com/images/J9G5sghacua6lFu2w1oD3hAqhw.png',imgB:'https://framerusercontent.com/images/VR6DLCU8w9mQMM2Bxee49tKynHw.jpg'},
  {id:35, cat:'Charm',      name:'Mặt Ghẹ',         price:'1.000.000', sizes:[],          imgA:'https://framerusercontent.com/images/J9G5sghacua6lFu2w1oD3hAqhw.png',imgB:'https://framerusercontent.com/images/VR6DLCU8w9mQMM2Bxee49tKynHw.jpg'},
  {id:36, cat:'Nhẫn',       name:'Nhẫn Ghẹ',        price:'1.400.000', sizes:['S','M'],   imgA:'https://framerusercontent.com/images/3bSW34nCvbZxO3rDaoWCM2peA.png',imgB:'https://framerusercontent.com/images/TQgED9ot0QJaxvOWBoc9JZHJogg.jpg'},
  {id:37, cat:'Dây Chuyền', name:'Chuyền Cầu',      price:'1.500.000', sizes:[],          imgA:'https://framerusercontent.com/images/qqTq52OzD2JAMKNJHOhfjfpJM0A.jpg',imgB:'https://framerusercontent.com/images/clt3PrPa4R4JTr1Cnj3khKhYn0.jpg'},
  {id:38, cat:'Dây Chuyền', name:'Chuyền Tăm',      price:'2.200.000', sizes:[],          imgA:'https://framerusercontent.com/images/GgYjdjexVy5ytvA4c7ZYAvSdeiY.png',imgB:'https://framerusercontent.com/images/gNn74J8d5sLDuRTgwHJi7WWJU.jpg'},
  {id:39, cat:'Nhẫn',       name:'Nhẫn Tăm',        price:'1.800.000', sizes:['S','M'],   imgA:'https://framerusercontent.com/images/GE3EKWl3WfCrKCbicdzulbiYQ.png',imgB:'https://framerusercontent.com/images/RYmES6u40TXRNYrXBHQf7yCOF4.jpg'},
  {id:40, cat:'Bông tai',   name:'Bông Tăm',        price:'950.000',   sizes:[],          imgA:'https://cdn.phototourl.com/free/2026-04-22-838af2c2-996a-4623-a36b-578391792881.jpg',imgB:'https://cdn.phototourl.com/free/2026-04-22-050fcff1-8509-452c-bc92-794fb7094cc7.jpg'},
];

function parsePrice(s) { return parseInt(s.replace(/\./g, ''), 10); }

async function run() {
  const tx = client.transaction();
  products.forEach((p, i) => {
    const fi = FEATURED.indexOf(p.id);
    const doc = {
      _id: `product-${p.id}`,
      _type: 'product',
      productId: p.id,
      name: p.name,
      category: p.cat,
      price: parsePrice(p.price),
      sizes: p.sizes,
      imgA: p.imgA || undefined,
      imgB: p.imgB || undefined,
      isFeatured: FEATURED.includes(p.id),
      sortOrder: fi >= 0 ? fi + 1 : 100 + i,
      isVisible: true,
    };
    tx.createOrReplace(doc);
  });

  await tx.commit();
  console.log('✓ 40 products migrated');

  await client.createOrReplace({
    _id: 'settings',
    _type: 'settings',
    notifBarVi: 'Trang web này chỉ để xem giá, không hỗ trợ đặt hàng. Vui lòng liên hệ Instagram Cà Rá để mua hàng.',
    notifBarEn: 'This website is for price viewing only. Please contact Cà Rá on Instagram to purchase.',
    instagramUrl: 'https://www.instagram.com/karaoke.jewelry/',
    navLeft: [
      {_key: 'nav-shop',        label: 'shop',        href: 'shop.html'},
      {_key: 'nav-collections', label: 'collections', href: '#'},
      {_key: 'nav-custom',      label: 'custom',      href: '#'},
    ],
    navRight: [
      {_key: 'nav-instagram', label: 'instagram', href: 'https://www.instagram.com/karaoke.jewelry/', external: true},
      {_key: 'nav-about',     label: 'about',     href: '#', external: false},
    ],
  });
  console.log('✓ Settings migrated');
}

run().catch(err => { console.error(err); process.exit(1); });
