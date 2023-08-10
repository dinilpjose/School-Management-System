import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentDashboardService } from 'src/app/services/student-dashboard.service';

interface Subject {
  name: string;
  grade: string;
}

interface Student {
  name: string;
  city: string;
  gender: string;
  profilePhoto: string;
  subjects: Subject[];
}


@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent {

  studentData: any;
  storageKey: string = 'studentDashboard'


  constructor(private route: ActivatedRoute, private studentDashboardService: StudentDashboardService,) { }

  ngOnInit(): void {

    const storedStudentDashboardValue = localStorage.getItem(this.storageKey);
    console.log('122', storedStudentDashboardValue)
    if (storedStudentDashboardValue != undefined) {
      this.studentData = JSON.parse(storedStudentDashboardValue);
      console.log('233', this.studentData, this.studentData.student_name)

    }
    else {
      
      this.studentData = this.studentDashboardService.getData();
      if (this.studentData) {
        console.log('jello', this.studentData)
        localStorage.setItem(this.storageKey, JSON.stringify(this.studentData));
      }


    }


  }

}
