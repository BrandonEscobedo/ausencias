import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url = environment.chatURL + "/chat-stream";
  constructor(private ngZone: NgZone) { }
  streamChat(prompt: string): Observable<string> {

    const p = encodeURIComponent(prompt);
    const eventSource = new EventSource(this.url + '?prompt=' + p);
    return new Observable<string>((observer) => {
      eventSource.onmessage = (event) => {
        observer.next(event.data); // Emitir los datos recibidos
      };
      eventSource.onerror = (err) => {
        observer.error(err); // Manejar errores
      };
      eventSource.onopen = () => {
        console.log('SSE connection established');
      };
      return () => {
        eventSource.close();
      };
    });
  }
}
