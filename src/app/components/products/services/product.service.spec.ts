import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { defer, from, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ProductService } from './product.service';

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('#getProducts should return list of products from observable', (done) => {
  //   const expectedProduct = [{ id: 0, name: 'product 0' }, { id: 1, name: 'product 1' }, { id: 2, name: 'product 2' }];
  //   service.getAllProducts().subscribe(data => {
  //     expect(data.length).toBe(3)
  //     expect(data).toEqual(expectedProduct);
  //     done();
  //   });
  //   const req = httpTestingController.expectOne({ method: "GET", url: `${environment.apiBaseUrl}/products?page=1&size=50` });
  //   req.flush(expectedProduct);
  // });

  it('should return expected products (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    let service = new ProductService(httpClientSpy);
    const expectekdProducts: any[] = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
    httpClientSpy.get.and.returnValue(from([expectekdProducts]));
    service.getAllProducts().subscribe({
      next: products => {
        expect(products).toEqual(expectekdProducts);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('#getProducts list should return undefined on error', (done) => {
    const expectedProduct: any = [];
    service.getAllProducts().subscribe((data) => {
      expect(data).toEqual(undefined);
      done();
    });

    const req = httpTestingController.expectOne({ method: "GET", url: `${environment.apiBaseUrl}/products?page=1&size=50` });
    req.flush('error', { status: 500, statusText: 'Get products failed' });
  });

  // xit('should return an error when the server returns a 404', (done: DoneFn) => {
  //   let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  //   let service = new ProductService(httpClientSpy as any);
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404,
  //     statusText: 'Not Found'
  //   });

  //   httpClientSpy.get.and.returnValue(from([errorResponse]));
  //   service.getAllProducts().subscribe({
  //       next: heroes => done.fail('expected an error, not heroes'),
  //       error: error  => {
  //         expect(error.message).toContain('test 404 error');
  //         done();
  //       }
  //     });
  // });

  it('#getProduct should return particular product details', (done) => {
    const expectedProduct = [{ id: 5, name: 'product 5' }, { id: 1, name: 'product 1' }, { id: 2, name: 'product 2' }];
    service.getProduct(1).subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.id).toBe(1)
      done();
    });
    const req = httpTestingController.expectOne({ method: "GET", url: `${environment.apiBaseUrl}/product/1` });
    req.flush(expectedProduct[1]);
  });

  xit('#getProduct should give error if fails', () => {
    // const expectedProduct = [{ id: 5, name: 'product 5' }, { id: 1, name: 'product 1' }, { id: 2, name: 'product 2' }];
    service.getProduct(1).subscribe();
    const req = httpTestingController.expectOne({ method: "GET", url: `${environment.apiBaseUrl}/product/1` });
    expect(req.request.method).toBe('GET')
    req.flush('Get product failed', { status: 500, statusText: 'Interval server error' });
  });

  it("Should save new product", () => {
    let product = { id: 2, name: 'product name' }
    service.addNewProduct(product).subscribe();
    let req = httpTestingController.expectOne({ method: "POST", url: `${environment.apiBaseUrl}/product` });
    // expect(req.request.method).toEqual('POST');   //both way can check req method
    expect(req.request.body).toEqual(product);
  });

  xit("Should give error if save new product fails", () => {
    let product = { id: 3, name: 'product name' }
    service.addNewProduct(product).subscribe(
      // (error: HttpErrorResponse) => {
      //   expect(error.status).toBe(500);
      // }
    );
    let req = httpTestingController.expectOne({ method: "POSt", url: `${environment.apiBaseUrl}/product` });
    req.flush('update product failed', { status: 500, statusText: 'Internal Server Error' });
  });

  it("Should update a product", () => {
    const updatedProduct = { id: 5, name: 'product 5*2' }
    service.updateProduct(updatedProduct).subscribe();
    let req = httpTestingController.expectOne({ method: "PUT", url: `${environment.apiBaseUrl}/product/5` });
    expect(req.request.body).toEqual(updatedProduct);
  });

  xit("Should give error if update product fails", () => {
    let product = { id: 2, name: 'product name' }
    service.updateProduct(product).subscribe();
    let req = httpTestingController.expectOne({ url: `${environment.apiBaseUrl}/product/2` });
    expect(req.request.method).toEqual("PUT");
    req.flush('update product failed', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should delete product', () => {
    // const expectedProduct = [{ id: 5, name: 'product 5' }, { id: 1, name: 'product 1' }, { id: 2, name: 'product 2' }];
    service.deleteProduct(1).subscribe();
    const req = httpTestingController.expectOne({ method: "DELETE", url: `${environment.apiBaseUrl}/product/1` });
    expect(req.request.method).toBe('DELETE')
  });


});
