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
let price=p.offerPrice
? `<span class='old-price'>₹${p.price}</span> <span class='offer'>₹${p.offerPrice}</span>`
: `₹${p.price}`

prod.innerHTML+=`
<div class="col-md-4 mb-3">
<div class="card shadow-sm">
<img src="${p.images[0]}" class="card-img-top zoom-img" data-bs-toggle="modal" data-bs-target="#img${p.sku}">
<div class="card-body">
<h5>${p.name}</h5>${price}
<div class="mt-2">
${p.images.map(i=>`<img src="${i}" class="thumb" onclick="document.querySelector('[data-bs-target=\\'#img${p.sku}\\']').src='${i}'">`).join("")}
</div>
<button class="btn btn-primary w-100 mt-2" onclick="addToCart('${p.sku}')">Add</button>
</div></div></div>

<div class="modal fade" id="img${p.sku}">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
<img src="${p.images[0]}" class="w-100">
</div></div></div>`
})
if(cat.options.length===1)cats.forEach(c=>cat.innerHTML+=`<option>${c}</option>`)
}

if(prod){renderProducts();search.oninput=renderProducts;cat.onchange=renderProducts}

const pickup=document.getElementById("pickup")
if(pickup)PICKUP_POINTS.forEach(p=>pickup.innerHTML+=`<option>${p}</option>`)

function openModal(){new bootstrap.Modal(document.getElementById("confirmModal")).show()}

function placeOrder(){
alert("Order placed")
localStorage.removeItem("cart")
updateCount()
location.href="index.html"
}

function downloadPDF(){
const { jsPDF } = window.jspdf;
const doc=new jsPDF();let y=10;
doc.text("Order Summary",10,y);y+=10;
let c=getCart();
PRODUCTS.forEach(p=>{if(c[p.sku]){
let pr=p.offerPrice||p.price;
doc.text(`${p.name} x ${c[p.sku]} = ₹${pr*c[p.sku]}`,10,y);y+=8
}})
doc.save("order.pdf")
}
