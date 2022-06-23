import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormAddProductComponent } from '../form-add-product/form-add-product.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() postProduct = new EventEmitter();

  updateList: boolean= false;

  constructor(private dialog: MatDialog){
   }
   openFormAddProduct() {
    this.dialog.open(FormAddProductComponent,{
     width:'70%',
     maxWidth:'550px'
   }).afterClosed().subscribe(()=> this.postProduct.emit())}
  ngOnInit(): void {
  }

}
