import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Booking } from '../_model/booking.model';
import { ConstantService } from './constant.service';
import { RestResponse } from '../_model/rest-response.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  jsonURL: string = 'assets/sampleList.json';
  constructor(private http: HttpClient,
    private cons: ConstantService) { }


  updateResults = new Subject<Booking[]>();


  currentMessage = this.updateResults.asObservable();



  changeMessage(message: Booking[]) {
    this.updateResults.next(message)
  }

  getAllLists(searchInfo: Booking): Observable<Booking[]> {
    const search = {
      roomId: searchInfo.roomId,
      //bookingDate: searchInfo.bookingDate,
      bookingStartTime: searchInfo.bookingStartTime,
      bookingEndTime: searchInfo.bookingEndTime
    };
    return this.http.post<Booking[]>(this.cons.baseURI + this.cons.searchRoom, search);
  }


  bookRoom(booking: Booking): Observable<HttpResponse<Booking>> {
    const book = {
      roomId: booking.roomId,
      usrEmpId: booking.usrEmpId,
      bookingStartTime: booking.bookingStartTime,
      bookingEndTime: booking.bookingEndTime,
      meetingTypeId: booking.meetingTypeId,
      bookingMode : booking.bookingMode,
      customBookingDate : booking.customBookingDate,
      bookingStartDate : booking.bookingStartDate,
      noOfWeeks: booking.noOfWeeks
    };

    console.log(JSON.stringify(book));

    return this.http.post<Booking>(this.cons.baseURI + this.cons.bookRoom, book, { observe: 'response' });
  }


  cancelBooking(bookId: number):Observable<RestResponse>{
    return this.http.get<RestResponse>(this.cons.baseURI + this.cons.cancelRoom +'/'+bookId);
  }





}