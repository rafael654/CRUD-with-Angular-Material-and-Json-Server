import {Component, ViewChild, OnInit, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { FormAddProductComponent } from '../form-add-product/form-add-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'category','date','freshness', 'price','comment','action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;


  constructor( private productService : ProductService, private dialog: MatDialog) {
  }
  postProduct(){
    this.getAllProduct()
  }
  ngOnInit(): void {
    this.getAllProduct();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    }

  getAllProduct(){
      this.productService.getProduct().subscribe({next:(res)=>{
      this.dataSource= new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator= this.paginator;
    }})
  }
  editProduct(row: object){
    this.dialog.open(FormAddProductComponent,{
      width:'70%',
      maxWidth:'550px',
      data:row
    }).afterClosed().subscribe(()=>
      this.getAllProduct()
    )
  }
  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe(()=> this.getAllProduct())
  }
}



