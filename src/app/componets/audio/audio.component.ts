import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent {
  status = 1;
  track = 1;
  folder = "";
  text = "";
  json: any;
  selected: string = "";
  textsArray: Array<any> = [];
  @ViewChild('Audio', { static: true }) miAudio: ElementRef;
  @ViewChild('toggleButton', { static: true }) toggleButton: ElementRef;
  @ViewChild('myText') myText: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient,
    private el: ElementRef) {
    this.miAudio = new ElementRef(null); 
    this.toggleButton = new ElementRef(null);
    this.myText = new ElementRef(null);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['track'])
      {
        this.track = params['track']
      }
    });

    this.route.params.subscribe(params => {
      this.folder = params['folder'];
      this.text = params['text'];
      this.miAudio.nativeElement.src = '../assets/audios/'+this.folder+'/'+this.text+'/Audio_'+this.track+'.mp3';
      this.miAudio.nativeElement.load();
    });
    console.log(this.track)

    this.http.get('../assets/audios/'+this.folder+'/'+this.text+'/text.json', { responseType: 'text' }).subscribe(data => {
      this.json = JSON.parse(data);
      this.textsArray = this.json.texts;
    });
  }

  toggleAudio(){
    if(this.status == 1){
      this.toggleButton.nativeElement.textContent = "Stop"
      this.status = 2;
      this.miAudio.nativeElement.play();
      this.resaltText();
    } else {
      this.toggleButton.nativeElement.textContent = "Play"
      this.status = 1;
      this.miAudio.nativeElement.pause();
      this.resaltText();
    }
  }

  jumpTrack(track: any){
    this.miAudio.nativeElement.src = '../assets/audios/'+this.folder+'/'+this.text+'/Audio_'+track+'.mp3';
      this.miAudio.nativeElement.load();
      this.toggleAudio()
  }

  //TODO replace with toggle function 
  // reproducirAudio() {
  //   this.miAudio.nativeElement.play();
  // }

  //TODO replace with toggle function 
  // pausarAudio() {
  //   this.miAudio.nativeElement.pause();
  // }

  audioTerminado() {
    this.track++;
    this.resaltText();

    if(this.track <= this.json["tracks"]){
      this.miAudio.nativeElement.src = '../assets/audios/'+this.folder+'/'+this.text+'/Audio_'+this.track+'.mp3';
      this.miAudio.nativeElement.load();
      this.miAudio.nativeElement.play();
      console.log("next")
    } else {
      console.log("error")
    }
  }

  aumentarVelocidad() {
    this.miAudio.nativeElement.playbackRate = 1; // Aumenta la velocidad en 0.1
  }

  disminuirVelocidad() {
    this.miAudio.nativeElement.playbackRate = 0.5; // Disminuye la velocidad en 0.1
  }

  getSelectedText(event: any) {
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      console.log("Texto seleccionado:", selectedText);
      this.selected = selectedText;
      // Aquí puedes hacer lo que necesites con el texto seleccionado
    }
  }

  resaltText(){
    const elementos = this.myText.nativeElement.querySelectorAll('span');
    elementos.forEach((elemento: HTMLElement) => {
      elemento.classList.remove('resaltText');
    });

    const elemento = this.el.nativeElement.querySelector('#track-'+this.track);
    if (elemento) {
      elemento.classList.add('resaltText');
    }
  }
}
