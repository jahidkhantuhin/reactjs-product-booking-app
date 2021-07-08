export function insertProductData() {
    const products = [
        {
          "code":"p1",
          "name":"Air Compressor 12 GAS",
          "type":"plain",
          "availability":true,
          "needing_repair":false,
          "durability":3000,
          "max_durability":3000,
          "mileage":null,
          "price": 4500,
          "minimum_rent_period":1
        },
        {
          "code":"p2",
          "name":"Air Compressor 5 Electric",
          "type":"plain",
          "availability":true,
          "needing_repair":false,
          "durability":1500,
          "max_durability":2000,
          "mileage":null,
          "price": 6500,
          "minimum_rent_period":1
        },
        {
          "code":"p3",
          "name":"Dia Blade 14 inch",
          "type":"plain",
          "availability":true,
          "needing_repair":false,
          "durability":40000,
          "max_durability":50000,
          "mileage":null,
          "price": 3000,
          "minimum_rent_period":2
        },
        {
          "code":"p4",
          "name":"Copper Blade 5 inch",
          "type":"plain",
          "availability":false,
          "needing_repair":true,
          "durability":0,
          "max_durability":2000,
          "mileage":null,
          "price": 200,
          "minimum_rent_period":2
        },
        {
          "code":"p5",
          "name":"Copper Blade 5 inch",
          "type":"plain",
          "availability":false,
          "needing_repair":true,
          "durability":0,
          "max_durability":2000,
          "mileage":null,
          "price": 200,
          "minimum_rent_period":2
        },
        {
          "code":"p6",
          "name":"Copper Blade 8 inch",
          "type":"plain",
          "availability":true,
          "needing_repair":false,
          "durability":1500,
          "max_durability":2000,
          "mileage":null,
          "price": 300,
          "minimum_rent_period":2
        },
        {
          "code":"p7",
          "name":"Beam Clamp",
          "type":"plain",
          "availability":true,
          "needing_repair":false,
          "durability":15000,
          "max_durability":20000,
          "mileage":null,
          "price": 800,
          "minimum_rent_period":30
        },
        {
          "code":"p8",
          "name":"Beam Clamp",
          "type":"plain",
          "availability":true,
          "needing_repair":false,
          "durability":10000,
          "max_durability":20000,
          "mileage":null,
          "price": 800,
          "minimum_rent_period":30
        },
        {
          "code":"p9",
          "name":"Beam Clamp",
          "type":"plain",
          "availability":false,
          "needing_repair":false,
          "durability":5000,
          "max_durability":20000,
          "mileage":null,
          "price": 800,
          "minimum_rent_period":30
        },
        {
          "code":"m1",
          "name":"Boom lift 40",
          "type":"meter",
          "availability":true,
          "needing_repair":false,
          "durability":4000,
          "max_durability":8000,
          "mileage":10000,
          "price": 1000,
          "minimum_rent_period":4
        },
        {
          "code":"m2",
          "name":"Boom lift 60",
          "type":"meter",
          "availability":true,
          "needing_repair":false,
          "durability":8000,
          "max_durability":10000,
          "mileage":5000,
          "price": 1500,
          "minimum_rent_period":4
        },
        {
          "code":"m3",
          "name":"Boom lift 80",
          "type":"meter",
          "availability":false,
          "needing_repair":true,
          "durability":500,
          "max_durability":12000,
          "mileage":200,
          "price": 2000,
          "minimum_rent_period":2
        },
        {
          "code":"m4",
          "name":"Boom lift 100",
          "type":"meter",
          "availability":true,
          "needing_repair":false,
          "durability":4000,
          "max_durability":12000,
          "mileage":8500,
          "price": 2500,
          "minimum_rent_period":2
        },
        {
          "code":"m5",
          "name":"Boom lift 20",
          "type":"meter",
          "availability":true,
          "needing_repair":false,
          "durability":1200,
          "max_durability":8000,
          "mileage":600,
          "price": 500,
          "minimum_rent_period":1
        },
        {
          "code":"m6",
          "name":"Boom lift 20",
          "type":"meter",
          "availability":true,
          "needing_repair":false,
          "durability":8000,
          "max_durability":8000,
          "mileage":0,
          "price": 500,
          "minimum_rent_period":1
        },
        {
          "code":"m7",
          "name":"Boom lift 20",
          "type":"meter",
          "availability":true,
          "needing_repair":false,
          "durability":5000,
          "max_durability":8000,
          "mileage":1200,
          "price": 500,
          "minimum_rent_period":1
        },
        {
          "code":"m8",
          "name":"Boom lift 40",
          "type":"meter",
          "availability":true,
          "needing_repair":false,
          "durability":8000,
          "max_durability":10000,
          "mileage":2500,
          "price": 1000,
          "minimum_rent_period":2
        }
      ]
      localStorage.setItem('products', JSON.stringify(products));
}
export function getProductData() {
    const products = JSON.parse(localStorage.getItem('products')) ? JSON.parse(localStorage.getItem('products')) : [{
      "code":"m7",
      "name":"Boom lift 20",
      "type":"meter",
      "availability":true,
      "needing_repair":false,
      "durability":5000,
      "max_durability":8000,
      "mileage":1200,
      "price": 500,
      "minimum_rent_period":1
    },
    {
      "code":"m8",
      "name":"Boom lift 40",
      "type":"meter",
      "availability":true,
      "needing_repair":false,
      "durability":8000,
      "max_durability":10000,
      "mileage":2500,
      "price": 1000,
      "minimum_rent_period":2
    }];
    return products;
    
}
export function getBookedProductData() {
  const products = JSON.parse(localStorage.getItem('bookedProduct'));
  return products;
  
}
export function selectedProduct(values) {
      let products = JSON.parse(localStorage.getItem('products'))
      let recordIndex = products.findIndex(x => x.code == values.code);
      
      const selectedProduct = {
        code: values.code,
        rent_period: Math.floor(Math.floor(values.toDate.getTime() - values.fromDate.getTime()) / (1000*60*60*24)),
        fromDate: values.fromDate,
        toDate: values.toDate,
        name: products[recordIndex].name,
        type: products[recordIndex].type,
        availability: products[recordIndex].availability, 
        needing_repair: products[recordIndex].needing_repair,
        durability: products[recordIndex].durability,
        max_durability: products[recordIndex].max_durability ,
        mileage: products[recordIndex].mileage,
        price: products[recordIndex].price,
        minimum_rent_period: products[recordIndex].minimum_rent_period

      }
      localStorage.setItem('newBSelected', JSON.stringify(selectedProduct));       
}

export function selectedReturnProduct(values) {
  let products = JSON.parse(localStorage.getItem('bookedProduct'))
  let recordIndex = products.findIndex(x => x.code == values.code);
  let fromDate= products[recordIndex].fromDate
  let mileage= products[recordIndex].mileage
  let rent_period= Math.floor(Math.floor(new Date().getTime() - new Date(fromDate).getTime()) / (1000*60*60*24))
  let used_mileage= mileage + (10 * rent_period)
  let durability= products[recordIndex].durability
  let type= products[recordIndex].type
  let reducedDurability
  if (type == 'plain') {
    reducedDurability = durability - (1 * rent_period) 
} else {
    reducedDurability = durability - (2 * rent_period) || durability - (2 * (used_mileage / 10))
}
  const selectedReturnProduct = {
    code: values.code,
    rent_period: rent_period,
    name: products[recordIndex].name,
    type: type,
    availability: products[recordIndex].availability,
    needing_repair: products[recordIndex].needing_repair,
    max_durability: products[recordIndex].max_durability ,
    Mileage: used_mileage,
    price: products[recordIndex].price,
    minimum_rent_period: products[recordIndex].minimum_rent_period,
    durability: reducedDurability
  }
  localStorage.setItem('newRSelected', JSON.stringify(selectedReturnProduct));
}

export function newBookedProduct (selectedProduct) {
  const newBookedProduct = {
    code: selectedProduct.code,
    rent_period: selectedProduct.rent_period,
    fromDate: selectedProduct.fromDate,
    toDate: selectedProduct.toDate,
    name: selectedProduct.name,
    availability: selectedProduct.availability,
    type: selectedProduct.type,
    durability: selectedProduct.durability,
    max_durability: selectedProduct.max_durability ,
    mileage: selectedProduct.mileage,
    price: selectedProduct.price,
    minimum_rent_period: selectedProduct.minimum_rent_period
}   
let bookedProduct = getAllNewBookedProduct();
    bookedProduct.push(newBookedProduct)
    localStorage.setItem('bookedProduct', JSON.stringify(bookedProduct));
    localStorage.removeItem('newBSelected')
    removeProduct(newBookedProduct)
}


export function newReturnedProduct () {
    let products = JSON.parse(localStorage.getItem('products'))
    let selectedReturnProduct = JSON.parse(localStorage.getItem('newRSelected'))
    let recordIndex = products.findIndex(x => x.code == selectedReturnProduct.code)
    products[recordIndex] = { ...selectedReturnProduct }
    products.push(products[recordIndex])
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.removeItem('newRSelected')
    let bookedProducts = JSON.parse(localStorage.getItem("bookedProduct"));
    let remianingBookedProducts = bookedProducts.filter((product) => product.code !== selectedReturnProduct.code);
    localStorage.setItem('bookedProduct', JSON.stringify(remianingBookedProducts));
}


export function removeProduct (newBookedProduct) {
        let products = JSON.parse(localStorage.getItem("products"));
        let newProducts
        newProducts = products.filter((product) => product.code !== newBookedProduct.code);
        localStorage.setItem('products', JSON.stringify(newProducts));
}

export function getAllNewBookedProduct() {
  if (localStorage.getItem('bookedProduct') == null)
      localStorage.setItem('bookedProduct', JSON.stringify([]))
  let bookedProduct = JSON.parse(localStorage.getItem('bookedProduct'));
  return bookedProduct
}
