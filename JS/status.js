var productList = [];

fetch('http://localhost:1337/all-questions')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(products => {
        productList = products;
    })
    .catch(error => {
        console.error('Error:', error);
    })

setTimeout(() => {
    statusCheck();
}, 100);

function statusCheck() {
    if (productList.toString() != '') {
        console.log('gfhdjkghkdr')
        document.querySelector('.status').innerHTML = '<p>DB Status: <span class="on">ON</span></p>';
    }
};