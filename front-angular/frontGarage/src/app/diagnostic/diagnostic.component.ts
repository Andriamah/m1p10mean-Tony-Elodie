import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'  
@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.html',
  styles: [
  ]
})
export class DiagnosticComponent {

  name = 'Angular';  
    
  productForm: FormGroup;  
     
  constructor(private fb:FormBuilder) {  
     
    this.productForm = this.fb.group({  
      details: this.fb.array([]) ,  
    });  
  }  
    
  details() : FormArray {  
    return this.productForm.get("details") as FormArray  
  }  
     
  newQuantity(): FormGroup {  
    return this.fb.group({  
      reparation: '',  
      prix: '', 
      etat: '0'
    })  
  }  
     
  addQuantity() {  
    this.details().push(this.newQuantity());  
  }  
     
  removeQuantity(i:number) {  
    this.details().removeAt(i);  
  }  
     
  onSubmit() {  
    console.log(this.productForm.value);  
  }  

}
