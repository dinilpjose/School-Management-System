import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STUDENTS } from './studentModel';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from './student-form/student-form.component';
import { EditStudentFormComponent } from '../edit-student-form/edit-student-form.component';
import { StudentDashboardService } from 'src/app/services/student-dashboard.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  levels: string[] = ['KG', 'Primary', 'Secondary'];
  selectedLevel: string = this.levels[0]
  years: any[] = []
  selectedYear: any
  standards: any[] = [];
  standardsKg: string[] = ['LKG', 'UKG', '1',];
  standardsPimary: string[] = ['2', '3', '4', '5'];
  standardsSecondary: string[] = ['6', '7', '8', '9', '10']
  selectedStandard = this.standardsKg[0]
  studentData: any[] = [];
  dataSet = STUDENTS
  count: number = 0;
  year: any
  level: any
  storedData: any;
  emptyRecord: boolean = false;
  filteredStudents: Array<object> = [];
  storageKey: string = 'STUDENTS_DATA';

  constructor(private router: Router,
    private loginService: LoginService,
    private studentDashboardService: StudentDashboardService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginService.isLogedIn.next(true);
    this.standards = this.standardsKg
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear
    this.storedData = localStorage.getItem(this.storageKey);

    for (let i = currentYear - 9; i <= currentYear; i++) {
      this.years.push(i);
    }
    const yearArray = this.dataSet[this.selectedYear]
    if (yearArray === null || yearArray === undefined || yearArray?.length < 1) {
      this.emptyRecord = true;

    }
    else {
      const filterBystandard = yearArray[((this.selectedLevel).toLowerCase())]
      if (filterBystandard === null || filterBystandard === undefined || filterBystandard?.length < 1) {
        this.emptyRecord = true
      }
      else {
        this.emptyRecord = false;

        if (this.storedData) {
          const parsedData = JSON.parse(this.storedData)
          this.studentData = parsedData
        }
        else {
          this.filteredStudents = filterBystandard?.
            flatMap(
              (section: any) => {
                if (section[this.selectedStandard]?.length > 1) {
                  this.emptyRecord = false;
                  this.count = 1
                  this.studentData = section[this.selectedStandard];
                }
                else if (this.count === 0) {
                  this.emptyRecord = true;
                }
              }
            );
        }
      }
    }
  }


  onLevelChange(event: any) {
    this.count = 0;
    this.selectedLevel = event
    if (this.selectedLevel === 'KG') {
      this.standards = this.standardsKg
      this.selectedStandard = this.standards[0]

    }
    else if (this.selectedLevel === 'Primary') {
      this.standards = this.standardsPimary
      this.selectedStandard = this.standards[0]

    }
    else {
      this.standards = this.standardsSecondary
      this.selectedStandard = this.standards[0]

    }

  }

  openAddStudentDialog() {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      disableClose: false,
      panelClass: 'singleDialog',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((newStudent: any) => {
      if (newStudent) {
        this.addNewStudent(newStudent);
      }
    });
  }

  addNewStudent(newStudent: any): void {
    const yearArray = this.dataSet[newStudent.year]
    const filterBystandard = yearArray[((newStudent.level).toLowerCase())]
    this.filteredStudents = filterBystandard?.
      flatMap(
        (section: any) => {
          if (section[newStudent.standard]) {
            const standard = newStudent.standard
            const length = section[newStudent.standard].length - 1;
            const lastObject = section[newStudent.standard][length]
            const numericPart = lastObject.student_id.slice(0, -1);
            const lastDigit = parseInt(lastObject.student_id.slice(-1));
            const newLastDigit = lastDigit + 1;
            const newStudentId = `${numericPart}${newLastDigit}`;
            delete newStudent.year;
            newStudent.student_id = newStudentId;
            delete newStudent.level;
            delete newStudent.standard;
            section[standard].push(newStudent)
            this.saveStudentsToLocalStorage();
          }
        }
      );

  }

  saveStudentsToLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.studentData));
  }

  onYearChange(event: any) {
    this.count = 0;
    this.selectedYear = event;
  }

  onStandardChange(event: any) {
    this.count = 0;
    this.selectedStandard = event
  }

  submit() {
    const yearArray = this.dataSet[this.selectedYear]
    if (yearArray === null || yearArray === undefined || yearArray?.length < 1) {
      this.emptyRecord = true;
    }
    else {
      const filterBystandard = yearArray[((this.selectedLevel).toLowerCase())]
      if (filterBystandard === null || filterBystandard === undefined || filterBystandard?.length < 1) {
        this.emptyRecord = true
      }
      else {
        this.emptyRecord = false;

        this.filteredStudents = filterBystandard?.
          flatMap(
            (section: any) => {
              if (section[this.selectedStandard]?.length > 1) {
                this.emptyRecord = false;
                this.count = 1
                this.studentData = section[this.selectedStandard];
              }
              else if (this.count === 0) {
                this.emptyRecord = true;
              }
            }
          );
      }
    }
  }

  deleteStudent(student: any) {
    for (let i = 0; i < this.studentData.length; i++) {
      if ((this.studentData[i].name === student.name) && (this.studentData[i].city === student.city)) {
        this.studentData.splice(i, 1);
        localStorage.setItem(this.storageKey, JSON.stringify(this.studentData));
      }
    }
  }


  openEditStudentDialog(newStudent: any) {
    for (let i = 0; i < this.studentData.length; i++) {
      if ((this.studentData[i].name === newStudent.name) && (this.studentData[i].city === newStudent.city)) {
        const dialogRef = this.dialog.open(EditStudentFormComponent, {
          disableClose: false,
          panelClass: 'singleDialog',
          autoFocus: false,
          data: newStudent
        });

        dialogRef.afterClosed().subscribe((editStudent: any) => {
          if (editStudent) {
            this.studentData.push(editStudent);
            this.saveStudentsToLocalStorage();
          }
        });
      }
    }

  }
  selectStudent(student: any) {
    this.studentDashboardService.saveStudentData(student);
    this.router.navigate([`/home/dashboard/${student.student_id}`]);

  }


  getStudentdata(studData: any) {
    const yearArray = this.dataSet[studData.year]
    const filterBystandard = yearArray[((studData.level).toLowerCase())]
    const filteredClass = this.filteredStudents = filterBystandard?.
      flatMap(
        (section: any) => {
          if (section[studData.standard]) {
            section[studData.standard];
            this.studentData.push(studData);
            this.saveStudentsToLocalStorage();
          }
        }
      );
    return filteredClass
  }
}
