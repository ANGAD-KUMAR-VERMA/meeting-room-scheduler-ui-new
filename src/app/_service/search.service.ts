import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  Subject } from 'rxjs';
import { MeetingRoomDetail } from '../_model/meetingroomdetail.model';
import { ConstantService } from './constant.service';
import { Booking } from '../_model/booking.model';

@Injectable({
  providedIn: 'root' 
})
export class SearchService {

  constructor(private http: HttpClient,
    private cons: ConstantService) { }

  updateResults = new Subject<MeetingRoomDetail[]>();
  currentMessage = this.updateResults.asObservable();

  changeMessage(message: MeetingRoomDetail[]) {
    this.updateResults.next(message)
  }

    getAllMeetingRoomDetails(): Observable<MeetingRoomDetail[]> {
      return this.http.get<MeetingRoomDetail[]>(this.cons.baseURI + this.cons.allmeetingdetails);
  }

  getMeetingRoomDetails(bookingInfo : Booking): Observable<MeetingRoomDetail[]> {
    return this.http.post<MeetingRoomDetail[]>(this.cons.baseURI + this.cons.meetingdetails, bookingInfo);
}

} 