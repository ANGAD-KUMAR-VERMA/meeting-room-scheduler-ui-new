
import { Component, ViewChild, AfterViewInit, OnInit, Renderer, Renderer2 } from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler'
import { DatepickerDialogueComponent } from '../datepicker-dialogue/datepicker-dialogue.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleChange, MatRadioChange, MatRadioButton } from '@angular/material';
import { BookingPageComponent } from '../booking-dialog/booking-page.component';
import { rendererTypeName } from '@angular/compiler';

@Component({
    selector: 'app-booking-scheduler',
    templateUrl: './booking-scheduler.component.html',
    styleUrls: ['./booking-scheduler.component.scss']
})
export class BookingSchedulerComponent implements AfterViewInit, OnInit {
    ngOnInit() {
        this.renderer.removeClass(document.body, "hold-transition");
        this.renderer.removeClass(document.body, "login-page");

    }
    @ViewChild('scheduler', { static: false }) myScheduler: jqxSchedulerComponent;

    checked = false;
    disabled = false;
    dates: any = [];
    dateString: string = ''
    isrequired: boolean = false;

    toTime: any;
    repeatType: any;

    constructor(
        private router: Router,
        public dialog: MatDialog,
        public datePipe: DatePipe,
        public renderer: Renderer2



    ) { }

    ngAfterViewInit() {
        this.myScheduler.ensureAppointmentVisible('id1');
    }

    getWidth(): any {
        if (document.body.offsetWidth < 800) {
            return '90%';
        }

        return 800;
    }

    generateAppointments() {
        let appointments = new Array();
        let appointment1 = {
            id: 'id1',
            description: 'George brings projector for presentations.',
            location: '',
            subject: 'Quarterly Project Review Meeting',
            calendar: 'Room 1',
            start: new Date(2020, 10, 23, 9, 0, 0),
            end: new Date(2020, 10, 23, 16, 0, 0)
        }
        let appointment2 = {
            id: 'id2',
            description: '',
            location: '',
            subject: 'IT Group Mtg.',
            calendar: 'Room 2',
            start: new Date(2020, 10, 24, 10, 0, 0),
            end: new Date(2020, 10, 24, 15, 0, 0)
        }
        let appointment3 = {
            id: 'id3',
            description: '',
            location: '',
            subject: 'Course Social Media',
            calendar: 'Room 3',
            start: new Date(2020, 10, 21, 11, 0, 0),
            end: new Date(2020, 10, 21, 13, 0, 0)
        }
        let appointment4 = {
            id: 'id4',
            description: '',
            location: '',
            subject: 'New Projects Planning',
            calendar: 'Room 2',
            start: new Date(2020, 10, 23, 16, 0, 0),
            end: new Date(2020, 10, 23, 18, 0, 0)
        }
        let appointment5 = {
            id: 'id5',
            description: '',
            location: '',
            subject: 'Interview with James',
            calendar: 'Room 1',
            start: new Date(2020, 10, 25, 15, 0, 0),
            end: new Date(2020, 10, 25, 17, 0, 0)
        }
        let appointment6 = {
            id: 'id6',
            description: '',
            location: '',
            subject: 'Interview with Nancy',
            calendar: 'Room 4',
            start: new Date(2020, 10, 26, 14, 0, 0),
            end: new Date(2020, 10, 26, 16, 0, 0)
        }
        appointments.push(appointment1);
        appointments.push(appointment2);
        appointments.push(appointment3);
        appointments.push(appointment4);
        appointments.push(appointment5);
        appointments.push(appointment6);

        return appointments;
    };

    pickerModes: any = {
        single: true, // disable/enable single date picker mode
        multi: true, // disable/enable multiple date picker mode
        range: true // disable/enable range date picker mode
    }
    getDate(event) {
        console.log(event); // logs the picked date data
    }

    date: any = new jqx.date(2020, 11, 23);

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
            localData: this.generateAppointments()
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



    bookRoom(roomId: any, meetingType: any, comboOption: any, startTime: any, endTime: any) {
        console.log(roomId.value);
        console.log(meetingType.value);
        console.log(this.repeatType);
        console.log(startTime.value);
        console.log(endTime.value);
        console.log(this.dateString);
    }

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
