const promotions = {'1': 'SINGLE LOOK', '2': 'DOUBLE LOOK', '3': 'TRIPLE LOOK', '4': 'FULL LOOK'};

function getShoppingCart(selectedIds, productsList){
	let totalPrice = 0;
	let totalWithDiscount = 0;
	let discountValue = 0;
	let categories = [];
	let products = [];

	// get the selected products based on the ids array
	const selectedProducts = productsList.filter(({ id }) => selectedIds.includes(id));

	for (let product of selectedProducts) {
		// get name and category from selected products
		products.push({category: product.category, name: product.name});
		categories.push(product.category);
		totalPrice += product.regularPrice;
	}

	// check amount of unique categories
	const lookIndex = new Set(categories).size;
	// get selected promotion/look based on unique categories
	const selectedLook = promotions[lookIndex];

	for (let product of selectedProducts){
		for (let promotion of product.promotions){
			if(promotion.looks.includes(selectedLook)){
				// calculate discount (if existing) for each product
				discountValue += product.regularPrice - promotion.price;
			}
		}
	};

	// format values (test suite should use Number instead)
	discountValue = discountValue.toFixed(2).toString();
	totalWithDiscount = (totalPrice - discountValue).toFixed(2).toString();
	const discountPercentage = ((totalPrice - totalWithDiscount)/totalPrice*100).toFixed(2)+'%';

	return {
		products,
		promotion: selectedLook,
		totalPrice: totalWithDiscount,
		discountValue,
		discount: discountPercentage,
	};
}

module.exports = { getShoppingCart };
