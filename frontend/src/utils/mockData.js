const restaurantList = [
  {
    img: "https://imgs.search.brave.com/1Sck32haaAp0OuBMVXKzFt4lF-7Q13sUYCa2CITZ7Ws/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzYx/MWIzYTg2ZmI2YTIy/NmFhZGZmY2Y3OS9i/OTIwZjk1Ni1hYzVm/LTRkODUtYmMxZi1m/ZTVjYzU1NzM0NmIv/U3BhbmlzaCtjdWlz/aW5lLmpwZw",
    resName: "Foodie Palace",
    cuisine: "Indian, Chinese",
    rating: "3.5",
    timing: "10 AM - 10 PM",
    id:100000
  },
  {
    img: "https://imgs.search.brave.com/AU39w2nVviLYG36QqHET0_EduH5HfVsjF_Pt5WXtPzk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzM3L2I2/LzYwLzM3YjY2MGNi/NDA5ODhkZGE4M2M4/ZDM0NWY2MmM4M2Rh/LmpwZw",
    resName: "Pizza Corner",
    cuisine: "Italian, Fast Food",
    rating: "3.2",
    timing: "11 AM - 11 PM",
    id:100001
  },
  {
    img: "https://imgs.search.brave.com/PAsCrbU-C3qB1VfB-_BsXTq-5UDyHPTRgoW_9n7XSqc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjUv/NzA5Lzk1NC9zbWFs/bC9zdXNoaS1hbmQt/cm9sbHMtYmFja2dy/b3VuZC1mcmFtZS1v/bi1ibGFjay10b3At/dmlldy1jb2xvcmZ1/bC1qYXBhbmVzZS1y/ZXN0YXVyYW50LWZv/b2Qtc2V0LXdpdGgt/dGVhLXBob3RvLmpw/Zw",
    resName: "Sushi House",
    cuisine: "Japanese, Seafood",
    rating: "3.8",
    timing: "12 PM - 10 PM",
    id:100002
  },
  {
    img: "https://imgs.search.brave.com/IfNqttMAbp9FR8d9iehmNQfSed6Dmn2golbmd1jIEMM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzYxLzc4LzY5/LzM2MF9GXzU2MTc4/Njk1MV9JZFFidFIw/YmdhM1J6SVNnb2RH/dklSTUZFQnFtamZj/bi5qcGc",
    resName: "Burger Hub",
    cuisine: "American, Fast Food",
    rating: "4.1",
    timing: "9 AM - 9 PM",
    id:100003
  },
  {
    img: "https://imgs.search.brave.com/ltvNX7DSh2H43jAkzRELeUgA7Lm-XHxVi4Y1hoq7MLc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMi8w/Mi8wOS8xNy81My9z/YWxhZC03MDAzOTAz/XzY0MC5qcGc",
    resName: "Burger Bowl",
    cuisine: "Healthy, Salads",
    rating: "3.6",
    timing: "8 AM - 8 PM",
    id:100004
  },
  {
    img: "https://imgs.search.brave.com/kAr6Q43ehWSLzO_UvdRVN1lCpWLGNFHs655VI85lXXY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzE5LzA1LzA4/LzM2MF9GXzQxOTA1/MDg0MV8yUGVqWkQ4/S0RoeGc1YnVBZk15/TXZjQzNVNkNWYUhl/VC5qcGc",
    resName: "Tandoori Tales",
    cuisine: "North Indian",
    rating: "4.7",
    timing: "12 PM - 12 AM",
    id:100005
  },
  {
    img: "https://imgs.search.brave.com/rxnJ7YlMZBY7fHR-TQudfr4wupNYh2F4s-6kC5BjgUY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waW5j/aG9meXVtLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvUm9hc3Rl/ZC1SZWQtUGVwcGVy/LVBhc3RhLTgwMHg4/MDAuanBn",
    resName: "Pasta Fiesta",
    cuisine: "Italian, Continental",
    rating: "4.3",
    timing: "11 AM - 11 PM",
    id:100006
  },
  {
    img: "https://imgs.search.brave.com/Xrek02V7PgR90LSwrRK5hmdLsgqVSvbwmbCk6OYyLVw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9wYWQt/dGhhaS1mYW1vdXMt/dGhhaS1mb29kLW1l/bnUtbm9vZGxlLXN0/aXItZnJpZWQtY29v/ay1lZ2ctcG9yay1s/b25nLWJlYW4tcGVh/bnV0LXB1dC1iYW5h/bmEtbGVhZi1wbGF0/ZS1iYW1ib28tMTc5/NjkyNzMxLmpwZw",
    resName: "Dragon Express",
    cuisine: "Chinese, Thai",
    rating: "4.0",
    timing: "10 AM - 10 PM",
    id:100007
  },
  {
    img: "https://imgs.search.brave.com/7zcpBmocW0wlgZYK0jKu4PVmd7VTCQFSWqk3RPDBE0c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9iYnEtcmli/cy1vbi1ncmlsbC1z/bW9rZS0yNjBudy0y/MzkzMjYxMTczLmpw/Zw",
    resName: "Grill Station",
    cuisine: "BBQ, American",
    rating: "4.4",
    timing: "5 PM - 11 PM",
    id:100008
  },
  {
    img: "https://imgs.search.brave.com/WH2YnKS5CULKZfamhFD5QmIBCtfWv5h17qmPXwE2mao/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTQv/ODE0LzEzNC9zbWFs/bC9iYWtpbmctZGVs/aWNpb3VzLWZvb2Qt/Zm9yLXlvdS1waG90/by5qcGc",
    resName: "Cafe Delight",
    cuisine: "Cafe, Bakery",
    rating: "4.2",
    timing: "8 AM - 8 PM",
    id:100009
  },
  {
    img: "https://imgs.search.brave.com/gEh9NVAupl0dS7COyTUpn1T1UjNf4OL61WIjU_4My2Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzQ5Lzk3LzE3/LzM2MF9GXzM0OTk3/MTc5N19yOEV2NHA0/QjFEVkJ4NFNkOHJv/b3lmRGhtdTlYUkZJ/OC5qcGc",
    resName: "Royal Biryani",
    cuisine: "Hyderabadi, Mughlai",
    rating: "4.9",
    timing: "12 PM - 11 PM",
    id:110000
  },
  {
    img: "https://imgs.search.brave.com/ndpCDP0GRiQQjoSLHmjhXTHST37RpPsTFMpr1QOHqgQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jaGlu/ZXNlLWZvb2QtMTI1/MTM5MzQuanBn",
    resName: "Street Zaika",
    cuisine: "Indian Street Food",
    rating: "4.1",
    timing: "6 PM - 12 AM",
    id:110001
  },
  {
    img: "https://imgs.search.brave.com/eB7e3U3qxXYJf_QKxDQsWcqCvwXCKaGl3iFhcXzBO68/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzA3LzYwLzYw/LzM2MF9GXzgwNzYw/NjA3NV9MdzN1NkVY/UG5RVlJHdFVVSnZ3/V1dVY1lHcXpCa29I/NS5qcGc",
    resName: "Mexican Magic",
    cuisine: "Mexican",
    rating: "4.3",
    timing: "11 AM - 11 PM",
    id:110002
  },
  {
    img: "https://imgs.search.brave.com/2iIW2sFJ-ITbHDpIwIp2oHmYOilrwjwZfI3ZsrIL57U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YnJlYWRleHBlcmll/bmNlLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvY2hlY2tlcmJv/YXJkLXRhbmd6aG9u/Zy1yb2xscy0yLmpw/Zw",
    resName: "Rolls & Bowls",
    cuisine: "Fast Food, Indian",
    rating: "4.0",
    timing: "10 AM - 10 PM",
    id:110003
  },
  {
    img: "https://imgs.search.brave.com/1k6kcCQactiac8MRTHrwIdvHV0R7c0Z8IL8eI9e661I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjMv/MTQ1LzgyNS9zbWFs/bC9yb3VuZC1wdWZm/LXBhc3RyeS1jcm9p/c3NhbnQtd2l0aC1y/YXNwYmVycnktZmls/bGluZy1vci1uZXct/eW9yay1yb2xsLXBo/b3RvLmpwZw",
    resName: "Dessert House",
    cuisine: "Bakery, Desserts",
    rating: "4.6",
    timing: "9 AM - 9 PM",
    id:110004
  },
  {
    img: "https://imgs.search.brave.com/lGm9FR8Tdyex-ZjNkOQ-ZyqEMp8tnlN8RQGAFzkscdY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zZWFmb29kLWZy/ZXNoLWZpc2gtd2l0/aC1veXN0ZXJzLWNv/bGFuZGVyLWNyYWIt/b2N0b3B1cy1zaHJp/bXAtY3JheWZpc2hf/MjIwOTI1LTM4ODk2/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDAmcT04MA",
    resName: "Ocean Breeze",
    cuisine: "Seafood",
    rating: "4.5",
    timing: "1 PM - 11 PM",
    id:110005
  },
  {
    img: "https://imgs.search.brave.com/RQx8tjWnGbY3vXZ3cGkksEA9164htfQG4zPVgFCF7D8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9wdW5q/YWJpLWFwcGV0aXpl/cnMtc3BpbmFjaC1z/aHJpbXAtZ3JlZW4t/c2F1Y2Utc3dlZXQt/ZGlzaC1wdW5qYWJp/LWFwcGV0aXplcnMt/c3BpbmFjaC1zaHJp/bXAtZ3JlZW4tc2F1/Y2Utc3dlZXQtZGlz/aC0zMjc3NzM2ODAu/anBn",
    resName: "Punjabi Rasoi",
    cuisine: "Punjabi, Dhaba",
    rating: "4.7",
    timing: "10 AM - 11 PM",
    id:110006
  },
  {
    img: "https://imgs.search.brave.com/zcK3gcQOWI_gGxel8mEJ83FMsOgwe2TbbYOmP_0yxFc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9mcmVzaC1kaWV0/LXNhbGFkLWJvd2wt/aXNvbGF0ZWQtd2hp/dGVfNzAyMTYtOTI3/NC5qcGc_c2VtdD1h/aXNfaHlicmlkJnc9/NzQw",
    resName: "Vegan Vibes",
    cuisine: "Vegan, Healthy",
    rating: "4.4",
    timing: "9 AM - 9 PM",
    id:110007
  },
  {
    img: "https://imgs.search.brave.com/3xZSx0I1t78SemXGtmozBSN-QysL43psa_6myJZuEIw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzI1LzE2LzYz/LzM2MF9GXzYyNTE2/NjMxM19laDlMZmRV/TzRXSFVkY1M3T09Y/Y28xempSNUpaTld6/Mi5qcGc",
    resName: "Midnight Meals",
    cuisine: "Fast Food, Beverages",
    rating: "4.2",
    timing: "7 PM - 3 AM",
    id:110008
  },
  {
    img: "https://imgs.search.brave.com/yXHgUXFNfvxAMxGXUZDvynxILtRSDNqyndA1CZXWD0s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvNDQz/ODI0OTYyL3N0b2Nr/LXBob3RvLWluZGlh/bi1yaWNlLWNha2Ut/bGVudGlsLWN1cnJ5/LXNvdXRoLWluZGlh/bi1icmVha2Zhc3Qt/aWRhbGktc2FtYmFy",
    resName: "Spice Route",
    cuisine: "South Indian",
    rating: "4.8",
    timing: "7 AM - 10 PM",
    id:110009
  }
];

export default restaurantList;