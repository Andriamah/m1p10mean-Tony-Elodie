import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../utilisateur';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-utilisateur-list',
  template: `

   <h2 class="text-center m-5">Employees List</h2>
 
   <table class="table table-striped table-bordered">
       <thead>
           <tr>
               <th>Name</th>
               <th>Position</th>
               <th>Level</th>
               <th>Action</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let user of utilisateurs$ | async">
               <td>{{user.nom}}</td>
               <td>{{user.prenom}}</td>
               <td>{{user.mail}}</td>
               <td>
                  //  <button class="btn btn-primary me-1">Edit</button>
                  //  <button class="btn btn-danger">Delete</button>
               </td>
           </tr>
       </tbody>
   </table>
 
   <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Employee</button>
 `
})
export class UtilisateursListComponent implements OnInit {
  utilisateurs$: Observable<Utilisateur[]> = new Observable();

  constructor(private employeesService: UtilisateurService) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  //  deleteEmployee(id: string): void {
  //    this.employeesService.deleteEmployee(id).subscribe({
  //      next: () => this.fetchEmployees()
  //    });
  //  }

  private fetchEmployees(): void {
    this.utilisateurs$ = this.employeesService.getEmployees();
  }
}
