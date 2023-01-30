import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReparationService } from '../Service/reparationservice';
import { Reparation } from '../Modele/reparation';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouteConfigLoadEnd } from '@angular/router';
import { Detail } from '../Modele/detail';
@Component({
  selector: 'app-reparartion',
  templateUrl: './reparation.html',
  styleUrls: ['draganddrop.css']
})
export class ReparartionComponent {
  constructor(private reparationservice: ReparationService, private route: ActivatedRoute) { }
  todo: string[] = [];;
  start: number = 0;
  done: string[] = [];;
  detailtab !: Detail[];;
  avancement !: number
  voitures$: Observable<Detail[]> = new Observable();
  matr = this.route.snapshot.paramMap.get("matricule")??"";

  async fetchReparation(): Promise<void> {
    this.voitures$ = await this.reparationservice.getReparation(this.matr);
  }

  getAvancement() {
    console.log("Anaty avancement")
    var total = this.todo.length + this.done.length;
    this.avancement = 100 - (100 * this.todo.length / total);
  }

  async getreparations() {
    // console.log("ato zah eeeeeeeeeeeeeeee")
    // console.log("isany" + this.todo.length)
    if (this.todo.length == 0 && this.done.length == 0) {
      // console.log("ato zah eeeeeeeeeeeeeeee")
      //   ;

      (await this.reparationservice.getReparation(this.matr)).subscribe({
        next: (data) => {
          for (let i = 0; i < data.length; i++) {
            // data[0].etat = "1"
            // console.log("testaaaaaaaaaaaaaaa" + data[i].prix)
            if (this.start == 0) {
              if (data[i].etat=="0") {
                this.todo.push(data[i].object);
              }
              if (data[i].etat=="1") {
                this.done.push(data[i].object);
              }
            }
            this.detailtab = data;
            this.getAvancement()
          }
          // console.log("tyyyyyyyyyyy" + JSON.stringify(data))
        }
      })
    }
  }
  tableau !: Detail[]
  async updatereparation(nomobject: string) {
    console.log("update")
    const test=0;
    console.log("update :" + this.todo.length);
    //console.log("tyyyyyyyyyyy"+this.todo.length)
    (await this.reparationservice.getReparationss(this.matr)).subscribe({
      next: (datas) => {
        for (let i = 0; i < datas.length; i++) {
          if (datas[i].object == nomobject) {
            console.log("ty le nafindra"+nomobject)
            console.log("gogo :" + this.todo.length)
            datas[i].etat = "1"
          }
          this.tableau = datas
          console.log("ato")
          console.log("atoooooo" + JSON.stringify(this.tableau))
         
         // console.log("aroooo" + JSON.stringify(datas))
        }
         this.getAvancement()
        this.reparationservice.finirreparation(this.tableau, this.matr,this.avancement.toString())
        // this.reparationservice.updateEmployee(this.matr,this.tableau)
        
        console.log("vita")
        //console.log("aroooo" + JSON.stringify(datas))
        //

      }

    })
    return this.tableau
  }

  async drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.container.data);

    } else {
      this.start = 1
      
      console.log("matricule" + this.matr)
      //console.log(JSON.stringify(this.tableau))

      // console.log("update :" + this.todo.length)

      // console.log("hahahaha" + this.todo[event.currentIndex]);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      await this.updatereparation(this.todo[event.previousIndex])
      // this.getAvancement()

    }

  }

  clicSurBouton() {
    alert("Vous venez de cliquer sur le bouton");
  }

  test() {
    return false;
  }

  async ngOnInit(): Promise<void> {
    if (this.todo.length == 0) {
      await this.getreparations()

    }
  }
}
