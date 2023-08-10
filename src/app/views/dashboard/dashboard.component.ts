import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentDashboardService } from 'src/app/services/student-dashboard.service';
import { STUDENTSMARKS } from './student_marks_dynamic';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentDataFromService: any
  storageKey: any = 'studentDashboard'
  studentId: string = '';
  marks: any[] = []
  markcardData: any = STUDENTSMARKS


  constructor(private route: ActivatedRoute, private studentDashboardService: StudentDashboardService) { }

  ngOnInit(): void {

    const storedStudentDashboardValue = localStorage.getItem(this.storageKey);
    console.log('122', storedStudentDashboardValue)
    if (storedStudentDashboardValue != undefined) {
      this.studentDataFromService = JSON.parse(storedStudentDashboardValue);
      console.log('233', this.studentDataFromService, this.studentDataFromService.student_name)

    }
    else {

      this.studentDataFromService = this.studentDashboardService.getData();
      if (this.studentDataFromService) {
        console.log('jello', this.studentDataFromService)
        localStorage.setItem(this.storageKey, JSON.stringify(this.studentDataFromService));
      }


    }

    const student = this.markcardData.find((student: any) => {
      if (this.studentDataFromService.student_id === student.student_id) {
        this.marks = student?.marks;

        console.log("studentFilter", this.marks);
      }

    }
    )


  }

}
