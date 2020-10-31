import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
public host:String="http://localhost:8080";

  constructor(private httpClient:HttpClient) { }
  public getProducts(page:number,size:number){
    return this.httpClient.get(this.host+"/produits?page="+page+"&size="+size);
  }
  public getProductsbyKeyword(mc:string,page:number,size:number){
    return this.httpClient.delete(this.host+"/produits/search/byDesignationPage?mc="+mc+"&page="+page+"&size"+size);
  }
  public deleteResource(id){
    return this.httpClient.get(this.host+"/listProduits/"+id);
  }


}
