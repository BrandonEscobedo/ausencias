import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  chatService = inject(ChatService);
  messages: string[] = [];
  prompt: string = '';
  chatResponse: string[] = [];
constructor(private cdRef: ChangeDetectorRef) { }
  startChat() {
    if (this.prompt.trim() === '') {
      return;
    }

    this.chatResponse = []; // Limpiar respuestas anteriores

    this.chatService.streamChat(this.prompt).subscribe({
      next: (message) => {
        this.chatResponse.push(message); // Agregar los mensajes de chat en tiempo real
        this.cdRef.detectChanges(); // Forzar la detección de cambios

      },
      error: (err) => {
        console.error('Error con SSE:', err);
      }
    });
  }
  ngOnInit(): void {

  }

}
