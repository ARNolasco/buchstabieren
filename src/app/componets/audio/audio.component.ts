import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent {
  track = 1;
  folder = "";
  json: any;
  @ViewChild('miAudio', { static: true }) miAudio: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.miAudio = new ElementRef(null); 
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
      this.miAudio.nativeElement.src = '../assets/audios/'+this.folder+'/Audio_'+this.track+'.mp3';
      this.miAudio.nativeElement.load();
    });

    this.http.get('../assets/audios/'+this.folder+'/text.json', { responseType: 'text' }).subscribe(data => {
      this.json = JSON.parse(data);
    });
  }

  reproducirAudio() {
    this.miAudio.nativeElement.play();
  }

  pausarAudio() {
    this.miAudio.nativeElement.pause();
  }

  audioTerminado() {
    this.track++;

    if(this.track <= 2){
      this.miAudio.nativeElement.src = '../assets/audios/'+this.folder+'/Audio_'+this.track+'.mp3';
      this.miAudio.nativeElement.load();
      this.miAudio.nativeElement.play();
    }
  }

  aumentarVelocidad() {
    this.miAudio.nativeElement.playbackRate = 1; // Aumenta la velocidad en 0.1
  }

  disminuirVelocidad() {
    this.miAudio.nativeElement.playbackRate = 0.5; // Disminuye la velocidad en 0.1
  }
}
