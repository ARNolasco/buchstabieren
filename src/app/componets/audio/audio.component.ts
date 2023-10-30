import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent {
  count = 1;
  @ViewChild('miAudio', { static: true }) miAudio: ElementRef;

  constructor() {
    this.miAudio = new ElementRef(null); 
  }

  reproducirAudio() {
    this.miAudio.nativeElement.play();
  }

  pausarAudio() {
    this.miAudio.nativeElement.pause();
  }

  audioTerminado() {
    this.count++;
    // Aquí puedes realizar acciones específicas cuando el audio ha terminado.
    console.log("El audio ha terminado de reproducirse.");
    // Puedes, por ejemplo, reiniciar la reproducción o realizar otra acción.

    if(this.count <= 2){
      this.miAudio.nativeElement.src = '../assets/audios/Test_'+this.count+'.mp3';
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
