import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})

export class BillComponent implements OnInit {
  public isVisible: boolean = false;
  public currProduct: Product = {
    id: '',
    name: '',
    price: '', 
    count: '',
    total: ''
  };

  public products: Product[] = [];

  ngOnInit(): void {
    this.fetchProducts();
  }

  /*
      {id:1001, name:"Ice", price:50, count:5, total:250},
      {id:1002, name:"Rice", price:100, count:2, total:200},
      {id:1003, name:"Biscuit", price:10, count:5, total:50},
      {id:1004, name:"7Up", price:50, count:5, total:250},
      {id:1005, name:"Pepsi", price:40, count:5, total:200},
  
    ]*/

  calcTotal() {
    this.currProduct.total = String(Number(this.currProduct.price) * Number(this.currProduct.count));
  }

  addProduct() {
    this.products.push(this.currProduct);
    this.resetCurrProduct();
    this.storeProducts();
  }

  storeProducts() {

    let sessionProducts: string[][] = [];
    this.products.forEach(product => {
      sessionProducts.push([product.id, product.name, product.price, product.count, product.total]);
    });

    sessionStorage.setItem("Products", sessionProducts.toString());
  }

  fetchProducts() {
    let sessionedProducts = sessionStorage.getItem("Products") || "";
    let sesArrProducts = sessionedProducts.split(",");
    for (let i = 0; i < sesArrProducts.length; i++) {
      let product = {
        id: sesArrProducts[i],
        name: sesArrProducts[i + 1],
        price: sesArrProducts[i + 2],
        count: sesArrProducts[i + 3],
        total: sesArrProducts[i + 4]
      }
      this.products.push(product);
      i = i + 4;
    }
  }

  resetCurrProduct() {
    this.currProduct = {
      id: '',
      name: '',
      price: '',
      count: '',
      total: ''
    };
  }

  updateProduct(pId: string) {
    this.currProduct = this.products.filter(product => {
      return product.id == pId;
    })[0];
    this.deleteProduct(pId);
  }

  deleteProduct(pId: string) {
    let updatedProducts = [];
    updatedProducts = this.products.filter(product => {
      return product.id != pId;
    });
    this.products = updatedProducts;
  }
}

