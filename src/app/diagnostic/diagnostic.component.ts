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

  productForm: FormGroup;
  voiture!: Voiture;
  matricule = this.route.snapshot.paramMap.get("voiture") ?? "";
  tableau: Detail[] = []
  start: number = 0
  // jsonString!: string  

  async getVoiture() {
    (await this.voitureservice.getOnevoiture(this.matricule ?? "")).subscribe({
      next: (data) => {
        this.voiture = data
        console.log("hahahahahahahaha" + data)
        console.log("tableau" + this.tableau)
      }
    })
  }
  async getreparations() {
    // let data = JSON.parse(this.voiture.matricule??"");
    // this.voiture = <Voiture>data;
    (await this.reparationservice.getReparation(this.matricule)).subscribe({
      next: (data) => {
        this.tableau = data
        console.log("tyhakakaka" + data)
      }
    })
  }
  constructor(private fb: FormBuilder, private reparationservice: ReparationService, private route: ActivatedRoute, private voitureservice: VoitureService) {
    this.getreparations();
    //  await this.getreparations()
    console.log("ato zah" + this.tableau)
    this.productForm = this.fb.group({
      detail: this.fb.array(this.tableau),
    });
    // this.getreparations();
  }

  detail(): FormArray {
    return this.productForm.get("detail") as FormArray
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
    this.detail().push(this.newQuantity());
  }
  removeQuantity(i: number) {
    this.detail().removeAt(i);
  }
  onSubmit() {
    console.log(this.productForm.value);
    // console.log("ty leizy"+JSON.stringify(this.voiture).replace("[",""));
    console.log("atooo" + JSON.stringify(this.productForm.value.detail))
    this.reparationservice.AjoutReparation(this.voiture, this.productForm.value.detail);
  }

  async ngOnInit(): Promise<void> {
    for (let i = 0; i < 50; i++) {
      (await this.reparationservice.getReparation(this.matricule)).subscribe({
        next: async (data: Detail[]) => {
          this.productForm.value.detail = data
          this.productForm = this.fb.group({
            detail: this.fb.array(data),
          });
          console.log("tonyyyyyy" + data)
        }
      })


    }



    //  await this.getreparations().then(
    //   async value => this.productForm.value.detail=this.tableau,
    //   // result =>this.productForm.setValue(this.tableau), 
    //   affiche =>console.log("eto aloha"+this.tableau),  
    //  )
    await this.getVoiture()

  }

}
function subscribe(arg0: { next: (data: Detail[]) => void; }) {
  throw new Error('Function not implemented.');
}

