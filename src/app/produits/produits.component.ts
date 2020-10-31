import { Component, OnInit } from '@angular/core';

import {CatalogueService} from '../services/catalogue.service';


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  public produits: any;
  public size: number = 5;
  public currentPage: number = 0;
  public totalPages: number;
  public pages: Array<number>;
  private currentKeyword: string = "";

  constructor(private catService: CatalogueService) {
  }

  ngOnInit(): void {
  }

  onGetProducts() {
    this.catService.getProducts(this.currentPage, this.size)
      .subscribe(data => {

        this.totalPages = data["page"].totalPages;
        this.pages = new Array<number>(this.totalPages);
        this.produits = data;

      }, err => {
        console.log(err);
      });
  }

  onPageProduct(i) {
    this.currentPage = i;
    this.chercherProduits();
  }

  onChercher(form: any) {
    this.currentPage = 0;
    this.currentKeyword = form.Keyword;
    this.chercherProduits();
  }

  chercherProduits() {

    this.catService.getProductsbyKeyword(this.currentKeyword, this.currentPage, this.size)
      .subscribe(data => {

        this.totalPages=data["page"].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.produits=data;

      }, err => {
        console.log(err);
      });

  }

  onDeleteProduct(p) {
    let conf = confirm("Etes vous sur?")
    if (conf) {
      this.catService.deleteResource(p.id)
        .subscribe (data => {

          this.chercherProduits();
        }, err => {
          console.log(err);
        });
    }


  }
}
