
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler'
import { DatepickerDialogueComponent } from '../datepicker-dialogue/datepicker-dialogue.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import { MatSlideToggleChange, MatRadioChange, MatRadioButton } from '@angular/material';
import { BookingPageComponent } from '../booking-dialog/booking-page.component';
import { SearchService } from 'src/app/_service/search.service';
import { MeetingRoomDetail } from 'src/app/_model/meetingroomdetail.model';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-booking-scheduler',
    templateUrl: './booking-scheduler.component.html',
    styleUrls: ['./booking-scheduler.component.scss']
})

export class BookingSchedulerComponent implements AfterViewInit {
   @ViewChild('scheduler', { static: false }) myScheduler: jqxSchedulerComponent;
    
    public appointments = new Array();
    output: MeetingRoomDetail[];
    checked = false;
    disabled = false;
    dates: any = [];
    dateString: string = ''
    isrequired: boolean = false;
    loadscheduler : any;
    testing : String;
    
    toTime: any; 
    repeatType : any;

    constructor(
      private router : Router,
      public dialog: MatDialog, 
      public datePipe: DatePipe,
      private searchService: SearchService,
    ) {
       
    }

    ngOnInit() {

        this.searchService.getAllMeetingRoomDetails().subscribe(data => {

            console.log("searchService.getAllMeetingRoomDetails()"+data);

            if (data && data.length >= 0) {  
              this.handleMeetingRoomDetailList(data);
            }
        }); 

    } 
 
    handleMeetingRoomDetailList(data: MeetingRoomDetail[]) {   

        this.loadscheduler = "loadscheduler";

        for (let meetingRoomDetail of data) {


           console.log("result"+meetingRoomDetail.bookingStartDate); // 1, "string", fals

           var bookingStartDate = meetingRoomDetail.bookingStartDate.toString().split("-"); 

           const year = bookingStartDate[0];
           const month = bookingStartDate[1];
           const day = bookingStartDate[2];

            //console.log(year);
            //console.log(month);
           //console.log(day);

           var startTime = meetingRoomDetail.bookingStartTime.toString().split(":"); 

           const strtHours  =startTime[0];
           const strtMinutes =startTime[1];
           const strtSeconds =startTime[2];

           var endTime = meetingRoomDetail.bookingEndTime.toString().split(":"); 

           const endtHours  =endTime[0];
           const endtMinutes =endTime[1];
           const endtSeconds =endTime[2];

           var meetingRoomName = meetingRoomDetail.roomName;
           var meetingType = meetingRoomDetail.purpose;

           let appointment = {   
               id : "id1", 
               description: '',
               location: '',
               subject: meetingType,
               calendar: meetingRoomName,
               start: new Date(parseInt(year), parseInt(month), parseInt(day), parseInt(strtHours), parseInt(strtMinutes) , parseInt(strtSeconds)),
               end: new Date(parseInt(year), parseInt(month), parseInt(day), parseInt(endtHours), parseInt(endtMinutes) , parseInt(endtSeconds))
           }
   
            this.appointments.push(appointment); 
            this.refreshdata(); 
       }       
     
   }
    
    ngAfterViewInit() {
        this.myScheduler.ensureAppointmentVisible('id1');

      console.log("ngAfterViewInit");

       this.searchService.currentMessage.subscribe(bookedData => {

            console.log("searchService.currentMessage"+ bookedData);

            if (bookedData.length >= 0) {
                this.handleMeetingRoomDetailList(bookedData);
            }
           
          });
   
    }

    refreshdata(){
        this.source.localData=this.appointments;
        this.dataAdapter = new jqx.dataAdapter(this.source)
       
   }

	getWidth() : any {
		if (document.body.offsetWidth < 800) {
			return '90%';
		}
		return 800;
    }
 
   generateAppointments() {
     console.log(this.appointments);
     return this.appointments;

    }

    pickerModes: any = {
      single: true, // disable/enable single date picker mode
      multi: true, // disable/enable multiple date picker mode
      range: true // disable/enable range date picker mode
    }

    getDate(event) {
      console.log(event); // logs the picked date data
    }

    date: any = new jqx.date(2020, 5, 27);

    source: any =
    {
        dataType: 'array',
        dataFields: [
            { name: 'id', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'location', type: 'string' },
            { name: 'subject', type: 'string' }, 
            { name: 'calendar', type: 'string' },
            { name: 'start', type: 'date' },
            { name: 'end', type: 'date' }
        ],
        id: 'id',
        localData: this.appointments
    };
     
    dataAdapter: any = new jqx.dataAdapter(this.source);

    resources: any =
    {
        colorScheme: 'scheme05',
        dataField: 'calendar',
        source: new jqx.dataAdapter(this.source)
    };

    appointmentDataFields: any =
    {
        from: 'start',
        to: 'end',
        id: 'id',
        description: 'description',
        location: 'place',
        subject: 'subject',
        resourceId: 'calendar'
    };

    views: string[] | any[] =
    [
        'dayView',
        'weekView',
        'monthView',
        'agendaView'
    ];

  onChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.repeatType = mrChange.value;
    let mrButton: MatRadioButton = mrChange.source;
    console.log(mrButton.name);
    console.log(mrButton.checked);
    console.log(mrButton.inputId);

    if (mrButton.value == "Custom") {
      this.isrequired = true;
    } else {
    this.isrequired = false;
    }
 } 

 openDialog() {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
    id: 1,
    title: 'Angular For Beginners'
  };
    this.dialog.open(BookingPageComponent, dialogConfig);
 }
  
}
