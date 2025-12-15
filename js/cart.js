function getCart(){return JSON.parse(localStorage.getItem("cart")||"{}")}
function saveCart(c){localStorage.setItem("cart",JSON.stringify(c));updateCount()}

function updateCount(){
let c=getCart(),n=0;Object.values(c).forEach(v=>n+=v);
let b=document.getElementById("cartCount");if(b)b.textContent=n
}

function addToCart(s){
let c=getCart();c[s]=(c[s]||0)+1;saveCart(c)
}

function changeQty(s,d){
let c=getCart();c[s]=(c[s]||0)+d;
if(c[s]<=0)delete c[s];saveCart(c);renderCart()
}

function renderCart(){
let c=getCart(),tbody="",total=0;
PRODUCTS.forEach(p=>{
if(c[p.sku]){
let price=p.offerPrice||p.price;
let sub=price*c[p.sku];total+=sub;
tbody+=`
<tr>
<td>${p.name}</td>
<td>₹${price}</td>
<td>
<button class="btn btn-sm btn-secondary" onclick="changeQty('${p.sku}',-1)">-</button>
<span class="mx-2">${c[p.sku]}</span>
<button class="btn btn-sm btn-secondary" onclick="changeQty('${p.sku}',1)">+</button>
</td>
<td>₹${sub}</td>
<td><button class="btn btn-sm btn-danger" onclick="changeQty('${p.sku}',-${c[p.sku]})">X</button></td>
</tr>`
}})
document.getElementById("cartTable").innerHTML=tbody
document.getElementById("total").textContent=total
}

if(document.getElementById("cartTable"))renderCart()
updateCount()