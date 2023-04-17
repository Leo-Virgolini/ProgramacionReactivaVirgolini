import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { ProductsCardsComponent } from './components/products-cards/products-cards.component';

@NgModule({
  declarations: [
    ProductsCardsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule
  ],
  exports: [
    ProductsCardsComponent
  ]
})
export class SharedModule { }
