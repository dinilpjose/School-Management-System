import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditStudent } from '../home-page/student-form/student.model';

@Component({
  selector: 'app-edit-student-form',
  templateUrl: './edit-student-form.component.html',
  styleUrls: ['./edit-student-form.component.scss']
})
export class EditStudentFormComponent {

  student: any;


  form: FormGroup = new FormGroup({})

  levels: string[] = ['KG', 'Primary', 'Secondary'];
  selectedLevel: string = this.levels[0];
  years: number[] = [];
  standardsKg: string[] = ['LKG', 'UKG', '1'];
  standardsPrimary: string[] = ['2', '3', '4', '5'];
  standardsSecondary: string[] = ['6', '7', '8', '9', '10'];
  standards: string[] = this.standardsKg;

  constructor(private dialogRef: MatDialogRef<EditStudentFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public studentData: any
  ) { }

  ngOnInit(): void {
    this.student = this.studentData

    console.log("studentData", this.studentData)

    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 9; i <= currentYear; i++) {
      this.years.push(i);
    }


    this.form = this.formBuilder.group({
      level: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      standard: new FormControl('', [Validators.required]),
      student_name: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    })
  }

  onLevelChange(): void {
    if (this.selectedLevel === 'KG') {
      this.standards = this.standardsKg;
    } else if (this.selectedLevel === 'Primary') {
      this.standards = this.standardsPrimary;
    } else {
      this.standards = this.standardsSecondary;
    }
  }

  onYearChange(): void {
    // If you need to perform any specific action when the year changes, you can implement it here.
  }

  onSubmit(): void {
    console.log("hjkl");
    

    this.dialogRef.close(this.form.value);
  }

}
