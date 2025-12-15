function getCart(){return JSON.parse(localStorage.getItem("cart")||"{}")}
function saveCart(c){localStorage.setItem("cart",JSON.stringify(c))}

function addToCart(s){let c=getCart();c[s]=(c[s]||0)+1;saveCart(c);renderCart()}

function changeQty(s,q){
let c=getCart();if(q<=0)delete c[s];else c[s]=Number(q);saveCart(c);renderCart()
}

function renderCart(){
let c=getCart(),out="",t=0;
PRODUCTS.forEach(p=>{
if(c[p.sku]){
let price=p.offerPrice||p.price;
let sub=price*c[p.sku];t+=sub;
out+=`
<div class="card p-3 mb-2">
<b>${p.name}</b><br>
₹${price} x 
<input type="number" value="${c[p.sku]}" min="0" onchange="changeQty('${p.sku}',this.value)">
= ₹${sub}
</div>`
}})
out+=`<h5>Total ₹${t}</h5>
<button class="btn btn-outline-success" onclick="sendWhatsApp()">Send Order on WhatsApp</button>`
document.getElementById("cart").innerHTML=out
}

if(document.getElementById("cart"))renderCart()