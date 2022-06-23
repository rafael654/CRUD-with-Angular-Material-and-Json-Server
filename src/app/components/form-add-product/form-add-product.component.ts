import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-form-add-product',
  templateUrl: './form-add-product.component.html',
  styleUrls: ['./form-add-product.component.css']
})
export class FormAddProductComponent implements OnInit {

  freshnessList=["Brand New", "Second Hand", "Refurbished"];

  productForm !:FormGroup;

  actionBtn:string= "Save";

  dialogTitle: string= "Add Product";

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef: DialogRef
    ) { }

  ngOnInit(): void {
    this.productForm= this.formBuilder.group({
      productName: ['',Validators.required],
      category: ['',Validators.required],
      freshness : ['',Validators.required],
      price:['', Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required]
    })
    if(this.editData){
      this.actionBtn = "Update";
      this.dialogTitle= "Update Product"
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
      }
    }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
      this.productService.postProduct(this.productForm.value).subscribe(
        {next:
        ()=>{
          alert('success')
          this.productForm.reset();
          this.dialogRef.close('sucess')
        },
        error:()=>{
          alert("Erro with the process")
        }
      })
    }else{
      alert("Preencha todos os campos.")
      return;
    }
    }else{
      this.updateProduct()
    }
  }
  updateProduct(){
    if(this.productForm.valid){
      this.productService.putProduct(this.productForm.value,this.editData.id)
      .subscribe({
        next:()=>{
          alert('Update with Successfully');
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert('Update with error, try attenp again');
        }})
      }else{
        alert("Preencha todos os campos.")
        return;
    }
  }
}
