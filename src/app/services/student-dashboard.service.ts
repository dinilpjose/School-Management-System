import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentDashboardService {


  constructor() { }
  getStudentData:any;
  
  storageKey: string = 'studentDashboard';

  saveStudentData(student:any) {
    console.debug(`StudentDashboardService/saveStudentData`)

    this.getStudentData = student
    localStorage.setItem(this.storageKey, JSON.stringify(this.getStudentData));
  }

  getData(){
    console.debug(`StudentDashboardService/getData`)

    return this.getStudentData
  }
}
