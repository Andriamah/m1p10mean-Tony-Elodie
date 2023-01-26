import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Voiture } from '../Modele/voiture';
import { VoitureService } from '../Service/voitureservice';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.html',
  styles: [
  ]
})
export class ReceptionComponent implements OnInit{
  voitures$: Observable<Voiture[]> = new Observable();

  constructor(private voituresService: VoitureService) { }

  private fetchVoiture(): void {
    this.voitures$ = this.voituresService.getVoitures();
  }

  ngOnInit(): void {
    this.fetchVoiture();
  }

}
