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
  done: string[] = [];;
  detailtab !: Detail[];;
  avancement !: number
  voitures$: Observable<Detail[]> = new Observable();
  matr = this.route.snapshot.paramMap.get("matricule");
  fetchReparation(): void {
    this.voitures$ = this.reparationservice.getReparation(this.matr);
  }

  getAvancement() {
    console.log("Anaty avancement")
    var total = this.todo.length + this.done.length;
   this.avancement = (100 * this.todo.length / this.done.length);
  }

  async getreparation() {
    console.log("ato zah eeeeeeeeeeeeeeee")
    //console.log("tyyyyyyyyyyy"+this.todo.length)
    
    if (this.todo.length == 0 && this.done.length == 0) {
      this.reparationservice.getReparation(this.matr).subscribe({
        next: (data) => {
          for (let i = 0; i < data.length; i++) {
            data[0].etat = "1"

            this.todo.push(data[i].object);
            this.detailtab = data;
          }
          console.log("tyyyyyyyyyyy" + JSON.stringify(this.detailtab))
        }
      })
    }

  }
  async drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.container.data);

    } else {
      console.log("hahahaha" + this.todo[event.currentIndex]);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
   this.getAvancement() ;
  }

  clicSurBouton() {
    alert("Vous venez de cliquer sur le bouton");
  }

  test() {
    return false;
  }

  async ngOnInit(): Promise<void> {

    if (this.todo.length == 0) {
      await this.getreparation()
    }

  }
}
