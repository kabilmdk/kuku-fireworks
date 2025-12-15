const prod=document.getElementById("products")
const search=document.getElementById("search")
const cat=document.getElementById("category")

function renderProducts(){
prod.innerHTML=""
let cats=new Set()
PRODUCTS.filter(p=>
(!search.value||p.name.toLowerCase().includes(search.value.toLowerCase())) &&
(!cat.value||p.category===cat.value)
).forEach(p=>{
cats.add(p.category)
let priceHtml=p.offerPrice
? `<span class='old-price'>₹${p.price}</span> <span class='offer'>₹${p.offerPrice}</span>`
: `<span>₹${p.price}</span>`

prod.innerHTML+=`
<div class="col-md-4 mb-3">
<div class="card shadow-sm">
<img src="${p.images[0]}" class="card-img-top" id="main-${p.sku}">
<div class="card-body">
<h5>${p.name}</h5>
${priceHtml}
<div class="mt-2">
${p.images.map(img=>`<img src="${img}" class="thumb" onclick="document.getElementById('main-${p.sku}').src='${img}'">`).join("")}
</div>
<button class="btn btn-primary w-100 mt-2" onclick="addToCart('${p.sku}')">Add</button>
</div></div></div>`
})
if(cat.options.length===1)
cats.forEach(c=>cat.innerHTML+=`<option>${c}</option>`)
}

if(prod){renderProducts();search.oninput=renderProducts;cat.onchange=renderProducts}

const pickup=document.getElementById("pickup")
if(pickup)PICKUP_POINTS.forEach(p=>pickup.innerHTML+=`<option>${p}</option>`)

function openModal(){new bootstrap.Modal(document.getElementById("confirmModal")).show()}

function placeOrder(){
let o={name:name.value,phone:phone.value,pickup:pickup.value,cart:getCart(),date:new Date().toLocaleString()}
let orders=JSON.parse(localStorage.getItem("orders")||"[]")
orders.push(o);localStorage.setItem("orders",JSON.stringify(orders))
localStorage.removeItem("cart")
alert("Order placed")
location.href="index.html"
}

function sendWhatsApp(){
let c=getCart(),msg="Order Details:%0A"
PRODUCTS.forEach(p=>{if(c[p.sku])msg+=`${p.name} x ${c[p.sku]}%0A`})
window.open(`https://wa.me/?text=${msg}`)
}

function downloadPDF(){
const { jsPDF } = window.jspdf;
const doc=new jsPDF();
let y=10;
doc.text("Order Summary",10,y);y+=10;
let c=getCart();
PRODUCTS.forEach(p=>{
if(c[p.sku]){
let price=p.offerPrice||p.price;
doc.text(`${p.name} x ${c[p.sku]} = ₹${price*c[p.sku]}`,10,y);
y+=8;
}})
doc.save("order.pdf");
}
