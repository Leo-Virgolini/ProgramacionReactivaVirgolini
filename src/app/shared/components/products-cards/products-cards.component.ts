import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { debounceTime, map, Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-products-cards',
  templateUrl: './products-cards.component.html',
  styleUrls: ['./products-cards.component.scss']
})
export class ProductsCardsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  categories$!: Observable<any[]>;
  products!: any[];
  carrito: number = 0;

  @ViewChild('busqueda')
  input!: ElementRef<HTMLInputElement>;

  constructor(private renderer: Renderer2, private productoService: ProductService) { }

  ngOnInit(): void {
    this.categories$ = this.obtenerCategorias();
    this.subscriptions.push(this.productoService.getProducts()
      .pipe(
        map(results => results.products.sort(this.ordenarPorTitulo))
      )
      .subscribe((data) => this.products = data));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  obtenerCategorias(): Observable<any> {
    return this.productoService.getCategories()
      .pipe(
        map(results => results.sort())
      );
  }

  buscarProductosPorCategoria(categoria: string): void {
    this.subscriptions.push(this.productoService.getProductsByCategory(categoria)
      .pipe(
        map(results => results.products.sort(this.ordenarPorTitulo))
      )
      .subscribe((data) => {
        this.renderer.setProperty(this.input.nativeElement, 'value', ""); this.products = data;
      }));
  }

  buscarProductosPorTitulo(event: any): void {
    this.subscriptions.push(this.productoService.searchProducts(event.target.value)
      .pipe(
        debounceTime(500),
        map(results => results.products.sort(this.ordenarPorTitulo)
          .filter((product: any) => product.title.toLowerCase().startsWith(event.target.value.toLowerCase()))
        )
      )
      .subscribe((data) => this.products = data));
  }

  agregarAlCarrito(cantidad: number) {
    const promise = new Promise<number>(function (resolve, reject) {
      if (cantidad > 0 && cantidad < 100)
        setTimeout(
          () => resolve(cantidad),
          100
        );
      else
        reject(new Error("Error: la cantidad es incorrecta."));
    });

    promise
      .then((cantidad: number) => {
        this.carrito += cantidad;
      })
      .catch((error) => console.log(error));
  }

  private ordenarPorTitulo = (a: any, b: any) => {
    if (a.title < b.title)
      return -1;
    if (a.title > b.title)
      return 1;
    return 0;
  };

}
