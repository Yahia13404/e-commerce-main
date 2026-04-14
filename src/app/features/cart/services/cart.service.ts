import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  countNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  myHeaders: object = {
    headers: {
      token: this.cookieService.get('token'),
    },
  };
  addProducttocart(id: string): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'cart',
      {
        productId: id,
      },
      this.myHeaders,
    );
  }
  getLoggedUsercart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart', this.myHeaders);
  }
  removeSpecificCartitem(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `cart/${id}`, this.myHeaders);
  }
  updteCartcount(id: string, count: number): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + `cart/${id}`,
      {
        count: count,
      },
      this.myHeaders,
    );
  }
  checkOutsession(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `orders/checkout-session/${id}?url=http://localhost:4200`,
      data,
      this.myHeaders,
    );
  }
  createCashorder(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/${id}`, data, this.myHeaders);
  }
}
