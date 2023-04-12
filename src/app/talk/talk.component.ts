import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConversationService } from '../services/conversation.service';
import { VoiceRecognitionService } from '../services/speech.service';
import * as _ from 'underscore';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { SpeechToTextService } from '../services/speech-to-text.service';

declare const speak: (text : string) => void; // Add this line


@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class TalkComponent implements OnInit {


  userId : any = "1";
  user : any;
  userEmail: any = "default@default.com";
  conversation: any[] = [];
  activeConversation : any;
  selectedVoice : any;

  textmode: boolean = false;
  textModeValue : any;

  isMobileApp: boolean = false;

  ngOnDestroy() {
    document.body.className = "";
  }
  constructor(private voiceRecognitionService: VoiceRecognitionService, private conversationService: ConversationService, private userService: UserService, private route: ActivatedRoute, private speechToTextService: SpeechToTextService) {

    this.route.queryParams.subscribe(params => {
      let queryparams = params;
      let convParam = queryparams["conv"];

      this.loadConversation(convParam);
    });

    document.body.className = "body-style";
    this.voiceRecognitionService.init();



    // window.speechSynthesis.onvoiceschanged = () => {
    //   const updatedVoices = window.speechSynthesis.getVoices();
    //   this.selectedVoice = _.find(updatedVoices, (voice: any) => { return voice.name == "Fiona"});
    // };

  }

  ngOnInit(): void {
    let userAgent = navigator.userAgent;
    this.isMobileApp = userAgent == "samapp";
    console.log('is mobile app:', this.isMobileApp);
  }
  
  async loadConversation(convParam : any){
    this.user = await this.userService.getActiveUser().toPromise();
    if (convParam) {
      if (convParam == "new") {
        this.activeConversation = await this.conversationService.startNewConversation(this.user.id).toPromise();
      } else {
        this.activeConversation = await this.conversationService.getConversation(this.user.id, convParam).toPromise();
      }
    } else {
      this.activeConversation = await this.conversationService.getActiveConversation(this.user.id).toPromise();
    }
    this.conversation = _.map(this.activeConversation.messages, (msg) => { return { sender: msg.sender == 'bot' ? "SAM" : "You", content: msg.content.replace(/(?:\r\n|\r|\n)/g, '<br>') } });
    this.conversation.reverse();
    console.log('_________ activeConversation ', this.activeConversation)
  }

  startListening() {
    this.voiceRecognitionService.start();
  }

  async sendTextMessage() {
    
      if (this.textModeValue.indexOf('undefined') == -1 && this.textModeValue.length>2){
        this.conversation.unshift({
          "sender": "You",
          "content": this.textModeValue
        })
        let response = await this.conversationService.sendMessage(this.activeConversation.id, this.user.id, this.textModeValue).toPromise();
        console.log('response', response);
        this.conversation.unshift({
          "sender": "SAM",
          "content": response.message
        })
        this.readText(response.message)
        this.textModeValue = "";
      }
  }
  stopListening() {
    setTimeout(async () => {
      this.voiceRecognitionService.stop();
      console.log('this.voiceRecognitionService.text', this.voiceRecognitionService.text)
      if (this.voiceRecognitionService.text.indexOf('undefined') == -1 && this.voiceRecognitionService.text.length>2){
        this.conversation.unshift({
          "sender": "You",
          "content": this.voiceRecognitionService.text
        })
        let response = await this.conversationService.sendMessage(this.activeConversation.id, this.user.id, this.voiceRecognitionService.text).toPromise();
        console.log('response', response);
        this.conversation.unshift({
          "sender": "SAM",
          "content": response.message
        })
        this.readText(response.message)
      }
    }, 400)
  }


  async readText(textToRead:any) {
    // const speech = new SpeechSynthesisUtterance();
    // speech.text = textToRead;
    // speech.volume = 1;
    // speech.rate = 1;
    // speech.pitch = 1;
    // if(this.selectedVoice) {
    //   speech.voice = this.selectedVoice; 
    // }
    // window.speechSynthesis.speak(speech);
    speak(textToRead);
  }
  switchInputMode(){
    this.textmode = !this.textmode;
    console.log('swtched mode')
  }

  startRecording() {
    this.speechToTextService.startRecording();
  }
  async stopRecording() {
    const audioBlob = await this.speechToTextService.stopRecording();
    this.speechToTextService.sendRecording(audioBlob).subscribe(async whisperResponse => {
      console.log('Transcription:', whisperResponse.text);

      this.conversation.unshift({
        "sender": "You",
        "content": whisperResponse.text
      })
      let response = await this.conversationService.sendMessage(this.activeConversation.id, this.user.id, whisperResponse.text).toPromise();
      console.log('response', response);
      this.conversation.unshift({
        "sender": "SAM",
        "content": response.message
      })
      this.readText(response.message)
    });
  }
}


