import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  myHeaders: object = {
    headers: {
      token: this.cookieService.get('token'),
    },
  };
  addProductTowishlist(id: string): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'wishlist',
      {
        productId: id,
      },
      this.myHeaders,
    );
  }
  getLoggedUserwishlist(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'wishlist', this.myHeaders);
  }
  removeProductFromwishlist(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `wishlist/${id}`, this.myHeaders);
  }
}
