import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs'
import { Chiffre } from '../Modele/chiffre';
import { Reparation } from '../Modele/reparation'
import { ReparationService } from '../Service/reparation.service'



@Component({
    selector: 'app-temp-moyenne',
    templateUrl: './temp_moyenne.component.html',
    styles: []
})
export class TempReparationComponent implements OnInit {

    temps_moyennes$: Observable<Chiffre[]> = new Observable();


    constructor(
        private reparationService: ReparationService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.fetchMoyenne();
    }
    fetchMoyenne() {
        this.temps_moyennes$ = this.reparationService.getTempsMoyenne();
    }

}
