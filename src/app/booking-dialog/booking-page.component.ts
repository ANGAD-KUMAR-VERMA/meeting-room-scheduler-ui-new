import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DatepickerDialogueComponent } from '../datepicker-dialogue/datepicker-dialogue.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatSlideToggleChange, MatRadioChange, MatRadioButton } from '@angular/material';
import { Booking } from 'src/app/_model/booking.model';
import { BookingService } from 'src/app/_service/booking.service';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/_model/room.model';
import { MeetingType } from 'src/app/_model/meetingtype.model';
import { RoomService } from 'src/app/_service/room.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit {
    roomList: Room[];
    meetingTypeList : MeetingType[];
    form: FormGroup;
    description:string;
    checked = false;
    disabled = false;
    dates: any = [];
    dateString: string = ''
    isrequired: boolean = false;
    meetingroom : any
    startTime : any
    endTime : any
    meetingtype : any
    meetingMode : any
    errorMsg: any;
    successMsg: any;
    subscription: Subscription;
    bookingSuccessMsg: String;
    showSuccess: boolean;
    minDate : String;
   
    
    @ViewChild('rId', { static: true }) ID: ElementRef;
  enableStartDate: boolean;
    constructor(
        private service: BookingService,
        private roomService: RoomService,
        private spinner: NgxSpinnerService,
        private fb: FormBuilder,
        public dialog: MatDialog, 
        public datePipe: DatePipe,
        private dialogRef: MatDialogRef<BookingPageComponent>,

        

        @Inject(MAT_DIALOG_DATA) {}:any) {

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const currentDay = new Date().getDate();
        this.minDate = currentYear +"-"+ currentMonth +"-"+ currentDay;

    }

    ngOnInit() {
      
     console.log(this.minDate);
        this.form = this.fb.group({
            meetingroom: [this.meetingroom, []]
        });

        this.roomService.getAllRooms().subscribe(rooms => {
            this.roomList = rooms;
            console.log(this.roomList);

          })

       this.roomService.getAllMeetingTypes().subscribe(meetingtypes => {

          this.meetingTypeList = meetingtypes;
          console.log(this.meetingTypeList);
         })

    }


    openDatepicker(): void {
        const dialogRef = this.dialog.open(DatepickerDialogueComponent, {
          width: '400px'
        });
    
        this.dateString = '';
        dialogRef.afterClosed().subscribe(data => {
          
          this.dates = [];
          if (data && data.hasDatePicked) {
            if (data.type === 'single' || data.type === 'multi') {
              this.dates = data.dates;
            }
            else {
              this.dates = data.dates.days;
            }
            this.dates.forEach((date) => {
              this.dateString = this.datePipe.transform(date, 'y-MM-d') +', '+this.dateString;
            });
          }
        });
      };

    close() {
        this.dialogRef.close();
    }

    onChange(mrChange: MatRadioChange) {
        console.log(mrChange.value);
        this.meetingMode = mrChange.value;
        let mrButton: MatRadioButton = mrChange.source;
        console.log(mrButton.name);
        console.log(mrButton.checked);
        console.log(mrButton.inputId);
    
        if (mrButton.value == "custom") {
          this.isrequired = true;
        } else {
        this.isrequired = false;
        }

        if(mrButton.value == "week" ||  mrButton.value =="month"){
          this.enableStartDate = true;
        }else{
          this.enableStartDate = false;
        }
     } 


     bookRoom(roomId: any, meetingTypeId: any, startTimeInput: any, endTimeInput: any) {
        console.log(roomId.value);
        console.log(meetingTypeId.value);
        console.log(this.meetingMode);
        console.log(startTimeInput.value);
        console.log(endTimeInput.value);
        console.log(this.dateString);

        this.startTime = this.calculateTime(startTimeInput.value);
        this.endTime = this.calculateTime(endTimeInput.value);

        console.log(this.startTime);
        console.log(this.endTime);

       this.dateString = this.dateString.substr(0, this.dateString.length - 2);
       var customeBookingDates = this.dateString.split(","); 
       console.log(customeBookingDates);
       console.log(this.minDate);

       this.minDate = this.datePipe.transform(this.minDate, 'yyyy-MM-dd')
      
      let bookingDetail = new Booking(roomId.value, 1001, this.startTime, this.endTime, meetingTypeId.value, 
        this.meetingMode, customeBookingDates, this.minDate);

      this.spinner.show();
      this.errorMsg = "";

      this.service.bookRoom(bookingDetail)
        .subscribe(
          data => (this.handleBookedRoomData(data, bookingDetail), this.spinner.hide()
          ),
          err => (this.handleError(err), this.spinner.hide())

        )
        this.dialogRef.close(this.form.value);
     }

     handleBookedRoomData(data: any, bookingDetail: Booking) {
        if (data.status == 200) {
          this.bookingSuccessMsg = "Booked Successfully !!!";
          this.showSuccess = true;
    
          this.successMsg = this.bookingSuccessMsg;
          alert("Booked Successfully !!!");
         
          setTimeout(() => {
            this.showSuccess = false; this.successMsg = "";
          }, 2500);
        }
      }
    

  handleError(err: HttpErrorResponse) {
    alert("Error");
    this.errorMsg = '';
    this.successMsg = '';
    this.errorMsg = err.message ? err.message : 'Something went wrong';
    setTimeout(() => {
      this.errorMsg = false;
    }, 2500);
  }

  calculateTime(time): string {
    if (time.length > 0) {
      if (time.substr(time.length - 2) == "PM") {
        if (time.substr(0, time.indexOf(":")) != "12") {
          return time = (12 + parseInt(time.substr(0, time.indexOf(':')))) + ":" + time.substr(time.indexOf(':') + 1, 2) + ":00"
        }
        else {
          return time = time.substr(0, time.length - 3) + ":00"
        }
      } else {
        if (time.substr(0, time.indexOf(':')).length === 2) {
          return (time.substr(0, time.length - 3) + ":00");
        }
        else {
          return ("0" + time.substr(0, time.length - 3) + ":00");
        }
      }
    }
  }
    
  public myFilter = (d: Date): boolean => {
    const day = d.getDay();
    let today = new Date();
    today.setHours(0,0,0,0);
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 && d >= today;
}

  

  
}

    