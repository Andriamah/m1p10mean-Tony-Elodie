import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { Detail } from '../Modele/detail';
import { Voiture } from '../Modele/voiture';
import { ReparationService } from '../Service/reparationservice';
import { VoitureService } from '../Service/voiture.service';
@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.html',
  styles: [
  ]
})
export class DiagnosticComponent {

  name = 'Angular';
  tableau : Detail[]=[]
  productForm: FormGroup;
  voiture!: Voiture ;
  matricule = this.route.snapshot.paramMap.get("voiture")??"";
  // jsonString!: string  

  async getVoiture(){
    (await this.voitureservice.getOnevoiture(this.matricule??"")).subscribe({
      next: (data) => {
        this.voiture = data
        console.log("hahahahahahahaha"+data)
      }
    })
  } 
  // async getreparations() {
  //       let data = JSON.parse(this.jsonString);
  //       this.voiture = <Voiture>data;
   
  //     (await this.reparationservice.getReparation(this.voiture.matricule??"")).subscribe({
  //       next: (data) => {
  //         this.tableau = data
  //         console.log("hahahahahahahaha"+data)
  //       }
  //     })
  //   }
  constructor(private fb: FormBuilder,private reparationservice: ReparationService,private route: ActivatedRoute,private voitureservice:VoitureService) {
    // this.getreparations();
    this.productForm = this.fb.group({
      details: this.fb.array(this.tableau),
    });
    // this.getreparations();
  }

  details(): FormArray {
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
    // this.getreparations();
    this.details().push(this.newQuantity());
  }
  removeQuantity(i: number) {
    this.details().removeAt(i);
  }

  onSubmit() {
    console.log(this.productForm.value);
    console.log("ty leizy"+JSON.stringify(this.voiture).replace("[",""));
    console.log("atooo"+JSON.stringify(this.productForm.value.details))
    this.reparationservice.AjoutReparation(this.voiture,this.productForm.value.details);
  }

  async ngOnInit(): Promise<void> {
    // await this.getreparations();
    await this.getVoiture()
  }

}
