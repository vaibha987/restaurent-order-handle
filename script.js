//your JS code here. If required.
// Fetch the menu and display it on the page
async function getMenu() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
    const data = await response.json();
    const menuDiv = document.getElementById('menu');

    // Display menu items
    data.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.className = 'menu-item';
      menuItem.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
      `;
      menuDiv.appendChild(menuItem);
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
  }
}

// Simulate taking an order and randomly selecting 3 burgers
function takeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const burgers = ['Classic Burger', 'Cheese Burger', 'Chicken Burger', 'Vegan Burger', 'BBQ Burger', 'Bacon Burger'];
      const randomBurgers = [];
      while (randomBurgers.length < 3) {
        const randomIndex = Math.floor(Math.random() * burgers.length);
        const selectedBurger = burgers[randomIndex];
        if (!randomBurgers.includes(selectedBurger)) {
          randomBurgers.push(selectedBurger);
        }
      }
      resolve({ burgers: randomBurgers });
    }, 2500);
  });
}

// Simulate the preparation of the order
function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

// Simulate the payment process
function payOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

// Show a thank you message after the payment is made
function thankyouFnc() {
  alert('Thank you for eating with us today!');
}

// Handle the entire flow with async/await
async function handleOrder() {
  try {
    await getMenu(); // Fetch and display menu first
    const orderBtn = document.getElementById('orderBtn');
    orderBtn.addEventListener('click', async () => {
      const order = await takeOrder(); // Wait for the order to be taken
      console.log('Order:', order);

      const preparation = await orderPrep(); // Wait for the order to be prepared
      console.log('Order Prepared:', preparation);

      const payment = await payOrder(); // Wait for the payment to be processed
      console.log('Order Payment:', payment);

      if (payment.paid) {
        thankyouFnc(); // Show the thank you message once paid
      }
    });
  } catch (error) {
    console.error('Error handling order:', error);
  }
}

// Initialize the app when the page loads
window.onload = handleOrder;
