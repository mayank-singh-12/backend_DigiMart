# DigiMart API
Backend API for an electronics E-commerce Web app.<br>
Link to Frontend Repo:
[Frontend Repo](https://github.com/mayank-singh-12/frontend_DigiMart.git) 

## Quick Start

```
git clone https://github.com/mayank-singh-12/backend_DigiMart.git
cd backend_DigiMart
npm install
node index.js
```

---

## Base API: https://backend-digi-mart.vercel.app/

### GET /products

List all products<br>
Sample Response:

```
[
    {
        _id : ...,
        title: ...,
        category: [ { _id: ..., name: ..., products: [...] }, ...],
        description: [...],
        price: ...,
        discount: ...,
        models: { storage: [...], color: [...], _id: ... },
        rating: ...,
        images: [...]
    }, ...
]
```

### GET /products/:productId

Get details of one product<br>
Sample Response:

```
{
    product: {
        _id : ...,
        title: ...,
        category: [ { _id: ..., name: ..., products: [...] }, ...],
        description: [...],
        price: ...,
        discount: ...,
        models: { storage: [...], color: [...], _id: ... },
        rating: ...,
        images: [...]
    }
}
```

### GET /categories

Get list of all categories<br>
Sample Response:

```
[
    {
        _id: ...,
        name: ...,
        products:[
            {
                _id : ...,
                title: ...,
                category: [ { _id: ..., name: ..., products: [...] }, ...],
                description: [...],
                price: ...,
                discount: ...,
                models: { storage: [...], color: [...], _id: ... },
                "rating": 4.6,
                "images": [...]
            }, ...
        ]
    }
]
```

### GET /categories/:categoryId

Get list of all categories<br>
Sample Response:

```
{
    category:{
        _id: ...,
        name: ...,
        products:[
            {
                _id : ...,
                title: ...,
                category: [ { _id: ..., name: ..., products: [...] }, ...],
                description: [...],
                price: ...,
                discount: ...,
                models: { storage: [...], color: [...], _id: ... },
                "rating": 4.6,
                "images": [...]
            }, ...
        ]
    }
}
```

### GET /orders

Get list of recent orders<br>
Sample Response:

```
{
    orders:[
        {
            _id: ...,
            products: [
                {
                    title: ...,
                    quantity: ...,
                    price: ...,
                    discount: ...,
                    discountedPrice: ...
                }, ... ],
            shippingAddress: {
                name: ...,
                houseNo: ...,
                streetAddress: ...,
                city: ...,
                state: ...,
                country: ...
            },
            subTotal: ...,
            delivery: ...,
            totalToPay: ...
        }
    ]
}
```

## POST /orders

Save order<br>
Sample Request Body:

```
{
    message: "Successfully added new order!",
    order: {
            _id: ...,
            products: [
                {
                    title: ...,
                    quantity: ...,
                    price: ...,
                    discount: ...,
                    discountedPrice: ...
                }, ... ],
            shippingAddress: {
                name: ...,
                houseNo: ...,
                streetAddress: ...,
                city: ...,
                state: ...,
                country: ...
            },
            subTotal: ...,
            delivery: ...,
            totalToPay: ...
        }
}
```

---

For bugs or feature request, please reach out to dev.by.mayank@gmail.com
