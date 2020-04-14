Vue.component('product', {
    props:{
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: ` <div class="product">
    <div class="product-image">
        <img :src="image">
    </div>
    <div class="product-info">

        <!-- <h1>{{ brand }} {{product}}</h1> -->
        <h1>{{ title }}</h1>
        
        <p v-if="inStock">In Stock</p>
        <p v-else :class=" { outOfStock : !inStock} ">Out of Stock</p>
        
        <p>{{ sale }}</p>
        <p>{{ description }}</p>

        <product-details :details="details"></product-details>

        <div v-for="(variant, index) in variants" 
        :key="variant.variantId"
        class="color-box"
        :style="{backgroundColor: variant.variantColor}"
        @mouseover="updateProduct(index)">
        </div>

            <button v-on:click="addToCart" 
                    :disabled="!inStock"
                    :class=" { disabledButton: !inStock }">Add to Cart</button>

            <button v-on:click="removeFromCart"> Remove from Cart</button>

            <p> User is premium: {{ premium }} </p>
            <p> Shipping: {{ shipping }} </p>

    </div>

</div>`,
data () {
    return {
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
                variantQuantity: 30
            },            
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
                variantQuantity: 10
    
            }
        ],
        sizes: ["Large", "Medium", "Small"],        
    }
}
,
methods: {
    addToCart() {
        // this.cart += 1;
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    removeFromCart(){
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)

    },
    updateProduct(index) {
        this.selectedVariant=index
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
    },
    shipping() {
        if(this.premium) {
            return " Free "
        }
        return 4.99
    }
}
})

Vue.component('productDetails', {
    props:{
        details: {
            type: Array,
            required: true
        }
    },
    template: `<ul>
    <li v-for="detail in details">{{ detail }}</li>
    </ul>`,
})

var app = new Vue({
    el: '#app',
    data: {
        intro: "Hello Vue World !!!",
        premium: false,
        // cart: 0,
        cart: [],
    },
    methods: {
        updateCart(id) {
            // this.cart += 1
            this.cart.push(id)
        },
        removeItem(id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
              if (this.cart[i] === id) {
                 this.cart.splice(i, 1);
              }
            }
          }

    }

})