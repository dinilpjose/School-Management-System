import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentDashboardService } from 'src/app/services/student-dashboard.service';
import { STUDENTSMARKS } from './student_marks_dynamic';
import { LoginService } from 'src/app/services/login.service';

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
  markcardData: any = STUDENTSMARKS;
  imageUrl: any = '';
  profilePic: string = './assets/images/profile.jpg'

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private studentDashboardService: StudentDashboardService
  ) { }

  ngOnInit(): void {
    this.loginService.isLogedIn.next(true);
    const storedStudentDashboardValue = localStorage.getItem(this.storageKey);
    if (storedStudentDashboardValue != undefined) {
      this.studentDataFromService = JSON.parse(storedStudentDashboardValue);
    }
    else {
      this.studentDataFromService = this.studentDashboardService.getData();
      if (this.studentDataFromService) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.studentDataFromService));
      }

    }
    this.markcardData.find((student: any) => {
      if (this.studentDataFromService.student_id === student.student_id) {
        this.marks = student?.marks;
      }
    }
    )
  }

}
