import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})

export class ConversationComponent implements OnInit {

  msgs:{}[] = [];
  msg: string = '';
  monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.msgs = JSON.parse(localStorage.getItem('conversation') || '[]');

    this.msgs.forEach(msg => {
      msg = this.getMsgDate(msg);
    });
    console.log(this.msgs[0]);
  }

  sendMessage(): void{
    this.msg = this.msg.trim();

    if(this.msg.length > 0){
      var newMsg:any = {};
      var today = new Date();

      newMsg['text'] = this.msg;
      newMsg['timestamp'] = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      newMsg['year'] = today.getFullYear();
      newMsg['month'] = this.monthNames[today.getMonth()];
      newMsg['day'] = today.getDate();
      
      this.msgs.push(newMsg);
      localStorage.setItem('conversation', JSON.stringify(this.msgs));

      newMsg = this.getMsgDate(newMsg);
      
      this.msg = '';
    }
  }

  getMsgDate(msg){
    var today = new Date();
    if( msg['year'] == today.getFullYear() && 
      msg['month'] == this.monthNames[today.getMonth()] && 
      msg['day'] == today.getDate()){
        msg['month'] = 'Today';
        msg['day'] = '';
      }
    
      else if(msg['year'] == today.getFullYear() && 
      msg['month'] == this.monthNames[today.getMonth()] && 
      msg['day'] == today.getDate() - 1){
        msg['month'] = 'Yesterday';
        msg['day'] = '';
      }

    return msg;
  }

  onLogOut(): void{
    if(confirm('Are you sure you want to log out?')){
      localStorage.clear();
      this.router.navigate(["login"]);
    }
  }
}
