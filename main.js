var app = new Vue({
    el: '#app',
    data: {
        intro: "Hello Vue World !!!",
        product: 'Socks',
        image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
        description: 'Green socks',
        href:'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
        inventory: 7,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
            },            
            {
                variantId: 2235,
                variantColor: "blue",
            }
        ],
        sizes: ["Large", "Medium", "Small"]
    }
})