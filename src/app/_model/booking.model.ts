import { Time } from '@angular/common';
 
export class Booking {
 
    roomId:number;
    usrEmpId:number;
    userName:String;
    bookingStartTime:String;
    bookingEndTime:String;
    meetingTypeId:number;
    bookingMode:String;
    customBookingDate : String[];
    bookingStartDate : String;

    
    //constructor(){}

    bookingId?:number;
    roomName?:string;
    noOfWeeks?:number;

    constructor(roomId: number, usrEmpId: number,
        bookingStartTime: String,bookingEndTime: String, meetingTypeId : number, 
        bookingMode: String, customBookingDate : String[], bookingStartDate : String,
        noOfWeeks:number) {
        this.roomId = roomId;
        this.usrEmpId = usrEmpId;
        this.meetingTypeId = meetingTypeId;
        this.bookingStartTime = bookingStartTime;
        this.bookingEndTime = bookingEndTime; 
        this.bookingMode = bookingMode;
        this.customBookingDate = customBookingDate;
        this.bookingStartDate = bookingStartDate;
        this.noOfWeeks=noOfWeeks;
     } 
    }