import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConversationService } from '../services/conversation.service';
import { VoiceRecognitionService } from '../services/speech.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class TalkComponent implements OnInit {

  conversation: any[] = [];
  selectedVoice : any;

  ngOnDestroy() {
    document.body.className = "";
  }
  constructor(private voiceRecognitionService: VoiceRecognitionService, private conversationService: ConversationService) {
    document.body.className = "body-style";
    this.voiceRecognitionService.init();



    window.speechSynthesis.onvoiceschanged = () => {
      const updatedVoices = window.speechSynthesis.getVoices();
      this.selectedVoice = _.find(updatedVoices, (voice: any) => { return voice.name == "Fiona"});
    };

  }

  ngOnInit(): void {
  }


  startListening() {
    this.voiceRecognitionService.start();
  }

  stopListening() {
    setTimeout(async () => {
      this.voiceRecognitionService.stop();
      if (this.voiceRecognitionService.text.indexOf('undefined') == -1 && this.voiceRecognitionService.text.length>2){
        this.conversation.push({
          "sender": "You",
          "content": this.voiceRecognitionService.text
        })
        let response = await this.conversationService.sendMessage(this.voiceRecognitionService.text).toPromise();
        console.log('response', response);
        this.conversation.push({
          "sender": "SAM",
          "content": response.message
        })
        this.readText(response.message)
      }
    }, 400)
  }


  async readText(textToRead:any) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = textToRead;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    if(this.selectedVoice) {
      speech.voice = this.selectedVoice; 
    }
    window.speechSynthesis.speak(speech);
  }
}


