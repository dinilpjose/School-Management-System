import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentDashboardService {


  constructor() { }
  getStudentData:any;
  
  storageKey: string = 'studentDashboard';

  saveStudentData(student:any) {
    console.log(student,'df')

    
    
    this.getStudentData = student
    localStorage.setItem(this.storageKey, JSON.stringify(this.getStudentData));
    

  }

  getData(){
    return this.getStudentData

  }
}
