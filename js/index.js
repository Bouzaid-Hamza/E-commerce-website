// ===========================
// Fixing side bar issue
// ===========================

document.getElementById("toggle-side-bar").onchange = function () {
	if (!this.checked) {
	  document.querySelector(".drop-list").style.display = "none";
	} else {
	  document.querySelector(".drop-list").style.display = "block";
	}
};

window.onresize = () => {
	if (window.innerWidth > 720) {
	document.querySelector(".drop-list").style.display = "block";
	}
};

window.onscroll = () => {
	if(window.scrollY >= 200) {
		document.querySelector(".nav-container").style.backgroundColor = "var(--color1)";
		document.querySelector(".nav-container").classList.remove("nav-border-bottom");
	} else {
		document.querySelector(".nav-container").style.backgroundColor = "transparent";
		document.querySelector(".nav-container").classList.add("nav-border-bottom");
	}
}

// ===========================
// Best seller section
// ===========================

let bestSellersConfig = {
	type: "carousel",
	perView: 4,
	gap: 0,
	autoplay: 4000,
	hoverpause: "true",
	animationDuration: 1500,
	focusAt: "center",
	breakpoints: {
		1320: {
			perView: 3,
		},
		1000: {
			perView: 2,
		},
		655: {
			perView: 1,
		},
	},
};

const addBestSellerBody = (
	containerClassName,
	className,
	dataLabel = "",
	productId
) => {
	let htmlCode = `<li class="glide__slide"><div class= '${className}' id=${productId} data-label='${dataLabel}'>
	<div class="product-img">
		<img src="" />
	</div>
	<div class="product-info">
		<div class="rating-stars"></div>
		<div class="price"></div>
		<div>
			<div class="product-name"></div>
			<ul class="product-specs"></ul>
		</div>
	</div>
	<button class="first-btn">ADD TO CART</button>
</div></li>`;
	document.querySelector(`${containerClassName}`).innerHTML += htmlCode;
};

// ===========================
// Category section
// ===========================

const createCategoryItem = () => {
	let htmlCode = `<div class="category-item" data-aos="fade-up"
	data-aos-duration="1000">
	  <div class="category-name"></div>
	  <div class="category-img">
		<img src="" />
	  </div>
	  <button class="first-btn">VIEW MORE</button>
	</div>`;
	document.querySelector(".category-content").innerHTML += htmlCode;
  };

// ===========================
// Latest products section
// ===========================

addProductBody = (containerClassName, className, productId) => {
	let htmlCode = `<div class=${className} id=${productId} data-aos="fade-up" data-aos-duration="1000">
	<div class="product-img">
		<img src="" />
	</div>
	<div class="product-info">
		<div class="rating-stars"></div>
		<div class="price"></div>
		<div>
			<div class="product-name"></div>
			<ul class="product-specs"></ul>
		</div>
	</div>
	<button class="first-btn">ADD TO CART</button>
</div>`;
	document.querySelector(`${containerClassName}`).innerHTML += htmlCode;
};

// ===========================
// User review section
// ===========================

let reviewConfig = {
	type: "carousel",
	perView: 1,
	gap: 40,
	autoplay: 4000,
	hoverpause: "true",
	focusAt: "center",
	animationDuration: "1000",
	breakpoints: {
	  1150: {
		perView: 1,
	  },
	},
  };

  new Glide(".glide-reviews", reviewConfig).mount();

// ===========================
// Filling products with info
// ===========================

const fillProductBody = (data, productId, categoryName, index) => {
	let productImg = document.querySelector(
		`#${productId} .product-img img`
	);
	let productName = document.querySelector(`#${productId} .product-name`);
	let productSpecs = document.querySelector(
		`#${productId} .product-specs`
	);
	let productPrice = document.querySelector(`#${productId} .price`);
	let productData = data.allLaptops[categoryName].laptopsList[index];
	document.querySelector(
		`#${productId} .rating-stars`
	).innerHTML = `<i class="fas fa-star"></i>
		<i class="fas fa-star"></i>
		<i class="fas fa-star"></i>
		<i class="fas fa-star"></i>
		<i class="fas fa-star-half-alt"></i>`;
	productImg.src = productData.laptopImg;
	productName.innerHTML = productData.laptopName;
	productPrice.innerHTML = productData.price;
	productSpecs.innerHTML += `<li>Resolution : ${productData.resolution}</li>`;
	productSpecs.innerHTML += `<li>Processor : ${productData.processor}</li>`;
	productSpecs.innerHTML += `<li>Graphics : ${productData.graphics}</li>`;
	productSpecs.innerHTML += `<li>Ram : ${productData.memorySize}</li>`;
	productSpecs.innerHTML += `<li>Hard drive : ${productData.storageSize}</li>`;
	productSpecs.innerHTML += `<li>Operating System : ${productData.operatingSystem}</li>`;
};

// ===========================
// Loading data from json file
// ===========================

	fetch("data/products.json")
	.then((res) => res.json())
	.then((data) => {
		/* ---------------- 
		Loading best sellers items -----------------*/
		let bsId = 1;
		let bestSellersObject = data.bestSellers;
		let bestSellersCategories = Object.keys(bestSellersObject);
		bestSellersCategories.forEach((item) => {
			let laptopsList = bestSellersObject[item].laptopsList;
			laptopsList.forEach((_, index) => {
				addBestSellerBody(
					".best-sellers-section .glide__slides",
					`product best-seller`,
					`Best Seller`,
					`bs-id-${bsId}`
				);
				fillProductBody(data, `bs-id-${bsId}`, item, index);
				bsId++;
			});
		});
		new Glide(".best-sellers-section", bestSellersConfig).mount();

		/* ---------------- Loading category items -----------------*/
		let categoryNameList = Object.keys(data.allLaptops);
		categoryNameList.forEach((_, index) => {
			createCategoryItem();
			document.querySelectorAll(".category-name")[index].innerHTML =
				categoryNameList[index];
			document.querySelectorAll(".category-img img")[index].src =
				data.allLaptops[categoryNameList[index]].categoryImg;
		});

		/* ---------------- Loading latest products items -----------------*/
		let lpId = 1;
		let latestLaptopsObject = data.latestLaptops;
		let latestLaptopsCategories = Object.keys(latestLaptopsObject);
		latestLaptopsCategories.forEach((item) => {
			let laptopsList = latestLaptopsObject[item].laptopsList;
			laptopsList.forEach((_, index) => {
				addProductBody(
					".latest-products-container",
					"product",
					`lp-id-${lpId}`
				);
				fillProductBody(data, `lp-id-${lpId}`, item, index);
				lpId++;
			});
		});

		/* ---------------- Initializing anaimation on scroll -----------------*/
		// AOS.init();
		init = [];
		x = setInterval(function() {
			init.push(AOS.init());
			if (init.length >= 2) {
				clearInterval(x);
			}
		}, 1000);
	});	

// ===========================
// Scroll to sections
// ===========================

document.querySelectorAll(".nav-links > li > a")[0].onclick = function() {
  document.querySelector(".get-started-section").scrollIntoView({ behavior: 'smooth'});
}

document.querySelectorAll(".nav-links > li > a")[1].onclick = function() {
  document.querySelector(".category-section").scrollIntoView({ behavior: 'smooth'});
} 

document.querySelectorAll(".nav-links > li > a")[3].onclick = function() {
  document.querySelector(".contact-us-section").scrollIntoView({ behavior: 'smooth'});
} 

let catElmt = document.querySelectorAll(".drop-list a");
for(let i=0; i<catElmt.length; i++) {
  document.querySelectorAll(".drop-list a")[i].onclick = function() {
    document.querySelectorAll(".category-item")[i].scrollIntoView({ behavior: 'smooth', block: 'center'});
  }
}

// ===========================
// Footer
// ===========================

let currentYear = new Date().getFullYear();
document.querySelector("#currentYear").innerHTML = currentYear;