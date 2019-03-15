import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { messageTypes } from '../common/enums'

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})

export class ConversationComponent implements OnInit {

  msgs:{}[] = [];
  messageType = messageTypes;
  newMessage: string = '';
  monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  constructor(private router: Router) {
    
    // Return empty array if no chat is saved
    let savedChat = JSON.parse(localStorage.getItem('conversation') || '[]');
    
    // Add sample messages if array is empty
    if(savedChat.length == 0)
      this.updateDummyMessages();

    // Append to existing variable
    this.msgs = [...this.msgs, ...savedChat];
   }

   ngOnInit(){

   }

  updateDummyMessages(): void {
      this.msgs = [{
        msg: 'Hi',
        time: new Date(),
        type: messageTypes.Incoming
      },
      {
        msg: 'Hi Dev',
        time: new Date(),
        type: messageTypes.Outgoing
      },
      {
        msg: "What's up?",
        time: new Date(),
        type: messageTypes.Incoming
      },
      {
        msg: "Fine. All good? What's new?",
        time: new Date(),
        type: messageTypes.Outgoing
      },
      {
        msg: "Learning some new technologies",
        time: new Date(),
        type: messageTypes.Incoming
      }];
  }

  sendMessage(): void {
    this.newMessage = this.newMessage.trim();

    if(this.newMessage.length > 0){
      let newMsg:any = {};

      newMsg['msg'] = this.newMessage;
      newMsg['time'] = new Date();
      newMsg['type'] = messageTypes.Outgoing;
      
      this.msgs.push(newMsg);
      localStorage.setItem('conversation', JSON.stringify(this.msgs));
      this.newMessage = '';
    }
  }

  onLogOut(): void{
      localStorage.clear();
      this.router.navigate(["login"]);
  }
}
