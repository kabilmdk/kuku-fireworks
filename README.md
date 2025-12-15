# Crackers Store – Ultimate Static E‑commerce (GitHub Pages)

This is a **feature-rich static e‑commerce website** that runs directly on **GitHub Pages**.

## ⭐ Features
✔ Product image gallery (multiple images per product)  
✔ Discount / offer price display  
✔ Cart with quantity control  
✔ Category filter + search  
✔ Pickup point selection  
✔ WhatsApp order sharing  
✔ Order confirmation modal  
✔ Order download as **PDF** (no backend)

---

## 🚀 Deploy on GitHub Pages
1. Upload all files to GitHub repo root
2. Settings → Pages
3. Branch: `main`, Folder: `/`
4. Save

Live URL:
```
https://<username>.github.io/<repo-name>/
```

---

## 🛠 How to Manage Products & Prices

Edit:
```
js/products.js
```

Example:
```js
{
  sku: "F101",
  name: "Electric Sparkler",
  price: 120,
  offerPrice: 90,
  category: "Kids",
  images: [
    "https://images.unsplash.com/photo-1604928141064-207cea6f571f",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba"
  ]
}
```

- Add product → add object
- Remove product → delete object
- Change price → edit `price` or `offerPrice`

Push to GitHub → site updates automatically.

---
