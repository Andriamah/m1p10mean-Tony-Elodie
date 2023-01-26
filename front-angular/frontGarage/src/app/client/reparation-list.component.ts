import { Component,OnInit } from '@angular/core';
import {Reparation} from '../Modele/reparation'
import { Observable } from 'rxjs'
import {ReparationService} from '../Service/reparation.service'
@Component({
  selector: 'client-reparation',
  templateUrl: './reparation-list.component.html',
  styles: []
})
export class ReparationListComponent implements OnInit{
    reparations$: Observable<Reparation[]> = new Observable();
 
    constructor(private reparationService: ReparationService) { }

    ngOnInit(): void {
        this.fetchEmployees();
      }
      
      
      private fetchEmployees(): void {
        this.reparations$ = this.reparationService.getReparations();
      }
  }
