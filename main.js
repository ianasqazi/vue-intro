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

    <div>
        <h3> Reviews </h3>
        <p v-if="!reviews.length"> There are no reviews yet ... </p>
        <ul>
        <li v-for="review in reviews">
        <p>{{ review.name }}</p>
        <p>{{ review.rating }}</p>
        <p>{{ review.review }}</p>
        <p>{{ review.recommend }}</p>

        </li>
        </ul>
    </div>

    <product-review @review-submitted="addReview"></product-review>

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
        reviews: [],
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
    },
    addReview(productReview) {
        this.reviews.push(productReview)
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

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
        <b> Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors"> {{ error }} </li>
        </ul>
    </p>
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>

    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>Would you recommend this product?</p>
    <label>
      Yes
      <input type="radio" value="Yes" v-model="recommend"/>
    </label>
    <label>
      No
      <input type="radio" value="No" v-model="recommend"/>
    </label>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name, 
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('review-submitted', productReview)
                this.name = null,
                this.review = null, 
                this.rating = null,
                this.recommend = null
            }
            else {
                if(!this.name) this.errors.push("Name required !!!")
                if(!this.review) this.errors.push("Review required !!!")
                if(!this.rating) this.errors.push("Rating required !!!")
                if(!this.recommend) this.errors.push("Recommendation required !!!")

            }
            }

           
    },
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