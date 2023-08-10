import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STUDENTS } from './modelDAta';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from './student-form/student-form.component';
import { EditStudentFormComponent } from '../edit-student-form/edit-student-form.component';
import { StudentDashboardService } from 'src/app/services/student-dashboard.service';


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
  data: any[] = [];
  count: number = 0;
  year: any
  level: any
  storedData: any;

  emptyRecord: boolean = false;


  filteredStudents: Array<object> = [];



  constructor(private router: Router,
    private studentDashboardService: StudentDashboardService,
    private dialog: MatDialog) {

  }

  openAddStudentDialog() {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((newStudent: any) => {
      console.log("newStudent", newStudent)
      // The dialog was closed, and 'newStudent' contains the data entered in the form
      if (newStudent) {
        // Add the new student to the 'STUDENTS' object
        this.addNewStudent(newStudent);
      }
    });
  }

  addNewStudent(newStudent: any): void {
    const yearArray = this.dataSet[newStudent.year]
    console.log("yearArray",this.dataSet)
    const filterBystandard = yearArray[((newStudent.level).toLowerCase())]
    this.filteredStudents = filterBystandard?.
    flatMap(
      (section: any) => {
        if (section[newStudent.standard]) {
          
          
          const standard = newStudent.standard
          console.log("11111",newStudent,section)

          const lastObject = section[section.length - 1];

            delete newStudent.year;
            delete newStudent.level;
            delete newStudent.standard;
            section[standard].push(newStudent)
            this.saveStudentsToLocalStorage();
          }
        }
      );

  }

  saveStudentsToLocalStorage(): void {
    const storageKey = "STUDENTS_DATA";
    localStorage.setItem(storageKey, JSON.stringify(this.studentData));
  }

  openEditStudentDialog(newStudent: any) {

    const storageKey = "STUDENTS_DATA";

    


    for (let i = 0; i < this.studentData.length; i++) {
      if ((this.studentData[i].name === newStudent.name) && (this.studentData[i].city === newStudent.city)) {
        
        console.log("hi,new]]", newStudent)

        const dialogRef = this.dialog.open(EditStudentFormComponent, {
          width: '400px',
          data: newStudent
        });

        dialogRef.afterClosed().subscribe((editStudent: any) => {
          console.log("newStudent", editStudent)
          // The dialog was closed, and 'newStudent' contains the data entered in the form
          if (editStudent) {
            // Add the new student to the 'STUDENTS' object
            this.studentData.push(editStudent)
            this.saveStudentsToLocalStorage();
          }
        });
        // this.studentData.splice(i, 1);
        // localStorage.setItem(storageKey, JSON.stringify(this.studentData));
      }
    }

  }
  selectStudent(student:any){
    console.log("ee",student);

    this.studentDashboardService.saveStudentData(student)



    this.router.navigate(['/home/dashboard']);
    
  }

  ngOnInit(): void {
    this.standards = this.standardsKg
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear

    const storageKey = "STUDENTS_DATA";
    this.storedData = localStorage.getItem(storageKey);

    for (let i = currentYear - 9; i <= currentYear; i++) {
      this.years.push(i);
    }
    // console.log("hjghjgjhgjg", this.dataSet["2023"]);

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
          // const yearlyData = parsedData[this.selectedYear]
          // const filterBystandard = yearlyData[((this.selectedLevel).toLowerCase())]
          // filterBystandard?.
          //   flatMap(
          //     (section: any) => {
          //       if (section[this.selectedStandard]?.length > 1) {
          //         this.emptyRecord = false;
          //         this.count = 1
          //         this.studentData = section[this.selectedStandard];
          //         // this.studentData = [];
          //       }
          //       else if (this.count === 0) {
          //         this.emptyRecord = true;
          //       }


          //     }

          //   );


          // If there's data in Local Storage, use it to initialize the STUDENTS object
          // this.studentData = JSON.parse(this.storedData);

        }
        else {
          // If no data in Local Storage, you can set the default value or fetch the data from a backend
          // For example, you can fetch the initial data from a server and store it in Local Storage
          // then initialize the STUDENTS object.
          this.filteredStudents = filterBystandard?.
            flatMap(
              (section: any) => {

                console.log("sssssss",section)

                if (section[this.selectedStandard]?.length > 1) {
                  this.emptyRecord = false;

                  this.count = 1

                  this.studentData = section[this.selectedStandard];
                  // this.studentData = [];
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
  onYearChange(event: any) {
    this.count = 0;
    this.selectedYear = event;
  }
  onStandardChange(event: any) {
    this.count = 0;

    this.selectedStandard = event
    console.log("selectedStandard", this.selectedStandard)
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
              console.log("hjghjgjhgjg", section, this.selectedStandard, section[this.selectedStandard])

              if (section[this.selectedStandard]?.length > 1) {
                this.emptyRecord = false;

                this.count = 1

                this.studentData = section[this.selectedStandard];
                // this.studentData = [];
              }
              else if (this.count === 0) {
                this.emptyRecord = true;
              }


            }

          );
      }




    }


    // this.router.navigate(['/dashboard'])
  }

  // ... Existing code ...

  // ... Existing code ...

  deleteStudent(student: any) {
    const storageKey = "STUDENTS_DATA";

    console.log()

    for (let i = 0; i < this.studentData.length; i++) {
      if ((this.studentData[i].name === student.name) && (this.studentData[i].city === student.city)) {
        this.studentData.splice(i, 1);
        localStorage.setItem(storageKey, JSON.stringify(this.studentData));
      }
    }
  }


  getStudentdata(studData: any) {
    const yearArray = this.dataSet[studData.year]

    const filterBystandard = yearArray[((studData.level).toLowerCase())]

    // then initialize the STUDENTS object.
    const filteredClass = this.filteredStudents = filterBystandard?.
      flatMap(
        (section: any) => {
          if (section[studData.standard]) {

            console.log(section[studData.standard])

            section[studData.standard];
            this.studentData.push(studData)
            this.saveStudentsToLocalStorage();
            // this.studentData = [];
          }

        }

      );
    return filteredClass
  }







}
