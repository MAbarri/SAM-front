import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConversationService } from '../services/conversation.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-convos',
  templateUrl: './convos.component.html',
  styleUrls: ['./convos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConvosComponent implements OnInit {

  userId: any = "1";
  user: any;
  userEmail: any = "default@default.com";
  conversations: any[] = [];

  constructor(private conversationService: ConversationService, private userService: UserService) {
    document.body.className = "body-style-convs";
  }

  ngOnDestroy() {
    document.body.className = "";
  }
  ngOnInit(): void {
    this.loadConvosList();
  }

  async loadConvosList(){
    this.user = await this.userService.getActiveUser(this.userEmail).toPromise();
    this.conversations = await this.conversationService.getLastEightConvos(this.user.id).toPromise();
    console.log('this.conversations', this.conversations)
  }

  persisteDeleteConversation(conversationId : any){
    return this.conversationService.deleteConversation(this.user.id, conversationId);
  }

  persisteDeleteAllConversations(){
    return this.conversationService.deleteAllConversation(this.user.id);
  }

  async deleteConversation(conversationID : any){
    // prompt sure !!!!!
    let response = await this.persisteDeleteConversation(conversationID).toPromise();
    console.log('response', response)
    await this.loadConvosList();
  }

  async deleteAllConversation(){
    // prompt sure !!!!!
    let response = await this.persisteDeleteAllConversations().toPromise();
    console.log('response', response)
    await this.loadConvosList();
  }

}
