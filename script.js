

async function fetchData(event, category) {
    event.preventDefault();

    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayData(data, category);
    } catch (error) {
        console.error('An error occurred :', error);
    }
}

function discount(price, compare_at_price){ 
        const discountedPrice = +price;
        const originalPrice = +compare_at_price;
    
       
        if (isNaN(discountedPrice) || isNaN(originalPrice)) {
            throw new Error('Both originalPrice and discountedPrice must be valid numbers.');
        }
        const discountAmount = originalPrice - discountedPrice;
        const discountPercentage = Math.round((discountAmount / originalPrice) * 100);
        return discountPercentage;
}

function displayData(data, category) {
    const output = document.getElementById('output');
    console.log("lol" , data.categories);
    const filteredData = data.categories.filter(item => item.category_name === category);
    console.log("filtered data :- ", filteredData);
   
    const list = document.createElement('ul');

    const listItems = filteredData[0].category_products.map(item => {
        const listItem = document.createElement('li');
        listItem.setAttribute('id', item.id);

        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.title;
        listItem.appendChild(image);

        if (item.badge_text) {
            const badgeText = document.createElement('button');
            badgeText.textContent = item.badge_text;
            listItem.appendChild(badgeText);
        }

        const details = document.createElement('div');
        details.setAttribute('class' , 'details');


        const title = document.createElement('h2');
        title.textContent = item.title;
        details.appendChild(title);

        const dot = document.createElement('span');
        dot.innerHTML = '&#x2022;';
        details.appendChild(dot);

        
        const vendor = document.createElement('p');
        vendor.textContent = `${item.vendor}`;
        details.appendChild(vendor);


        listItem.appendChild(details);

        const price = document.createElement('span');
        price.setAttribute('class' , 'price');
        price.textContent = `Rs ${item.price}.00`;
        listItem.appendChild(price);

        const compare_at_price = document.createElement('span');
        compare_at_price.setAttribute('class' , 'compare_at_price');
        compare_at_price.textContent = `${item.compare_at_price}.00`;
        listItem.appendChild(compare_at_price);

        const dis = document.createElement('span');
        dis.setAttribute('class' , 'discount');
        const discountPrice = discount(item.price , item.compare_at_price);
        dis.textContent = `${discountPrice}% Off`;
        listItem.appendChild(dis);


        const addToCart = document.createElement('a');
        addToCart.setAttribute('class', "addToCart");
        addToCart.textContent = "Add to Cart";
        listItem.appendChild(addToCart);


        return listItem;
    });

    listItems.forEach(listItem => list.appendChild(listItem));
    output.innerHTML = '';
    output.appendChild(list);
}