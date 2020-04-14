

var app = new Vue({
    el: '#app',
    data: {
        intro: "Hello Vue World !!!",
        brand: "Hugo Boss",
        product: 'Socks',
        // image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
        selectedVariant: 0,
        description: 'Green socks',
        href:'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
        inventory: 7,
        // inStock: false,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
                variantQuantity: 0
            },            
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
                variantQuantity: 10

            }
        ],
        sizes: ["Large", "Medium", "Small"],
        cart: 0,
        
    },
    methods: {
        addToCart: function () {
            this.cart += 1;
        },
        // updateProduct: function (variantImage) {
        //     this.image=variantImage;
        // },
        updateProduct: function (index) {
            this.selectedVariant=index
            console.log(index)
        }
    },
    computed: {
        title() {
            return this.brand + " - " + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
          if (this.onSale) {
            return this.brand + ' ' + this.product + ' are on Sale !!!'
          } 
            return  this.brand + ' ' + this.product + ' are NOT on sale'
        }
    }
})