import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../models/chatMessage.model'; 

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  text: string = '';
  messages: ChatMessage[] = [];
  message: ChatMessage = {
    text: '',
    type: 'sent',
    username: '',
    timestamp: '',
  }

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.listMessage();
  }

  sendMessage(): void {
    if (this.text) {
      this.message = {
        text: this.text,
        type: 'sent',
        username: '', // Asigna el usuario actual si es necesario
        timestamp: new Date().toISOString()
      };
      this.messages.push(this.message);
      this.chatService.sendMessage(JSON.stringify(this.message));
      this.text = '';
      this.scrollToBottom();
    }
  }

  listMessage(): void {
    this.chatService.getMessage().subscribe((data: ChatMessage) => {
      if (data.text && data.username && data.timestamp) {
        console.log('Mensaje recibido:', data);
        this.messages.push({ 
          text: data.text, 
          type: 'received', 
          username: data.username, 
          timestamp: data.timestamp 
        });
        this.scrollToBottom();
      } else {
        console.error('Mensaje recibido con formato incorrecto:', data);
      }
    });
  }
  
  scrollToBottom(): void {
    const messageContainer = document.querySelector('.chat-messages');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }
}




